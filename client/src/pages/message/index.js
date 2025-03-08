import LeftSide from "@/components/message/LeftSide";

const Message = () => {
  return (
    <div className="message d-flex">
      <div className="col-md-3 border-right px-0 left_mess">
        <LeftSide />
      </div>

      <div className="col-md-9 px-0 right_mess">
        <div
          className="d-flex justify-content-center 
                align-items-center flex-column h-100"
        >
          <i
            className="fab fa-facebook-messenger"
            style={{ fontSize: "5rem", color: "var(--success-bg)" }}
          />
          <h4>Tin nhắn</h4>
        </div>
      </div>
    </div>
  );
};

export default Message;
