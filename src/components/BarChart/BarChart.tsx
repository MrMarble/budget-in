import { Bar } from "react-chartjs-2";
import { useBarChart } from "./useBarChart";

export default function LineChart() {
  const { data } = useBarChart();
  return (
    <Bar
      data={data}
      options={{
        scales: { y: { stacked: true } },
        plugins: {
          legend: {
            display: false,
          },
        },
      }}
    />
  );
}
