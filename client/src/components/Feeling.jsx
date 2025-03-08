const Feeling = ({ setFeeling, feeling, theme, isInCreatePost = false,onClick }) => {
  const reactions = [
    {
      icon: "❤️",
      text: "yêu thích",
    },
    {
      icon: "😆",
      text: "cực vui",
    },
    {
      icon: "😯",
      text: "yêu thích",
    },
    {
      icon: "😢",
      text: "buồn bã",
    },
    {
      icon: "😡",
      text: "phẫn nộ",
    },
    {
      icon: "👍",
      text: "tích cực",
    },
    {
      icon: "👎",
      text: "tiêu cực",
    },
    {
      icon: "😂",
      text: "sảng khoái",
    },
    {
      icon: "😍",
      text: "được yêu",
    },
    {
      icon: "😘",
      text: "hài lòng",
    },
    {
      icon: "😗",
      text: "bình thường",
    },
    {
      icon: "😚",
      text: "tốt đẹp",
    },
    {
      icon: "😳",
      text: "ngại ngùng",
    },
    {
      icon: "😭",
      text: "yêu thích",
    },
    {
      icon: "😓",
      text: "mệt mỏi",
    },
    {
      icon: "😤",
      text: "tuyệt vời",
    },
    {
      icon: "🤤",
      text: "thèm thuồng",
    },
    {
      icon: "👻",
      text: "may mắn",
    },
    {
      icon: "💀",
      text: "đáng sợ",
    },
    {
      icon: "🤐",
      text: "sợ hãi",
    },
    {
      icon: "😴",
      text: "buồn ngủ",
    },
    {
      icon: "😷",
      text: "bị ốm",
    },
    {
      icon: "😵",
      text: "kiệt sức",
    },
  ];

  return (
    <div onClick={onClick} className="dropdown">
      <span
       
        className={isInCreatePost ? "relative hover:scale-125" : "nav-link relative"}
        id="navbarDropdown"
        role="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <span  className={isInCreatePost ? "text-[28px] hover:scale-125" : undefined}>😄</span>
      </span>

      <div className="dropdown-menu" aria-labelledby="navbarDropdown">
        <form style={{ margin: "0px", padding: "0px" }}>
          <div className="reactions">
            {reactions.map((item, index) => (
              <span
                key={index}
                onClick={() =>
                  setFeeling("đang cảm thấy " + item.text + item.icon)
                }
              >
                {item.icon}
              </span>
            ))}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Feeling;
