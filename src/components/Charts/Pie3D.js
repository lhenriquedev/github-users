import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import ReactFC from "react-fusioncharts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);

export default function PieChartComponent({ data }) {
  // Create a JSON object to store the chart configurations
  const chartConfigs = {
    type: "pie2d", // The chart type
    width: "100%", // Width of the chart
    height: "400", // Height of the chart
    dataFormat: "json", // Data type
    dataSource: {
      // Chart Configuration
      chart: {
        caption: "Languages", //Set the chart caption
        theme: "fusion", //Set the theme for your chart
        pieRadius: "35%",
        decimals: 0,
      },
      // Chart Data - from step 2
      data,
    },
  };

  return <ReactFC {...chartConfigs} />;
}
