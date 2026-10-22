import { useEffect, useRef } from 'react';
import {
  X,
  QrCode,
  MapPin,
  Navigation,
  CheckCircle2,
  Ship,
  Car,
  Footprints,
  Anchor,
  Ticket,
  Calendar,
  Users,
  Waves,
  Droplets,
  CreditCard,
  IdCard,
  SquareParking,
} from 'lucide-react';
import type { BookingDetails } from '@/types';
import { pricing } from '@/data/resorts';

interface Props {
  details: BookingDetails | null;
  onClose: () => void;
}

export default function ETicketModal({ details, onClose }: Props) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!details) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    dialogRef.current?.focus();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      previouslyFocused?.focus?.();
    };
  }, [details, onClose]);

  useEffect(() => {
    if (details) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [details]);

  if (!details) return null;

  const adultPrice = details.tripType === 'return' ? pricing.boatAdultReturn : pricing.boatAdultOneway;
  const childPrice = details.tripType === 'return' ? pricing.boatChildReturn : pricing.boatChildOneway;
  const boatCost = details.adults * adultPrice + details.children * childPrice;
  const parkingRate = details.parkingType === 'covered' ? pricing.parkingCovered : details.parkingType === 'open' ? pricing.parkingOpen : 0;
  const parkingCost = parkingRate * details.parkingDays;
  const mdbFee = details.nationality === 'local' ? pricing.mdbFeeLocal : pricing.mdbFeeForeign;
  const marineParkFee = details.nationality === 'local' ? pricing.marineParkFeeLocal : pricing.marineParkFeeForeign;
  const mdbCost = mdbFee * (details.adults + details.children);
  const marineParkCost = marineParkFee * (details.adults + details.children);
  const snorkelingCost = details.snorkeling ? pricing.snorkelingPackage * details.adults : 0;
  const total = boatCost + parkingCost + mdbCost + marineParkCost + snorkelingCost;

  const checklist = [
    { icon: <Car className="h-5 w-5" />, text: 'Parkir kenderaan di zon berpagar/berbumbung' },
    { icon: <Footprints className="h-5 w-5" />, text: 'Berjalan ke kaunter melapor (2 minit dari Drop-off Zone)' },
    { icon: <Ticket className="h-5 w-5" />, text: 'Tunjukkan e-tiket QR & MyKad/passport di kaunter' },
    { icon: <CreditCard className="h-5 w-5" />, text: 'Bayar Fi Taman Laut guna KAD (cashless — tiada tunai diterima)' },
    { icon: <Anchor className="h-5 w-5" />, text: `Bayar Fi Akses Jeti RM${mdbFee} (tunai/QR/kad diterima)` },
    { icon: <Ship className="h-5 w-5" />, text: 'Naik bot di dok utama jeti' },
    ...(details.landing ? [{ icon: <Waves className="h-5 w-5" />, text: details.landing === 'wet' ? 'Bersedia pendaratan basah di resort' : 'Turun di jeti resort (pendaratan kering)' }] : []),
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-primary-900/70 backdrop-blur-sm p-4 animate-fade-in">
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="E-Tiket Tempahan"
        tabIndex={-1}
        className="my-8 w-full max-w-lg rounded-2xl bg-white shadow-2xl animate-slide-up focus:outline-none"
      >
        {/* Header */}
        <div className="flex items-center justify-between rounded-t-2xl bg-primary-700 px-6 py-4 text-white">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-6 w-6 text-secondary-400" />
            <span className="text-lg font-bold">Tempahan Berjaya!</span>
          </div>
          <button onClick={onClose} className="rounded-lg p-1.5 hover:bg-primary-600 transition-colors" aria-label="Tutup">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          {/* Cashless Warning */}
          <div className="mb-4 flex items-start gap-3 rounded-xl bg-warning-500/10 p-3.5 ring-1 ring-warning-500/30">
            <CreditCard className="h-5 w-5 flex-shrink-0 text-warning-600 mt-0.5" />
            <div>
              <span className="block text-sm font-bold text-warning-700">Sediakan Kad Bank &amp; MyKad</span>
              <span className="block text-xs text-warning-600/90 mt-0.5">
                Kaunter Taman Laut 100% Cashless — wajib bayar guna Kad Debit/Kredit. Bawa kad bank fizikal &amp; MyKad/passport.
              </span>
            </div>
          </div>

          {/* E-Ticket */}
          <div className="rounded-xl border-2 border-dashed border-sand-300 p-5">
            <div className="flex items-center justify-between">
              <div>
                <span className="block text-xs font-semibold text-primary-400">E-TIKET DIGITAL</span>
                <span className="block text-lg font-extrabold text-primary-700">JetiKualaBesut</span>
              </div>
              <div className="flex h-20 w-20 flex-col items-center justify-center rounded-xl bg-primary-700 text-white">
                <QrCode className="h-12 w-12" />
                <span className="text-[8px] mt-0.5">JKR-2026</span>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <InfoRow icon={<MapPin className="h-4 w-4" />} label="Resort" value={details.resortName} />
              <InfoRow icon={<Calendar className="h-4 w-4" />} label="Tarikh Pergi" value={details.date} />
              {details.tripType === 'return' && (
                <InfoRow icon={<Calendar className="h-4 w-4" />} label="Tarikh Pulang" value={details.returnDate} />
              )}
              <InfoRow icon={<Users className="h-4 w-4" />} label="Penumpang" value={`${details.adults} dewasa, ${details.children} kanak-kanak`} />
              <InfoRow icon={<Ship className="h-4 w-4" />} label="Perjalanan" value={details.tripType === 'return' ? 'Pergi-Pulang' : 'Sehala'} />
              <InfoRow
                icon={<IdCard className="h-4 w-4" />}
                label="Kewarganegaraan"
                value={details.nationality === 'local' ? 'Warganegara (MyKad)' : 'Bukan Warganegara'}
              />
              {details.parkingType !== 'none' && (
                <InfoRow icon={<SquareParking className="h-4 w-4" />} label="Parking" value={`${details.parkingDays} hari (${details.parkingType === 'covered' ? 'Berpagar' : 'Terbuka'})`} />
              )}
              {details.flightNumber && (
                <InfoRow icon={<Ship className="h-4 w-4" />} label="Penerbangan" value={details.flightNumber.toUpperCase()} />
              )}
            </div>

            {details.landing && (
              <div className={`mt-3 flex items-center gap-2 rounded-lg p-3 text-xs ${
                details.landing === 'wet' ? 'bg-secondary-50 text-secondary-700' : 'bg-sand-100 text-primary-600'
              }`}>
                {details.landing === 'wet' ? <Droplets className="h-4 w-4" /> : <Waves className="h-4 w-4" />}
                <span className="font-semibold">Pendaratan {details.landing === 'wet' ? 'Basah' : 'Kering'} — {details.island === 'Kecil' && details.landing === 'wet' ? 'pakai selipar jeli' : 'jeti tetap resort'}</span>
              </div>
            )}

            <div className="mt-4 flex items-center justify-between border-t border-sand-200 pt-4">
              <span className="text-sm font-semibold text-primary-500">Jumlah Bayaran</span>
              <span className="text-2xl font-extrabold text-accent-500">RM{total}</span>
            </div>
          </div>

          {/* Separate Map Links */}
          {details.parkingType !== 'none' ? (
            <div className="mt-4 space-y-3">
              <div>
                <span className="block text-xs font-bold uppercase text-primary-400 mb-1.5">Pin 1: Zon Turun Bagasi &amp; Penumpang</span>
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Jeti+Kuala+Besut+Drop-off+Zone"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-xl bg-primary-50 py-2.5 text-xs font-bold text-primary-700 ring-1 ring-primary-100 transition-colors hover:bg-primary-100"
                  >
                    <Navigation className="h-4 w-4" />
                    Maps Drop-off
                  </a>
                  <a
                    href="https://www.waze.com/ul?ll=5.8333,102.5500&navigate=yes"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-xl bg-secondary-50 py-2.5 text-xs font-bold text-secondary-700 ring-1 ring-secondary-200 transition-colors hover:bg-secondary-100"
                  >
                    <MapPin className="h-4 w-4" />
                    Waze Drop-off
                  </a>
                </div>
              </div>
              <div>
                <span className="block text-xs font-bold uppercase text-primary-400 mb-1.5">Pin 2: Tapak Parking Kereta</span>
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Kuala+Besut+Parking+Kereta"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-xl bg-primary-50 py-2.5 text-xs font-bold text-primary-700 ring-1 ring-primary-100 transition-colors hover:bg-primary-100"
                  >
                    <Navigation className="h-4 w-4" />
                    Maps Parking
                  </a>
                  <a
                    href="https://www.waze.com/ul?ll=5.8340,102.5510&navigate=yes"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-xl bg-secondary-50 py-2.5 text-xs font-bold text-secondary-700 ring-1 ring-secondary-200 transition-colors hover:bg-secondary-100"
                  >
                    <MapPin className="h-4 w-4" />
                    Waze Parking
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-4 grid grid-cols-2 gap-3">
              <a
                href="https://www.google.com/maps/search/?api=1&query=Jeti+Kuala+Besut+Terengganu"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl bg-primary-50 py-3 text-sm font-bold text-primary-700 ring-1 ring-primary-100 transition-colors hover:bg-primary-100"
              >
                <Navigation className="h-4 w-4" />
                Google Maps
              </a>
              <a
                href="https://www.waze.com/ul?ll=5.8333,102.5500&navigate=yes"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl bg-secondary-50 py-3 text-sm font-bold text-secondary-700 ring-1 ring-secondary-200 transition-colors hover:bg-secondary-100"
              >
                <MapPin className="h-4 w-4" />
                Waze
              </a>
            </div>
          )}

          {/* Checklist */}
          <div className="mt-5">
            <h3 className="text-sm font-bold text-primary-700">Senarai Semak: Turun Kereta → Naik Bot</h3>
            <div className="mt-3 space-y-2">
              {checklist.map((step, i) => (
                <div key={i} className="flex items-center gap-3 rounded-lg bg-sand-50 p-3">
                  <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary-700 text-xs font-bold text-white">
                    {i + 1}
                  </span>
                  <span className="text-secondary-600">{step.icon}</span>
                  <span className="text-sm text-primary-600">{step.text}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={onClose}
            className="mt-6 w-full rounded-xl bg-primary-700 py-3.5 text-center text-sm font-bold text-white transition-colors hover:bg-primary-800"
          >
            Tutup
          </button>

          <p className="mt-3 text-center text-xs text-primary-400">
            Ini adalah wireframe prototaip — tiada pembayaran sebenar diproses.
          </p>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-2">
      <span className="text-primary-300 mt-0.5">{icon}</span>
      <div className="min-w-0">
        <span className="block text-[10px] font-semibold uppercase text-primary-400">{label}</span>
        <span className="block text-sm font-semibold text-primary-700 truncate">{value}</span>
      </div>
    </div>
  );
}
