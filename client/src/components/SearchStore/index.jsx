import { Box, InputBase } from "@mui/material";
import { memo } from "react";
import { useState } from "react";
const SearchStore = (props) => {
    const {onChange}=props;
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    setSearch(e.target.value);
    onChange&& onChange(e.target.value)
  
  };

  return (
    <Box
      display="flex"
      backgroundColor="#fff"
      sx={{ boxShadow: 1, width: "200px" }}
      borderRadius="4px"
    >
      <InputBase
        sx={{
          ml: 2,
          flex: 1,
          "& .MuiInputBase-input": {
            borderWidth: 0,
          },
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault()
          }
          
        }}
        placeholder={"Tìm kiếm ..."}
        value={search}
        onChange={handleChange}
        type="text"
      />
    </Box>
  );
};

export default memo(SearchStore);
