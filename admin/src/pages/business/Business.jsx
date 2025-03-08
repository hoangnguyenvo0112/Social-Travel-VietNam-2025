import { Box, Typography, useTheme, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "@/theme/theme";
import { useEffect, useState } from "react";
import { userManagerService } from "@/services/userManager.services";
import { formatMoneyVND } from "@/utils/string";
import moment from "moment";
export default function Business() {
  const theme = useTheme();
  const [company, setCompany] = useState();
  useEffect(() => {
    userManagerService.getCompany().then(async (data) => {
      const dataRes = await data.map((item, index) => {
        return {
          ...item,
          companyName: item.companyName,
          taxCode: item.taxCode,

          phoneNumber: `03529524${index}`,
          email: item.user?.email,
          cost: item.user?.money,
          createdAt: moment(item.createdAt).format("DD/MM/YYYY"),
        };
      });
      setCompany(dataRes);
    });
  }, []);
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "companyName",
      headerName: "Tên công ty",
      flex: 1,
      cellClassName: "name-column--cell",
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
      field: "cost",
      headerName: "Cost",
      flex: 1,
      renderCell: (params) => (
        <Typography color={colors.greenAccent[500]}>
          {formatMoneyVND(params.row.cost)}
        </Typography>
      ),
    },
    {
      field: "createdAt",
      headerName: "Ngày đăng ký",
      flex: 1,
    },
  ];

  const exportToCSV = () => {
    const csvData = [
      columns.map((column) => column.headerName).join(','),
      ...company.map((row) => columns.map((column) => row[column.field]).join(',')),
    ].join('\n');
    const a = document.createElement('a');
    a.setAttribute("href", "data:text/csv;charset=utf-8,%EF%BB%BF" + encodeURI(csvData));
    a.download = 'Doanh_nghiệp.csv';
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
        boxShadow: "rgba(149,157,165,0.2) 0px 8px 24px",
        borderRadius: "15px",
      }}
    >
      <div style={{ display: "flex", marginBottom: "10px", justifyContent: "space-between" }}>
        <h2>Doanh nghiệp</h2>
        <Button sx={{ fontSize: "16px" }} variant="outlined" color="info" onClick={() => exportToCSV()}>Tải dữ liệu</Button>
      </div>
      <Box
        m="0 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-cell:focus": {
						outline: "none",
					},
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid
          rowsPerPageOptions={[10, 25, 50, 100]}
          checkboxSelection
          rows={company}
          columns={columns}
          localeText={{
            MuiTablePagination: {
              labelRowsPerPage: "Số dòng mỗi trang",
            },
          }}
        />
      </Box>
    </div>
  );
}
