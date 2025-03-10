import { useTheme } from "@mui/material";
import { ResponsiveChoropleth } from "@nivo/geo";
import { geoFeatures } from "../../assets/data/mockGeoFeatures";
import { tokens } from "../../theme/theme";
import { mockUserDistributionData as data } from "../../assets/data/mockData";

const UserDistribution = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <ResponsiveChoropleth
      data={data}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: colors.custom[300],
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
              strokeWidth: 1 ,
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
          container: {
            color: "#000000"
          }
        }
      }}
      features={geoFeatures.features}
      margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
      domain={[0, 10000]}
      unknownColor="#AED6F1"
      colors="reds"
      label="properties.name"
      valueFormat=".2s"
      projectionScale={isDashboard ? 280 : 150}
      projectionTranslation={isDashboard ? [-0.2, 0.85] : [0.5, 0.5]}
      projectionRotation={[0, 0, 0]}
      borderWidth={0.5}
      borderColor={"#EAF2F8"}
      legends={
        !isDashboard
          ? [
            {
              anchor: "bottom-left",
              direction: "column",
              justify: true,
              translateX: 20,
              translateY: -100,
              itemsSpacing: 0,
              itemWidth: 94,
              itemHeight: 18,
              itemDirection: "left-to-right",
              itemTextColor: colors.grey[100],
              itemOpacity: 0.85,
              symbolSize: 18,
              effects: [
                {
                  on: "hover",
                  style: {
                    itemTextColor: colors.custom[300],
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]
          : [
            {
              anchor: "bottom-right",
              direction: "column",
              justify: true,
              translateX: -20,
              translateY: -20,
              itemsSpacing: 0,
              itemWidth: 94,
              itemHeight: 18,
              itemDirection: "left-to-right",
              itemTextColor: colors.grey[100],
              itemOpacity: 0.85,
              symbolSize: 18,
              effects: [
                {
                  on: "hover",
                  style: {
                    itemTextColor: colors.custom[300],
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]
      }
    />
  );
};

export default UserDistribution;