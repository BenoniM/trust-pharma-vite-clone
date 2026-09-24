import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Services from './pages/Services.jsx'
import Products from './pages/Products.jsx'
import ProductCategory from './pages/ProductCategory.jsx'
import ExtraProduct from './pages/ExtraProduct.jsx'
import Contact from './pages/Contact.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  return <Routes>
    <Route element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="about-us" element={<About />} />
      <Route path="services" element={<Services />} />
      <Route path="products" element={<Products />} />
      <Route path="products/:category" element={<ProductCategory />} />
      <Route path="products/suppository" element={<ExtraProduct />} />
      <Route path="products/shampoo-lotion" element={<ExtraProduct />} />
      <Route path="products/general-ointment-cream" element={<ExtraProduct />} />
      <Route path="contact-us" element={<Contact />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>
}
