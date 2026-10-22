import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Anchor, Menu, X, Navigation, Languages } from 'lucide-react';
import { useLang, type DictKey } from '@/lib/i18n';

const navLinks: { key: DictKey; href: string }[] = [
  { key: 'nav.schedule', href: '/#schedule' },
  { key: 'nav.parking', href: '/#calculator' },
  { key: 'nav.guides', href: '/#guides' },
  { key: 'nav.facilities', href: '/#facilities' },
  { key: 'nav.faq', href: '/#faq' },
];

export default function Navbar() {
  const { t, lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const langBtn = (
    <button type="button" onClick={() => setLang(lang === 'ms' ? 'en' : 'ms')} aria-label={t('nav.lang')}
      className="flex items-center gap-1 rounded-lg px-2.5 py-2 text-sm font-bold text-white ring-1 ring-white/25 hover:bg-white/10">
      <Languages className="h-4 w-4" aria-hidden />{lang === 'ms' ? 'EN' : 'BM'}
    </button>
  );
  return (
    <header className="sticky top-0 z-40 bg-navy/95 shadow-soft backdrop-blur">
      <nav className="mx-auto max-w-7xl px-4" aria-label="Utama">
        <div className="flex h-16 items-center justify-between gap-2">
          <a href="/" className="flex items-center gap-2 text-white">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-turq-700"><Anchor className="h-6 w-6" aria-hidden /></span>
            <span className="leading-tight"><span className="block font-display text-lg font-extrabold tracking-tight">JetiKualaBesut</span>
              <span className="hidden text-[11px] font-medium text-turq-200 sm:block">{t('nav.tagline')}</span></span>
          </a>
          <div className="hidden items-center gap-1 lg:flex">
            <Link to="/panduan-perjalanan-ke-perhentian" className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-turq-200 hover:bg-white/10 hover:text-white">
              <Navigation className="h-4 w-4" aria-hidden />{t('nav.journey')}</Link>
            {navLinks.map((l) => (
              <a key={l.key} href={l.href} className="rounded-lg px-3 py-2 text-sm font-medium text-white/90 hover:bg-white/10 hover:text-white">{t(l.key)}</a>
            ))}
            {langBtn}
            <a href="/#booking" className="btn-cta ml-2 py-2.5 text-sm">{t('nav.cta')}</a>
          </div>
          <div className="flex items-center gap-1 lg:hidden">
            {langBtn}
            <button type="button" className="p-2 text-white" onClick={() => setOpen(!open)} aria-label={t('nav.menu')} aria-expanded={open} aria-controls="mobile-menu">
              {open ? <X className="h-6 w-6" aria-hidden /> : <Menu className="h-6 w-6" aria-hidden />}
            </button>
          </div>
        </div>
        {open && (
          <div id="mobile-menu" className="flex flex-col gap-1 pb-4 lg:hidden">
            <Link to="/panduan-perjalanan-ke-perhentian" onClick={() => setOpen(false)} className="flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold text-turq-200 hover:bg-white/10">
              <Navigation className="h-4 w-4" aria-hidden />{t('nav.journey')}</Link>
            {navLinks.map((l) => (
              <a key={l.key} href={l.href} onClick={() => setOpen(false)} className="rounded-lg px-4 py-3 text-sm font-medium text-white/90 hover:bg-white/10">{t(l.key)}</a>
            ))}
            <a href="/#booking" onClick={() => setOpen(false)} className="btn-cta mt-2">{t('nav.cta')}</a>
          </div>
        )}
      </nav>
    </header>
  );
}
