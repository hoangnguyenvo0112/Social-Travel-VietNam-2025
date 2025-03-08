import { ResponsiveLine } from "@nivo/line";
import { useTheme, Box, Typography, Stack } from "@mui/material";
import { tokens } from "../../theme/theme";
import { mockLineData as data } from "../../assets/data/mockData";
import { useEffect, useState } from "react";
import { analystService } from "@/services/analyst.services";

const LineChartPro = ({ isCustomLineColors = false, isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [summaryData, setSummaryData] = useState([]);

  const renderTokenByIndex = (index) => {
    switch (index) {
      case 0:
        return tokens("dark").redAccent[200];
      case 1:
        return tokens("dark").blueAccent[300];
      default:
        return tokens("dark").greenAccent[500];
    }
  };
  const fillAllMonths = (data) => {
    const result = [];
    for (let month = 1; month <= 12; month++) {
      result.push({
        count: 0,
        month: month,
      });
    }
    for (const item of data) {
      const monthIndex = item.month - 1;
      result[monthIndex].count = item.count;
    }
    return result;
  };
  const mapDataToChart = (data) => {
    if (!data) {
      return;
    }
    const { summaryCompany, summaryOrder, summaryUser } = data;
    let arrayChart = [summaryCompany, summaryOrder, summaryUser].map(
      (item, index) => {
        return {
          id: item.id,
          data: fillAllMonths(item.data).map(item=>{
            return {
              x:item.month,
              y:item.count
            }
          }),
          color: renderTokenByIndex(index),
        };
      }
    );
  
    return arrayChart;
  };
  useEffect(() => {
    analystService.getSummaryInYear().then((data) => {
      const dataChart=mapDataToChart(data)
      setSummaryData(dataChart);
    });
  }, []);

  let minValue = 0;
  return (
    <ResponsiveLine
      enableArea={true}
      data={summaryData}
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
              fontSize: isDashboard ? "11px" : "16px",
            },
          },
        },
        legends: {
          // This is text of "us, japan, france,..."
          text: {
            fill: colors.grey[100],
            fontSize: "14px",
          },
        },
      }}
      tooltip={(point) => {
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
            <Stack direction={"row"} alignItems={"center"} spacing={1}>
              <Box padding={1} backgroundColor={Point.serieColor} />
              <Typography variant="h5" color={"#000"}>
                Gói:
              </Typography>
              <Typography variant="h5" color={"#000"} fontWeight={"bold"}>
                {Point.serieId},
              </Typography>
              <Typography variant="h5" color={"#000"}>
                Số lượng:{" "}
              </Typography>
              <Typography variant="h5" color={"#000"} fontWeight={"bold"}>
                {Point.data.y}
              </Typography>
            </Stack>
          </Box>
        );
      }}
      colors={isDashboard ? { datum: "color" } : { scheme: "category10" }} // added
      margin={{ top: 10, right: 180, bottom: 60, left: 60 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: minValue,
        max: "auto",
        stacked: false,
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
        legend: isDashboard ? undefined : "Biểu đồ tăng trưởng dịch vụ 2023", // added
        legendOffset: 40,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickValues: 5, // added
        tickSize: 5,
        tickPadding: 0,
        tickRotation: 30,
        legend: isDashboard ? undefined : "Số lượng dịch vụ", // added
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
          anchor: "top-right",
          direction: "column",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
                borderRadius: "10px",
              },
            },
          ],
        },
      ]}
    />
  );
};

export default LineChartPro;
