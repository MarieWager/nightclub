// UI: music player section

"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Volume2, Shuffle } from "lucide-react";

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
];

export default function MusicPlayer() {
  // current track index
  const [index, setIndex] = useState(0);

  // play / pause
  const [playing, setPlaying] = useState(false);

  // time + duration
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // volume 0–1
  const [volume, setVolume] = useState(0.8);

  // shuffle on/off
  const [shuffle, setShuffle] = useState(false);

  // loading / idle / error state
  const [status, setStatus] = useState("idle");

  // audio element ref
  const audioRef = useRef(null);

  // current track data
  const track = TRACKS[index];

  // format seconds -> mm:ss
  const format = (s = 0) => {
    const m = Math.floor(s / 60).toString().padStart(2, "0");
    const sec = Math.floor(s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  };

  // random track (not same as current)
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

  // progress bar seek
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

  return (
    <section className="bg-black py-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 lg:flex-row">
        {/* big cover image */}
        <div className="relative h-64 w-full overflow-hidden rounded-lg lg:h-80 lg:w-1/2">
          <Image src={track.cover} alt={track.title} fill className="object-cover" />
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
            <button onClick={prev} className="text-xl hover:text-[var(--pink)]">
              ⏮
            </button>

            {/* play / pause */}
            <button
              onClick={() => setPlaying((p) => !p)}
              className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-white text-2xl hover:border-[var(--pink)] hover:text-[var(--pink)]"
            >
              {playing ? "⏸" : "▶"}
            </button>

            {/* next */}
            <button onClick={next} className="text-xl hover:text-[var(--pink)]">
              ⏭
            </button>

            {/* shuffle */}
            <button onClick={toggleShuffle} title="Mix track">
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
                onChange={(e) => setVolume(Number(e.target.value))}
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
              onClick={prev}
              className="hidden h-12 w-12 items-center justify-center border-2 border-white text-white hover:bg-white/5 md:flex"
            >
              ◀
            </button>

            <div className="flex flex-1 gap-2 overflow-x-auto">
              {TRACKS.map((t, idx) => (
                <button
                  key={t.id}
                  onClick={() => {
                    setIndex(idx);
                    setPlaying(true);
                  }}
                  className={`relative h-24 min-w-[90px] overflow-hidden rounded-sm ${
                    idx === index
                      ? "ring-4 ring-[var(--pink)]"
                      : "opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={t.cover}
                    alt={t.title}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>

            {/* next arrow (desktop) */}
            <button
              onClick={next}
              className="hidden h-12 w-12 items-center justify-center border-2 border-white text-white hover:bg-white/5 md:flex"
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
