import { authService } from "@/services/auth.services";
import { userManagerService } from "@/services/userManager.services";
import { toast } from "@/utils/toast";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TablePagination,
  Typography,
  useTheme,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { tokens } from "../../theme/theme";

export default function Members() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    userManagerService.getUser().then(async (data) => {
      const dataRes = await data.map((item, index) => {
        return {
          ...item,
          fullname: item.fullname,
          gender:
            item.gender == "male"
              ? "Nam"
              : item.gender === "female"
              ? "Nữ"
              : "Khác",
          phoneNumber: item.mobile,
          email: item.user?.email,
          roleName: item.user?.role?.roleName,
          id: `${item._id}${index}`,
        };
      });
      setUsers(dataRes);
    });
  }, []);

  // user Dialog
  const [openUserDialog, setOpenUserDialog] = useState(false);
  const [isBan, setIsBan] = useState(false);
  const [userSelected, setUserSelected] = useState();
  console.log(userSelected);
  const handleSave = () => {
    setOpenUserDialog(false);
  };

  const handleOpen = (user) => {
    setUserSelected(user);
    setOpenUserDialog(true);
  };

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "fullname",
      headerName: "Họ tên",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "gender",
      headerName: "Giới tính",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "phoneNumber",
      headerName: "Số điện thoại",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "roleName",
      headerName: "Vai trò",
      flex: 1,
      renderCell: ({ row: { user, roleName } }, index) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="flex-start"
            backgroundColor={
              roleName === "admin"
                ? colors.blueAccent[600]
                : roleName === "manager"
                ? colors.greenAccent[700]
                : roleName === "user"
                ? colors.greenAccent[700]
                : roleName === "staff"
                ? colors.blueAccent[700]
                : colors.redAccent[600]
            }
            borderRadius="4px"
            sx={{ cursor: "pointer" }}
            onClick={() => handleOpen(user)}
          >
            {/* Đang để roleName trống thì hiển thị chặn có thể thay đổi sau */}
            {roleName === "admin" && <AdminPanelSettingsOutlinedIcon />}
            {roleName === "manager" && <SecurityOutlinedIcon />}
            {roleName === "user" && <LockOpenOutlinedIcon />}
            {roleName === "staff" && <SupportAgentIcon />}
            {!roleName && <LockPersonIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {roleName ? roleName : "Chặn"}
            </Typography>
          </Box>
        );
      },
    },
  ];

  const exportToCSV = () => {
    const csvData = [
      columns.map((column) => column.headerName).join(","),
      ...users.map((row) =>
        columns.map((column) => row[column.field]).join(",")
      ),
    ].join("\n");
    const a = document.createElement("a");
    a.setAttribute(
      "href",
      "data:text/csv;charset=utf-8,%EF%BB%BF" + encodeURI(csvData)
    );
    a.download = "Thành_viên.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

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
      <div
        style={{
          display: "flex",
          marginBottom: "10px",
          justifyContent: "space-between",
        }}
      >
        <h2>Thành viên</h2>
        <Button
          sx={{ fontSize: "16px" }}
          variant="outlined"
          color="info"
          onClick={() => exportToCSV()}
        >
          Tải dữ liệu
        </Button>
      </div>
      <Box
        m="0 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            border: "none",
            outline: "none",
          },
          "& .MuiDataGrid-cell:focus": {
            outline: "none",
          },
          "& .MuiDataGrid-cell.active": {
            border: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.custom[600],
            border: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.custom[100],
          },
          "& .MuiDataGrid-footerContainer": {
            border: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid
          components={<TablePagination labelRowsPerPage={"Your text"} />}
          rows={users}
          columns={columns}
          localeText={{
            MuiTablePagination: {
              labelRowsPerPage: "Số dòng mỗi trang",
            },
          }}
        />
      </Box>
      <Dialog open={openUserDialog} onClose={() => setOpenUserDialog(false)}>
        <DialogTitle>
          <Typography variant="h3">Thông tin</Typography>
        </DialogTitle>
        <DialogContent style={{ width: "600px" }}>
          {userSelected == null ? (
            <Typography variant="h2">Thông tin trống</Typography>
          ) : (
            <Box
              display="flex"
              justifyContent="space-around"
              alignItems="center"
              sx={{ textAlign: "center" }}
            >
              <Avatar
                sx={{ width: 120, height: 120 }}
                alt={userSelected?.username}
                src={userSelected?.avatar}
              />
              <div style={{ textAlign: "left" }}>
                <Typography variant="h4" fontWeight={"700"} marginTop={"15px"}>
                  Username: {userSelected?.username}
                </Typography>
                <Typography
                  variant="h4"
                  fontWeight={"400"}
                  marginTop={"2px"}
                  color={colors.grey[400]}
                >
                  Email: {userSelected?.email}
                </Typography>
                <Typography
                  variant="h4"
                  fontWeight={"400"}
                  marginTop={"2px"}
                  color={colors.blueAccent[400]}
                >
                  {userSelected?.followers.length} Người theo dõi
                </Typography>
                <Typography
                  variant="h4"
                  fontWeight={"400"}
                  marginTop={"2px"}
                  color={colors.greenAccent[400]}
                >
                  {userSelected?.following.length} Đang theo dõi
                </Typography>
                <Button
                  sx={{ fontSize: "16px", mt: 1 }}
                  color={`${isBan ? "info" : "error"}`}
                  variant="outlined"
                  onClick={() => {
                    if (!userSelected.isBlocked) {
                      authService.blockUser(userSelected._id).then((data) => {
                        if (data) {
                          toast(
                            `Người dùng ${userSelected.username} đã bị chặn`
                          );
                          setUserSelected((prev) => {
                            return {
                              ...prev,
                              isBlocked: true,
                            };
                          });
                        }
                      });
                    } else {
                      authService.unBlockUser(userSelected._id).then((data) => {
                        if (data) {
                          if (data) {
                            toast(
                              `Người dùng ${userSelected.username} đã được bỏ chặn`
                            );
                            setUserSelected((prev) => {
                              return {
                                ...prev,
                                isBlocked: false,
                              };
                            });
                          }
                        }
                      });
                    }
                  }}
                >
                  {userSelected.isBlocked ? "Bỏ chặn" : "Chặn"}
                </Button>
              </div>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            sx={{ fontSize: "16px" }}
            color="info"
            onClick={() => setOpenUserDialog(false)}
          >
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
