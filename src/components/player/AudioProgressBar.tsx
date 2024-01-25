interface ProgressCSSProps extends React.CSSProperties {
  "--progress-width": number;
}

interface AudioProgressBarProps
  extends React.ComponentPropsWithoutRef<"input"> {
  duration: number;
  currentProgress: number;
}

export default function AudioProgressBar(props: AudioProgressBarProps) {
  const { duration, currentProgress, onChange } = props;

  const progressBarWidth = isNaN(currentProgress / duration)
    ? 0
    : currentProgress / duration;

  const progressStyles: ProgressCSSProps = {
    "--progress-width": progressBarWidth,
  };

  return (
    // <div className="absolute h-1 -top-[4px] left-0 right-0 group">
    <div className="w-full max-w-[600px]">
      <input
        type="range"
        name="progress"
        // className={`progress-bar absolute inset-0 w-full m-0 h-full bg-transparent appearance-none cursor-pointer dark:bg-gray-700 group-hover:h-2 transition-all accent-amber-600 hover:accent-amber-600 before:absolute before:inset-0 before:h-full before:w-full before:bg-amber-600 before:origin-left after:absolute after:h-full after:w-full after:bg-amber-600/50`}
        className="w-full max-w-[600px] h-1 rounded-full accent-white bg-gray-700 cursor-pointer"
        style={progressStyles}
        min={0}
        max={isNaN(duration) ? 0 : duration}
        value={currentProgress}
        onChange={onChange}
      />
    </div>
  );
}
