import { Clock } from 'lucide-react';
import { useLang } from '@/lib/i18n';
import { useBooking, scrollToBooking } from '@/lib/booking';
import { pricing, boatSchedule } from '@/data/resorts';

export default function RoutePrices() {
  const { t } = useLang();
  const b = useBooking();
  const routes = [
    { island: 'Besar' as const, note: t('book.besarNote') },
    { island: 'Kecil' as const, note: t('book.kecilNote') },
  ];
  return (
    <section id="schedule" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-14 sm:py-20" aria-labelledby="routes-title">
      <h2 id="routes-title" className="font-display text-2xl font-extrabold text-navy sm:text-4xl">{t('routes.title')}</h2>
      <p className="mt-2 text-navy/75">{t('routes.sub')}</p>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {routes.map((r) => (
          <article key={r.island} className="flex flex-col rounded-2xl border border-line bg-white p-5 shadow-soft">
            <p className="text-xs font-semibold uppercase tracking-wide text-turq-700">Kuala Besut →</p>
            <h3 className="mt-1 font-display text-xl font-bold text-navy">Perhentian {r.island}</h3>
            <p className="text-sm text-navy/70">{r.note}</p>
            <dl className="mt-4 grid grid-cols-2 gap-2 text-sm">
              <div className="rounded-xl bg-offwhite p-3"><dt className="text-navy/70">{t('routes.oneway')}</dt>
                <dd className="font-display text-2xl font-extrabold text-cta-700">RM{pricing.boatAdultOneway}</dd></div>
              <div className="rounded-xl bg-offwhite p-3"><dt className="text-navy/70">{t('routes.return')}</dt>
                <dd className="font-display text-2xl font-extrabold text-cta-700">RM{pricing.boatAdultReturn}</dd></div>
            </dl>
            <p className="mt-2 text-xs text-navy/70">{t('routes.child')}: RM{pricing.boatChildOneway} / RM{pricing.boatChildReturn}</p>
            <button type="button" className="btn-secondary mt-4"
              onClick={() => { b.setIsland(r.island); b.setSelectedResort(null); b.setResortQuery(''); b.setStep(0); scrollToBooking(); }}>
              {t('routes.choose')}
            </button>
          </article>
        ))}
        <article className="rounded-2xl bg-navy p-5 text-white shadow-soft">
          <h3 className="font-display text-lg font-bold">{t('routes.fees')}</h3>
          <dl className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between border-b border-white/15 pb-2"><dt>{t('routes.local')}</dt>
              <dd className="font-bold">RM{pricing.mdbFeeLocal + pricing.marineParkFeeLocal}</dd></div>
            <div className="flex justify-between"><dt>{t('routes.foreign')}</dt>
              <dd className="font-bold">RM{pricing.mdbFeeForeign + pricing.marineParkFeeForeign}</dd></div>
          </dl>
          <p className="mt-4 text-xs text-white/80">{t('book.cashBody')}</p>
        </article>
      </div>

      <h3 className="mt-10 flex items-center gap-2 font-display text-lg font-bold text-navy"><Clock className="h-5 w-5 text-turq-700" aria-hidden />{t('routes.slots')}</h3>
      <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto pb-1" role="group" aria-label={t('routes.slots')}>
        {boatSchedule.map((s) => {
          const active = b.selectedTime === s.time;
          return (
            <button key={s.time} type="button" disabled={!s.available} aria-pressed={active}
              onClick={() => { b.setSelectedTime(s.time); scrollToBooking(); }}
              className={`chip ${active ? 'chip-active' : ''}`}>
              <span className="font-bold">{s.time}</span>
              <span className="text-xs opacity-80">{s.available ? s.label : t('routes.full')}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
