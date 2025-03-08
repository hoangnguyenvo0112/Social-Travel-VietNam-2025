import "./index.css";
const Carousel = ({ images, id, isProduct = false }) => {
  const isActive = (index) => {
    if (index === 0) return "active";
  };

  // Add the layout of image show
  return (
    <div id={`image${id}`} className="carousel slide" data-ride="carousel">
      <ol className="carousel-indicators" style={{ zIndex: 1 }}>
        {images.map((img, index) => (
          <li
            key={index}
            data-target={`#image${id}`}
            data-slide-to={index}
            className={isActive(index)}
          />
        ))}
      </ol>

      <div className="carousel-inner">
        {images &&
          images.map((img, index) => (
            <div key={index} className={`carousel-item ${isActive(index)}`}>
              <img
                src={img.url}
                className="carousel-item-img"
                alt={img.url}
                style={
                  isProduct
                    ? { width: "full", height: "100vh" }
                    : { width: "full", height: "400px" }
                }
              />
            </div>
          ))}
      </div>

      {images.length > 1 && (
        <>
          <a
            className="carousel-control-prev"
            href={`#image${id}`}
            role="button"
            data-slide="prev"
            style={{ width: "5%" }}
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="sr-only">Previous</span>
          </a>

          <a
            className="carousel-control-next"
            href={`#image${id}`}
            role="button"
            data-slide="next"
            style={{ width: "5%" }}
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="sr-only">Next</span>
          </a>
        </>
      )}
    </div>
  );
};

export default Carousel;
