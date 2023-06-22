import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Appbar from './app/appLayout/appbar/Appbar';

import Product from './app/pages/product/components/Product';
import Order from './app/pages/order/components/Order';
import OrderDetail from './app/pages/orderdetail/components/OrderDetail';
import AddProduct from './app/pages/orderdetail/components/AddProduct';
import Dashboard from './app/pages/dashboard/components/Dashboard';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/product' element={<Product />} />
        <Route path='/order' element={<Order />} />
        {/* <Route path='/orderdetail' element={<OrderDetail />} /> */}
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/order/addproduct' element={<AddProduct />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App;
