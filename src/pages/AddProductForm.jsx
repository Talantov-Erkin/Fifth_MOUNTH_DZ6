import { Button, Card, Form, Input, InputNumber, Select } from 'antd'
import { useCreateProduct } from '../hooks/useProducts'
import styles from './AddProductForm.module.scss'

export function AddProductForm() {
    const [form] = Form.useForm()
    const { mutate, isPending } = useCreateProduct()

    const handleFinish = (values) => {
        mutate(
            { ...values, rating: 0 },
            { onSuccess: () => form.resetFields() }
        )
    }

    return (
        <Card title="Новый товар" className={styles.card}>
            <Form
                form={form}
                layout="vertical"
                onFinish={handleFinish}
                initialValues={{ category: 'phones' }}
            >
                <Form.Item name="title" label="Название" rules={[{ required: true, message: 'Введите название' }]}>
                    <Input placeholder="Название" />
                </Form.Item>

                <Form.Item name="price" label="Цена" rules={[{ required: true, message: 'Введите цену' }]}>
                    <InputNumber min={0} placeholder="Цена" className={styles.fullWidth} />
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

                <Button type="primary" htmlType="submit" loading={isPending}>
                    {isPending ? 'Сохраняем...' : 'Добавить'}
                </Button>
            </Form>
        </Card>
    )
}
