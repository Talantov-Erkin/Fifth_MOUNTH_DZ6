import axios from "axios";

export const api = axios.create({ baseURL: 'http://localhost:3001' })

export const getProducts = async ({ q, category, sort, order }) => {
    const { data } = await api.get('/products', {
        params: {
            'title:contains': q || undefined,
            category: category || undefined,
            _sort: order === 'desc' ? `-${sort}` : sort
        }
    })
    return data;
}

export const createProduct = (product) => api.post('/products', product).then((r) => r.data)
export const replaceProduct = ({ id, ...product }) => api.put(`/products/${id}`, product).then((r) => r.data)
export const patchProduct = ({ id, ...changes }) => api.patch(`/products/${id}`, changes).then((r) => r.data)
export const deleteProduct = (id) => api.delete(`/products/${id}`).then((r) => r.data)
