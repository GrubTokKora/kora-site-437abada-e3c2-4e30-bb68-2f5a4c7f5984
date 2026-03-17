import './App.css';
import Header from './sections/Header';
import Hero from './sections/Hero';
import About from './sections/About';
import HoursBanner from './sections/HoursBanner';
import PressAwards from './sections/PressAwards';
import Gallery from './sections/Gallery';
import OrderNow from './sections/OrderNow';
import Footer from './sections/Footer';
import ScrollToTop from './sections/ScrollToTop';

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <About />
        <HoursBanner />
        <PressAwards />
        <Gallery />
        <OrderNow />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}

export default App;
