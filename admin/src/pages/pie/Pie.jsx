import React from 'react';
import { Box } from '@mui/material';
import PieChart from '../../components/chart/PieChart';

const Pie = () => {
	return (
		<Box m="20px">
			<h2>Thống kê gói dịch vụ</h2>
			<Box height={"75vh"}>
				<PieChart/>
			</Box>
		</Box>
	);
}

export default Pie;
