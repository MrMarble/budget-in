import { Paper } from "@mui/material";
import { Line } from "react-chartjs-2";
import { useLineChart } from "./useGraphCard";

export default function GraphCard() {
  const { data } = useLineChart();
  return (
    <Paper sx={{ borderRadius: "16px", padding: "1.5rem" }} elevation={3}>
      <Line data={data} options={{ scales: { y: { min: 0 } } }} />
    </Paper>
  );
}
