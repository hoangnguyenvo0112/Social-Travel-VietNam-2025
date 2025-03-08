import Map from "@/components/Map";
import QuiltedImageList from "@/components/QuiltedImageList";
import { useState } from "react";

const CardBody = ({ post, theme }) => {
  const [readMore, setReadMore] = useState(false);

  return (
    <div className="card_body">
      <div className="card_body-content">
        <span>
          {post.content.length < 60
            ? post.content
            : readMore
              ? post.content + " "
              : post.content.slice(0, 60) + "....."}
        </span>
        {post.content.length > 60 && (
          <span className="readMore" onClick={() => setReadMore(!readMore)}>
            {readMore ? "Ẩn" : "Xem thêm"}
          </span>
        )}

      </div>
      {
        post?.location &&
          <div className="mb-2">

           <Map location={post.location} />
          </div>
      }
      {post.images.length > 0 && (
        // <Carousel images={post.images} id={post._id} />
        // Thêm thộc tính row/col cho ảnh để định hình bố cục
        <QuiltedImageList listImg={post.images} id={post._id} />
      )}
    </div>
  );
};

export default CardBody;
