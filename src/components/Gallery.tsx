import { galleryImages } from '@/data/guides';

export default function Gallery() {
  return (
    <section className="py-16 sm:py-20 px-4">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-primary-700 sm:text-4xl">
            Galeri Pulau Perhentian
          </h2>
          <p className="mt-3 text-base text-primary-500 max-w-2xl mx-auto">
            Glimpse keindahan yang menanti anda di Pulau Perhentian.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
          {galleryImages.map((img, i) => (
            <div
              key={i}
              className={`overflow-hidden rounded-xl ring-1 ring-sand-200 ${
                i === 0 ? 'col-span-2 row-span-2 sm:col-span-2' : ''
              }`}
            >
              <img
                src={img.url}
                alt={img.alt}
                loading="lazy"
                className={`w-full object-cover transition-transform duration-500 hover:scale-105 ${
                  i === 0 ? 'h-64 sm:h-80' : 'h-32 sm:h-40'
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
