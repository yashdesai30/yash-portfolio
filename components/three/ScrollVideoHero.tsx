"use client";

import { useEffect, useRef } from "react";
import { useMotionValue, useTransform, type MotionValue, motion } from "framer-motion";

interface ScrollVideoHeroProps {
  scrollProgress: MotionValue<number>;
}

/**
 * Apple-style scroll-synced video hero.
 * The video is paused and its `currentTime` is driven by the scroll position.
 * This means zero JS rendering overhead — the browser decodes video using hardware GPU acceleration.
 *
 * Requires: /public/galaxy.webm (generate via /record-galaxy)
 */
export function ScrollVideoHero({ scrollProgress }: ScrollVideoHeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Drive video currentTime from scroll progress
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const unsubscribe = scrollProgress.on("change", (progress) => {
      if (!video.duration || isNaN(video.duration)) return;
      // Scrub through the video based on scroll (0% → 0s, 100% → end)
      video.currentTime = progress * video.duration;
    });

    return unsubscribe;
  }, [scrollProgress]);

  const opacity = useTransform(scrollProgress, [0.7, 1], [1, 0]);

  return (
    <motion.div style={{ opacity }} className="absolute inset-0 z-0">
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        src="/galaxy.webm"
        muted
        playsInline
        preload="auto"
        // Prevent autoplay — we control currentTime manually
        autoPlay={false}
        onLoadedMetadata={() => {
          // Pause immediately so we can scrub manually
          if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
          }
        }}
      />
      {/* Subtle vignette to blend edges */}
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent opacity-60 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-bg via-transparent to-bg opacity-30 pointer-events-none" />
    </motion.div>
  );
}
