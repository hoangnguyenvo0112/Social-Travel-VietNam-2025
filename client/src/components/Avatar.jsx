const Avatar = (props) => {
  const { src, size, custom = null } = props;
  return (
    <>
      {
        custom ?  <img src={src} alt="avatar" style={{width: `${custom}px`, height: `${custom}px`, minWidth: `${custom}px`, borderRadius: "50%" }}  />
        :  <img src={src} alt="avatar" className={size}/>
      }
    </>
  )
};

export default Avatar;
