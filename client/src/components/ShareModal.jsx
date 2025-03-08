import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  RedditIcon,
  RedditShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";

const ShareModal = ({ url, theme }) => {
  return (
    <div
      className="d-flex justify-content-between px-4 py-2 max-w-[300px] ml-auto mr-0"
      style={{ filter: theme ? "invert(1)" : "invert(0)" }}
    >
      <FacebookShareButton url={url}>
        <FacebookIcon className="hover:animate-bounce" round={true} size={32} />
      </FacebookShareButton>

      <TwitterShareButton url={url}>
        <TwitterIcon className="hover:animate-bounce" round={true} size={32} />
      </TwitterShareButton>

      <EmailShareButton url={url}>
        <EmailIcon className="hover:animate-bounce" round={true} size={32} />
      </EmailShareButton>

      <RedditShareButton url={url}>
        <RedditIcon className="hover:animate-bounce" round={true} size={32} />
      </RedditShareButton>

      <TelegramShareButton url={url}>
        <TelegramIcon className="hover:animate-bounce" round={true} size={32} />
      </TelegramShareButton>

      <WhatsappShareButton url={url}>
        <WhatsappIcon className="hover:animate-bounce" round={true} size={32} />
      </WhatsappShareButton>
    </div>
  );
};

export default ShareModal;
