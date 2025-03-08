import React from "react";
import { ResponsiveBar } from "@nivo/bar";
import { mockBarData as data } from "../../assets/data/mockData";
import { useTheme, Box, Stack, Typography } from "@mui/material";
import { tokens } from "../../theme/theme";
import { useEffect, useState } from "react";
import { analystService } from "@/services/analyst.services";
import { formatMoneyVND } from "@/utils/string";
const BarChart = ({ isDashboard }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [revenueSummary, setRevenueSummary] = useState([]);
  useEffect(() => {
    analystService.getSummaryMoneyInYear().then((data) => {
      const chartData = mapDataToChart(data)
      setRevenueSummary(chartData);
    });
  }, []);

  const mapDataToChart = (data) => {
    if (!data) {
      return;
    }
    const arrayChart = []
    const { summaryOrder, summaryPayment } = data;
    const orderData = summaryOrder.data
    const paymentData = summaryPayment.data
    for (let month = 1; month <= 12; month++) {
      const orderValue = orderData.find((item) => item.month === month)?.value || 0;
      const paymentValue = paymentData.find((item) => item.month === month)?.value || 0;

      arrayChart.push({
        month: month,
        "Doanh thu": orderValue,
        "Color": "hsl(229, 70%, 50%)",
        "Tiền thanh toán": paymentValue,

      })
    }

    console.log(arrayChart)
    return arrayChart;
  };
  // you can connect https://nivo.rocks/bar/ to change style of BarChart
  return (
    <ResponsiveBar
      data={revenueSummary}
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
      }}
      keys={["Doanh thu", "Tiền thanh toán"]}
      indexBy="month"
      margin={{ top: 50, right: 140, bottom: 50, left: 100 }}
      padding={0.2}
      groupMode="grouped"
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={{ scheme: "nivo" }}
      tooltip={(point) => {
        let Point = point;

        return (
          <Box
            sx={{
              boxShadow: 1,
              backgroundColor: "#fff",
              borderRadius: "5px",
              padding: "8px",
            }}
          >
            <Stack direction={"row"} alignItems={"center"} spacing={1}>
              <Box padding={1} backgroundColor={Point.color} />
              <Typography variant="h5" color={"#000"}>
                {Point.id}:
              </Typography>
              <Typography variant="h5" color={"#000"} fontWeight={"bold"}>
                {formatMoneyVND(Point.value)}
              </Typography>
            </Stack>
          </Box>
        );
      }}
      borderColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "Tháng",
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "Tiền (VNĐ)",
        legendPosition: "middle",
        legendOffset: -80,
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      legends={[
        {
          dataFrom: "keys",
          anchor: "top-right",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      role="application"
      ariaLabel="Nivo bar chart demo"
    />
  );
};

export default BarChart;
