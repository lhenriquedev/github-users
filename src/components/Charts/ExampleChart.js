import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import ReactFC from "react-fusioncharts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);

export default function ChartComponent({ data }) {
  // Create a JSON object to store the chart configurations
  const chartConfigs = {
    type: "bar2d", // The chart type
    width: "100%", // Width of the chart
    height: "400", // Height of the chart
    dataFormat: "json", // Data type
    dataSource: {
      // Chart Configuration
      chart: {
        caption: "Countries With Most Oil Reserves [2017-18]", //Set the chart caption
        subCaption: "In MMbbl = One Million barrels", //Set the chart subcaption
        xAxisName: "Country", //Set the x-axis name
        yAxisName: "Reserves (MMbbl)", //Set the y-axis name
        numberSuffix: "K",
        theme: "fusion", //Set the theme for your chart
      },
      // Chart Data - from step 2
      data: data,
    },
  };

  return <ReactFC {...chartConfigs} />;
}
