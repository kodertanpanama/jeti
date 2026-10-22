import { Ship, Calendar, Users, Search, ArrowRight } from 'lucide-react';
import { useLang } from '@/lib/i18n';
import { useBooking, scrollToBooking } from '@/lib/booking';
import { pricing } from '@/data/resorts';

export const HERO_IMG = 'https://images.pexels.com/photos/15923579/pexels-photo-15923579.jpeg?auto=compress&cs=tinysrgb&w=1280&fm=webp';

export default function Hero() {
  const { t } = useLang();
  const b = useBooking();
  const today = new Date().toISOString().slice(0, 10);

  return (
    <section className="relative isolate overflow-hidden bg-navy" aria-labelledby="hero-title">
      <img src={HERO_IMG} alt="" fetchPriority="high" decoding="async" width={1280} height={853}
        className="absolute inset-0 -z-10 h-full w-full object-cover" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-navy/80 via-navy/70 to-navy/95" />
      <div className="mx-auto max-w-7xl px-4 pb-10 pt-8 sm:pb-16 sm:pt-16 lg:grid lg:grid-cols-12 lg:items-center lg:gap-10 lg:py-24">
        <div className="lg:col-span-6">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white ring-1 ring-white/20">
            <Ship className="h-3.5 w-3.5" aria-hidden /> {t('hero.badge')}
          </p>
          <h1 id="hero-title" className="mt-4 font-display text-[2rem] font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
            {t('hero.title1')} <span className="text-turq-300">{t('hero.title2')}</span>
          </h1>
          <p className="mt-3 max-w-xl text-base text-white/85 sm:text-lg">{t('hero.sub')}</p>
        </div>

        <form
          className="mt-6 rounded-3xl bg-white p-4 shadow-card sm:p-6 lg:col-span-6 lg:mt-0"
          onSubmit={(e) => { e.preventDefault(); b.setStep(0); scrollToBooking(); }}
          aria-label={t('hero.search')}
        >
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-offwhite px-3 py-2">
              <span className="block text-[11px] font-semibold uppercase tracking-wide text-navy/70">{t('hero.from')}</span>
              <span className="block text-sm font-bold text-navy">Kuala Besut</span>
            </div>
            <div className="rounded-xl bg-offwhite px-3 py-2">
              <label htmlFor="hero-island" className="block text-[11px] font-semibold uppercase tracking-wide text-navy/70">{t('hero.to')}</label>
              <select id="hero-island" value={b.island}
                onChange={(e) => { b.setIsland(e.target.value as 'Besar' | 'Kecil'); b.setSelectedResort(null); b.setResortQuery(''); }}
                className="w-full bg-transparent text-sm font-bold text-navy focus:outline-none">
                <option value="Besar">Perhentian Besar</option>
                <option value="Kecil">Perhentian Kecil</option>
              </select>
            </div>
            <div className="rounded-xl bg-offwhite px-3 py-2">
              <label htmlFor="hero-date" className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wide text-navy/70">
                <Calendar className="h-3 w-3" aria-hidden />{t('hero.date')}</label>
              <input id="hero-date" type="date" min={today} value={b.date} onChange={(e) => b.setDate(e.target.value)}
                className="w-full bg-transparent text-sm font-bold text-navy focus:outline-none" />
            </div>
            <div className="rounded-xl bg-offwhite px-3 py-2">
              <label htmlFor="hero-pax" className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wide text-navy/70">
                <Users className="h-3 w-3" aria-hidden />{t('hero.pax')}</label>
              <select id="hero-pax" value={b.adults} onChange={(e) => b.setAdults(Number(e.target.value))}
                className="w-full bg-transparent text-sm font-bold text-navy focus:outline-none">
                {Array.from({ length: 20 }, (_, i) => i + 1).map((n) => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>
          </div>
          <button type="submit" className="btn-cta mt-4 w-full">
            <Search className="h-5 w-5" aria-hidden /> {t('hero.search')}
            <span className="ml-1 rounded-full bg-white/20 px-2 py-0.5 text-xs font-semibold">{t('hero.fromPrice')} RM{pricing.boatAdultOneway}</span>
          </button>
          <a href="#calculator" className="mt-3 flex items-center justify-center gap-1 text-sm font-semibold text-turq-700 hover:underline">
            {t('hero.budget').replace(' →', '')} <ArrowRight className="h-4 w-4" aria-hidden />
          </a>
        </form>
      </div>
    </section>
  );
}
