import { groupService } from "@/services/groupServices";
import { Box, useTheme, Button } from "@mui/material";
import { DataGrid, GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { tokens } from "../../theme/theme";

export default function Groups() {
  const [groups, setGroups] = useState([]);
  useEffect(() => {
    groupService.getAllGroup().then((data) => {
      const dataRes = data.map((group) => {
        return {
          id: group._id,
          name: group.name,
          numberMember: group.members.length,
          creator: group.creator.username,
          email: group.creator.email,
        };
      });
      setGroups(dataRes);
    });
  }, []);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "name",
      headerName: "Tên nhóm",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "numberMember",
      headerName: "Số thành viên",
      type: "number",
      headerAlign: "left",
      align: "left",
      flex: 1,
    },
    {
      field: "creator",
      headerName: "Người tạo nhóm",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
  ];

  const exportToCSV = () => {
    const csvData = [
      columns.map((column) => column.headerName).join(','),
      ...groups.map((row) => columns.map((column) => row[column.field]).join(',')),
    ].join('\n');
    const a = document.createElement('a');
    a.setAttribute("href", "data:text/csv;charset=utf-8,%EF%BB%BF" + encodeURI(csvData));
    a.download = 'Hội_nhóm.csv';
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
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Hội nhóm</h2>
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
            backgroundColor: colors.custom[600],
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.custom[100],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rowsPerPageOptions={[10, 25, 50, 100]}
          rows={groups}
          columns={columns}
          components={{ Toolbar: CustomToolbar }}
          localeText={{
            MuiTablePagination: {
              labelRowsPerPage: "Số dòng mỗi trang:",
            },
            toolbarColumns: "Cột",
            toolbarFilters: "Lọc",
            toolbarDensity: "Giãn dòng",
            // filterPanelColumns:'ssss'
          }}
        />
      </Box>
    </div>
  );
}

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
    </GridToolbarContainer>
  );
}
