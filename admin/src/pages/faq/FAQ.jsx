import React from 'react';
import {
	Box,
	useTheme,
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Typography
} from "@mui/material"
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import { tokens } from '../../theme/theme';
const FAQ = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode)
	return (
		<Box m="20px">
			<Typography variant="h2" marginBottom={"20px"} >FAQ</Typography>
			{/* Question */}
			<Accordion>
				<AccordionSummary expandIcon={<ExpandMoreOutlinedIcon />}>
					<Typography color={colors.greenAccent[500]} variant="h5">
						Mạng xã hội là gì?
					</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Typography>
						Mạng xã hội là một nền tảng trực tuyến cho phép người dùng tạo hồ sơ cá nhân, kết nối
						với bạn bè, gia đình và chia sẻ nội dung như hình ảnh, video, thông điệp văn bản và các
						hoạt động cá nhân khác.
					</Typography>
				</AccordionDetails>
			</Accordion>
			<Accordion defaultExpanded>
				<AccordionSummary expandIcon={<ExpandMoreOutlinedIcon />}>
					<Typography color={colors.greenAccent[500]} variant="h5">
						Lợi ích của việc sử dụng mạng xã hội là gì?
					</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Typography>
						Việc sử dụng mạng xã hội cho phép bạn kết nối và giao tiếp với người khác ở xa, chia sẻ ý kiến, tương tác với nội dung, theo dõi thông tin và sự kiện mới, tìm kiếm thông tin và xây dựng mối quan hệ cá nhân và chuyên nghiệp.
					</Typography>
				</AccordionDetails>
			</Accordion>
			<Accordion defaultExpanded>
				<AccordionSummary expandIcon={<ExpandMoreOutlinedIcon />}>
					<Typography color={colors.greenAccent[500]} variant="h5">
						Tại sao doanh nghiệp nên sử dụng mạng xã hội?
					</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Typography>
						Sử dụng mạng xã hội cho phép doanh nghiệp tiếp cận đến một lượng lớn khách hàng tiềm năng, xây dựng thương hiệu và tương tác với khách hàng một cách nhanh chóng và hiệu quả. Nó cũng giúp tăng tầm nhìn, tạo nền tảng quảng cáo rộng lớn và tăng cơ hội kinh doanh.
					</Typography>
				</AccordionDetails>
			</Accordion>
			<Accordion defaultExpanded>
				<AccordionSummary expandIcon={<ExpandMoreOutlinedIcon />}>
					<Typography color={colors.greenAccent[500]} variant="h5">
						Làm thế nào để xây dựng một chiến lược mạng xã hội hiệu quả?
					</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Typography>
						Đầu tiên, xác định mục tiêu và đối tượng của bạn. Sau đó, nghiên cứu các nền tảng mạng xã hội phù hợp và xác định nội dung, phong cách và lịch đăng bài. Tạo lịch đăng bài đều đặn, tương tác với người theo dõi và khách hàng, và đo lường kết quả để điều chỉnh chiến lược của bạn.
					</Typography>
				</AccordionDetails>
			</Accordion>
			<Accordion defaultExpanded>
				<AccordionSummary expandIcon={<ExpandMoreOutlinedIcon />}>
					<Typography color={colors.greenAccent[500]} variant="h5">
						Làm thế nào để tạo nội dung hấp dẫn trên mạng xã hội?
					</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Typography>
					Tạo nội dung mang tính giá trị cho khách hàng của bạn. Điều này có thể bao gồm hướng dẫn, tin tức ngành, nội dung truyền cảm hứng hoặc hài hước. Sử dụng hình ảnh và video để thu hút sự chú ý và tạo sự tương tác. Luôn lắng nghe và tương tác với khách hàng để tạo mối quan hệ và xây dựng lòng tin.
					</Typography>
				</AccordionDetails>
			</Accordion>
		</Box>
	);
}

export default FAQ;
