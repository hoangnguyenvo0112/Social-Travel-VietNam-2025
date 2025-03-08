import { Box, TextField, Button, useMediaQuery, IconButton, InputAdornment } from "@mui/material";
import { Formik } from "formik"
import * as yup from "yup";
import { useState } from "react";
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

export default function CreateStaff() {
	const isNonMobile = useMediaQuery("(min-width:600px)");

	const handleFormSubmit = (values) => {

	};

	const [showPassword, setShowPassword] = useState(false);
	const [passwordValue, setPasswordValue] = useState('');
	const handleClickShowPassword = () => setShowPassword(!showPassword);
	const handleMouseDownPassword = () => setShowPassword(!showPassword);

	const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

	const checkoutSchema = yup.object().shape({
		fullName: yup.string().required("Không được để trống"),
		userName: yup.string().required("Không được để trống"),
		email: yup.string().email("invalid email").required("Không được để trống"),
		password: yup.string().min(6, 'cần ít nhất 6 ký tự').required("Không được để trống"),
		confirmPassword: yup.string().matches(passwordValue, "Mật khẩu xác nhận không khớp").required("Không được để trống"),
		contact: yup
			.string()
			.matches(phoneRegExp, "Số điện thoại không đúng")
			.min(10, "Số điện thoại cần 10 ký tự")
			.max(10, "Số điện thoại chỉ 10 ký tự")
			.required("Không được để trống"),
		address1: yup.string(),
		address2: yup.string(),
	});
	const initialValues = {
		fullName: "",
		userName: "",
		email: "",
		password: "",
		confirmPassword: "",
		contact: "",
		address1: "",
		address2: "",
	};

	return (
		<Box m="0px 20px 20px 20px">
			<h2 style={{marginBottom: "10px"}}>Tạo nhân viên</h2>
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
							gap="30px"
							gridTemplateColumns="repeat(4, minmax(0, 1fr))"
							sx={{
								"& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
							}}
						>
							<TextField
								fullWidth
								variant="filled"
								type="text"
								label="Họ tên(*)"
								onBlur={handleBlur}
								onChange={handleChange}
								value={values.fullName}
								name="fullName"
								error={!!touched.fullName && !!errors.fullName}
								helperText={touched.fullName && errors.fullName}
								sx={{ gridColumn: "span 2" }}
							/>
							<TextField
								fullWidth
								variant="filled"
								type="text"
								label="Tên đăng nhập(*)"
								onBlur={handleBlur}
								onChange={handleChange}
								value={values.userName}
								name="userName"
								error={!!touched.userName && !!errors.userName}
								helperText={touched.userName && errors.userName}
								sx={{ gridColumn: "span 2" }}
							/>
							<TextField
								fullWidth
								variant="filled"
								type="text"
								label="Email(*)"
								onBlur={handleBlur}
								onChange={handleChange}
								value={values.email}
								name="email"
								error={!!touched.email && !!errors.email}
								helperText={touched.email && errors.email}
								sx={{ gridColumn: "span 2" }}
							/>
							<TextField
								fullWidth
								variant="filled"
								type="text"
								label="Số điện thoại(*)"
								onBlur={handleBlur}
								onChange={handleChange}
								value={values.contact}
								name="contact"
								error={!!touched.contact && !!errors.contact}
								helperText={touched.contact && errors.contact}
								sx={{ gridColumn: "span 2" }}
							/>
							<TextField
								fullWidth
								variant="filled"

								type={showPassword ? "text" : "password"}
								label="Mật khẩu(*)"
								onBlur={handleBlur}
								onChange={e => {
									handleChange(e);
									setPasswordValue(e.target.value);
								}}
								value={values.password}
								name="password"
								error={!!touched.password && !!errors.password}
								helperText={touched.password && errors.password}
								sx={{ gridColumn: "span 2" }}
								InputProps={{ // <-- This is where the toggle button is added.
									endAdornment: (
										<InputAdornment position="end">
											<IconButton
												aria-label="toggle password visibility"
												onClick={handleClickShowPassword}
												onMouseDown={handleMouseDownPassword}
											>
												{showPassword ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
											</IconButton>
										</InputAdornment>
									)
								}}
							/>
							<TextField
								fullWidth
								variant="filled"
								type="password"
								label="Xác nhận mật khẩu(*)"
								onBlur={handleBlur}
								onChange={handleChange}
								value={values.confirmPassword}
								name="confirmPassword"
								error={!!touched.confirmPassword && !!errors.confirmPassword}
								helperText={touched.confirmPassword && errors.confirmPassword}
								sx={{ gridColumn: "span 2" }}
							/>

							<TextField
								fullWidth
								variant="filled"
								type="text"
								label="Địa chỉ 1"
								onBlur={handleBlur}
								onChange={handleChange}
								value={values.address1}
								name="address1"
								error={!!touched.address1 && !!errors.address1}
								helperText={touched.address1 && errors.address1}
								sx={{ gridColumn: "span 4" }}
							/>
							
						</Box>
						<Box display="flex" justifyContent="end" mt="20px">
							<Button sx={{ fontSize: "16px" }} type="submit" color="info" variant="contained">
								Tạo nhân viên mới
							</Button>
						</Box>
					</form>
				)}
			</Formik>
		</Box>
	)
}