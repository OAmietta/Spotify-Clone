import { useEffect, useState } from "react";
import AudioProgressBar from "./AudioProgressBar";

export function SongControl(audioRef: any) {
  const { audio } = audioRef;
  const [currentTime, setCurrentTime] = useState(0);

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

  const duration = audio?.current?.duration ?? 0;

  return (
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
  );
}
