import { useMusicStore } from "@/store/musicStore";
import { useEffect } from "react";

export const SongList = (props) => {
  const { songlist, id } = props;
  const { currentMusic, setCurrentMusic, setIsPlaying } = useMusicStore(
    (state) => state
  );

  const setSong = (song) => {
    if (song.id != currentMusic.song) {
      setCurrentMusic({
        playlist: id,
        song: song.id,
        songs: songlist,
      });
      setIsPlaying(true);
    }
  };

  return (
    <table className="text-left w-[95%] m-auto divide-y divide-gray-500/20">
      <thead>
        <tr className="text-zinc-400 text-sm font-light">
          <th className="px-2 sm:px-4 pb-2">#</th>
          <th className="px-2 sm:px-4 pb-2">Título</th>
          <th className="px-2 sm:px-4 pb-2">Álbum</th>
          <th className="px-2 sm:px-4 pb-2">Duración</th>
        </tr>
      </thead>

      <tbody>
        <tr className="h-4"></tr>
        {songlist != undefined &&
          songlist?.map((song, index) => {
            return (
              <tr
                key={index}
                className="border-spacing-0 cursor-pointer text-gray-300 text-sm font-light hover:bg-white/10 overflow-hidden transition duration-300"
                onClick={() => setSong(song)}
              >
                <td className="sm:px-4 py-2 w-5">{index + 1}</td>
                <td className="sm:px-4 py-2 flex gap-3">
                  <picture className="">
                    <img
                      src={song.image}
                      alt={song.title}
                      className="max-w-11 max-h-11 rounded-md"
                    />
                  </picture>
                  <div className="flex flex-col">
                    <h3
                      className={`${
                        currentMusic.playlist == id &&
                        currentMusic.song == index + 1
                          ? "text-green-500"
                          : "text-white"
                      } truncate  text-sm sm:text-base font-normal`}
                    >
                      {song.title}
                    </h3>
                    <h4 className="truncate text-xs">
                      {song.artists.join(", ")}
                    </h4>
                  </div>
                </td>
                <td className="px-3 sm:px-4 text-xs sm:text-sm py-2">
                  {song.album}
                </td>
                <td className="px-3 sm:px-4 sm:py-2">{song.duration}</td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};
