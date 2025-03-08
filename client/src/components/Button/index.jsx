import { overrideTailwindClasses } from "tailwind-override";
const Button = (props) => {
  const { children, className } = props;
  return (
    <div
      {...props}
      className={overrideTailwindClasses(
        `select-none cursor-pointer px-4 py-2 border bg-Purple color-White rounded-2xl font-bold ${className}`
      )}
    >
      {children}
    </div>
  );
};

export default Button;
