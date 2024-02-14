import { useEffect, useState } from "react";
import AudioProgressBar from "./AudioProgressBar";
import { useMusicStore } from "@/store/musicStore";
import { Back, Forward, Pause, Play } from "@/icons/DynamicIcons";

interface SongControlProps {
  handleSongs: (id: string) => void;
  audio: any;
}

export function SongControl({ audio, handleSongs }: SongControlProps) {
  // const { audio } = audioRef;
  const [currentTime, setCurrentTime] = useState(0);
  const duration = audio?.current?.duration ?? 0;
  const { isPlaying, setIsPlaying, currentMusic, setCurrentMusic } =
    useMusicStore((state) => state);

  useEffect(() => {
    audio.current.addEventListener("timeupdate", handleTimeUpdate);
    return () => {
      audio.current.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, []);

  const handleTimeUpdate = () => {
    setCurrentTime(audio.current.currentTime);
  };

  const formatTime = (time: number) => {
    if (time == null) return `0:00`;

    const seconds = Math.floor(time % 60);
    const minutes = Math.floor(time / 60);

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handlePlayer = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <>
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
      <div className="hidden sm:flex justify-center gap-x-3 text-xs pt-2 w-full">
        <span className="opacity-50 w-12 text-right">
          {formatTime(currentTime)}
        </span>
        <AudioProgressBar
          duration={duration}
          currentProgress={currentTime}
          onChange={(e) => {
            if (!audio.current) return;

            audio.current.currentTime = e.currentTarget.valueAsNumber;

            setCurrentTime(e.currentTarget.valueAsNumber);
          }}
        />
        <span className="opacity-50 w-12">
          {duration ? formatTime(duration) : "0:00"}
        </span>
      </div>
    </>
  );
}
