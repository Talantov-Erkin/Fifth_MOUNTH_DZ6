import { Layout, Menu } from 'antd'
import { Link, Outlet, useLocation } from 'react-router-dom'
import styles from './App.module.scss'

const { Header, Content } = Layout

function App() {
  const { pathname } = useLocation()

  const items = [
    { key: '/', label: <Link to="/">Товары</Link> },
    { key: '/create', label: <Link to="/create">Добавить</Link> },
  ]

  return (
    <Layout className={styles.layout}>
      <Header>
        <Menu theme="dark" mode="horizontal" selectedKeys={[pathname]} items={items} />
      </Header>
      <Content className={styles.content}>
        <Outlet />
      </Content>
    </Layout>
  )
}

export default App
