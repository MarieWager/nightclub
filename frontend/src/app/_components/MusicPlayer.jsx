
//UI improvement gap between images

"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Volume2, Shuffle } from "lucide-react"; //othe icons usual emoji


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
  // which track is currently selected
  const [index, setIndex] = useState(0);

  // play / pause state
  const [playing, setPlaying] = useState(false);

  // audio timing
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // volume slider state
  const [volume, setVolume] = useState(0.8);

  // mix track feature
  const [shuffle, setShuffle] = useState(false);

  // UI status: loading / idle (ready to play) / error
  const [status, setStatus] = useState("idle");

  // ref to <audio> element
  const audioRef = useRef(null);

  // currently playing track
  const track = TRACKS[index];

  // convert seconds mm:ss
  const format = (s = 0) => {
    const m = Math.floor(s / 60).toString().padStart(2, "0");
    const sec = Math.floor(s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  };

  // pick a random track that is not the current one
  const playRandomTrack = () => {
    let random;
    do {
      random = Math.floor(Math.random() * TRACKS.length);
    } while (random === index); // avoid picking the same track

    setIndex(random);
    setPlaying(true); // autoplay after shuffle
  };

  // go to next track
  const next = () => {
    if (shuffle) {
      playRandomTrack(); // mix mode
    } else {
      setIndex((i) => (i + 1) % TRACKS.length); // loop playlist
      setPlaying(true); // autoplay next
    }
  };

  // go to previous track
  const prev = () => {
    setIndex((i) => (i === 0 ? TRACKS.length - 1 : i - 1)); // loop backwards
    setPlaying(true); // autoplay
  };

  // turn shuffle on/off
  const toggleShuffle = () => setShuffle((prev) => !prev);

  // when user drags progress bar
  const seek = (e) => {
    const v = Number(e.target.value);
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = v; // jump audio to new time
    setTime(v);
  };

  

  // LOAD + SETUP AUDIO
  
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    setStatus("loading"); 
    setTime(0); // reset time
    audio.load(); // reload new audio source

    // when duration is ready
    const onLoaded = () => {
      setDuration(audio.duration || 0);
      setStatus("idle"); // ready to play

      if (playing) audio.play().catch(() => setStatus("error"));
    };

    // update progress bar while playing
    const onTime = () => setTime(audio.currentTime || 0);

    // auto-play next track when this one ends
    const onEnded = () => {
      setIndex((i) => (i + 1) % TRACKS.length); // go next
      setPlaying(true); // autoplay next track
    };

    // error handler 
    const onError = () => {
      setStatus("error");
      setPlaying(false);
    };

    // attach event listeners
    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("error", onError);

    // cleanup
    return () => {
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("error", onError);
    };
  }, [index, playing]);

  
  // PLAY / PAUSE + VOLUME CONTROL
  
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume; // update volume

    if (playing && status === "idle") {
      audio.play().catch(() => setStatus("error"));
    } else {
      audio.pause();
    }
  }, [playing, volume, status]);

  return (
    <section className="bg-black py-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 lg:flex-row">
        
        {/* big image of current track */}
        <div className="relative h-64 w-full overflow-hidden rounded-lg lg:h-80 lg:w-1/2">
          <Image src={track.cover} alt={track.title} fill className="object-cover" />
        </div>

        {/* player UI */}
        <div className="flex w-full flex-col justify-between lg:w-1/2">
          <h3 className="text-xl font-semibold text-white">{track.title}</h3>

          {/* progress bar */}
          <div className="mt-6">
            <input
              type="range"
              min={0}
              max={duration || 0}
              value={time}
              onChange={seek}
              disabled={status !== "idle"} // disable while loading
              className="w-full accent-[var(--pink)]"
            />
            <div className="mt-1 flex justify-between text-xs text-[var(--grey)]">
              <span>{format(time)}</span>
              <span>{format(duration)}</span>
            </div>
          </div>

          {/* main controls */}
          <div className="mt-6 flex items-center justify-center gap-6 text-white">
            
            {/* previous */}
            <button onClick={prev} className="text-xl hover:text-[var(--pink)]">
              ⏮
            </button>

            {/* play / pause */}
            <button
              onClick={() => setPlaying((p) => !p)} // toggle play state
              className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-white text-2xl hover:border-[var(--pink)] hover:text-[var(--pink)]"
            >
              {playing ? "⏸" : "▶"}
            </button>

            {/* next */}
            <button onClick={next} className="text-xl hover:text-[var(--pink)]">
              ⏭
            </button>

            {/* mix button */}
            <button onClick={toggleShuffle} title="Mix Track">
              <Shuffle
                className={`w-6 h-6 ${
                  shuffle ? "text-[var(--pink)]" : "text-white"
                }`}
              />
            </button>

            {/* volume */}
            <div className="flex items-center gap-2">
              <Volume2 className="w-5 h-5 text-white" />
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

          {/* loading / error messages */}
          <div className="mt-4 min-h-[1.5rem] text-sm">
            {status === "loading" && <p className="text-[var(--grey)]">Loading...</p>}
            {status === "error" && (
              <p className="text-red-400">We cannot play this track. Please refresh.</p>
            )}
          </div>

          {/* thumbnail images */}
          <div className="mt-4 flex items-center justify-center gap-4">
            
            {/* prev arrow (desktop only) */}
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
                    setIndex(idx); // change track on click
                    setPlaying(true); // autoplay
                  }}
                  className={`relative h-24 min-w-[90px] overflow-hidden rounded-sm ${
                    idx === index
                      ? "ring-4 ring-[var(--pink)]" // pink active border !!!needs to be change to animation later !!!!
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

            {/* next arrow (desktop only) */}
            <button
              onClick={next}
              className="hidden h-12 w-12 items-center justify-center border-2 border-white text-white hover:bg-white/5 md:flex"
            >
              ▶
            </button>

          </div>
        </div>
      </div>

      {/* audio playback element */}
      <audio ref={audioRef}>
        <source src={track.audio} />
      </audio>
    </section>
  );
}



