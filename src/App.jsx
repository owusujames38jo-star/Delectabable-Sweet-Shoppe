import { Navigate, Route, Routes } from 'react-router-dom'
import { SiteLayout } from './components/layout/SiteLayout.jsx'
import { HomePage } from './pages/HomePage.jsx'
import { AboutPage } from './pages/AboutPage.jsx'
import { TravelBakerPage } from './pages/TravelBakerPage.jsx'
import { ShopPage } from './pages/ShopPage.jsx'
import { ProductPage } from './pages/ProductPage.jsx'
import { CartPage } from './pages/CartPage.jsx'
import { CheckoutPage } from './pages/CheckoutPage.jsx'
import { CheckoutSuccessPage } from './pages/CheckoutSuccessPage.jsx'
import { ContactPage } from './pages/ContactPage.jsx'
import { GalleryPage } from './pages/GalleryPage.jsx'
import { CustomOrdersPage } from './pages/CustomOrdersPage.jsx'
import { FAQPage } from './pages/FAQPage.jsx'
import { NotFoundPage } from './pages/NotFoundPage.jsx'
import { PrivacyPage } from './pages/PrivacyPage.jsx'
import { TermsPage } from './pages/TermsPage.jsx'
import { OrdersPage } from './pages/OrdersPage.jsx'

function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/travel-baker" element={<TravelBakerPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/shop/:slug" element={<ProductPage />} />
        <Route path="/custom-orders" element={<CustomOrdersPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/checkout/success" element={<CheckoutSuccessPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
