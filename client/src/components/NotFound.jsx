import ImgNotFound from "../assets/image/notFound.jpg"
const NotFound = () => {
  return (
    <div
      className="position-relative"
      style={{ minHeight: "calc(100vh - 70px)" }}
    >
      <p className="text-center my-3 text-red-500 text-[24px]">404 | Not Found</p>
      <img src={ImgNotFound} className="w-full h-auto m-auto" />
    </div>
  );
};

export default NotFound;
