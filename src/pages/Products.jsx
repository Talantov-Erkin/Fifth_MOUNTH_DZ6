import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { getProducts } from "../api/products"
import { useSearchParams } from "react-router-dom"


export default function ProductsPage() {

    const [searchParams, setSearchParams] = useSearchParams();

    const filters = {
        q: searchParams.get('q') ?? '',
        category: searchParams.get('category') ?? '',
        sort: searchParams.sort('sort') ?? 'price',
        order: searchParams.get('order') ?? 'asc'
    }

    const updateFiltesrs = (key, value) => {
        const next = new URLSearchParams(searchParams)
        value ? next.set(key, value) : next.delete(key);
        setSearchParams(next)
    }

    const { data = [], isLoading, isFetching, error } = useQuery({
        queryKey: ['products', filters], // параметры - часть ключа
        queryFn: () => getProducts(filters),
        placeholderData: keepPreviousData // не мигать пустым экраном
    })

    if (isLoading) return <p>Загрузка...</p>
    if (error) return <p>Ошибка: {error.message}</p>
    
    return ( 
            <div>
                <input
                    placeholder="Поиск"
                />

                <select value={filters.category} onChange={(e) => updateFiltesrs('category', e.target.value)}>
                    <option value=''>Все</option>
                    <option value='phones'>Телефоны</option>
                    <option value="laptops">Ноутбуки</option>
                    <option value='audio'>Аудио</option>
                </select>

                <select 
                    value={`${filters.sort}-${filters.order}`}
                    onChange={(e) => {
                        const [sort, order] = e.target.value.split('-');
                        const next = new URLSearchParams(searchParams)
                        next.set('sort', sort)
                        next.set('order', order)
                        setSearchParams(next)
                    }}
                >
                    <option value='price-asc'>Сначала дешевые</option>
                    <option value='price-desc'>Сначала дорогие</option>
                    <option value='price-rating'>По рейтингу</option>
                </select>

                {isFetching && <small>Обновляем...</small>}

                <ul>
                    {data.map((p) => (
                        <li key={p.id}>{p.title} - {p.price} {p.rating}</li>
                    ))}
                </ul>
            </div>
        )
}