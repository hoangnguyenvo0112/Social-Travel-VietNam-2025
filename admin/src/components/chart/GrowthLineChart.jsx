import { ResponsiveLine } from "@nivo/line";
import { useTheme, Box, Stack, Typography } from "@mui/material";
import { tokens } from "../../theme/theme";
import { mockBusinessGrowthData as data } from "../../assets/data/mockData";

const GrowthLineChart = ({ isDashboard = false }) => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	let minValue = 0;

	return (
		<ResponsiveLine
			enableArea={true}
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
							fontSize: "16px",
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
							fontSize: "11px",
						},
					},
				},
			}}
			tooltip={point => {
				let Point = point.point;
				return (
					<Box
						sx={{
							boxShadow: 1,
							backgroundColor: "#fff",
							borderRadius: "5px",
							padding: "8px"
						}}
					>
						<Stack direction={'row'} alignItems={'center'} spacing={1}>
							<Box padding={1} backgroundColor={Point.serieColor}/>
							<Typography variant="h5" color={"#000"}>Tháng:</Typography>
							<Typography variant="h5" color={"#000"} fontWeight={"bold"}>{Point.data.x},</Typography>
							<Typography variant="h5" color={"#000"}>Số lượng: </Typography>
							<Typography variant="h5" color={"#000"} fontWeight={"bold"}>{Point.data.y}</Typography>
						</Stack>
					</Box>
				)
			}}
			colors={{ datum: "color" }}
			margin={{ top: 50, right: 60, bottom: 50, left: 60 }}
			xScale={{ type: "point" }}
			yScale={{
				type: "linear",
				min: minValue,
				max: "auto",
				stacked: true,
				reverse: false,
			}}
			yFormat=" >-.2f"
			curve="cardinal"
			axisTop={null}
			axisRight={null}
			axisBottom={{
				orient: "bottom",
				tickSize: 0,
				tickPadding: 5,
				tickRotation: 0,
				legend: "Số lượng doanh nghiệp",
				legendOffset: 40,
				legendPosition: "middle",
			}}
			axisLeft={{
				orient: "left",
				tickValues: 5, // added
				maxValue: 300,
				tickSize: 5,
				tickPadding: 0,
				tickRotation: 30,
				legend: undefined, // added
				legendOffset: -50,
				legendPosition: "middle",
			}}
			lineWidth={1}
			pointSize={5}
			pointColor={{ theme: "background" }}
			pointBorderWidth={2}
			pointBorderColor={{ from: "serieColor" }}
			pointLabelYOffset={-12}
			useMesh={true}
			legends={[]}
			areaBaselineValue={minValue}
		/>
	);
};

export default GrowthLineChart;