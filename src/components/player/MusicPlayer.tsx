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
  const { isPlaying, setIsPlaying, currentMusic, setCurrentMusic } =
    useMusicStore((state: any) => state);
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
      audioRef.current.play();
    }
  }, [currentMusic]);

  useEffect(() => {
    audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  const handlePlayer = () => {
    setIsPlaying(!isPlaying);
  };

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

  const handleSongs = (id: string) => {
    if (id == "back") {
      if (currentMusic.songs[0].id != currentMusic.song) {
        setCurrentMusic({
          ...currentMusic,
          song: currentMusic.songs[currentMusic.song - 2].id,
        });
      }
    } else {
      if (
        currentMusic.songs[currentMusic.songs.length - 1].id !=
        currentMusic.song
      ) {
        setCurrentMusic({
          ...currentMusic,
          song: currentMusic.songs[currentMusic.song].id,
        });
      }
    }
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
        <div className="flex justify-center items-center gap-5">
          <button
            onClick={() => handleSongs("back")}
            className={`${
              currentMusic.songs.length > 0 &&
              currentMusic.songs[0].id == currentMusic.song
                ? "opacity-50"
                : "opacity-80 cursor-pointer hover:opacity-100 transition duration-300"
            }`}
            disabled={
              currentMusic.songs.length > 0 &&
              currentMusic.songs[0].id == currentMusic.song
            }
          >
            <Back className={""} />
          </button>

          <button
            onClick={() => handlePlayer()}
            className="bg-white rounded-full p-2 w-fit"
          >
            {isPlaying && currentMusic?.song != null ? (
              <Pause className={""} />
            ) : (
              <Play className={""} />
            )}
            <audio ref={audioRef} />
          </button>
          <button
            onClick={() => handleSongs("next")}
            className={`${
              currentMusic.songs.length > 0 &&
              currentMusic.songs[currentMusic.songs.length - 1].id ==
                currentMusic.song
                ? "opacity-50"
                : "opacity-80 cursor-pointer hover:opacity-100 transition duration-300"
            }`}
            disabled={
              currentMusic.songs.length > 0 &&
              currentMusic.songs[currentMusic.songs.length - 1].id ==
                currentMusic.song
            }
          >
            <Forward className={""} />
          </button>
        </div>

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
