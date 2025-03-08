import useForm from "@/components/form/useForm";
import { userManagerService } from "@/services/userManager.services";
import { tokens } from "@/theme/theme";
import { FORM_SCREEN } from "@/utils/constant";
import { toast } from "@/utils/toast";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { values } from "mobx";
import { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
const ConfigService = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [defaultPackages, setDefaultPackage] = useState([])
  useEffect(() => {
    userManagerService.getListPackage().then(data => {
      setDefaultPackage(data)
    })
  }, [])

  const { onChange, handleSubmit, formState, handleClearError } = useForm(
    FORM_SCREEN.CONFIG_SERVICE,
    defaultPackages
  );

  const handleChange = (event, index) => {
    onChange(event, index);
  };

  const onSubmit = () => {
    userManagerService.addOrUpdatePackage(formState.values).then(data => {
      toast("Cấu hình các gói dịch vụ thành công")
    }).catch(err => {
      console.log(err)
      toast("Cấu hình các gói dịch vụ thất bại")
    })

  };

  if (!defaultPackages || defaultPackages.length === 0) {
    return <></>
  }
  return (
    <div
      style={{
        backgroundColor: colors.custom[100],
        padding: "20px",
        marginBottom: "10px",
        boxShadow:
          theme.palette.mode === "dark"
            ? undefined
            : "rgba(149,157,165,0.2) 0px 8px 24px",
        borderRadius: "15px",
      }}
    >
      <Typography
        variant="h4"
        mb={1}
        fontWeight={"bold"}
        color={colors.primary[100]}
      >
        Cấu hình các gói dịch vụ
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        {defaultPackages.map((card, index) => (
          <Box
            key={index}
            style={{
              backgroundColor: colors.custom[100],
              color: colors.primary[100],
            }}
          >
            <Typography
              variant="h5"
              style={{ color: theme.palette.text.primary }}
              mb={1}
            >
              Phần {index + 1}
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={3}>
                <TextField
                  label="Tiêu đề"
                  value={formState?.values[index]?.title}
                  name="title"
                  error={formState?.errors[index]?.title}
                  helperText={formState?.errors[index]?.title}
                  onChange={(event) => handleChange(event, index)}
                  onFocus={(e) => handleClearError(e, index)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <TextField
                  label="Số lần đăng bài"

                  value={formState.values[index]?.numberOfPost}
                  error={formState?.errors[index]?.numberOfPost}
                  helperText={formState?.errors[index]?.numberOfPost}
                  name="numberOfPost"
                  onFocus={(e) => handleClearError(e, index)}
                  onChange={(event) => handleChange(event, index)}
                  fullWidth

                  InputProps={{
                    style: { color: theme.palette.text.primary },
                  }}
                />
              </Grid>
              <Grid item xs={6} sm={2}>
                {/* <TextField
                  label="Giá"

                  value={formState.values[index]?.price}
                  error={formState?.errors[index]?.price}
                  helperText={formState?.errors[index]?.price}
                  name="price"
                  onChange={(event) => handleChange(event, index)}
                  onFocus={(e) => handleClearError(e, index)}
                  fullWidth

                  InputProps={{
                    style: { color: theme.palette.text.primary },
                  }}
                /> */}
                <NumericFormat
                  customInput={TextField}
                  value={formState.values[index]?.price}
                  error={formState?.errors[index]?.price}
                  helperText={formState?.errors[index]?.price}
                  name="price"
                  label="Giá"
                  fullWidth
                  // variant="standard"
                  suffix={' VNĐ'}
                  type="text"
                  thousandSeparator=","
                  allowNegative={false}
                  onChange={(event) => {onChange(event,index)}}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Chi tiết"
                  name='description'
                  value={formState.values[index]?.description}
                  error={formState?.errors[index]?.description}
                  helperText={formState?.errors[index]?.description}
                  onChange={(event) => handleChange(event, index)}
                  onFocus={(e) => handleClearError(e, index)}
                  multiline
                  rows={4}
                  fullWidth
                  inputProps={{
                    style: { color: theme.palette.text.primary },
                  }}
                />
              </Grid>
            </Grid>
          </Box>
        ))}
        <Button
          variant="contained"
          color="info"
          sx={{ fontSize: "16px" }}
          type="submit"
        >
          Lưu
        </Button>
      </form>
    </div>
  );
};

export default ConfigService;
