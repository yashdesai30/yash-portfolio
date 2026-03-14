"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { useMotionValue } from "framer-motion";
import { ParticleCore } from "@/components/three/ParticleCore";

export default function RecordGalaxy() {
  const [isRecording, setIsRecording] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [done, setDone] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  // A static scroll progress value of 0 (no scroll effect during recording)
  const scrollProgress = useMotionValue(0);

  const startRecording = () => {
    const canvas = canvasContainerRef.current?.querySelector("canvas");
    if (!canvas) {
      alert("Canvas not found! Wait for it to load then try again.");
      return;
    }

    // Capture the canvas stream at 60fps
    const stream = (canvas as HTMLCanvasElement).captureStream(60);
    const mimeType = MediaRecorder.isTypeSupported("video/webm;codecs=vp9")
      ? "video/webm;codecs=vp9"
      : "video/webm";

    const mediaRecorder = new MediaRecorder(stream, { mimeType, videoBitsPerSecond: 8_000_000 });
    chunksRef.current = [];

    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunksRef.current.push(e.data);
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: mimeType });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "galaxy.webm";
      a.click();
      URL.revokeObjectURL(url);
      setDone(true);
      setIsRecording(false);
    };

    mediaRecorderRef.current = mediaRecorder;
    mediaRecorder.start();
    setIsRecording(true);
    setCountdown(8);
  };

  useEffect(() => {
    if (!isRecording || countdown <= 0) return;
    const t = setTimeout(() => {
      if (countdown === 1) {
        mediaRecorderRef.current?.stop();
        setCountdown(0);
      } else {
        setCountdown((c) => c - 1);
      }
    }, 1000);
    return () => clearTimeout(t);
  }, [isRecording, countdown]);

  return (
    <div className="fixed inset-0 bg-[#080b14] flex flex-col items-center justify-center">
      {/* Full-screen canvas */}
      <div ref={canvasContainerRef} className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 1.5, 6], fov: 60 }}
          dpr={[1, 2]}
          gl={{ antialias: false, alpha: false, preserveDrawingBuffer: true }}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <ParticleCore scrollProgress={scrollProgress} />
          </Suspense>
        </Canvas>
      </div>

      {/* UI Overlay */}
      <div className="relative z-10 flex flex-col items-center gap-6 p-8 bg-black/60 rounded-2xl border border-white/10 backdrop-blur-md max-w-sm text-center">
        <h1 className="text-2xl font-bold text-white">Galaxy Video Recorder</h1>
        <p className="text-sm text-gray-400">
          This records the particle animation for <strong>8 seconds</strong> and downloads it as <code className="text-blue-400">galaxy.webm</code>. 
          Then move it to your <code className="text-blue-400">public/</code> folder.
        </p>
        
        {done ? (
          <div className="space-y-3">
            <div className="text-green-400 text-lg font-semibold">✅ Download complete!</div>
            <p className="text-sm text-gray-400">
              Move <code>galaxy.webm</code> into your <code>public/</code> folder, then the Hero will automatically use it.
            </p>
          </div>
        ) : isRecording ? (
          <div className="space-y-2">
            <div className="text-red-400 text-5xl font-mono font-bold animate-pulse">{countdown}</div>
            <p className="text-gray-300 text-sm">Recording… stay still</p>
          </div>
        ) : (
          <button
            onClick={startRecording}
            className="w-full py-3 px-6 bg-blue-500 hover:bg-blue-400 text-white font-semibold rounded-xl transition-colors"
          >
            ⏺ Start 8-Second Recording
          </button>
        )}
      </div>
    </div>
  );
}
