"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Volume2, Shuffle } from "lucide-react";
import LeftTriangle from "@/app/_components/_ui/LeftTriangle";
import RightTriangle from "@/app/_components/_ui/RightTriangle";

const TRACKS = [
  {
    id: 1,
    title: "Black Box Funky",
    cover: "/music-covers/track1.jpg",
    audio: "/media/black-box-funky.mp3",
  },
  {
    id: 2,
    title: "Euphoria",
    cover: "/music-covers/track2.jpg",
    audio: "/media/euphoria.mp3",
  },
  {
    id: 3,
    title: "Fashion Red Tape",
    cover: "/music-covers/track4.jpg",
    audio: "/media/fashion-red-tape.mp3",
  },
  {
    id: 4,
    title: "Night Pulse",
    cover: "/music-covers/track1.jpg",
    audio: "/media/black-box-funky.mp3",
  },
  {
    id: 5,
    title: "Neon Lights",
    cover: "/music-covers/track2.jpg",
    audio: "/media/euphoria.mp3",
  },
  {
    id: 6,
    title: "Midnight Mode",
    cover: "/music-covers/track4.jpg",
    audio: "/media/fashion-red-tape.mp3",
  },
  {
    id: 7,
    title: "After Hours",
    cover: "/music-covers/track4.jpg",
    audio: "/media/fashion-red-tape.mp3",
  },
];

