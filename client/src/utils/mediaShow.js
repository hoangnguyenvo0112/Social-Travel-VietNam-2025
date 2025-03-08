export const imageShow = (src, theme) => {
  return (
    <img
      src={src}
      alt="images"
      className="img-thumbnail"
      style={{ filter: theme ? "invert(1)" : "invert(0)" }}
    />
  );
};

export const videoShow = (src, theme) => {
  return (
    <video
      controls
      src={src}
      alt="images"
      className="img-thumbnail"
      style={{ filter: theme ? "invert(1)" : "invert(0)" }}
    />
  );
};
export const imageShowSmall = (src, size) => {
  return (
    <img
      src={src}
      alt="images"
      className="img-thumbnail"
      style={{ height: `${size}px`, width: `${size / 3 * 4}px` }}
    />
  );
};

export const videoShowSmall = (src, size) => {
  return (
    <video
      controls
      src={src}
      alt="images"
      className="img-thumbnail"
      style={{ height: `${size}px`, width: "auto" }}
    />
  );
};
