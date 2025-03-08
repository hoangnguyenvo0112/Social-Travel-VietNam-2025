import React, { useEffect, useState } from "react";
import { ResponsivePie } from "@nivo/pie";
import { mockPieData as data } from "../../assets/data/mockData";
import { useTheme, Box, Stack, Typography } from "@mui/material";

import { tokens } from "../../theme/theme";
import { analystService } from "@/services/analyst.services";
const PieChart = () => {
  const [analystPackage, setAnalystPackage] = useState([]);
  useEffect(() => {
    analystService.getAnalystPackage().then((data) => {
      setAnalystPackage(data);
    });
  }, []);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <ResponsivePie
      data={analystPackage.map((item, index) => {

        return {
          id: index,
          label: item.packageName,
          value: item.count
        }
      })}
      tooltip={(point) => {
        let Point = point.datum;
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
                {Point.label}:
              </Typography>
              <Typography variant="h5" color={"#000"} fontWeight={"bold"}>
                {Point.value}
              </Typography>
            </Stack>
          </Box>
        );
      }}
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
            fontSize: "18px",
          },
        },
        labels: {
          text: {
            fontSize: "16px",
          },
        },
        tooltip: {
          // This is custom of status hover in chart
          container: {
            color: colors.primary[500],
          },
        },
      }}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      sortByValue={true}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      arcLinkLabel="label"
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor={colors.grey[100]}
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      enableArcLabels={false}
      arcLabelsRadiusOffset={0.4}
      arcLabelsSkipAngle={7}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      legends={[
        {
          anchor: "bottom",
          direction: "row",
          justify: false,
          translateX: 0,
          translateY: 56,
          itemsSpacing: 0,
          itemWidth: 200,
          itemHeight: 18,
          itemTextColor: "#999",
          itemDirection: "left-to-right",
          itemOpacity: 1,
          symbolSize: 18,
          symbolShape: "circle",
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: colors.custom[300],
              },
            },
          ],
        },
      ]}
    />
  );
};

export default PieChart;
