import { packageService } from "@/services/packageServices";
import { toastError } from "@/utils/toast";
import SettingsIcon from "@mui/icons-material/Settings";
import { useEffect, useState } from "react";
import SearchMui from "../../components/SearchMui";
import ProductCard from "./ProductCard";
import TravelPackageModal from "./TravelPackageModal";
import { useStoreMobx } from "@/stores";
import { ROLE_ID } from "@/const/role";
// Fake data
const productListInit = [
  {
    id: "adfhsdfjkshf001",
    avatar:
      "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bW91bnRhaW58ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
    name: "Tour du lịch Ninh Bình",
    cost: 6500000,
    company: "Cty TNHH Du Lịch Đại Nam",
  },
  {
    id: "adfhsdfjkshf002",
    avatar:
      "https://images.unsplash.com/photo-1647891938250-954addeb9c51?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxzZWFyY2h8MXx8bW91bnRhaW58ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
    name: "Tour du lịch Ninh Bình",
    cost: 6500000,
    company: "Cty TNHH Du Lịch Đại Nam",
  },
  {
    id: "adfhsdfjkshf003",
    avatar:
      "https://images.unsplash.com/photo-1560493676-04071c5f467b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZmFybXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
    name: "Tour du lịch Ninh Bình",
    cost: 6500000,
    company: "Cty TNHH Du Lịch Đại Nam",
  },
  {
    id: "adfhsdfjkshf004",
    avatar:
      "https://plus.unsplash.com/premium_photo-1667860234741-0e500d0e5ba5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZmFybXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
    name: "Tour du lịch Ninh Bình",
    cost: 6500000,
    company: "Cty TNHH Du Lịch Đại Nam",
  },
];

const Shop = () => {
  const [packageManager, setPackageManager] = useState();
  const { userStore } = useStoreMobx();
  const [recommendPackage,setRecommendPackage]=useState([])
  const [isRerender,setIsRerender]=useState(null)

  useEffect(() => {
    if (userStore.roleId === ROLE_ID.COMPANY) {
      packageService.getPackageManager().then((data) => {
        setPackageManager(data);
      });
     
    }
    packageService.recommendPackage().then(data=>{
      setRecommendPackage(data)
    })
  }, [isRerender]);
  // innit
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    if (
      !packageManager ||
      !packageManager.isAllowPost ||
      packageManager.packageOrder === 0
    ) {
      toastError(
        "Bạn hiện đã hết lượt đăng bài. Vui lòng đăng kí gói để tiếp tục sử dụng dịch vụ"
      );
    } else {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="w-full flex justify-between prevent-select ">
      <div className="hidden md:block md:w-1/4 sticky top-[60px] left-0 h-fit">
        <div className="flex justify-between m-3 items-center">
          <strong className="text-xl">Cửa hàng của tôi</strong>
          <SettingsIcon />
        </div>
        <div className="m-3 my-4 flex justify-between items-center">
          <SearchMui />
        </div>

        <div
          className="m-3 flex justify-between items-center cursor-pointer hover:text-blue-500 "
          onClick={() => handleClickOpen()}
        >
          <div className="flex items-center">
            <span class="material-icons p-2 rounded-full bg-slate-200">
              library_add
            </span>
            <p className="ml-2 text-md">Đăng địa điểm</p>
          </div>
          <span class="material-icons">navigate_next</span>
        </div>
        <div className="m-3 flex justify-between items-center  hover:text-blue-500 ">
          <div className="flex items-center">
            <p className="truncate-lines-2 ml-2 text-md">
              Số lần được đăng còn lại: {packageManager?.packageOrder?.total??0}
            </p>
          </div>
        </div>
      </div>

      <div className="md:w-3/4 w-full h-fit min-h-[90vh] bg-white p-4">
        <ReadMoreList list={recommendPackage} itemsPerPage={20} setIsRerender={setIsRerender} />
      </div>
      <TravelPackageModal setIsRerender={setIsRerender} open={open} handleClose={handleClose} />
    </div>
  );
};

const ReadMoreList = ({ list, itemsPerPage, setIsRerender = null }) => {
  const [visibleItems, setVisibleItems] = useState(itemsPerPage);
  return (
    <>
      {list.slice(0, visibleItems).map((item, index) => (
        <ProductCard key={index} product={item} setIsRerender={setIsRerender}  />
      ))}
    </>
  );
};

export default Shop;
