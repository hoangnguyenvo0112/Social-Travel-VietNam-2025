import React from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { mockAccountBarData as data } from '../../assets/data/mockData';
import { useTheme, Typography, Stack, Box } from '@mui/material';
import { tokens } from '../../theme/theme';
const AccountBarChart = ({isDashboard}) => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	// you can connect https://nivo.rocks/bar/ to change style of AccountBarChart
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
						text: {
							fill: colors.grey[100],
						},
					},
					ticks: {
						line: {
							stroke: colors.grey[100],
							strokeWidth: 1,
						},
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
			keys={[
				'account',
			]}
			indexBy="day"
			margin={{ top: 50, right: 40, bottom: 30, left: 60 }}
			padding={0.2}
			groupMode="stacked"
			valueScale={{ type: 'linear' }}
			indexScale={{ type: 'band', round: true }}
			colors={colors.blueAccent[500]}
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
							<Typography variant="h5" color={"#000"} fontWeight={"bold"}>{Point.indexValue},</Typography>
							<Typography variant="h5" color={"#000"}>Số tài khoản: </Typography>
							<Typography variant="h5" color={"#000"} fontWeight={"bold"}>{Point.value}</Typography>
						</Stack>
					</Box>
				)
			}}
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
				tickSize: 5,
				tickPadding: 5,
				tickRotation: 0,
				legend: isDashboard ? undefined : 'country',
				legendPosition: 'middle',
				legendOffset: 32
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

export default AccountBarChart;
