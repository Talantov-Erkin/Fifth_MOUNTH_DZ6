import { create } from 'zustand'

const DEFAULT_FILTERS = { q: '', category: '', sort: 'price', order: 'asc' }

// начальные фильтры берём из URL, чтобы ссылка с фильтрами работала после перезагрузки
const getInitialFilters = () => {
    const params = new URLSearchParams(window.location.search)
    return {
        q: params.get('q') ?? DEFAULT_FILTERS.q,
        category: params.get('category') ?? DEFAULT_FILTERS.category,
        sort: params.get('sort') ?? DEFAULT_FILTERS.sort,
        order: params.get('order') ?? DEFAULT_FILTERS.order,
    }
}

export const useProductsStore = create((set) => ({
    // фильтры
    filters: getInitialFilters(),
    setFilter: (key, value) =>
        set((state) => ({ filters: { ...state.filters, [key]: value } })),
    setSort: (sort, order) =>
        set((state) => ({ filters: { ...state.filters, sort, order } })),
    resetFilters: () => set({ filters: DEFAULT_FILTERS }),

    // товар, который сейчас редактируется (null = модалка закрыта)
    editingProduct: null,
    openEdit: (product) => set({ editingProduct: product }),
    closeEdit: () => set({ editingProduct: null }),
}))
