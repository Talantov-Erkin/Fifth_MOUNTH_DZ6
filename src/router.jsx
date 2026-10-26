import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ProductsPage from "./pages/Products";
import { AddProductForm } from "./pages/AddProductForm";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />, // layout с меню и <Outlet />
        children: [
            { index: true, element: <ProductsPage /> },
            { path: 'create', element: <AddProductForm /> },
        ],
    },
])
