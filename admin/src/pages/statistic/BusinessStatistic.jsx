import AccountBusinessBarChart from '@/components/chart/AccountBusinessBarChart';
import BarChart from '@/components/chart/BarChart';
import { analystService } from '@/services/analyst.services';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
const BusinessStatistic = () => {
	
	return (
		<Box m="20px">
			<h2>Biểu đồ tổng quan trong năm</h2>
			<Box height={"75vh"}>
			<BarChart/>
			</Box>
		</Box>
	);
}

export default BusinessStatistic;
