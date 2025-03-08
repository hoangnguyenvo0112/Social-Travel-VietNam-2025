import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

const ProductCard = ({ product }) => {
	const [imageExists, setImageExists] = useState(true);

	const handleImageError = () => {
		setImageExists(false);
	};

	// function
	const navigate = useNavigate();
	return (
		<div
			className="inline-flex cursor-pointer"
			onClick={() => navigate(`/market/${product?.id}`)}
		>
			<div className="border rounded-md shadow-sm w-fit m-2 p-2 hover:opacity-70">
				{imageExists ? (
					<img
						className="rounded-sm h-[180px] w-[180px]"
						src={product?.avatar}
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
					{product?.cost ? product.cost : "Giá tiền"}
				</strong>
				<p className="text-blue-500 text-base">
					{product?.name ? product.name : "Tour du lịch"}
				</p>
				<p className="text-gray-500 text-[12px]">
					{product?.company ? product.company : "Tên công ty"}
				</p>
			</div>
		</div>
	);
};

const ReadMoreList = ({ list, itemsPerPage }) => {
	const [visibleItems, setVisibleItems] = useState(itemsPerPage);

	const handleLoadMore = () => {
		setVisibleItems((prevVisibleItems) => prevVisibleItems + itemsPerPage);
	};

	return (
		<>
			{list&&list.length&& list.slice(0, visibleItems).map((item, index) => (
				<ProductCard key={index} product={item} />
			))}
			{visibleItems < list.length ? (
				<div className="flex justify-center text-md  text-blue-500 ">
					<span className="material-icons focus:outline-none">
						arrow_drop_down
					</span>
					<button
						className="hover:underline focus:outline-none"
						onClick={handleLoadMore}
					>
						Xem thêm
					</button>
				</div>
			) : (
				<div className="flex justify-center text-md  text-red-500 ">
					<span className="material-icons focus:outline-none">
						arrow_drop_up
					</span>
					<button
						className="hover:underline focus:outline-none"
						onClick={() => setVisibleItems(itemsPerPage)}
					>
						Ẩn
					</button>
				</div>
			)}
		</>
	);
};

const ListProduct = () => {
	return (
		<ReadMoreList list={productListInit} itemsPerPage={20}/>
	)
}

export default ListProduct