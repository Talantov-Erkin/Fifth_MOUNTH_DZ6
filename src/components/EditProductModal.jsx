import { useEffect } from 'react'
import { Form, Input, InputNumber, Modal, Select } from 'antd'
import { useProductsStore } from '../store/productsStore'
import { useUpdateProduct } from '../hooks/useProducts'

export function EditProductModal() {
    const [form] = Form.useForm()

    // берём состояние прямо из стора, пропсы не нужны
    const product = useProductsStore((s) => s.editingProduct)
    const closeEdit = useProductsStore((s) => s.closeEdit)

    const { mutate, isPending } = useUpdateProduct()

    useEffect(() => {
        if (product) form.setFieldsValue(product)
    }, [product, form])

    const handleOk = async () => {
        const values = await form.validateFields()
        mutate({ id: product.id, ...values }, { onSuccess: closeEdit })
    }

    return (
        <Modal
            title="Редактирование товара"
            open={!!product}
            onOk={handleOk}
            onCancel={closeEdit}
            confirmLoading={isPending}
            okText="Сохранить"
            cancelText="Отмена"
            forceRender
        >
            <Form form={form} layout="vertical">
                <Form.Item name="title" label="Название" rules={[{ required: true, message: 'Введите название' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="price" label="Цена" rules={[{ required: true, message: 'Введите цену' }]}>
                    <InputNumber min={0} style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item name="category" label="Категория">
                    <Select
                        options={[
                            { value: 'phones', label: 'Телефоны' },
                            { value: 'laptops', label: 'Ноутбуки' },
                            { value: 'audio', label: 'Аудио' },
                        ]}
                    />
                </Form.Item>
                <Form.Item name="rating" label="Рейтинг">
                    <InputNumber min={0} max={5} step={0.1} style={{ width: '100%' }} />
                </Form.Item>
            </Form>
        </Modal>
    )
}
