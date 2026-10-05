"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { useLanguage } from "@/contexts/LanguageContext"

const EASE = [0.25, 0.1, 0.25, 1] as const

export function TeamFilm() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section className="relative bg-[#070B14] pb-20 lg:pb-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: EASE }}
          className="relative overflow-hidden bg-[#060B13]"
          style={{ aspectRatio: "16 / 7" }}
        >
          <video
            className="absolute inset-0 h-full w-full object-cover"
            src="/video/WhatsApp%20Video%202026-09-30%20at%2010.57.10%20AM.mp4"
            controls
            playsInline
            preload="metadata"
            aria-label={t.teamFilm.heading}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#070B14]/35 via-transparent to-[#070B14]/45" />

          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
            <div className="text-center">
              <p
                className="text-[#A8B0C0]/40 font-sans uppercase tracking-[0.28em] mb-2"
                style={{ fontSize: "10px" }}
              >
                {t.teamFilm.kicker}
              </p>
              <p
                className="font-serif text-[#F5F1E8]/70 font-light"
                style={{ fontSize: "clamp(18px, 2.5vw, 32px)" }}
              >
                {t.teamFilm.heading}
              </p>
            </div>
          </div>

          <div className="pointer-events-none absolute bottom-10 left-6 right-6 flex justify-end">
            <span
              className="text-[#C8A96A]/20 font-sans uppercase"
              style={{ fontSize: "10px", letterSpacing: "0.2em" }}
            >
              {t.teamFilm.principalMessage}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
