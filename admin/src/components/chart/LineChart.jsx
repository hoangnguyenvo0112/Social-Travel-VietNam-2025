import { ResponsiveLine } from "@nivo/line";
import { useTheme, Box, Typography, Stack } from "@mui/material";
import { tokens } from "../../theme/theme";

let monthArray = [
	{
		x: "Tháng 1",
		y: 0,
	},
	{
		x: "Tháng 2",
		y: 0,
	},
	{
		x: "Tháng 3",
		y: 0,
	},
	{
		x: "Tháng 4",
		y: 0,
	},
	{
		x: "Tháng 5",
		y: 0,
	},
	{
		x: "Tháng 6",
		y: 0,
	},
	{
		x: "Tháng 7",
		y: 0,
	},
	{
		x: "Tháng 8",
		y: 0,
	},
	{
		x: "Tháng 9",
		y: 0,
	},
	{
		x: "Tháng 10",
		y: 0,
	},
	{
		x: "Tháng 11",
		y: 0,
	},
	{
		x: "Tháng 12",
		y: 0,
	},
]

const LineChart = ({ isCustomLineColors = false, isDashboard = false, packages = null }) => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	let minValue = 0;

	let newData = [];

	if (packages.length > 0) {
		newData = packages.map(item => {
			let tempMonthArray = monthArray;
			item?.revenueByMonth.map(revenue => {
				let index = revenue.month - 1;
				tempMonthArray[index].y = revenue.revenue;
			})

			return {
				id: item?.package,
				data: tempMonthArray,
			}
		})
	}

	return (
		<ResponsiveLine
			enableArea={true}
			data={newData}
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
							fontSize: "20px",
						},
					},
					ticks: {
						line: {
							stroke: colors.grey[100],
							strokeWidth: 1,
						},
						// Custom label in bottom
						text: {
							fill: colors.grey[100],
							fontSize: isDashboard ? "11px" : "16px"
						},
					},
				},
				legends: {
					// This is text of "us, japan, france,..."
					text: {
						fill: colors.grey[100],
						fontSize: "14px",
						// width: "20px",
						// whiteSpace: "nowrap",
						// overflow: "hidden",
						// textOverflow: "ellipsis",
					},
				},
			}}
			tooltip={point => {
				let Point = point.point;
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
							<Box padding={1} backgroundColor={Point.serieColor} />
							<Typography variant="h5" color={"#000"}>Loại:</Typography>
							<Typography variant="h5" color={"#000"} fontWeight={"bold"}>{Point.serieId},</Typography>
							<Typography variant="h5" color={"#000"}>Doanh thu: </Typography>
							<Typography variant="h5" color={"#000"} fontWeight={"bold"}>{Point.data.y}</Typography>
						</Stack>
					</Box>
				)
			}}
			colors={{ scheme: 'category10' }}
			margin={{ top: 50, right: 180, bottom: 50, left: 60 }}
			xScale={{ type: "point" }}
			yScale={{
				type: "linear",
				min: minValue,
				max: "auto",
				stacked: true,
				reverse: false,
			}}
			yFormat=" >-.2f"
			curve="linear"
			axisTop={null}
			axisRight={null}
			axisBottom={{
				orient: "bottom",
				tickSize: 0,
				tickPadding: 5,
				tickRotation: 0,
				legend: isDashboard ? undefined : "Month of year", // added
				legendOffset: 40,
				legendPosition: "middle",
			}}
			axisLeft={{
				orient: "left",
				tickValues: 5, // added
				tickSize: 5,
				tickPadding: 0,
				tickRotation: 30,
				legend: isDashboard ? undefined : "Number of verified account", // added
				legendOffset: -50,
				legendPosition: "middle",
			}}
			areaBaselineValue={minValue}
			lineWidth={1}
			pointSize={5}
			pointColor={{ theme: "background" }}
			pointBorderWidth={2}
			pointBorderColor={{ from: "serieColor" }}
			pointLabelYOffset={-12}
			useMesh={true}
			legends={[
				{
					anchor: 'bottom-right',
					direction: 'column',
					justify: false,
					translateX: 100,
					translateY: 0,
					itemsSpacing: 0,
					itemDirection: 'left-to-right',
					itemWidth: 80,
					itemHeight: 20,
					itemOpacity: 0.75,
					symbolSize: 12,
					symbolShape: 'circle',
					symbolBorderColor: 'rgba(0, 0, 0, .5)',
					effects: [
						{
							on: 'hover',
							style: {
								itemBackground: 'rgba(0, 0, 0, .03)',
								itemOpacity: 1,
								borderRadius: "10px"
							}
						}
					]
				}
			]}
		/>
	);
};

export default LineChart;