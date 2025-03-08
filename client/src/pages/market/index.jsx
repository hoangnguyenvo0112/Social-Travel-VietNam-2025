import SearchStore from "@/components/SearchStore";
import { packageService } from "@/services/packageServices";
import SettingsIcon from "@mui/icons-material/Settings";
import { useEffect, useState } from "react";
import ProductCard from "../shop/ProductCard";
import { useCallback } from "react";

const Market = () => {
  const [recommendPackage, setRecommendPackage] = useState([]);
  const [filterPackage, setFilterPackage] = useState([]);
  useEffect(() => {
    packageService.recommendPackage().then((data) => {
      setRecommendPackage(data);
      setFilterPackage(data);
    });
  }, []);

  const handleChange = useCallback((value) => {
    console.log(value);
    console.log(recommendPackage);
    const filter = recommendPackage.filter(
      (item) => {
        return item.name && item.name.includes(value)||
        item.address && item.address.includes(value)
        ||item?.company?.companyName&&item.company.companyName.includes(value)

      }

    );
    setFilterPackage(filter)
  }, [recommendPackage.length]);
  return (
    <div className="w-full flex justify-between prevent-select">
      <div className="hidden md:block md:w-1/4 sticky top-[60px] left-0 h-fit">
        <div className="flex justify-between m-3 items-center">
          <strong className="text-xl">Khám phá du lịch</strong>
          <SettingsIcon />
        </div>
        <div className="m-3 my-4 flex justify-between items-center">
          <SearchStore onChange={handleChange} />
        </div>
      </div>
      <div className="md:w-3/4 w-full h-fit min-h-[90vh] bg-white p-4">
        <RecommendPackage list={filterPackage} />
      </div>
    </div>
  );
};

const RecommendPackage = ({ list }) => {
  return (
    <>
      {list.map((item, index) => (
        <ProductCard key={index} product={item} />
      ))}
    </>
  );
};

export default Market;
