import create from 'zustand';

const useStore = create(set => ({
	pages: [],
	labels: [],
	properties: [],
	filters: [],
	pagesCount: 0,
	propertiesCount: 0,
	labelsCount: 0,
	setPages: (pages) => {
		set((state) => ({ ...state, pages: pages, pagesCount: pages.length }));
	},
	setLabels: (labels) => {
		set((state) => ({ ...state, labels: labels, labelsCount: labels.length }));
	},
	setProperties: (properties) => {
		set((state) => ({ ...state, properties: properties, propertiesCount: properties.length }));
	},
	removeFilter: (toRemove) => {
		set((state) => ({...state, filters: state.filters.filter(filter => filter !== toRemove)}));
	},
	addFilter: (toAdd) => {
		set((state) => ({...state, filters: [...state.filters, toAdd]}));
	},
}));

export default useStore;
