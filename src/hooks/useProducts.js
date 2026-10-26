import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { message } from 'antd'
import {
    createProduct,
    deleteProduct,
    getProducts,
    patchProduct,
    replaceProduct,
} from '../api/products'

const PRODUCTS_KEY = ['products']

// GET -> useQuery
export const useProducts = (filters) =>
    useQuery({
        queryKey: [...PRODUCTS_KEY, filters], // параметры - часть ключа
        queryFn: () => getProducts(filters),
        placeholderData: keepPreviousData, // не мигать пустым экраном
    })

// общий хелпер для мутаций: после успеха обновляем список
const useProductMutation = (mutationFn, successText) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: PRODUCTS_KEY })
            message.success(successText)
        },
        onError: (error) => message.error(`Ошибка: ${error.message}`),
    })
}

// POST
export const useCreateProduct = () => useProductMutation(createProduct, 'Продукт создан')
// PUT (полная замена)
export const useReplaceProduct = () => useProductMutation(replaceProduct, 'Продукт заменён')
// PATCH (частичное обновление)
export const useUpdateProduct = () => useProductMutation(patchProduct, 'Продукт обновлён')
// DELETE
export const useDeleteProduct = () => useProductMutation(deleteProduct, 'Продукт удалён')
