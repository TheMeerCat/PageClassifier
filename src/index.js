import Resolver from '@forge/resolver';
import api, {route, webTrigger} from '@forge/api';
import ALL_LABELS from './resources/taxonomy';

const resolver = new Resolver();
const GOOGLE_API_KEY = '__ANOTATE_API_KEY__'; // insert your token to access Google Annotate API

// .../wiki/rest/api/content/search?cql=space=pcts%20and%20type%20=%20page&expand=metadata.properties.de_codegeist_pageclassifier_label
resolver.define('getSimilarPages', async(req) => {
	const requestUrl = route`/wiki/rest/api/content/search?cql=space=${req.context.extension.space.key}%20and%20type%20=%20page&expand=metadata.properties.de_codegeist_pageclassifier_label,metadata.labels`;
	const pagesInSpace = await api.asApp().requestConfluence(requestUrl, {});
	const jsonResults = (await pagesInSpace.json()).results;

	const labeledPages = jsonResults.map(page => ({
		properties: page.metadata.properties['de.codegeist.pageclassifier.label']?.value,
		labels: page.metadata.labels?.results.map(label => label.name.toUpperCase()),
		title: page.title,
		id: page.id,
	}));

	const result = labeledPages.filter(page => page.id !== req.context.extension.content.id);

	return JSON.stringify({values: result});
});

resolver.define('getSpacePages', async(req) => {
	const requestUrl = route`/wiki/rest/api/content/search?cql=space=${req.context.extension.space.key}%20and%20type%20=%20page&expand=metadata.properties.de_codegeist_pageclassifier_label,metadata.labels`;
	const pagesInSpace = await api.asApp().requestConfluence(requestUrl, {});
	const jsonResults = (await pagesInSpace.json()).results;

	const foundProperties = [];
	const foundLabels = [];

	const labeledPages = jsonResults
		.map(page => ({
			labels: page.metadata.labels?.results?.map(label => label.name.toUpperCase()),
			properties: page.metadata.properties['de.codegeist.pageclassifier.label']?.value,
			title: page.title,
			id: page.id,
		})).filter(page => page.properties);

	labeledPages.forEach(page => foundProperties.push(page.properties));
	const uniqueProperties = [...new Set(foundProperties.flat())];

	labeledPages.forEach(page => foundLabels.push(page.labels));
	const uniqueLabels = [...new Set(foundLabels.flat())];

	return JSON.stringify({
		properties: uniqueProperties,
		labels: uniqueLabels,
		pages: labeledPages,
	});
});

resolver.define('getProperties', async(req) => {
	const requelstUrl = route`/wiki/rest/api/content/${req.context.extension.content.id}/property`;
	const response = await api.asApp().requestConfluence(requelstUrl, {});
	const result = (await response.json()).results?.filter(item => item.key === 'de.codegeist.pageclassifier.label')
		.map(item => item.value)[0];

	return JSON.stringify({
		properties: result,
		id: req.context.extension.content.id,
		title: req.context.extension.content.title,
		space: req.context.extension.space.key,
	});
});

export const handler = resolver.getDefinitions();

export async function updatePageLabels(event, _) {
	// const responseAttachments = await api.asApp().requestConfluence(route`/rest/api/content/${event.content?.id}/child/attachment`, {});
	// const attachmentsTriggerUrl = await webTrigger.getUrl('webtrigger-page-attachment-indexing');
	// const attachmentsJson = await responseAttachments.json();
	
	const responsePageBody = await api.asApp().requestConfluence(route`/rest/api/content/${event.content?.id}?expand=body.editor`, {});
	const bodyTriggerUrl = await webTrigger.getUrl('webtrigger-page-content-indexing');

	const bodyJson = await responsePageBody.json();

	await Promise.all([ api.fetch(bodyTriggerUrl, {body: JSON.stringify({body: bodyJson}), method: 'POST'}) ]);
}

/* ATTACHMENTS ANALYSIS
// GET /wiki/download/attachments/400392193/tr1.jpg?version=1&modificationDate=1628330659517&cacheVersion=1&api=v2
export async function analyzeAttachment(event, context) {
	const eventBody = JSON.parse(event.body).attachment;
	const mediaType = eventBody?.metadata?.mediaType;
	const link = eventBody?._links?.download;

	const imageBase64 = await api.asApp().requestConfluence(route`${link}`);

	return {
		body: {status: 'done'},
		headers: [],
		statusCode: 200,
		statusText: 'success',
	};
}*/

export async function analyzeContent(event, context) {
	const pageInfo = JSON.parse(event.body).body;
	const pageBody = pageInfo.body?.editor?.value;

	const document = {
		type: 'HTML',
		content: pageBody,
		language: 'en',
	};

	const features = {
		extractSyntax: false,
		extractEntities: false,
		extractDocumentSentiment: true,
		extractEntitySentiment: true,
		classifyText: true,
	};

	const encodingType = 'UTF32';

	const responseAnnotate = await api.fetch(`https://language.googleapis.com/v1beta2/documents:annotateText?key=${GOOGLE_API_KEY}`, {
		method: 'POST',
		body: JSON.stringify({
			document, features, encodingType,
		}),
	});

	const responseClassify = await api.fetch(`https://language.googleapis.com/v1beta2/documents:classifyText?key=${GOOGLE_API_KEY}`, {
		method: 'POST',
		body: JSON.stringify({
			document,
		}),
	});

	const labels = (await responseClassify.json())?.categories?.map(category => category.name);
	const properties = [...new Set((await responseAnnotate.json())?.entities.map(entity => entity.name))].slice(0, 30);

	const postLabelsTriggerUrl = await webTrigger.getUrl('webtrigger-post-page-labels');

	await api.fetch(postLabelsTriggerUrl, {
		method: 'POST',
		body: JSON.stringify({
			content: pageInfo?.id, labels,
		}),
	});

	const postPropertiesTriggerUrl = await webTrigger.getUrl('webtrigger-post-page-properties');

	await api.fetch(postPropertiesTriggerUrl, {
		method: 'POST',
		body: JSON.stringify({
			content: pageInfo?.id, properties,
		}),
	});

	return {
		body: {status: 'done'},
		headers: [],
		statusCode: 200,
		statusText: 'success',
	};
}

export async function postLabels(event, _) {
	const request = JSON.parse(event.body);
	const body = JSON.stringify(request.labels
		.flatMap(labelName => ALL_LABELS[labelName])
		.map(labelName => {
			return ({name: labelName.replace(/&/g, 'and').replace(/ /g, '_').replace(/\//g, ''), prefix: 'global'});
		})
	);

	await api.asApp().requestConfluence(route`/wiki/rest/api/content/${request.content}/label`, {
		method: 'POST',
		body
	});

	return {
		body: {status: 'done'},
		headers: [],
		statusCode: 200,
		statusText: 'success',
	};
}

export async function postProperties(event, _) {
	const request = JSON.parse(event.body);
	const body = JSON.stringify({
		key: 'de.codegeist.pageclassifier.label', 
		value: request.properties,
	});

	await api.asApp().requestConfluence(route`/wiki/rest/api/content/${request.content}/property`, {
		method: 'POST',
		body
	});

	return {
		body: {status: 'done'},
		headers: [],
		statusCode: 200,
		statusText: 'success',
	};
}