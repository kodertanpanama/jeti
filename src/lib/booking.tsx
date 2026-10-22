import { createContext, useContext, useState, type ReactNode } from 'react';
import { resorts, pricing } from '@/data/resorts';
import type { Nationality, Resort } from '@/types';

export type TransferFrom = 'KBR' | 'TGG' | 'ECRL';

function calcCalendarDays(departDate: string, returnDate: string): number {
  if (!departDate || !returnDate) return 1;
  const d1 = new Date(departDate);
  const d2 = new Date(returnDate);
  if (isNaN(d1.getTime()) || isNaN(d2.getTime())) return 1;
  const diff = Math.round((d2.getTime() - d1.getTime()) / 86400000);
  return Math.max(1, diff + 1);
}

function useBookingState() {
  const [step, setStep] = useState(0);
  const [resortQuery, setResortQuery] = useState('');
  const [selectedResort, setSelectedResort] = useState<Resort | null>(null);
  const [island, setIsland] = useState<'Besar' | 'Kecil'>('Besar');
  const [date, setDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [tripType, setTripType] = useState<'oneway' | 'return'>('oneway');
  const [nationality, setNationality] = useState<Nationality>('local');
  const [parkingType, setParkingType] = useState<'none' | 'open' | 'covered'>('none');
  const [snorkeling, setSnorkeling] = useState(false);
  const [vanEnabled, setVanEnabled] = useState(false);
  const [transferFrom, setTransferFrom] = useState<TransferFrom>('KBR');
  const [flightNumber, setFlightNumber] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  // Pricing logic preserved from the original BookingWidget.
  const parkingDays = tripType === 'return' && date && returnDate ? calcCalendarDays(date, returnDate) : 1;
  const mdbFee = nationality === 'local' ? pricing.mdbFeeLocal : pricing.mdbFeeForeign;
  const marineParkFee = nationality === 'local' ? pricing.marineParkFeeLocal : pricing.marineParkFeeForeign;
  const adultPrice = tripType === 'return' ? pricing.boatAdultReturn : pricing.boatAdultOneway;
  const childPrice = tripType === 'return' ? pricing.boatChildReturn : pricing.boatChildOneway;
  const boatCost = adults * adultPrice + children * childPrice;
  const parkingCost = parkingType === 'none' ? 0 : (parkingType === 'covered' ? pricing.parkingCovered : pricing.parkingOpen) * parkingDays;
  const mdbCost = mdbFee * (adults + children);
  const marineParkCost = marineParkFee * (adults + children);
  const snorkelingCost = snorkeling ? pricing.snorkelingPackage * adults : 0;
  const transferCost = vanEnabled
    ? transferFrom === 'KBR' ? pricing.vanKBR : transferFrom === 'TGG' ? pricing.vanTGG : pricing.vanECRL
    : 0;
  const total = boatCost + parkingCost + mdbCost + marineParkCost + snorkelingCost + transferCost;

  const selectResort = (r: Resort) => {
    setSelectedResort(r);
    setResortQuery(r.name);
    setIsland(r.island);
  };

  return {
    step, setStep, resortQuery, setResortQuery, selectedResort, setSelectedResort, selectResort, island, setIsland,
    date, setDate, returnDate, setReturnDate, adults, setAdults, children, setChildren, tripType, setTripType,
    nationality, setNationality, parkingType, setParkingType, snorkeling, setSnorkeling, vanEnabled, setVanEnabled,
    transferFrom, setTransferFrom, flightNumber, setFlightNumber, selectedTime, setSelectedTime,
    parkingDays, boatCost, parkingCost, mdbCost, marineParkCost, snorkelingCost, transferCost, total, resorts,
  };
}

type BookingCtx = ReturnType<typeof useBookingState>;
const Ctx = createContext<BookingCtx | null>(null);

export function BookingProvider({ children }: { children: ReactNode }) {
  const s = useBookingState();
  return <Ctx.Provider value={s}>{children}</Ctx.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useBooking() {
  const c = useContext(Ctx);
  if (!c) throw new Error('useBooking outside BookingProvider');
  return c;
}

// eslint-disable-next-line react-refresh/only-export-components
export function scrollToBooking() {
  document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
