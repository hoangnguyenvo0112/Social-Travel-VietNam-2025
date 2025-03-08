import { overrideTailwindClasses } from "tailwind-override";

export const Image = ({ src, className, theme }) => {
  return (
    <img
      src={src}
      alt="images"
      className={overrideTailwindClasses(`img-thumbnail ${className}`)}
      style={{ filter: theme ? "invert(1)" : "invert(0)" }}
    />
  );
};
