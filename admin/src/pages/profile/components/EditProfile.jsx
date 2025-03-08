import { useStore } from "@/stores";
import {
  Alert,
  Box,
  Button,
  Slide,
  Snackbar,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Formik } from "formik";
import React from "react";
import * as yup from "yup";
import { tokens } from "../../../theme/theme";
import { authService } from "@/services/auth.services";

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

const EditProfile = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { userStore } = useStore();
  const { user,userDetail } = userStore;
  const isNonMobile = useMediaQuery("(min-width:600px)");

  // Show alert - begin
  const [state, setState] = React.useState({
    open: false,
    vertical: "bottom",
    horizontal: "right",
  });
  const { vertical, horizontal, open } = state;

  const handleClose = () => {
    setState({ ...state, open: false });
  };
  //end

  const handleFormSubmit = (data) => {
    console.log(data)
    authService.updateUser(data)
    setState({ ...state, open: true });
    
  };

  const phoneRegExp =
    /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

  const checkoutSchema = yup.object().shape({
    fullname: yup.string().required("Chưa điền thông tin"),
    username: yup.string().required("Chưa điền thông tin"),
    email: yup
      .string()
      .email("Email không đúng định dạng")
      .required("Chưa điền thông tin"),
    gender: yup
      .string()
      .oneOf(["Nam", "Nữ","Khác"], "Thông tin cần định dạng Nam hoặc Nữ hoặc Khác"),
    story: yup.string(),
    mobile: yup
      .string()
      .matches(phoneRegExp, "Số điện thoại không đúng định dạng"),
    address: yup.string(),
    address2: yup.string(),
  });
  const initialValues = {
    fullname: userDetail.fullname,
    username: user.username,
    email: user.email,
    gender: userDetail.gender,
    story: userDetail.story,
    mobile: userDetail.mobile,
    address: userDetail.address,
  
  };

  return (
    <Box padding={"20px"}>
      <Typography
        variant="h4"
        fontWeight="bold"
        color={colors.grey[100]}
        marginBottom={"10px"}
      >
        Chỉnh sửa thông tin
      </Typography>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="10px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="standard"
                type="text"
                label="Họ tên"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.fullname}
                name="fullname"
                error={!!touched.fullname && !!errors.fullname}
                helperText={touched.fullname && errors.fullname}
                sx={{ gridColumn: "span 2" }}
                size="small"
              />
              <TextField
                fullWidth
                variant="standard"
                type="text"
                label="Tên tài khoản"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.username}
                name="username"
                error={!!touched.username && !!errors.username}
                helperText={touched.username && errors.username}
                sx={{ gridColumn: "span 2" }}
                size="small"
              />
              <TextField
                fullWidth
                variant="standard"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
                size="small"
              />
              <TextField
                fullWidth
                variant="standard"
                type="text"
                label="Giới tính"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.gender}
                name="gender"
                error={!!touched.gender && !!errors.gender}
                helperText={touched.gender && errors.gender}
                sx={{ gridColumn: "span 2" }}
                size="small"
              />
              <TextField
                fullWidth
                variant="standard"
                type="text"
                label="Tiểu sử"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.story}
                name="story"
                error={!!touched.story && !!errors.story}
                helperText={touched.story && errors.story}
                sx={{ gridColumn: "span 2" }}
                size="small"
              />
              <TextField
                fullWidth
                variant="standard"
                type="text"
                label="Số điện thoại"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.mobile}
                name="mobile"
                error={!!touched.mobile && !!errors.mobile}
                helperText={touched.mobile && errors.mobile}
                sx={{ gridColumn: "span 2" }}
                size="small"
              />
              <TextField
                fullWidth
                variant="standard"
                type="text"
                label="Địa chỉ"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address}
                name="address"
                error={!!touched.address && !!errors.address}
                helperText={touched.address && errors.address}
                sx={{ gridColumn: "span 2" }}
                size="small"
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="info" variant="contained">
                Lưu thông tin
              </Button>
            </Box>
          </form>
        )}
      </Formik>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        TransitionComponent={SlideTransition}
        onClose={handleClose}
        autoHideDuration={4000}
        key={vertical + horizontal}
      >
        <Alert
          variant="filled"
          onClose={handleClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          Đổi thông tin cá nhân thành công
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default EditProfile;
