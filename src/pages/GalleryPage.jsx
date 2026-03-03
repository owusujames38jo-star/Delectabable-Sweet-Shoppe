import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

const images = [
  'https://picsum.photos/seed/gallery-1/1600/900',
  'https://picsum.photos/seed/gallery-2/1600/900',
  'https://picsum.photos/seed/gallery-3/1600/900',
  'https://picsum.photos/seed/gallery-4/1600/900',
  'https://picsum.photos/seed/gallery-5/1600/900',
  'https://picsum.photos/seed/gallery-6/1600/900',
]

export function GalleryPage() {
  return (
    <div className="container-page py-12">
      <div className="inline-flex rounded-full bg-brand-50 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-brand-700">
        Gallery
      </div>
      <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
        A peek at our style
      </h1>
      <p className="mt-2 text-base text-zinc-700">
        Clean finishes, bold themes, and desserts that photograph beautifully.
      </p>

      <div className="mt-8 card overflow-hidden">
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop
          className="h-[520px]"
        >
          {images.map((src) => (
            <SwiperSlide key={src}>
              <img
                src={src}
                alt=""
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((src) => (
          <div key={src} className="card overflow-hidden">
            <div className="aspect-[4/3] bg-zinc-100">
              <img
                src={src}
                alt=""
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

