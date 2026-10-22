import { lazy, Suspense, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import JettyStatusBar from '@/components/JettyStatusBar';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import TrustStrip from '@/components/TrustStrip';
import RoutePrices from '@/components/RoutePrices';
import BookingWidget from '@/components/BookingWidget';
import BudgetCalculator from '@/components/BudgetCalculator';
import GuideLinks from '@/components/GuideLinks';
import ArrivalGuide from '@/components/ArrivalGuide';
import FacilitiesDirectory from '@/components/FacilitiesDirectory';
import { Testimonials } from '@/components/TestimonialsGallery';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import StickyCTA from '@/components/StickyCTA';
import ETicketModal from '@/components/ETicketModal';
import { LangProvider, useLang } from '@/lib/i18n';
import { BookingProvider } from '@/lib/booking';
import type { BookingDetails } from '@/types';

const JourneyPage = lazy(() => import('@/components/JourneyPage'));
const Gallery = lazy(() => import('@/components/Gallery'));

function Shell({ children }: { children: React.ReactNode }) {
  const { t } = useLang();
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-2 focus:top-2 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-navy">{t('main.skip')}</a>
      <JettyStatusBar />
      <Navbar />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}

function Home() {
  const [ticketDetails, setTicketDetails] = useState<BookingDetails | null>(null);
  return (
    <BookingProvider>
      <Shell>
        <Hero />
        <TrustStrip />
        <RoutePrices />
        <BookingWidget onBook={setTicketDetails} />
        <BudgetCalculator />
        <ArrivalGuide />
        <GuideLinks />
        <FacilitiesDirectory />
        <Testimonials />
        <Suspense fallback={<div className="h-64" />}><Gallery /></Suspense>
        <FAQ />
      </Shell>
      <StickyCTA />
      <ETicketModal details={ticketDetails} onClose={() => setTicketDetails(null)} />
    </BookingProvider>
  );
}

export default function App() {
  return (
    <LangProvider>
      <div className="min-h-screen bg-offwhite">
        <Routes>
          <Route path="/panduan-perjalanan-ke-perhentian" element={
            <Shell><Suspense fallback={<div className="min-h-screen" />}><JourneyPage /></Suspense></Shell>
          } />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </LangProvider>
  );
}
