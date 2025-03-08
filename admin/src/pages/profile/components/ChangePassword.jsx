import { authService } from "@/services/auth.services";
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
import React, { useState } from "react";
import * as yup from "yup";
import { tokens } from "../../../theme/theme";

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

const ChangePassword = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { userStore } = useStore();
  const { user } = userStore;

  const [messageError, setMessageError] = useState();
  const isNonMobile = useMediaQuery("(min-width:600px)");

  // Show alert - begin
  const [state, setState] = React.useState({
    open: false,
    vertical: "bottom",
    horizontal: "right",
    content: "",
  });
  const { vertical, horizontal, open, content } = state;

  const handleClose = () => {
    setState({ ...state, open: false });
  };
  //end

  // Function summit form
  const handleFormSubmit = (values) => {
    console.log(values);
    authService
      .changePassword(values)
      .then((data) => {
        setState({ ...state, open: true, content: "Đổi mật khẩu thành công" });
      })
      .catch((err) => {
        if (err?.response?.data?.message) {
          setState({ ...state, open: true, content: err?.response?.data?.message });
        }
      });
  };

  const checkoutSchema = yup.object().shape({
    oldPassword: yup
      .string()
      .required("Chưa điền thông tin"),
    password: yup
      .string()
      .min(6, "Mật khẩu cần ít nhất ký tự")
      .required("Chưa điền thông tin"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Mật khẩu xác nhận không khớp")
      .required("Chưa điền thông tin"),
  });
  const initialValues = {
    oldPassword: "",
    password: "",
    confirmPassword: "",
  };

  return (
    <Box padding={"20px"}>
      <Typography
        variant="h4"
        fontWeight="bold"
        color={colors.grey[100]}
        marginBottom={"20px"}
      >
        Đổi mật khẩu
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
              gap="20px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="password"
                label="Nhập mật khẩu cũ"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.oldPassword}
                name="oldPassword"
                error={!!touched.oldPassword && !!errors.oldPassword}
                helperText={touched.oldPassword && errors.oldPassword}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="password"
                label="Mật khẩu mới"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={!!touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="password"
                label="Xác nhận mật khẩu"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.confirmPassword}
                name="confirmPassword"
                error={!!touched.confirmPassword && !!errors.confirmPassword}
                helperText={touched.confirmPassword && errors.confirmPassword}
                sx={{ gridColumn: "span 2" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="info" variant="contained">
                Lưu mật khẩu
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
          severity={ content === "Đổi mật khẩu thành công" ? "success" : "error"}
          sx={{ width: "100%" }}
        >
          {content}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ChangePassword;
