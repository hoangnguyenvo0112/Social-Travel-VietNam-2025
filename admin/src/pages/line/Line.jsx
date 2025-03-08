import React from 'react';
import { Box } from '@mui/material';
import LineChartPro from '@/components/chart/LineChartPro';

const Line = () => {
	return (
		<Box m="20px">
			<h2>Thống kê trong năm</h2>
			<Box height={"75vh"}>
				<LineChartPro/>
			</Box>
		</Box>
	);
}

export default Line;
