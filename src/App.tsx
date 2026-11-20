import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { routes } from './lib/routes'
import Home from './pages/Home'
import About from './pages/About'
import Treatments from './pages/Treatments'
import Doctors from './pages/Doctors'
import Results from './pages/Results'
import Journal from './pages/Journal'
import Contact from './pages/Contact'
import Consultation from './pages/Consultation'
import { Layout } from './components/layout/Layout'
import { PlaceholderPage } from './components/shared/PlaceholderPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path={routes.home} element={<Home />} />
          <Route path={routes.about} element={<About />} />
          <Route path={routes.treatments} element={<Treatments />} />
          <Route path="/treatments/:category" element={<Treatments />} />
          <Route path="/treatments/:category/:treatment" element={<Treatments />} />
          <Route path={routes.doctors} element={<Doctors />} />
          <Route path="/doctors/:slug" element={<Doctors />} />
          <Route path={routes.results} element={<Results />} />
          <Route path={routes.journal} element={<Journal />} />
          <Route path={routes.contact} element={<Contact />} />
          <Route path={routes.consultation} element={<Consultation />} />
          <Route path="/admin/*" element={<PlaceholderPage title="Admin" phase="Booking system, needs Supabase" />} />
          <Route path="*" element={<PlaceholderPage title="Page not found" phase="404" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
