import { Star, Quote } from 'lucide-react';
import { testimonials } from '@/data/testimonials';

export function Testimonials() {
  return (
    <section className="bg-primary-700 py-16 sm:py-20 px-4">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Kata Pelancong
          </h2>
          <p className="mt-3 text-base text-sand-200/80 max-w-2xl mx-auto">
            Pengalaman pelanggan yang telah menggunakan JetiKualaBesut untuk perjalanan ke Pulau Perhentian.
          </p>
        </div>

        <div className="mt-10 flex gap-5 overflow-x-auto pb-4 no-scrollbar snap-x snap-mandatory">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="flex-shrink-0 w-80 snap-center rounded-2xl bg-white p-6 shadow-lg"
            >
              <Quote className="h-8 w-8 text-secondary-200" />
              <div className="mt-3 flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < t.rating ? 'fill-accent-400 text-accent-400' : 'text-sand-200'}`}
                  />
                ))}
              </div>
              <p className="mt-3 text-sm text-primary-600 leading-relaxed">{t.text}</p>
              <div className="mt-4 border-t border-sand-100 pt-4">
                <span className="block text-sm font-bold text-primary-700">{t.name}</span>
                <span className="block text-xs text-primary-400">{t.origin} • {t.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

