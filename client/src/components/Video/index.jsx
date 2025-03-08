import { overrideTailwindClasses } from "tailwind-override";

export const Video = ({ src, className, theme }) => {
  return (
    <video
      controls
      src={src}
      alt="images"
      className={overrideTailwindClasses(`img-thumbnail ${className}`)}
      style={{ filter: theme ? "invert(1)" : "invert(0)" }}
    />
  );
};
