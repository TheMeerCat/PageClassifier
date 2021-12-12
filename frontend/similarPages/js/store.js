import create from 'zustand';

const useStore = create(set => ({
	pages: [],
	contextPage: null,
	pageCount: 0,
	setPages: (pages) => {
		set((state) => ({ ...state, pages: pages, pageCount: pages.length }));
	},
	setContextPage: (page) => {
		set((state) => ({ ...state, contextPage: page }));
	},
}));

export default useStore;
