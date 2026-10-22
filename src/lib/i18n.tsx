import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

export type Lang = 'ms' | 'en';

const dict = {
  ms: {
    'nav.book': 'Tempah', 'nav.schedule': 'Jadual & Harga', 'nav.parking': 'Panduan Parking', 'nav.guides': 'Cara ke Jeti',
    'nav.facilities': 'Kemudahan', 'nav.faq': 'Soalan Lazim', 'nav.journey': 'Panduan Perjalanan', 'nav.cta': 'Tempah Sekarang',
    'nav.menu': 'Buka/tutup menu', 'nav.lang': 'Tukar bahasa ke English', 'nav.tagline': 'Hab Sehenti Pulau Perhentian',
    'hero.badge': 'Hab Komuniti & Logistik Jeti Kuala Besut',
    'hero.title1': 'Tiket Bot Laju ke', 'hero.title2': 'Pulau Perhentian',
    'hero.sub': 'Tiket bot, parking, van lapangan terbang & panduan jeti — semua di satu tempat.',
    'hero.from': 'Dari', 'hero.to': 'Ke', 'hero.date': 'Tarikh pergi', 'hero.pax': 'Penumpang', 'hero.search': 'Cari Tiket',
    'hero.budget': 'atau kira bajet perjalanan →', 'hero.fromPrice': 'Dari',
    'trust.qr': 'E-Tiket QR segera', 'trust.boats': 'bot sehari', 'trust.parking': 'Parking berpagar & berbumbung',
    'trust.cashless': 'Kaunter taman laut 100% cashless', 'trust.licence': '[Sahkan: lesen / pengendali bot]',
    'routes.title': 'Laluan, Harga & Jadual', 'routes.sub': 'Harga tiket bot per orang. Fi jeti & taman laut dibayar berasingan.',
    'routes.oneway': 'Sehala', 'routes.return': 'Pergi-Pulang', 'routes.adult': 'Dewasa', 'routes.child': 'Kanak-kanak (3-12)',
    'routes.choose': 'Pilih laluan ini', 'routes.slots': 'Waktu bertolak dari Kuala Besut', 'routes.full': 'Penuh',
    'routes.fees': 'Fi Jeti + Taman Laut', 'routes.local': 'Warganegara', 'routes.foreign': 'Bukan warganegara',
    'book.title': 'Tempah Perjalanan Anda', 'book.step1': 'Perjalanan', 'book.step2': 'Tambahan', 'book.step3': 'Semak',
    'book.next': 'Seterusnya', 'book.back': 'Kembali', 'book.confirm': 'Tempah & Jana E-Tiket',
    'book.nationality': 'Kewarganegaraan', 'book.local': 'Warganegara (MyKad)', 'book.foreign': 'Bukan Warganegara',
    'book.island': 'Pilih Pulau', 'book.besarNote': 'Resort mewah, jeti tetap', 'book.kecilNote': 'Backpacker, pendaratan basah',
    'book.resort': 'Nama resort (panduan pendaratan automatik)', 'book.resortPh': 'Taip nama resort, cth: Bubu Long Beach…',
    'book.trip': 'Jenis perjalanan', 'book.depart': 'Tarikh pergi', 'book.returnDate': 'Tarikh pulang', 'book.time': 'Waktu bot',
    'book.adults': 'Dewasa', 'book.children': 'Kanak-kanak (3-12 tahun)', 'book.less': 'Kurangkan', 'book.more': 'Tambah',
    'book.wet': 'Pendaratan Basah', 'book.dry': 'Pendaratan Kering',
    'book.van': 'Van Lapangan Terbang / ECRL', 'book.vanFrom': 'Ambil dari', 'book.flight': 'Nombor penerbangan (pilihan)',
    'book.cutoff': 'Ketibaan flight paling lewat di KBR untuk bot hari yang sama: sebelum 3:00 petang.',
    'book.parking': 'Parking Kereta', 'book.parkNone': 'Tiada', 'book.parkOpen': 'Terbuka', 'book.parkCovered': 'Berpagar & Berbumbung',
    'book.perDay': '/ hari', 'book.parkDays': 'hari kalendar',
    'book.parkHint': 'Dikira mengikut tarikh kalendar. Pilih pergi-pulang + tarikh untuk auto-kira.',
    'book.snorkel': 'Pakej Snorkeling', 'book.snorkelSub': '/orang dewasa • 3 spot snorkeling',
    'book.cashTitle': 'Sediakan Kad Bank & MyKad',
    'book.cashBody': 'Kaunter Taman Laut di Jeti Kuala Besut 100% cashless — bayar guna kad debit/kredit. Tunai tidak diterima.',
    'sum.title': 'Ringkasan Harga', 'sum.boat': 'Tiket bot', 'sum.mdb': 'Fi Akses Jeti (MDB)', 'sum.marine': 'Fi Taman Laut',
    'sum.parking': 'Parking', 'sum.snorkel': 'Snorkeling', 'sum.van': 'Van', 'sum.total': 'Jumlah anggaran',
    'sum.notSet': 'Belum dipilih',
    'cta.from': 'Jumlah anggaran', 'cta.book': 'Tempah',
    'faq.title': 'Soalan Lazim',
    'faq.q1': 'Boleh bayar tunai di jeti?', 'faq.a1': 'Kaunter Taman Laut di Jeti Kuala Besut 100% cashless — wajib bayar guna kad debit/kredit. Sediakan juga MyKad.',
    'faq.q2': 'Apa beza pendaratan basah dan kering?', 'faq.a2': 'Sesetengah resort (terutamanya Long Beach & Coral Bay, Perhentian Kecil) tiada jeti — bot berhenti berhampiran pantai dan anda turun dalam air setakat lutut. Taip nama resort dalam borang tempahan untuk semakan automatik.',
    'faq.q3': 'Bagaimana parking dikira?', 'faq.a3': 'Mengikut tarikh kalendar, bukan 24 jam. Cth: masuk Jumaat, keluar Ahad = 3 hari.',
    'faq.q4': 'Flight saya mendarat lewat, sempat naik bot?', 'faq.a4': 'Ketibaan flight paling lewat di KBR untuk bot hari yang sama ialah sebelum 3:00 petang. Jika mendarat waktu malam, bermalam di Kuala Besut.',
    'faq.q5': 'Apa polisi refund / pembatalan?', 'faq.a5': '[Sahkan: polisi refund & pembatalan]',
    'faq.q6': 'Apa berlaku jika cuaca buruk / laut bergelora?', 'faq.a6': '[Sahkan: polisi pembatalan cuaca]',
    'foot.about': 'Hab komuniti & logistik jeti Kuala Besut — tiket bot laju, parking, van lapangan terbang & panduan ke Pulau Perhentian.',
    'foot.tickets': 'Tiket', 'foot.guides': 'Panduan', 'foot.contact': 'Hubungi Kami', 'foot.boat': 'Tiket Bot Laju',
    'foot.van': 'Van KBR / ECRL', 'foot.park': 'Parking', 'foot.landing': 'Panduan Pendaratan Resort',
    'foot.map': 'Buka di Google Maps', 'foot.copy': 'Dibina untuk komuniti jeti Kuala Besut & pelancong Pulau Perhentian.',
    'main.skip': 'Langkau ke kandungan',
  },
  en: {
    'nav.book': 'Book', 'nav.schedule': 'Schedule & Fares', 'nav.parking': 'Parking Guide', 'nav.guides': 'Getting Here',
    'nav.facilities': 'Facilities', 'nav.faq': 'FAQ', 'nav.journey': 'Travel Guide', 'nav.cta': 'Book Now',
    'nav.menu': 'Toggle menu', 'nav.lang': 'Tukar bahasa ke Bahasa Melayu', 'nav.tagline': 'Perhentian Islands One-Stop Hub',
    'hero.badge': 'Kuala Besut Jetty Community & Logistics Hub',
    'hero.title1': 'Speedboat Tickets to', 'hero.title2': 'Perhentian Islands',
    'hero.sub': 'Boat tickets, parking, airport vans & jetty guide — all in one place.',
    'hero.from': 'From', 'hero.to': 'To', 'hero.date': 'Departure date', 'hero.pax': 'Passengers', 'hero.search': 'Find Tickets',
    'hero.budget': 'or estimate your trip budget →', 'hero.fromPrice': 'From',
    'trust.qr': 'Instant QR e-ticket', 'trust.boats': 'boats daily', 'trust.parking': 'Fenced & covered parking',
    'trust.cashless': 'Marine park counter is 100% cashless', 'trust.licence': '[Confirm: licence / boat operator]',
    'routes.title': 'Routes, Fares & Schedule', 'routes.sub': 'Boat fare per person. Jetty & marine park fees are paid separately.',
    'routes.oneway': 'One-way', 'routes.return': 'Return', 'routes.adult': 'Adult', 'routes.child': 'Child (3-12)',
    'routes.choose': 'Choose this route', 'routes.slots': 'Departures from Kuala Besut', 'routes.full': 'Full',
    'routes.fees': 'Jetty + Marine Park fees', 'routes.local': 'Malaysian', 'routes.foreign': 'Non-Malaysian',
    'book.title': 'Book Your Trip', 'book.step1': 'Trip', 'book.step2': 'Add-ons', 'book.step3': 'Review',
    'book.next': 'Continue', 'book.back': 'Back', 'book.confirm': 'Book & Generate E-Ticket',
    'book.nationality': 'Nationality', 'book.local': 'Malaysian (MyKad)', 'book.foreign': 'Non-Malaysian',
    'book.island': 'Choose island', 'book.besarNote': 'Resorts, fixed jetties', 'book.kecilNote': 'Backpacker, wet landings',
    'book.resort': 'Resort name (automatic landing guide)', 'book.resortPh': 'Type a resort, e.g. Bubu Long Beach…',
    'book.trip': 'Trip type', 'book.depart': 'Departure date', 'book.returnDate': 'Return date', 'book.time': 'Boat time',
    'book.adults': 'Adults', 'book.children': 'Children (3-12 yrs)', 'book.less': 'Decrease', 'book.more': 'Increase',
    'book.wet': 'Wet Landing', 'book.dry': 'Dry Landing',
    'book.van': 'Airport / ECRL Van', 'book.vanFrom': 'Pick-up from', 'book.flight': 'Flight number (optional)',
    'book.cutoff': 'Latest flight arrival at KBR for a same-day boat: before 3:00 pm.',
    'book.parking': 'Car Parking', 'book.parkNone': 'None', 'book.parkOpen': 'Open-air', 'book.parkCovered': 'Fenced & Covered',
    'book.perDay': '/ day', 'book.parkDays': 'calendar days',
    'book.parkHint': 'Charged per calendar date. Pick return trip + dates to auto-calculate.',
    'book.snorkel': 'Snorkelling Package', 'book.snorkelSub': '/adult • 3 snorkel spots',
    'book.cashTitle': 'Bring a bank card & ID',
    'book.cashBody': 'The Marine Park counter at Kuala Besut jetty is 100% cashless — debit/credit card only. Cash is not accepted.',
    'sum.title': 'Price Summary', 'sum.boat': 'Boat tickets', 'sum.mdb': 'Jetty access fee (MDB)', 'sum.marine': 'Marine park fee',
    'sum.parking': 'Parking', 'sum.snorkel': 'Snorkelling', 'sum.van': 'Van', 'sum.total': 'Estimated total',
    'sum.notSet': 'Not selected',
    'cta.from': 'Estimated total', 'cta.book': 'Book',
    'faq.title': 'Frequently Asked Questions',
    'faq.q1': 'Can I pay cash at the jetty?', 'faq.a1': 'The Marine Park counter at Kuala Besut jetty is 100% cashless — pay by debit/credit card. Bring your ID/passport too.',
    'faq.q2': 'What is a wet vs dry landing?', 'faq.a2': 'Some resorts (mainly Long Beach & Coral Bay, Perhentian Kecil) have no jetty — the boat stops near the beach and you step into knee-deep water. Type your resort in the booking form for an automatic check.',
    'faq.q3': 'How is parking charged?', 'faq.a3': 'Per calendar date, not per 24 hours. E.g. in Friday, out Sunday = 3 days.',
    'faq.q4': 'My flight lands late — can I still catch a boat?', 'faq.a4': 'For a same-day boat, your flight should land at KBR before 3:00 pm. If you land at night, stay overnight in Kuala Besut.',
    'faq.q5': 'What is the refund / cancellation policy?', 'faq.a5': '[Confirm: refund & cancellation policy]',
    'faq.q6': 'What happens in bad weather / rough seas?', 'faq.a6': '[Confirm: weather cancellation policy]',
    'foot.about': 'Kuala Besut jetty community & logistics hub — speedboat tickets, parking, airport vans & Perhentian guides.',
    'foot.tickets': 'Tickets', 'foot.guides': 'Guides', 'foot.contact': 'Contact', 'foot.boat': 'Speedboat Tickets',
    'foot.van': 'KBR / ECRL Van', 'foot.park': 'Parking', 'foot.landing': 'Resort Landing Guide',
    'foot.map': 'Open in Google Maps', 'foot.copy': 'Built for the Kuala Besut jetty community & Perhentian travellers.',
    'main.skip': 'Skip to content',
  },
} as const;

export type DictKey = keyof typeof dict.ms;

interface Ctx { lang: Lang; setLang: (l: Lang) => void; t: (k: DictKey) => string }
const LangContext = createContext<Ctx | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => (typeof localStorage !== 'undefined' && localStorage.getItem('lang') === 'en' ? 'en' : 'ms'));
  useEffect(() => {
    document.documentElement.lang = lang;
    localStorage.setItem('lang', lang);
  }, [lang]);
  const value = useMemo<Ctx>(() => ({ lang, setLang, t: (k) => dict[lang][k] }), [lang]);
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLang() {
  const c = useContext(LangContext);
  if (!c) throw new Error('useLang outside LangProvider');
  return c;
}
