import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductImg from "../../assets/image/Travell.png";
import { formatMoneyVND } from "@/utils/string";
import { ROLE_ID } from "@/const/role";
import userStore from "@/stores/userStore";
import {
  Dialog,
  DialogTitle,
  Typography,
  Button,
  DialogActions,
  DialogContent,
} from "@mui/material";
import EditTravelPackageModal from "./EditTravelPackageModal";

const ProductCard = ({ product, setIsRerender = null }) => {
  const [imageExists, setImageExists] = useState(true);
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const handleImageError = () => {
    setImageExists(false);
  };

  let isRoleCompany = userStore.roleId === ROLE_ID.COMPANY;

  const handleConfirmDelete = () => {
    // continue delete
    setOpen(false);
  };
  const handleCloseEdit = () => {
    // continue delete
    setOpenEdit(false);
  };

  // function
  const navigate = useNavigate();
  return (
    <div className="inline-flex">
      <div
        className={
          isRoleCompany
            ? `border rounded-md shadow-sm w-fit m-2 p-2`
            : `border rounded-md shadow-sm w-fit m-2 p-2 hover:opacity-70 cursor-pointer`
        }
      >
        <div onClick={() => navigate(`/market/${product?._id}`)}>
          {imageExists ? (
            <img
              className="rounded-sm h-[180px] w-[180px]"
              src={product?.imagesUrl[0]?.url}
              onError={handleImageError}
              alt="product_image"
            />
          ) : (
            <img
              className="rounded-sm h-[180px] w-[180px]"
              src={ProductImg}
              alt="product_image"
            />
          )}
          <strong className="text-lg">
            {product.price ? formatMoneyVND(product?.price) : "Giá tiền"}
          </strong>
          <p className="text-blue-500 text-base">
            {product?.name ? product.name : "Tour du lịch"}
          </p>
          <p className="text-gray-500 text-[12px]">
            {product?.company ? product?.company?.companyName : "Tên công ty"}
          </p>
        </div>
        {isRoleCompany && (
          <div className=" flex justify-around mt-1 z-20">
            <button
              onClick={() => setOpenEdit(true)}
              className="p-2 flex-1 rounded-sm text-blue-500 hover:text-white hover:bg-blue-500 focus:outline-none"
            >
              Sửa
            </button>
            <button
              onClick={() => setOpen(true)}
              className="p-2 flex-1 rounded-sm text-red-500 hover:text-white hover:bg-red-500 focus:outline-none"
            >
              Xóa
            </button>
          </div>
        )}
        {isRoleCompany && (
          <>
            <Dialog onClose={() => setOpen(false)} open={open}>
              <DialogTitle>
                <Typography variant="h6">Thông báo</Typography>
              </DialogTitle>
              <DialogContent>
                <Typography variant="h8">Bạn có chắc chắn muốn xóa</Typography>
              </DialogContent>
              <DialogActions>
                <Button
                  sx={{ fontSize: "16px" }}
                  color="error"
                  onClick={() => handleConfirmDelete()}
                >
                  Xóa
                </Button>
                <Button
                  sx={{ fontSize: "16px" }}
                  color="info"
                  onClick={() => setOpen(false)}
                >
                  Hủy
                </Button>
              </DialogActions>
            </Dialog>
            <EditTravelPackageModal
              productId={product?._id}
              setIsRerender={setIsRerender}
              open={openEdit}
              handleClose={handleCloseEdit}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
