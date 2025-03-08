import Map from "@/components/Map";
import Carousel from "@/components/carousel";
import { packageService } from "@/services/packageServices";
import { formatMoneyVND } from "@/utils/string";
import BusinessIcon from '@mui/icons-material/Business';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CloseIcon from '@mui/icons-material/Close';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import GroupsIcon from '@mui/icons-material/Groups';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PaidIcon from '@mui/icons-material/Paid';
import PunchClockIcon from '@mui/icons-material/PunchClock';
import moment from "moment";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { overrideTailwindClasses } from "tailwind-override";

const Product = () => {
  const {id}=useParams()
  
  
  const navigate = useNavigate();
  const [isReadMore, setIsReadMore] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [packageTravel,setPackageTravel]=useState({})
  useEffect(()=>{
    packageService.recommendPackageById(id).then(data=>{
      setPackageTravel(data)
    })
  },[])
  return (
    <div className="w-full md:flex justify-between prevent-select ">
      <div className="md:w-3/4 w-full h-fit md:sticky top-[60px] min-h-[90vh] bg-white p-4">
        <Carousel images={packageTravel.imagesUrl??[]} id={packageTravel._id} isProduct={true} />
      </div>
      <div className="md:w-1/4 w-full top-[60px] left-0 h-fit">
        <div className="flex justify-between m-3 items-center">
          <strong className="text-xl">{packageTravel.name}</strong>
          <div
            class="text-red-500"
            onClick={() => navigate(-1)}
          >
            <CloseIcon/>
          </div>
        </div>
        <div className="m-3 my-4">
          <div className="mb-2">
            <p
              className={overrideTailwindClasses(
                `${isReadMore ? "" : "line-clamp-3"}  text-gray-500`
              )}
            >
              {packageTravel.description}
            </p>
            {isReadMore ? (
              <p
                className="text-red-500 cursor-pointer"
                onClick={() => setIsReadMore(false)}
              >
                Ẩn
              </p>
            ) : (
              <p
                className="text-blue-500 cursor-pointer"
                onClick={() => setIsReadMore(true)}
              >
                Xem thêm
              </p>
            )}
          </div>
          <div onClick={()=>{
            if(packageTravel.company&&packageTravel.company.userId)
            navigate(`/message/${packageTravel.company.userId}`)
          }} className="p-2 text-center rounded-md bg-blue-500 text-white px-3 hover:opacity-80">
            Gửi tin nhắn cho người bán
          </div>
        </div>
        {/* Thông tin chi tiết */}
        <strong className="m-3 text-lg text-blue-500">
          Thông tin chi tiết
        </strong>
        <ProductDetail
          icon={<LocationOnIcon/>}
          type="location"
          content={packageTravel.address}
          setShowMap={setShowMap}
          showMap={showMap}
        />
        {showMap && <Map location = {{lat: 11.0604, lng: 106.7963} }  />}
        <ProductDetail icon={<PaidIcon/>} content={formatMoneyVND(packageTravel.price)} />
        <ProductDetail icon={<CalendarMonthIcon/>} content={moment(packageTravel.fromDate).format("DD/MM/YYYY")} />
        <ProductDetail icon={<PunchClockIcon/>} content={packageTravel.duration} />

        <ProductDetail icon={<GroupsIcon/>} content={packageTravel.numberOfPeople} />
        <ProductDetail icon={<BusinessIcon/>} type="business" content={packageTravel.company?.companyName} />
      </div>
    </div>
  );
};
const ProductDetail = ({
  icon,
  content,
  setShowMap = null,
  showMap = null,
  type =null,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center mx-3 my-2 group">
      <div class="p-2 rounded-full bg-slate-200">{icon}</div>
      <p className="m-2 text-md max-w-[200px] truncate">{content}</p>
      {type === "location" && (
        <p
          className="m-2 text-md text-blue-500 cursor-pointer hidden group-hover:block"
          onClick={() => setShowMap(!showMap)}
        >
          {showMap ? "Ẩn" : "Xem bản đồ"}
        </p>
      )}
      {type === "business" && (
        <p className="m-2 text-md text-blue-500 cursor-pointer hidden group-hover:block">
          Chi tiết về công ty
        </p>
      )}
    </div>
  );
};

export default Product;
