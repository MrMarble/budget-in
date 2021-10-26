import { Line } from "react-chartjs-2";
import { useLineChart } from "./useLineChart";

export default function LineChart() {
  const { data } = useLineChart();
  return <Line data={data} options={{ scales: { y: { min: 0 } } }} />;
}
