const Icons = ({ setContent, content, theme, isInCreatePost }) => {
  const reactions = [
    "❤️",
    "😆",
    "😯",
    "😢",
    "😡",
    "👍",
    "👎",
    "😄",
    "😂",
    "😍",
    "😘",
    "😗",
    "😚",
    "😳",
    "😭",
    "😓",
    "😤",
    "🤤",
    "👻",
    "💀",
    "🤐",
    "😴",
    "😷",
    "😵",
  ];

  return (
    <div className="dropdown">
      <span
        className={isInCreatePost ? "relative" : "nav-link relative"}
        id="navbarDropdown"
        role="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <i
          className={
            isInCreatePost ? "text-[28px] far fa-smile" : "far fa-smile"
          }
        ></i>
      </span>

      <div
        className={
          isInCreatePost ? "dropdown-menu -mt-[10px]" : "dropdown-menu"
        }
        aria-labelledby="navbarDropdown"
      >
        <form style={{ margin: "0px", padding: "0px" }}>
          <div className="reactions">
            {reactions.map((icon) => (
              <span key={icon} onClick={() => setContent(content + icon)}>
                {icon}
              </span>
            ))}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Icons;
