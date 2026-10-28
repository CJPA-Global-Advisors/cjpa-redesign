"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"

const AUTOPLAY_INTERVAL = 5_000

const photos = [
  {
    src: "/team-gallery/meeting-01.jpeg",
    alt: "Two executives standing together at an indoor conference",
  },
  {
    src: "/team-gallery/meeting-02.jpeg",
    alt: "CJPA advisor with colleagues at a philanthropic event",
  },
  {
    src: "/team-gallery/meeting-03.jpeg",
    alt: "Delegates at the 2024 Vietnam–U.S. Fall Forum",
  },
  {
    src: "/team-gallery/meeting-04.jpeg",
    alt: "CJPA advisor with a colleague at a foreign affairs conference",
  },
  {
    src: "/team-gallery/meeting-05.jpeg",
    alt: "Advisors together at a global economy conference",
  },
  {
    src: "/team-gallery/meeting-06.jpeg",
    alt: "Participants in a cross-border business roundtable",
  },
  {
    src: "/team-gallery/meeting-07.jpeg",
    alt: "Advisors meeting with a colleague over dinner",
  },
  {
    src: "/team-gallery/meeting-08.jpeg",
    alt: "Panel participants at an institutional conference",
  },
  {
    src: "/team-gallery/meeting-09.jpeg",
    alt: "Advisors meeting with colleagues at a historic venue",
  },
  {
    src: "/team-gallery/meeting-10.jpeg",
    alt: "CJPA team members with colleagues at an office gathering",
  },
]

export function PhotoCarousel() {
  const { t } = useLanguage()
  const [activeIndex, setActiveIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (isHovered || prefersReducedMotion !== false) return

    const timer = window.setTimeout(() => {
      setActiveIndex((index) => (index + 1) % photos.length)
    }, AUTOPLAY_INTERVAL)

    return () => window.clearTimeout(timer)
  }, [activeIndex, isHovered, prefersReducedMotion])

  function showPhoto(index: number) {
    setActiveIndex((index + photos.length) % photos.length)
  }

  const activePhoto = photos[activeIndex]

  return (
    <section
      id="global-engagement"
      className="relative bg-[#070B14] py-20 lg:py-28"
      aria-label={t.photoCarousel.eyebrow}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-9 flex flex-col gap-3 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-3 font-sans text-[10px] font-medium uppercase tracking-[0.3em] text-[#C8A96A] sm:text-[11px]">
              {t.photoCarousel.eyebrow}
            </p>
            <h2 className="font-serif text-3xl font-light leading-tight text-[#F5F1E8] sm:text-4xl lg:text-5xl">
              {t.photoCarousel.heading}
            </h2>
          </div>
          <p className="max-w-sm font-sans text-sm font-light leading-relaxed text-[#A8B0C0] sm:text-right">
            {t.photoCarousel.description}
          </p>
        </div>

        <div
          className="group relative overflow-hidden border border-[#C8A96A]/15 bg-[#05080E]"
          role="region"
          aria-roledescription="carousel"
          aria-label={t.photoCarousel.eyebrow}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative aspect-[4/3] md:aspect-[16/9]">
            <AnimatePresence initial={false} mode="sync">
              <motion.div
                key={activePhoto.src}
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.7, ease: "easeInOut" }}
              >
                <Image
                  src={activePhoto.src}
                  alt={activePhoto.alt}
                  fill
                  priority={activeIndex === 0}
                  sizes="(max-width: 768px) 100vw, 1200px"
                  className="object-contain p-2 sm:p-4"
                />
              </motion.div>
            </AnimatePresence>

            <button
              type="button"
              onClick={() => showPhoto(activeIndex - 1)}
              aria-label={t.photoCarousel.previous}
              className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center border border-[#F5F1E8]/20 bg-[#070B14]/75 text-[#F5F1E8] backdrop-blur-sm transition-colors hover:border-[#C8A96A]/60 hover:text-[#C8A96A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C8A96A] sm:left-5 sm:h-12 sm:w-12"
            >
              <ArrowLeft size={18} strokeWidth={1.5} />
            </button>
            <button
              type="button"
              onClick={() => showPhoto(activeIndex + 1)}
              aria-label={t.photoCarousel.next}
              className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center border border-[#F5F1E8]/20 bg-[#070B14]/75 text-[#F5F1E8] backdrop-blur-sm transition-colors hover:border-[#C8A96A]/60 hover:text-[#C8A96A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C8A96A] sm:right-5 sm:h-12 sm:w-12"
            >
              <ArrowRight size={18} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-center gap-2" role="group" aria-label={t.photoCarousel.navigation}>
          {photos.map((photo, index) => (
            <button
              key={photo.src}
              type="button"
              onClick={() => showPhoto(index)}
              aria-label={`${t.photoCarousel.goToPhoto} ${index + 1}`}
              aria-current={index === activeIndex ? "true" : undefined}
              className={`h-2 rounded-full transition-[width,background-color] duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C8A96A] ${
                index === activeIndex
                  ? "w-6 bg-[#C8A96A]"
                  : "w-2 bg-[#A8B0C0]/35 hover:bg-[#A8B0C0]/70"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
