import { ChevronDown } from 'lucide-react';
import { useLang, type DictKey } from '@/lib/i18n';

const ITEMS = [1, 2, 3, 4, 5, 6] as const;

export default function FAQ() {
  const { t } = useLang();
  return (
    <section id="faq" className="mx-auto max-w-3xl scroll-mt-20 px-4 py-14 sm:py-20" aria-labelledby="faq-title">
      <h2 id="faq-title" className="font-display text-2xl font-extrabold text-navy sm:text-4xl">{t('faq.title')}</h2>
      <div className="mt-6 divide-y divide-line rounded-2xl border border-line bg-white">
        {ITEMS.map((n) => (
          <details key={n} className="group p-5 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-navy">
              {t(`faq.q${n}` as DictKey)}
              <ChevronDown className="h-5 w-5 shrink-0 text-turq-700 transition-transform group-open:rotate-180" aria-hidden />
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-navy/80">{t(`faq.a${n}` as DictKey)}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
