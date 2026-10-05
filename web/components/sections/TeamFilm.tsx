"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Play } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"

const EASE = [0.25, 0.1, 0.25, 1] as const

export function TeamFilm() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })
  const [hasStarted, setHasStarted] = useState(false)
  const [playbackError, setPlaybackError] = useState(false)

  async function startVideo() {
    const video = videoRef.current
    if (!video) {
      setPlaybackError(true)
      return
    }

    try {
      await video.play()
      setPlaybackError(false)
    } catch {
      setPlaybackError(true)
    }
  }

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
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            src="/video/WhatsApp%20Video%202026-09-30%20at%2010.57.10%20AM.mp4"
            controls
            playsInline
            preload="metadata"
            aria-label={t.teamFilm.heading}
            onPlay={() => setHasStarted(true)}
            onError={() => setPlaybackError(true)}
          />

          <motion.div
            aria-hidden={hasStarted}
            animate={{ opacity: hasStarted ? 0 : 1 }}
            transition={{ duration: 1.2, ease: EASE }}
            className="pointer-events-none absolute inset-0 z-10 overflow-hidden"
          >
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(135deg, #060B13 0%, #0D1827 40%, #07111F 70%, #060A12 100%)",
              }}
            />
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(200,169,106,1) 1px, transparent 1px), linear-gradient(90deg, rgba(200,169,106,1) 1px, transparent 1px)",
                backgroundSize: "60px 60px",
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse at center, transparent 30%, rgba(6,10,19,0.7) 100%)",
              }}
            />

            <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-6 text-center">
              <button
                type="button"
                onClick={startVideo}
                aria-label={`Play ${t.teamFilm.heading}`}
                className="pointer-events-auto group relative flex h-16 w-16 items-center justify-center rounded-full border border-[#C8A96A]/30 bg-[rgba(200,169,106,0.07)] transition-colors hover:bg-[rgba(200,169,106,0.15)] lg:h-20 lg:w-20"
              >
                <Play
                  size={20}
                  strokeWidth={1.5}
                  className="ml-1 text-[#C8A96A]"
                  fill="rgba(200,169,106,0.4)"
                />
                <span className="absolute inset-0 rounded-full border border-[#C8A96A]/15 transition-transform duration-700 group-hover:scale-150 group-hover:opacity-0" />
              </button>

              <div>
                <p
                  className="mb-2 font-sans uppercase tracking-[0.28em] text-[#A8B0C0]/60"
                  style={{ fontSize: "10px" }}
                >
                  {t.teamFilm.kicker}
                </p>
                <p
                  className="font-serif font-light text-[#F5F1E8]"
                  style={{ fontSize: "clamp(18px, 2.5vw, 32px)" }}
                >
                  {t.teamFilm.heading}
                </p>
                {playbackError && (
                  <p role="alert" className="mt-3 font-sans text-sm text-[#F5F1E8]">
                    {t.teamFilm.playbackError}
                  </p>
                )}
              </div>
            </div>

            <div className="absolute bottom-5 left-6 right-6 flex justify-end">
              <span
                className="font-sans uppercase text-[#C8A96A]/50"
                style={{ fontSize: "10px", letterSpacing: "0.2em" }}
              >
                {t.teamFilm.principalMessage}
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