export default function MusicPlayer() {
  const [index, setIndex] = useState(0);

  const [playing, setPlaying] = useState(false);

  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const [volume, setVolume] = useState(0.8);

  const [shuffle, setShuffle] = useState(false);

  const [status, setStatus] = useState("idle");

  const audioRef = useRef(null);

  // refs for thumbnail scrolling
  const thumbItemsRef = useRef([]);

  // ADDED: only scroll thumbnails after user interacts
  const [didUserInteract, setDidUserInteract] = useState(false);

  const track = TRACKS[index];

  // mm:ss
  const format = (s = 0) => {
    const m = Math.floor(s / 60).toString().padStart(2, "0");
    const sec = Math.floor(s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  };

  const playRandomTrack = () => {
    let random;
    do {
      random = Math.floor(Math.random() * TRACKS.length);
    } while (random === index);

    setIndex(random);
    setPlaying(true);
  };

  // next track
  const next = () => {
    if (shuffle) {
      playRandomTrack();
    } else {
      setIndex((i) => (i + 1) % TRACKS.length);
      setPlaying(true);
    }
  };

  // previous track
  const prev = () => {
    setIndex((i) => (i === 0 ? TRACKS.length - 1 : i - 1));
    setPlaying(true);
  };

  const toggleShuffle = () => setShuffle((prev) => !prev);

  // progress bar
  const seek = (e) => {
    const v = Number(e.target.value);
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = v;
    setTime(v);
  };

  // load audio when track changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    setStatus("loading");
    setTime(0);
    audio.load();

    const onLoaded = () => {
      setDuration(audio.duration || 0);
      setStatus("idle");

      if (playing) {
        audio.play().catch(() => setStatus("error"));
      }
    };

    const onTime = () => {
      setTime(audio.currentTime || 0);
    };

    const onEnded = () => {
      // auto play next
      setIndex((i) => (i + 1) % TRACKS.length);
      setPlaying(true);
    };

    const onError = () => {
      setStatus("error");
      setPlaying(false);
    };

    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("error", onError);

    return () => {
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("error", onError);
    };
  }, [index, playing]);

  // play / pause + volume
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume;

    if (playing && status === "idle") {
      audio.play().catch(() => setStatus("error"));
    } else {
      audio.pause();
    }
  }, [playing, volume, status]);

  // scroll so active track is always visible (only after user interacts)
  useEffect(() => {
    if (!didUserInteract) return;

    const el = thumbItemsRef.current[index];
    if (!el) return;

    el.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [index, didUserInteract]);

  return (
    <section className="bg-black py-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 lg:flex-row">
        {/* big cover image */}
        <div className="relative h-64 w-full overflow-hidden rounded-lg lg:h-80 lg:w-1/2">
          <Image
            src={track.cover}
            alt={track.title}
            fill
            className="object-cover"
          />
        </div>

        {/* player side */}
        <div className="flex w-full flex-col justify-between lg:w-1/2">
          <h3 className="text-xl font-semibold text-white">{track.title}</h3>

          {/* progress */}
          <div className="mt-6">
            <input
              type="range"
              min={0}
              max={duration || 0}
              value={time}
              onChange={seek}
              disabled={status !== "idle"}
              className="w-full accent-[var(--pink)]"
            />
            <div className="mt-1 flex justify-between text-xs text-[var(--grey)]">
              <span>{format(time)}</span>
              <span>{format(duration)}</span>
            </div>
          </div>

          {/* main controls */}
          <div className="mt-6 flex items-center justify-center gap-6 text-white">
            {/* prev */}
            <button
              onClick={() => {
                setDidUserInteract(true);
                prev();
              }}
              className="text-xl hover:text-[var(--pink)]"
            >
              ⏮
            </button>

            {/* play / pause */}
            <button
              onClick={() => {
                setDidUserInteract(true);
                setPlaying((p) => !p);
              }}
              className="flex h-14 w-14 items-center justify-center rounded-full border-2
               border-white text-2xl hover:border-[var(--pink)] hover:text-[var(--pink)]"
            >
              {playing ? "⏸" : "▶"}
            </button>

            {/* next */}
            <button
              onClick={() => {
                setDidUserInteract(true);
                next();
              }}
              className="text-xl hover:text-[var(--pink)]"
            >
              ⏭
            </button>

            {/* shuffle */}
            <button
              onClick={() => {
                setDidUserInteract(true);
                toggleShuffle();
              }}
              title="Mix track"
            >
              <Shuffle
                className={`h-6 w-6 ${
                  shuffle ? "text-[var(--pink)]" : "text-white"
                }`}
              />
            </button>

            {/* volume */}
            <div className="flex items-center gap-2">
              <Volume2 className="h-5 w-5 text-white" />
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={volume}
                onChange={(e) => {
                  setDidUserInteract(true);
                  setVolume(Number(e.target.value));
                }}
                className="w-28 accent-[var(--pink)]"
              />
            </div>
          </div>

          {/* status text */}
          <div className="mt-4 min-h-[1.5rem] text-sm">
            {status === "loading" && (
              <p className="text-[var(--grey)]">Loading...</p>
            )}
            {status === "error" && (
              <p className="text-red-400">
                We cannot play this track. Please refresh.
              </p>
            )}
          </div>

          {/* small covers */}
          <div className="mt-4 flex items-center justify-center gap-4">
            {/* prev arrow (desktop) */}
            <button
              onClick={() => {
                setDidUserInteract(true);
                prev();
              }}
              className="hidden h-8 w-8 items-center justify-center 
                         border-2 border-white text-white 
                         hover:text-[var(--pink)] hover:border-[var(--pink)] hover:bg-white/5 
                         md:flex"
            >
              ◀
            </button>

            <div className="flex flex-1 gap-2 overflow-x-auto snap-x snap-mandatory scroll-smooth">
              {TRACKS.map((t, idx) => {
                const isActive = idx === index;

                return (
                  <button
                    ref={(el) => (thumbItemsRef.current[idx] = el)}
                    key={t.id}
                    onClick={() => {
                      setDidUserInteract(true);
                      setIndex(idx);
                      setPlaying(true);
                    }}
                    className={`group relative h-24 min-w-[90px] snap-center overflow-hidden rounded-sm ${
                      isActive ? "" : "opacity-80 hover:opacity-100"
                    }`}
                  >
                    {/* image */}
                    <Image
                      src={t.cover}
                      alt={t.title}
                      fill
                      className={`object-cover transition duration-300 ease-out ${
                        isActive ? "brightness-50" : "group-hover:brightness-50"
                      }`}
                    />

                    {/* overlay */}
                    <div
                      className={`absolute inset-0 transition duration-300 ${
                        isActive
                          ? "opacity-100"
                          : "opacity-0 group-hover:opacity-100"
                      } bg-black/20`}
                    />

                    {/* triangles */}
                    <div
                      className={`absolute inset-0 pointer-events-none transition duration-300 ${
                        isActive
                          ? "opacity-100"
                          : "opacity-0 group-hover:opacity-100"
                      }`}
                    >
                      <div className="absolute left-0 top-0 scale-75 origin-top-left">
                        <LeftTriangle />
                      </div>

                      <div className="absolute right-0 bottom-0 scale-75 origin-bottom-right">
                        <RightTriangle />
                      </div>
                    </div>

                    {/* play icon in center */}
                    <div
                      className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                                  transition duration-300 ${
                                    isActive
                                      ? "opacity-100"
                                      : "opacity-0 group-hover:opacity-100"
                                  }`}
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[var(--pink)]">
                        <div className="ml-[2px] h-0 w-0 border-y-[6px] border-y-transparent border-l-[10px] border-l-[var(--pink)]" />
                      </div>
                    </div>

                    {/* title */}
                    <div
                      className={`absolute bottom-0 left-0 right-0 z-10 px-2 py-1
                                  text-center text-xs font-semibold uppercase tracking-wide
                                  bg-black/60 text-white
                                  transition duration-300 ${
                                    isActive
                                      ? "opacity-100"
                                      : "opacity-0 group-hover:opacity-100"
                                  }`}
                    >
                      {t.title}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* next arrow (desktop) */}
            <button
              onClick={() => {
                setDidUserInteract(true);
                next();
              }}
              className="hidden h-8 w-8 items-center justify-center 
                         border-2 border-white text-white 
                         hover:text-[var(--pink)] hover:border-[var(--pink)] hover:bg-white/5 
                         md:flex"
            >
              ▶
            </button>
          </div>
        </div>
      </div>

      {/* audio element */}
      <audio ref={audioRef}>
        <source src={track.audio} />
      </audio>
    </section>
  );
}
