import useForm from "@/components/form/useForm";
import { FORM_SCREEN_KEY } from "@/utils/constant";
import { toast, toastError } from "@/utils/toast";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputAdornment,
  MenuItem,
  TextField,
} from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import ProvinceData from "../../assets/vietnam_dataset/Index.json";
import { imageShowSmall, videoShowSmall } from "../../utils/mediaShow";

import { imageUpload } from "@/utils/imageUpload";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { packageService } from "@/services/packageServices";
import { useStore } from "react-redux";
import { NumericFormat } from "react-number-format";
import { useStoreMobx } from "@/stores";
const EditTravelPackageModal = ({ open, handleClose, setIsRerender, productId }) => {
  const [availablePackage, setAvailablePackage] = useState([])
  const { userStore } = useStoreMobx()
  const [defaultTravelPackage, setDefaultPackage] = useState({
    name: "",
    price: null,
    duration: null,
    address: "",
    numberOfPeople: null,
    description: "",
    images: [],
    imagesUrl: [],
    fromDate: new Date(),
    package: "",
    company: userStore.userDetail._id
  });
  useEffect(() => {
    packageService.getPackageByCompany().then(data => {
      setAvailablePackage(data)
    })
    packageService.recommendPackageById(productId).then(data => {
      setDefaultPackage({...data, images : []})
    })
  }, [])
  const {
    formState,
    handleSubmit,
    handleClearError,
    onChange,
    setValues,
    getValues,
  } = useForm(FORM_SCREEN_KEY.travelPackage, defaultTravelPackage);
  console.log(formState)

  // Add image
  const handleChangeImages = async (e) => {
    const files = [...e.target.files];

    let newImages = [];

    files.forEach((file) => {
      if (!file) {
        toast("file không tồn tại");
        return;
      }
      if (file.size > 1024 * 1024 * 5) {
        toast("file vượt quá kích thước");
        return;
      }
      newImages = [...newImages, file]

    });

    setValues("images", [...formState.values.images, ...newImages]);
  };

  const deleteImages = (index) => {
    const newArr = formState.values.images;
    newArr.splice(index, 1);
    setValues("images", newArr);
  };

  const deleteImagesUrl = (index) => {
    const newArr = formState.values.imagesUrl;
    newArr.splice(index, 1);
    setValues("imagesUrl", newArr);
  };

  const onSubmit = async (formState) => {
    const images = getValues("images");
    let updateImageUrl = [];

    console.log(images);
    if (images !== undefined ) {  
      const newImagesUrl = await imageUpload(images);
      updateImageUrl = [...formState.values.imagesUrl, ...newImagesUrl];
    } else {
      updateImageUrl = getValues("imagesUrl")
    }
    
    setValues("imagesUrl", updateImageUrl);
    const data = {
      ...formState.values, imagesUrl: updateImageUrl, company: userStore.userDetail._id, productId: productId
    }
    // upload
    packageService.updatePackageTravel(data).then(res => {
      toast("Bạn đã cập nhật thành công")
      setIsRerender(new Date().getTime())
    }).catch(err => { toastError("Lỗi xảy ra: ", err) })

    // Submit and close
    handleClose();
  };

  return (
    <Dialog
      open={open}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
      sx={{ "& .MuiPaper-root": { maxWidth: "900px", width: "900px" } }}
    >
      <DialogTitle>{"Thông tin chi tiết"}</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <TextField
            autoFocus
            id="name"
            name="name"
            error={formState?.errors["name"]}
            helperText={formState?.errors["name"]}
            label="Tên sản phẩm"
            type="text"
            value={formState.values.name}
            onChange={onChange}
            fullWidth
            variant="standard"
          />
          <NumericFormat
            customInput={TextField}
            error={formState?.errors["price"]}
            helperText={formState?.errors["price"]}
            value={formState.values.price}
            name="price"
            label="Giá sản phẩm"
            fullWidth
            margin="dense"
            variant="standard"
            id="cost"
            suffix={' VNĐ'}
            type="text"
            thousandSeparator=","
            allowNegative={false}
            onValueChange={(values) => {
              onChange({ target: { name: "price", value: values.floatValue } })
            }}
          />

          <div className="flex justify-between mt-3">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  value={dayjs(getValues("fromDate"))}
                  onChange={(data) => {
                    console.log(data.toISOString())
                    setValues("fromDate", data.toISOString());
                  }}
                  sx={{ width: "100%" }}
                  format="DD/MM/YYYY"
                  label="Thời gian"
                />
              </DemoContainer>
            </LocalizationProvider>
            <TextField
              margin="dense"
              id="time"
              label="Thời lượng (ngày)"
              type="number"
              name="duration"
              error={formState?.errors["duration"]}
              helperText={formState?.errors["duration"]}
              value={formState.values.duration}
              InputLabelProps={{ shrink: true }}
              onChange={onChange}
              variant="outlined"
              sx={{ marginLeft: "10px", width: "60%" }}
            />
          </div>
          <div className="flex justify-between mt-3">
            <TextField
              margin="dense"
              id="address"
              label="Địa điểm"
              select
              name="address"
              error={formState?.errors["address"]}
              helperText={formState?.errors["address"]}
              value={formState.values.address}
              onChange={onChange}
              sx={{ width: "350px" }}
            >
              {Object.keys(ProvinceData).map((item, index) => (
                <MenuItem key={index} value={item}>
                  {item}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              margin="dense"
              id="time"
              label="Số lượng người tham gia"
              type="number"
              name="numberOfPeople"
              value={formState.values.numberOfPeople}
              InputLabelProps={{ shrink: true }}
              error={formState?.errors["numberOfPeople"]}
              helperText={formState?.errors["numberOfPeople"]}
              onChange={onChange}
              variant="outlined"
              sx={{ marginLeft: "10px", width: "60%" }}
            />
          </div>
          <div className="flex justify-between mt-3">
            <TextField
              margin="dense"
              id="package"
              label="Gói sử dụng"
              select
              name="package"
              error={formState?.errors["availablePackage"]}
              helperText={formState?.errors["availablePackage"]}
              value={formState.values.package}
              onChange={(e) => { setValues('package', e.target.value) }}
              sx={{ width: "550px" }}
            >
              {availablePackage.map((item, index) => (
                <MenuItem key={index} value={item._id}>
                  {item?.package?.title}
                </MenuItem>
              ))}
            </TextField>

          </div>
          <TextField
            margin="dense"
            id="desc"
            label="Mô tả"
            type="text"
            name="description"
            value={formState.values.description}
            onChange={onChange}
            error={formState?.errors["description"]}
            helperText={formState?.errors["description"]}
            fullWidth
            multiline
            rows={4}
            maxRows={4}
            variant="filled"
          />
          <DialogContentText marginTop={1}>Hình ảnh</DialogContentText>
          <div className="w-full">
            {formState.values?.images &&
              formState.values.images.map((img, index) => (
                <div
                  key={index}
                  id="file_img"
                  className="relative inline-flex mr-2"
                >
                  {img.url ? (
                    <>
                      {img.url.match(/video/i)
                        ? videoShowSmall(img.url, 300)
                        : imageShowSmall(img.url, 300)}
                    </>
                  ) : (
                    <>
                      {img.type.match(/video/i)
                        ? videoShowSmall(URL.createObjectURL(img), 300)
                        : imageShowSmall(URL.createObjectURL(img), 300)}
                    </>
                  )}
                  <span
                    class="material-icons absolute -right-[8px] -top-[8px] text-red-500 cursor-pointer"
                    onClick={() => deleteImages(index)}
                  >
                    close
                  </span>
                </div>
              ))}
            {formState.values?.imagesUrl &&
              formState.values.imagesUrl.map((item, index) => {
                console.log(item.url);

                return <div
                  key={index}
                  id="file_img"
                  className="relative inline-flex mr-2"
                >
                  {imageShowSmall(item.url, 300)}
                  <span
                    class="material-icons absolute -right-[8px] -top-[8px] text-red-500 cursor-pointer"
                    onClick={() => deleteImagesUrl(index)}
                  >
                    close
                  </span>
                </div>

              })}
          </div>
          <div className="relative">
            <input
              className="absolute top-[30px] w-[80px] cursor-pointer left-0 opacity-0"
              type="file"
              name="file"
              id="file"
              multiple
              accept="image/*"
              onClick={e => { e.target.value = null }}
              onChange={handleChangeImages}
            />
            <span class="material-icons text-[80px] text-orange-400">
              add_photo_alternate
            </span>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button type="submit">Cập nhật</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
export default EditTravelPackageModal;
