import './App.css';
import { Route, Routes } from 'react-router-dom';
import Header from './sections/Header';
import Hero from './sections/Hero';
import About from './sections/About';
import HoursBanner from './sections/HoursBanner';
import Menu from './sections/Menu';
import PressAwards from './sections/PressAwards';
import Gallery from './sections/Gallery';
import OrderNow from './sections/OrderNow';
import Footer from './sections/Footer';
import ScrollToTop from './sections/ScrollToTop';
import Newsletter from './sections/Newsletter';
import Hiring from './pages/Hiring.tsx';

function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <About />
        <HoursBanner />
        <Menu />
        <PressAwards />
        <Gallery />
        <OrderNow />
        <Newsletter />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/hiring" element={<Hiring />} />
    </Routes>
  );
}

export default App;
