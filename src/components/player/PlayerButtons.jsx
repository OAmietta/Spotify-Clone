import { useMusicStore } from "@/store/musicStore";
import { Play, Pause } from "@/icons/PlayerIcons";
import { songs } from "@/lib/data";

export function PlayerButton({ id, simple }) {
  const { isPlaying, setIsPlaying, currentMusic, setCurrentMusic } =
    useMusicStore((state) => state);
  const isItemPlaying = currentMusic.playlist == id;

  const handleClick = () => {
    const playlistSongs = songs.filter((song) => song.albumId == id);
    if (!isItemPlaying && isPlaying) {
      setCurrentMusic({
        playlist: id,
        song: playlistSongs[0].id,
        songs: playlistSongs,
      });
    } else {
      setCurrentMusic({
        playlist: id,
        song: playlistSongs[0].id,
        songs: playlistSongs,
      });
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <button
      onClick={() => handleClick()}
      className={`bg-green-500 rounded-full ${simple ? "p-3" : "p-4"}`}
    >
      {isItemPlaying && isPlaying ? <Pause /> : <Play />}
    </button>
  );
}
