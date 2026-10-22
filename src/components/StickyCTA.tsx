import { useEffect, useState } from 'react';
import { useLang } from '@/lib/i18n';
import { useBooking, scrollToBooking } from '@/lib/booking';

export default function StickyCTA() {
  const { t } = useLang();
  const { total } = useBooking();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hero = document.getElementById('hero-title');
    const booking = document.getElementById('booking');
    if (!hero || !booking) return;
    let heroVisible = true;
    let bookingVisible = false;
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.target === hero) heroVisible = e.isIntersecting;
        if (e.target === booking) bookingVisible = e.isIntersecting;
      }
      setShow(!heroVisible && !bookingVisible);
    });
    io.observe(hero);
    io.observe(booking);
    return () => io.disconnect();
  }, []);

  return (
    <div aria-hidden={!show}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 shadow-[0_-8px_24px_-12px_rgba(10,37,64,.25)] backdrop-blur transition-transform duration-300 lg:hidden ${show ? 'translate-y-0' : 'translate-y-full'}`}>
      <div className="mx-auto flex max-w-xl items-center justify-between gap-3">
        <div>
          <span className="block text-xs text-navy/70">{t('cta.from')}</span>
          <span className="font-display text-xl font-extrabold text-navy">RM{total}</span>
        </div>
        <button type="button" tabIndex={show ? 0 : -1} onClick={scrollToBooking} className="btn-cta px-8">{t('cta.book')}</button>
      </div>
    </div>
  );
}
