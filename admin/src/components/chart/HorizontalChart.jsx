import React from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { mockHorizontalGroupBarData } from '../../assets/data/mockData';
import { mockHorizontalUserBarData } from '../../assets/data/mockData';
import { useTheme, Stack, Typography, Box } from '@mui/material';
import { tokens } from '../../theme/theme';
const HorizontalChart = ({ isDashboard, isGroup,data,keys,indexBy }) => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	// you can connect https://nivo.rocks/bar/ to change style of HorizontalChart
	// let data = mockHorizontalUserBarData;
	// if (isGroup) {
	// 	data = mockHorizontalGroupBarData;
	// };
	return (
		<ResponsiveBar
			data={data}
			theme={{
				axis: {
					domain: {
						line: {
							stroke: colors.grey[100],
						},
					},
					legend: {
						// Nội dung ở bottom và left
						text: {
							fill: colors.grey[100],
							fontSize: "14px",
						},
					},
					ticks: {
						// gạch phân chia trong trục xy
						line: {
							stroke: colors.grey[100],
							strokeWidth: 1,
						},
						// nội trung trục xy
						text: {
							fill: colors.grey[100],
						},
					},
				},
				legends: {
					text: {
						fill: colors.grey[100],
					},
				},
				tooltip: {
					// This is custom of status hover in chart
					container: {
						color: colors.primary[500],
					},
				},
			}}
			tooltip={point => {
				let Point = point;
				return (
					<Box
						border={`1px solid #e0e0e0`}
						sx={{
							boxShadow: 1,
							backgroundColor: "#fff",
							borderRadius: "5px",
							padding: "8px",
						}}
					>
						<Stack direction={'row'} alignItems={'center'} spacing={1}>
							<Box padding={1} backgroundColor={Point.color}/>
							<Typography variant="h5" color={"#000"}>{Point.indexValue}:</Typography>
							<Typography variant="h5" color={"#000"} fontWeight={"bold"}>{Point.value}</Typography>
						</Stack>
					</Box>
				)
			}}
			keys={keys}
			indexBy={indexBy}
			margin={{ top: 40, right: 40, bottom: 50, left: 140 }}
			padding={0.2}
			groupMode="stacked"
			layout="horizontal"
			valueScale={{ type: 'linear' }}
			valueFormat=" >-0,~d"
			indexScale={{ type: 'band', round: true }}
			colors={isGroup ? colors.blueAccent[600] : colors.greenAccent[600]}
			defs={[
				{
					id: 'dots',
					type: 'patternDots',
					background: 'inherit',
					color: '#38bcb2',
					size: 4,
					padding: 1,
					stagger: true
				},
				{
					id: 'lines',
					type: 'patternLines',
					background: 'inherit',
					color: '#eed312',
					rotation: -45,
					lineWidth: 6,
					spacing: 10
				}
			]}
			fill={[
				{
					match: {
						id: 'fries'
					},
					id: 'dots'
				},
				{
					match: {
						id: 'sandwich'
					},
					id: 'lines'
				}
			]}
			borderColor={{
				from: 'color',
				modifiers: [
					[
						'darker',
						1.6
					]
				]
			}}
			axisTop={null}
			axisRight={null}
			axisBottom={{
				format: e => Math.floor(e) === e && e,
				tickSize: 5,
				tickPadding: 5,
				tickRotation: 0,
				legend:  "Số lượt tương tác" ,
				legendPosition: 'middle',
				legendOffset: 32
			}}
			yAxis = {{
				allowDecimals: false,
			}}
			axisLeft={{
				tickSize: 5,
				tickPadding: 5,
				tickRotation: 0,
				legend: isDashboard ? undefined : 'food',
				legendPosition: 'middle',
				legendOffset: -40
			}}
			labelSkipWidth={12}
			labelSkipHeight={12}
			labelTextColor={{
				from: 'color',
				modifiers: [
					[
						'darker',
						1.6
					]
				]
			}}
			legends={[]}
			role="application"
		/>
	);
}

export default HorizontalChart;
