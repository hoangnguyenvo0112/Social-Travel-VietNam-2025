import {
  Button,
  Slider,
  Typography,
  IconButton,
  Tooltip,
  Stepper,
  Step,
  StepLabel,
  Box,
  TextField,
} from "@mui/material";
import { useCallback, useRef, useState, Fragment, useEffect } from "react";
import Cropper from "react-easy-crop";
import ImgDialog from "./ImgDialog";
import getCroppedImg from "./cropImage";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import { toast, toastError } from "@/utils/toast";
import { imageUpload, videoUpload } from "@/utils/imageUpload";
import Loading from "@/components/Loading";
import { postDataAPI } from "@/utils/fetchData";
import { postService } from "@/services/postServices";

const steps = ["Thêm video", "Thêm thumbnail", "Thêm tiêu đề"];

export default function CreateNew({ setIsCreateNew, setUpdateNew }) {
  const [activeStep, setActiveStep] = useState(0);
  const [thumbnail, setThumbnail] = useState(null);
  const [videoSrc, setVideoSrc] = useState(null);
  const [content, setContent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [dataVideoUrl, setDataVideoUrl] = useState(null);
  const [dataImageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    // const isContainPayload = () => {
    // 	if (!dataVideoUrl) {
    // 		// toastError("video bị lỗi trong quá trình upload vui long thử lại");
    // 		return false
    // 	}
    // 	if (!dataImageUrl) {
    // 		//("hình ảnh bị lỗi trong quá trình upload vui long thử lại");
    // 		return false
    // 	}
    // 	return true
    // }
    const isContainData = () => {
      if (!dataVideoUrl || !dataImageUrl) {
        return false;
      }
      return true;
    };
    if (isContainData()) {
      setIsLoading(false);
    }
  }, [dataVideoUrl, dataImageUrl]);
  useEffect(() => {
    if (!isLoading && activeStep === steps.length - 1) {
      handleCreateNews();
    }
  }, [isLoading]);
  const handleSubmit = () => {
    if (!dataVideoUrl || !dataImageUrl) {
      setIsLoading(true);
    } else {
      handleCreateNews();
    }
  };

  const handleNext = () => {
    if (activeStep === 0 && videoSrc === null) {
      toastError("Vui lòng nhập video");
      return;
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    if (activeStep === 1 && videoSrc !== null) {
      setVideoSrc(null);
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
      return;
    }
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleCreateNews = async () => {
    const data = {
      content: content,
      thumbnail: dataImageUrl[0].url,
      videoUrl: dataVideoUrl.url,
    };
    try {
      const res = await postService.addStory(data);
      setUpdateNew(res);
      toast("Tạo thành công");
      setDataVideoUrl(null);
      setImageUrl(null);
      setIsLoading(false);
      setIsCreateNew(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={index} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {isLoading && activeStep === steps.length - 1 ? (
        <Fragment>
          {isLoading && (
            <Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>Đang tạo...</Typography>
              <Loading />
            </Fragment>
          )}
        </Fragment>
      ) : (
        <Fragment>
          {activeStep === 0 && (
            <AddVideo
              setVideoSrc={setVideoSrc}
              videoSrc={videoSrc}
              setDataVideoUrl={setDataVideoUrl}
              setIsLoading={setIsLoading}
            />
          )}
          {activeStep === 1 && (
            <ImageCrop
              thumbnail={thumbnail}
              setThumbnail={setThumbnail}
              handleNext={handleNext}
              setImageUrl={setImageUrl}
            />
          )}
          {activeStep === 2 && (
            <div className="w-full min-h-[400px] h-fit relative">
              <TextField
                sx={{
                  position: "absolute",
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
                placeholder="Nhập tiêu đề"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                variant="outlined"
                fullWidth
                onError={content === ""}
                helperText={content === "" && "Vui lòng nhập tiêu đề"}
              />
            </div>
          )}
          {activeStep !== 1 && (
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Quay lại
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button
                onClick={() => {
                  if (activeStep === steps.length - 1) {
                    handleSubmit();
                  } else {
                    handleNext();
                  }
                }}
              >
                {activeStep === steps.length - 1 ? "Hoàn thành" : "Tiếp"}
              </Button>
            </Box>
          )}
        </Fragment>
      )}
    </Box>
  );
}

const ImageCrop = ({ setThumbnail, thumbnail, handleNext, setImageUrl }) => {
  const [src, setSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const convertBlobUrlToFile = async (blobUrl, fileName) => {
    try {
      const response = await fetch(blobUrl);
      const blob = await response.blob();
      const file = new File([blob], fileName, { type: blob.type });
      return file;
    } catch (error) {
      console.error("Error occurred while converting Blob URL to file:", error);
      return null;
    }
  };

  const handleNextClick = async () => {
    if (thumbnail !== null && src === null) {
      handleNext();
      return;
    }

    if (src === null) {
      toastError("Vui lòng nhập hình ảnh");
      return;
    }

    try {
      toast("Vui long chờ trong ít giây");
      const croppedImage = await getCroppedImg(
        src,
        croppedAreaPixels,
        rotation
      );
      setThumbnail(croppedImage);
      const thumbnailFile = await convertBlobUrlToFile(
        croppedImage,
        "croppedImage.png"
      );
      const imageUrl = await imageUpload([thumbnailFile]);
      setImageUrl(imageUrl);
      handleNext();
    } catch (err) {
      toastError(err.message);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setSrc(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const inputRef = useRef(null);

  return (
    <div>
      <div className="w-full min-h-[400px] h-fit">
        <input
          type="file"
          className="hidden"
          ref={inputRef}
          accept="image/*"
          onChange={handleFileChange}
        />
        <div className="flex justify-center">
          <Tooltip title="Chọn hình ảnh" arrow placement="bottom">
            <IconButton
              type="button"
              className="focus:outline-none"
              sx={{ p: 1 }}
              onClick={() => {
                inputRef.current.click();
              }}
            >
              <AddPhotoAlternateIcon
                sx={{ fontSize: "40px", color: "#22c55e" }}
              />
            </IconButton>
          </Tooltip>
        </div>
        {src && (
          <div className="mx-4">
            <div className="relative w-full h-[300px] bg-[#333]">
              <Cropper
                image={src}
                crop={crop}
                rotation={rotation}
                zoom={zoom}
                aspect={3 / 4}
                onCropChange={setCrop}
                onRotationChange={setRotation}
                onCropComplete={onCropComplete}
                // onZoomChange={setZoom}
              />
            </div>

            <div>
              <div>
                <h1>Zoom</h1>
                <Slider
                  value={zoom}
                  min={1}
                  max={3}
                  step={0.1}
                  aria-labelledby="Zoom"
                  onChange={(e, zoom) => setZoom(zoom)}
                />
              </div>
              <div>
                <Typography variant="overline">Rotation</Typography>
                <Slider
                  value={rotation}
                  min={0}
                  max={360}
                  step={1}
                  aria-labelledby="Rotation"
                  onChange={(e, rotation) => setRotation(rotation)}
                />
              </div>
            </div>
          </div>
        )}
        {src === null && thumbnail && (
          <div className="flex justify-center">
            <img src={thumbnail} className="w-[270px] h-[480px]" />
          </div>
        )}
      </div>
      <Box sx={{ display: "flex", flexDirection: "row", px: 2 }}>
        <Button color="inherit" disabled sx={{ mr: 1 }}>
          Quay lại
        </Button>
        <Box sx={{ flex: "1 1 auto" }} />
        <Button onClick={handleNextClick}>Tiếp</Button>
      </Box>
    </div>
  );
};

const AddVideo = ({ setVideoSrc, videoSrc, setDataVideoUrl, setIsLoading }) => {
  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setVideoSrc(reader.result);

      try {
        videoUpload(reader.result).then((data) => {
          setDataVideoUrl(data);
          // setIsLoading(false);
        });
      } catch (err) {
        toastError(err);
      }
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const inputVideoRef = useRef(null);

  return (
    <div className="w-full min-h-[400px] h-fit">
      <input
        type="file"
        className="hidden"
        ref={inputVideoRef}
        accept="video/*"
        onChange={handleVideoChange}
      />
      <div className="flex justify-center">
        <Tooltip title="Chọn video" arrow placement="bottom">
          <IconButton
            type="button"
            className="focus:outline-none"
            sx={{ p: 1 }}
            onClick={() => {
              inputVideoRef.current.click();
            }}
          >
            <OndemandVideoIcon sx={{ fontSize: "40px", color: "#ff0808" }} />
          </IconButton>
        </Tooltip>
      </div>
      {videoSrc && (
        <div className="flex justify-center">
          <video className="w-[270px] h-[480px] bg-slate-200" controls>
            <source src={videoSrc} />
          </video>
        </div>
      )}
    </div>
  );
};
