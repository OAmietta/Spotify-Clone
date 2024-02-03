import { useMusicStore } from "@/store/musicStore";
import { useEffect, useRef, useState } from "react";
import {
  Play,
  Pause,
  Silenced,
  Volume,
  Forward,
  Back,
} from "@/icons/PlayerIcons";
import VolumeInput from "./VolumeInput";
import { SongControl } from "./SongControl";

export function MusicPlayer() {
  const { isPlaying, currentMusic } = useMusicStore((state: any) => state);
  const audioRef = useRef(currentMusic.song);
  const [volume, setVolume] = useState(1);
  const [prevVolume, setPrevVolume] = useState(volume);
  // const back = currentSong

  const currentSong = currentMusic?.songs?.find(
    (song: { id: any }) => song.id == currentMusic.song
  );

  useEffect(() => {
    const { song, playlist } = currentMusic;
    if (song && playlist) {
      const src = `/music/${playlist}/0${song}.mp3`;
      audioRef.current.src = src;
      audioRef.current.volume = volume;
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [currentMusic]);

  useEffect(() => {
    audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    if (isPlaying && currentMusic.songs.length > 0) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  const handleSilence = () => {
    if (volume != 0) {
      setPrevVolume(volume);
      setVolume(0);
    } else {
      setVolume(prevVolume);
    }
  };

  const handleVolumeChange = (volumeValue: number) => {
    // if (!audioRef.current) return;
    // audioRef.current.volume = volumeValue;
    setVolume(volumeValue);
  };

  return (
    <div
      className="bg-black min-h-[85px] max-h-[85px] 
    fixed left-0 bottom-0 w-full text-left 
    px-4 flex justify-between items-center flex-grow-0 z-50"
    >
      <div className="min-w-[33%]">
        <article className="flex gap-3 items-center">
          <picture className="">
            <img
              className="min-w-14 max-w-14 rounded-md"
              src={currentSong?.image}
              alt={currentSong?.title}
            />
          </picture>
          <div className="">
            <h1 className="text-sm font-bold truncate text-zinc-200">
              {currentSong?.title}
            </h1>
            <p className="text-sm font-light truncate text-zinc-300">
              {currentSong?.artists?.join(", ")}
            </p>
          </div>
        </article>
      </div>
      <div className="min-w-[33%] flex flex-col justify-center items-center">
        <audio ref={audioRef} />
        <SongControl audio={audioRef} />
      </div>
      <div className="hidden sm:flex flex-row gap-2 sm:gap-4 items-center justify-end min-w-[33%]">
        <button className="cursor-pointer" onClick={() => handleSilence()}>
          {volume > 0 ? (
            <Volume
              className={
                "min-w-5 min-h-5 opacity-80 cursor-pointer hover:opacity-100 transition duration-300"
              }
            />
          ) : (
            <Silenced
              className={
                "min-w-5 min-h-5 opacity-80 cursor-pointer hover:opacity-100 transition duration-300"
              }
            />
          )}
        </button>
        <VolumeInput volume={volume} onVolumeChange={handleVolumeChange} />
      </div>
    </div>
  );
}
