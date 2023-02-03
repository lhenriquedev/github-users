import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import ReactFC from "react-fusioncharts";
import Fusion from "fusioncharts/themes/fusioncharts.theme.fusion";

ReactFC.fcRoot(FusionCharts, Charts, Fusion);

export default function BarChartComponent({ data }) {
  // Create a JSON object to store the chart configurations
  const chartConfigs = {
    type: "bar2d", // The chart type
    width: "100%", // Width of the chart
    height: "400", // Height of the chart
    dataFormat: "json", // Data type
    dataSource: {
      // Chart Configuration
      chart: {
        theme: "fusion",
        caption: "Most Forked", //Set the chart caption
        yAxisName: "Forks",
        xAxisName: "Forks",
        yAxisNameFontSize: "16px",
        xAxisNameFontSize: "16px",
      },
      // Chart Data - from step 2
      data,
    },
  };

  return <ReactFC {...chartConfigs} />;
}
