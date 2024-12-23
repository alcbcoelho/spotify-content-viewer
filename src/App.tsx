import { BrowserRouter, Routes, Route } from 'react-router';

import Home from './pages/Home';
import Viewer from './pages/Viewer';

import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="viewer" element={<Viewer />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}
