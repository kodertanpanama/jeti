import { Link } from 'react-router-dom';
import { Anchor, Phone, Mail, MapPin } from 'lucide-react';
import { useLang } from '@/lib/i18n';

export default function Footer() {
  const { t } = useLang();
  const col = 'text-sm font-bold uppercase tracking-wider text-turq-300';
  const a = 'text-white/85 hover:text-white hover:underline';
  return (
    <footer className="bg-navy pb-24 text-white lg:pb-0">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="flex items-center gap-2 font-display text-lg font-extrabold">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-turq-700"><Anchor className="h-6 w-6" aria-hidden /></span>JetiKualaBesut
          </p>
          <p className="mt-4 text-sm leading-relaxed text-white/80">{t('foot.about')}</p>
        </div>
        <nav aria-label={t('foot.tickets')}>
          <h2 className={col}>{t('foot.tickets')}</h2>
          <ul className="mt-4 space-y-2 text-sm">
            <li><a className={a} href="/#booking">{t('foot.boat')}</a></li>
            <li><a className={a} href="/#schedule">{t('nav.schedule')}</a></li>
            <li><a className={a} href="/#booking">{t('foot.van')}</a></li>
            <li><a className={a} href="/#calculator">{t('foot.park')}</a></li>
          </ul>
        </nav>
        <nav aria-label={t('foot.guides')}>
          <h2 className={col}>{t('foot.guides')}</h2>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link className={a} to="/panduan-perjalanan-ke-perhentian">{t('nav.journey')}</Link></li>
            <li><a className={a} href="/#guides">{t('foot.landing')}</a></li>
            <li><a className={a} href="/#facilities">{t('nav.facilities')}</a></li>
            <li><a className={a} href="/#faq">{t('nav.faq')}</a></li>
          </ul>
        </nav>
        <div>
          <h2 className={col}>{t('foot.contact')}</h2>
          <ul className="mt-4 space-y-3 text-sm text-white/85">
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-turq-300" aria-hidden /><a className={a} href="tel:+60195584736">+60 19-558 4736</a></li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-turq-300" aria-hidden /><a className={a} href="mailto:info@jetikualabesut.my">info@jetikualabesut.my</a></li>
            <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 text-turq-300" aria-hidden />
              <span>Jeti Kuala Besut, 22300 Kuala Besut, Terengganu<br />
                <a className="font-semibold text-turq-300 hover:underline" target="_blank" rel="noopener noreferrer"
                  href="https://www.google.com/maps/search/?api=1&query=Jeti+Kuala+Besut">{t('foot.map')}</a></span></li>
          </ul>
        </div>
      </div>
      <p className="border-t border-white/10 px-4 py-6 text-center text-xs text-white/70">&copy; 2026 JetiKualaBesut. {t('foot.copy')}</p>
    </footer>
  );
}
