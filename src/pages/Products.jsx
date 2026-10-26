import { useEffect } from 'react'
import { Alert, Button, Input, Popconfirm, Select, Space, Table } from 'antd'
import { useSearchParams } from 'react-router-dom'
import { useProductsStore } from '../store/productsStore'
import { useDeleteProduct, useProducts } from '../hooks/useProducts'
import { EditProductModal } from '../components/EditProductModal'
import styles from './Products.module.scss'

const CATEGORIES = [
    { value: '', label: 'Все' },
    { value: 'phones', label: 'Телефоны' },
    { value: 'laptops', label: 'Ноутбуки' },
    { value: 'audio', label: 'Аудио' },
]

const SORTS = [
    { value: 'price-asc', label: 'Сначала дешевые' },
    { value: 'price-desc', label: 'Сначала дорогие' },
    { value: 'rating-desc', label: 'По рейтингу' },
]

export default function ProductsPage() {
    const filters = useProductsStore((s) => s.filters)
    const setFilter = useProductsStore((s) => s.setFilter)
    const setSort = useProductsStore((s) => s.setSort)
    const resetFilters = useProductsStore((s) => s.resetFilters)
    const openEdit = useProductsStore((s) => s.openEdit)

    const [, setSearchParams] = useSearchParams()

    // фильтры из стора -> в URL
    useEffect(() => {
        const next = new URLSearchParams()
        Object.entries(filters).forEach(([key, value]) => value && next.set(key, value))
        setSearchParams(next, { replace: true })
    }, [filters, setSearchParams])

    const { data = [], isLoading, isFetching, error } = useProducts(filters)
    const { mutate: removeProduct, isPending: isDeleting } = useDeleteProduct()

    const columns = [
        { title: 'Название', dataIndex: 'title' },
        { title: 'Категория', dataIndex: 'category' },
        { title: 'Цена', dataIndex: 'price' },
        { title: 'Рейтинг', dataIndex: 'rating' },
        {
            title: 'Действия',
            render: (_, product) => (
                <Space>
                    <Button size="small" onClick={() => openEdit(product)}>Изменить</Button>
                    <Popconfirm title="Удалить товар?" onConfirm={() => removeProduct(product.id)}>
                        <Button size="small" danger loading={isDeleting}>Удалить</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ]

    if (error) return <Alert type="error" message={`Ошибка: ${error.message}`} />

    return (
        <div className={styles.page}>
            <div className={styles.filters}>
                <Input.Search
                    key={filters.q} // сбрасывает поле при resetFilters
                    className={styles.search}
                    placeholder="Поиск"
                    defaultValue={filters.q}
                    allowClear
                    onSearch={(value) => setFilter('q', value)}
                />

                <Select
                    className={styles.select}
                    value={filters.category}
                    options={CATEGORIES}
                    onChange={(value) => setFilter('category', value)}
                />

                <Select
                    className={styles.select}
                    value={`${filters.sort}-${filters.order}`}
                    options={SORTS}
                    onChange={(value) => {
                        const [sort, order] = value.split('-')
                        setSort(sort, order)
                    }}
                />

                <Button onClick={resetFilters}>Сбросить</Button>
                {isFetching && <small>Обновляем...</small>}
            </div>

            <Table
                rowKey="id"
                columns={columns}
                dataSource={data}
                loading={isLoading}
                pagination={{ pageSize: 10 }}
            />

            <EditProductModal />
        </div>
    )
}
