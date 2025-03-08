import { Link } from "react-router-dom";
import { overrideTailwindClasses } from "tailwind-override";

const SidebarItem = ({ item, isActive, className, onClick, ...props }) => {
  const { icons, title, path } = item;
  return (
    <Link
      to={path}
      {...props}
      onClick={onClick}
      className={overrideTailwindClasses(
        `flex cursor-pointer p-2 text-[18px] ${
          isActive
            ? "text-blue-600"
            : "text-gray-500 transition ease-out delay-150 hover:translate-x-2 hover:scale-110 duration-200 hover:text-blue-500"
        }  ${isActive && "bg-slate-100"}`
      )}
    >
      {isActive && <div className="w-0.5 mr-2 bg-blue-500" />}
      {isActive ? icons[1] : icons[0]}
      <p className="ml-2 text-[18px] ">{title}</p>
    </Link>
  );
};

export default SidebarItem;
