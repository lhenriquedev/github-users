import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import ReactFC from "react-fusioncharts";
import Candy from "fusioncharts/themes/fusioncharts.theme.candy";

ReactFC.fcRoot(FusionCharts, Charts, Candy);

export default function DoughnutChartComponent({ data }) {
  // Create a JSON object to store the chart configurations
  const chartConfigs = {
    type: "doughnut2d", // The chart type
    width: "100%", // Width of the chart
    height: "400", // Height of the chart
    dataFormat: "json", // Data type
    dataSource: {
      // Chart Configuration
      chart: {
        caption: "Stars Per Languages", //Set the chart caption
        theme: "fusion", //Set the theme for your chart
        pieRadius: "35%",
        decimals: 0,
        showPercentValues: 0,
        theme: "candy",
      },
      // Chart Data - from step 2
      data,
    },
  };

  return <ReactFC {...chartConfigs} />;
}
