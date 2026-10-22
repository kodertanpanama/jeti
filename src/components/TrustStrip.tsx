import { QrCode, Ship, ShieldCheck, CreditCard, BadgeCheck } from 'lucide-react';
import { useLang } from '@/lib/i18n';
import { boatSchedule } from '@/data/resorts';

export default function TrustStrip() {
  const { t } = useLang();
  const items = [
    { icon: QrCode, text: t('trust.qr') },
    { icon: Ship, text: `${boatSchedule.length} ${t('trust.boats')}` },
    { icon: ShieldCheck, text: t('trust.parking') },
    { icon: CreditCard, text: t('trust.cashless') },
    { icon: BadgeCheck, text: t('trust.licence') },
  ];
  return (
    <section aria-label="Trust" className="border-b border-line bg-white">
      <ul className="no-scrollbar mx-auto flex max-w-7xl gap-6 overflow-x-auto px-4 py-4 lg:justify-between">
        {items.map(({ icon: Icon, text }) => (
          <li key={text} className="flex shrink-0 items-center gap-2 text-sm font-semibold text-navy">
            <Icon className="h-5 w-5 text-turq-700" aria-hidden /> {text}
          </li>
        ))}
      </ul>
    </section>
  );
}
