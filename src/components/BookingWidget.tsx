import { useMemo, useState, type ReactNode } from 'react';
import { Minus, Plus, MapPin, Waves, Droplets, Search, CheckCircle2, CreditCard, Plane, SquareParking, Fish, AlertTriangle, ChevronLeft } from 'lucide-react';
import { pricing, boatSchedule } from '@/data/resorts';
import type { BookingDetails } from '@/types';
import { useLang, type DictKey } from '@/lib/i18n';
import { useBooking, type TransferFrom } from '@/lib/booking';

interface Props { onBook: (details: BookingDetails) => void }

const STEPS: DictKey[] = ['book.step1', 'book.step2', 'book.step3'];

export default function BookingWidget({ onBook }: Props) {
  const { t } = useLang();
  const b = useBooking();
  const [showSuggestions, setShowSuggestions] = useState(false);
  const today = new Date().toISOString().slice(0, 10);

  const suggestions = useMemo(() => {
    const q = b.resortQuery.trim().toLowerCase();
    const list = b.resorts.filter((r) => r.island === b.island);
    if (!q) return list;
    return b.resorts.filter((r) => r.name.toLowerCase().includes(q) || r.beach.toLowerCase().includes(q) || r.island.toLowerCase().includes(q));
  }, [b.resortQuery, b.resorts, b.island]);

  const handleBook = () => {
    onBook({
      island: b.island,
      resortName: b.selectedResort?.name || b.resortQuery || 'Belum dipilih',
      landing: b.selectedResort?.landing || null,
      date: b.date || 'Belum dipilih',
      returnDate: b.returnDate || 'Belum dipilih',
      adults: b.adults, children: b.children, tripType: b.tripType, nationality: b.nationality,
      parkingType: b.parkingType, parkingDays: b.parkingDays, snorkeling: b.snorkeling,
      transferFrom: b.vanEnabled ? b.transferFrom : '', flightNumber: b.flightNumber,
    });
  };

  const go = (s: number) => {
    b.setStep(s);
    document.getElementById('booking-title')?.focus();
  };

  return (
    <section id="booking" className="scroll-mt-16 bg-offwhite px-4 py-14 sm:py-20" aria-labelledby="booking-title">
      <div className="mx-auto max-w-6xl">
        <h2 id="booking-title" tabIndex={-1} className="font-display text-2xl font-extrabold text-navy focus:outline-none sm:text-4xl">{t('book.title')}</h2>

        <ol className="mt-5 flex items-center gap-2" aria-label="Progress">
          {STEPS.map((k, i) => (
            <li key={k} className="flex flex-1 items-center gap-2">
              <button type="button" onClick={() => i < b.step && go(i)} disabled={i > b.step}
                aria-current={i === b.step ? 'step' : undefined}
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${i <= b.step ? 'bg-turq-700 text-white' : 'bg-line text-navy/70'}`}>
                {i < b.step ? <CheckCircle2 className="h-4 w-4" aria-hidden /> : i + 1}
              </button>
              <span className={`text-sm font-semibold ${i === b.step ? 'text-navy' : 'text-navy/70'}`}>{t(k)}</span>
              {i < 2 && <span className={`h-0.5 flex-1 rounded ${i < b.step ? 'bg-turq-700' : 'bg-line'}`} aria-hidden />}
            </li>
          ))}
        </ol>

        <div className="mt-6 grid gap-6 lg:grid-cols-12">
          <div className="rounded-3xl border border-line bg-white p-5 shadow-card sm:p-7 lg:col-span-8">
            {b.step === 0 && (
              <div className="space-y-6">
                <Field label={t('book.nationality')}>
                  <div className="grid grid-cols-2 gap-3" role="radiogroup" aria-label={t('book.nationality')}>
                    {(['local', 'foreign'] as const).map((n) => (
                      <Choice key={n} active={b.nationality === n} onClick={() => b.setNationality(n)}
                        title={t(n === 'local' ? 'book.local' : 'book.foreign')}
                        sub={`${t('routes.fees')}: RM${n === 'local' ? pricing.mdbFeeLocal + pricing.marineParkFeeLocal : pricing.mdbFeeForeign + pricing.marineParkFeeForeign}`} />
                    ))}
                  </div>
                </Field>
                <Field label={t('book.island')}>
                  <div className="grid grid-cols-2 gap-3" role="radiogroup" aria-label={t('book.island')}>
                    {(['Besar', 'Kecil'] as const).map((o) => (
                      <Choice key={o} active={b.island === o} title={`Perhentian ${o}`} sub={t(o === 'Besar' ? 'book.besarNote' : 'book.kecilNote')}
                        onClick={() => { b.setIsland(o); b.setSelectedResort(null); b.setResortQuery(''); }} />
                    ))}
                  </div>
                </Field>
                <div className="relative">
                  <label htmlFor="resort" className="label">{t('book.resort')}</label>
                  <div className="relative">
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-navy/50" aria-hidden />
                    <input id="resort" type="text" role="combobox" aria-expanded={showSuggestions} aria-controls="resort-list" autoComplete="off"
                      value={b.resortQuery}
                      onChange={(e) => { b.setResortQuery(e.target.value); setShowSuggestions(true); b.setSelectedResort(null); }}
                      onFocus={() => setShowSuggestions(true)}
                      onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                      placeholder={t('book.resortPh')} className="input pl-10" />
                  </div>
                  {showSuggestions && suggestions.length > 0 && (
                    <ul id="resort-list" role="listbox" className="no-scrollbar absolute z-30 mt-1 max-h-64 w-full overflow-y-auto rounded-xl border border-line bg-white shadow-card">
                      {suggestions.map((r) => (
                        <li key={r.name} role="option" aria-selected={b.selectedResort?.name === r.name}>
                          <button type="button" onClick={() => { b.selectResort(r); setShowSuggestions(false); }}
                            className="flex w-full items-center justify-between gap-2 border-b border-line px-4 py-3 text-left last:border-0 hover:bg-offwhite">
                            <span className="min-w-0">
                              <span className="block truncate text-sm font-semibold text-navy">{r.name}</span>
                              <span className="flex items-center gap-1 text-xs text-navy/70"><MapPin className="h-3 w-3" aria-hidden />{r.beach} • Perhentian {r.island}</span>
                            </span>
                            <LandingBadge wet={r.landing === 'wet'} label={t(r.landing === 'wet' ? 'book.wet' : 'book.dry')} />
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                  {b.selectedResort && (
                    <div className={`mt-3 flex items-start gap-3 rounded-xl p-4 ring-1 ${b.selectedResort.landing === 'wet' ? 'bg-turq-50 ring-turq-200' : 'bg-offwhite ring-line'}`}>
                      {b.selectedResort.landing === 'wet' ? <Droplets className="mt-0.5 h-5 w-5 text-turq-700" aria-hidden /> : <Waves className="mt-0.5 h-5 w-5 text-navy" aria-hidden />}
                      <p><span className="block text-sm font-bold text-navy">{t(b.selectedResort.landing === 'wet' ? 'book.wet' : 'book.dry')}</span>
                        <span className="text-xs text-navy/80">{b.selectedResort.landingNote}</span></p>
                    </div>
                  )}
                </div>
                <Field label={t('book.trip')}>
                  <div className="grid grid-cols-2 gap-3" role="radiogroup" aria-label={t('book.trip')}>
                    <Choice active={b.tripType === 'oneway'} onClick={() => b.setTripType('oneway')} title={t('routes.oneway')} sub={`RM${pricing.boatAdultOneway} / ${t('routes.adult')}`} />
                    <Choice active={b.tripType === 'return'} onClick={() => b.setTripType('return')} title={t('routes.return')} sub={`RM${pricing.boatAdultReturn} / ${t('routes.adult')}`} />
                  </div>
                </Field>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div><label htmlFor="depart" className="label">{t('book.depart')}</label>
                    <input id="depart" type="date" min={today} value={b.date} onChange={(e) => b.setDate(e.target.value)} className="input" /></div>
                  {b.tripType === 'return' && (
                    <div><label htmlFor="ret" className="label">{t('book.returnDate')}</label>
                      <input id="ret" type="date" min={b.date || today} value={b.returnDate} onChange={(e) => b.setReturnDate(e.target.value)} className="input" /></div>
                  )}
                </div>
                <Field label={t('book.time')}>
                  <div className="flex flex-wrap gap-2" role="radiogroup" aria-label={t('book.time')}>
                    {boatSchedule.map((s) => (
                      <button key={s.time} type="button" role="radio" aria-checked={b.selectedTime === s.time} disabled={!s.available}
                        onClick={() => b.setSelectedTime(s.time)} className={`chip ${b.selectedTime === s.time ? 'chip-active' : ''}`}>
                        <span className="font-bold">{s.time}</span>{!s.available && <span className="text-xs">{t('routes.full')}</span>}
                      </button>
                    ))}
                  </div>
                </Field>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Counter id="adults" label={t('book.adults')} sub={`RM${pricing.boatAdultOneway} / RM${pricing.boatAdultReturn}`} value={b.adults} onChange={b.setAdults} min={1} max={20} />
                  <Counter id="children" label={t('book.children')} sub={`RM${pricing.boatChildOneway} / RM${pricing.boatChildReturn}`} value={b.children} onChange={b.setChildren} min={0} max={20} />
                </div>
              </div>
            )}

            {b.step === 1 && (
              <div className="space-y-4">
                <AddOn icon={<Plane className="h-6 w-6" aria-hidden />} title={t('book.van')} on={b.vanEnabled} onToggle={() => b.setVanEnabled(!b.vanEnabled)}
                  sub={`KBR RM${pricing.vanKBR} • TGG RM${pricing.vanTGG} • ECRL RM${pricing.vanECRL}`}>
                  <div className="grid gap-2 sm:grid-cols-3" role="radiogroup" aria-label={t('book.vanFrom')}>
                    {([['KBR', 'Lapangan Terbang Kota Bharu', pricing.vanKBR, '~45 min'], ['TGG', 'Lapangan Terbang Kuala Terengganu', pricing.vanTGG, '~1 jam 30 min'], ['ECRL', 'Stesen ECRL Jerteh', pricing.vanECRL, '~20 min']] as const).map(([id, name, price, time]) => (
                      <Choice key={id} active={b.transferFrom === id} onClick={() => b.setTransferFrom(id as TransferFrom)} title={`${id} • RM${price}`} sub={`${name} • ${time}`} />
                    ))}
                  </div>
                  <label htmlFor="flight" className="label mt-4">{t('book.flight')}</label>
                  <input id="flight" type="text" value={b.flightNumber} onChange={(e) => b.setFlightNumber(e.target.value)} placeholder="AK6432" className="input" />
                  <p className="mt-3 flex items-start gap-2 rounded-xl bg-cta-50 p-3 text-xs text-navy"><AlertTriangle className="h-4 w-4 shrink-0 text-cta-700" aria-hidden />{t('book.cutoff')}</p>
                </AddOn>
                <AddOn icon={<SquareParking className="h-6 w-6" aria-hidden />} title={t('book.parking')} on={b.parkingType !== 'none'}
                  onToggle={() => b.setParkingType(b.parkingType === 'none' ? 'open' : 'none')}
                  sub={`${t('book.parkOpen')} RM${pricing.parkingOpen} • ${t('book.parkCovered')} RM${pricing.parkingCovered} ${t('book.perDay')}`}>
                  <div className="grid grid-cols-2 gap-2" role="radiogroup" aria-label={t('book.parking')}>
                    <Choice active={b.parkingType === 'open'} onClick={() => b.setParkingType('open')} title={t('book.parkOpen')} sub={`RM${pricing.parkingOpen} ${t('book.perDay')}`} />
                    <Choice active={b.parkingType === 'covered'} onClick={() => b.setParkingType('covered')} title={t('book.parkCovered')} sub={`RM${pricing.parkingCovered} ${t('book.perDay')}`} />
                  </div>
                  <p className="mt-3 text-xs text-navy/80">{b.tripType === 'return' && b.date && b.returnDate ? `${b.parkingDays} ${t('book.parkDays')}` : t('book.parkHint')}</p>
                </AddOn>
                <AddOn icon={<Fish className="h-6 w-6" aria-hidden />} title={t('book.snorkel')} on={b.snorkeling} onToggle={() => b.setSnorkeling(!b.snorkeling)}
                  sub={`RM${pricing.snorkelingPackage}${t('book.snorkelSub')}`} />
              </div>
            )}

            {b.step === 2 && (
              <div className="space-y-4">
                <dl className="grid gap-3 text-sm sm:grid-cols-2">
                  <Row k={t('hero.to')} v={`Perhentian ${b.island}${b.selectedResort ? ` — ${b.selectedResort.name}` : ''}`} />
                  <Row k={t('book.trip')} v={t(b.tripType === 'return' ? 'routes.return' : 'routes.oneway')} />
                  <Row k={t('book.depart')} v={b.date || t('sum.notSet')} />
                  {b.tripType === 'return' && <Row k={t('book.returnDate')} v={b.returnDate || t('sum.notSet')} />}
                  <Row k={t('book.time')} v={b.selectedTime || t('sum.notSet')} />
                  <Row k={t('hero.pax')} v={`${b.adults} ${t('book.adults')} + ${b.children} ${t('book.children')}`} />
                  <Row k={t('book.nationality')} v={t(b.nationality === 'local' ? 'book.local' : 'book.foreign')} />
                </dl>
                <div className="flex items-start gap-3 rounded-xl bg-cta-50 p-4 ring-1 ring-cta-200">
                  <CreditCard className="mt-0.5 h-5 w-5 shrink-0 text-cta-700" aria-hidden />
                  <p><span className="block text-sm font-bold text-navy">{t('book.cashTitle')}</span><span className="text-xs text-navy/80">{t('book.cashBody')}</span></p>
                </div>
              </div>
            )}

            <div className="mt-8 flex items-center justify-between gap-3">
              {b.step > 0 ? (
                <button type="button" onClick={() => go(b.step - 1)} className="btn-ghost"><ChevronLeft className="h-4 w-4" aria-hidden />{t('book.back')}</button>
              ) : <span />}
              {b.step < 2 ? (
                <button type="button" onClick={() => go(b.step + 1)} className="btn-cta">{t('book.next')}</button>
              ) : (
                <button type="button" onClick={handleBook} className="btn-cta">{t('book.confirm')}</button>
              )}
            </div>
          </div>

          <aside className="lg:col-span-4" aria-label={t('sum.title')}>
            <div className="rounded-3xl bg-navy p-6 text-white shadow-card lg:sticky lg:top-24">
              <h3 className="font-display text-lg font-bold">{t('sum.title')}</h3>
              <dl className="mt-4 space-y-2 text-sm" aria-live="polite">
                <SumRow k={`${t('sum.boat')} (${b.adults + b.children})`} v={b.boatCost} />
                <SumRow k={t('sum.mdb')} v={b.mdbCost} />
                <SumRow k={t('sum.marine')} v={b.marineParkCost} />
                {b.parkingCost > 0 && <SumRow k={`${t('sum.parking')} (${b.parkingDays})`} v={b.parkingCost} />}
                {b.snorkelingCost > 0 && <SumRow k={t('sum.snorkel')} v={b.snorkelingCost} />}
                {b.transferCost > 0 && <SumRow k={`${t('sum.van')} ${b.transferFrom}`} v={b.transferCost} />}
              </dl>
              <div className="mt-4 flex items-end justify-between border-t border-white/20 pt-4">
                <span className="text-sm text-white/80">{t('sum.total')}</span>
                <span className="font-display text-3xl font-extrabold text-cta-300">RM{b.total}</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return <fieldset><legend className="label">{label}</legend>{children}</fieldset>;
}

function Choice({ active, onClick, title, sub }: { active: boolean; onClick: () => void; title: string; sub?: string }) {
  return (
    <button type="button" role="radio" aria-checked={active} onClick={onClick}
      className={`rounded-xl border-2 p-3.5 text-left transition-colors ${active ? 'border-turq-700 bg-turq-50' : 'border-line bg-white hover:border-turq-300'}`}>
      <span className="flex items-center justify-between gap-2 text-sm font-bold text-navy">{title}{active && <CheckCircle2 className="h-4 w-4 shrink-0 text-turq-700" aria-hidden />}</span>
      {sub && <span className="mt-0.5 block text-xs text-navy/75">{sub}</span>}
    </button>
  );
}

function AddOn({ icon, title, sub, on, onToggle, children }: { icon: ReactNode; title: string; sub: string; on: boolean; onToggle: () => void; children?: ReactNode }) {
  return (
    <div className={`rounded-2xl border-2 p-4 transition-colors ${on ? 'border-turq-700 bg-turq-50/50' : 'border-line'}`}>
      <button type="button" role="switch" aria-checked={on} onClick={onToggle} className="flex w-full items-center gap-3 text-left">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-offwhite text-turq-700">{icon}</span>
        <span className="min-w-0 flex-1"><span className="block text-sm font-bold text-navy">{title}</span><span className="block text-xs text-navy/75">{sub}</span></span>
        <span className={`flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${on ? 'bg-turq-700' : 'bg-line'}`} aria-hidden>
          <span className={`h-5 w-5 rounded-full bg-white shadow transition-transform ${on ? 'translate-x-5' : 'translate-x-0.5'}`} />
        </span>
      </button>
      {on && children && <div className="mt-4">{children}</div>}
    </div>
  );
}

function LandingBadge({ wet, label }: { wet: boolean; label: string }) {
  return (
    <span className={`flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold ${wet ? 'bg-turq-50 text-turq-800' : 'bg-offwhite text-navy'}`}>
      {wet ? <Droplets className="h-3 w-3" aria-hidden /> : <Waves className="h-3 w-3" aria-hidden />}{label}
    </span>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return <div className="rounded-xl bg-offwhite p-3"><dt className="text-xs text-navy/70">{k}</dt><dd className="font-semibold text-navy">{v}</dd></div>;
}

function SumRow({ k, v }: { k: string; v: number }) {
  return <div className="flex justify-between gap-2"><dt className="text-white/80">{k}</dt><dd className="font-semibold">RM{v}</dd></div>;
}

function Counter({ id, label, sub, value, onChange, min, max }: { id: string; label: string; sub: string; value: number; onChange: (v: number) => void; min: number; max: number }) {
  const { t } = useLang();
  return (
    <div role="group" aria-labelledby={`${id}-l`}>
      <span id={`${id}-l`} className="label">{label}</span>
      <div className="flex items-center justify-between rounded-xl border-2 border-line bg-white p-2">
        <button type="button" onClick={() => onChange(Math.max(min, value - 1))} disabled={value <= min} aria-label={`${t('book.less')} ${label}`}
          className="flex h-11 w-11 items-center justify-center rounded-lg bg-offwhite text-navy disabled:opacity-40"><Minus className="h-5 w-5" aria-hidden /></button>
        <span className="text-center"><output className="block text-xl font-extrabold text-navy" aria-live="polite">{value}</output><span className="text-[11px] text-navy/70">{sub}</span></span>
        <button type="button" onClick={() => onChange(Math.min(max, value + 1))} disabled={value >= max} aria-label={`${t('book.more')} ${label}`}
          className="flex h-11 w-11 items-center justify-center rounded-lg bg-turq-700 text-white disabled:opacity-40"><Plus className="h-5 w-5" aria-hidden /></button>
      </div>
    </div>
  );
}
