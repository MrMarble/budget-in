import { ShowChart, BarChart } from "@mui/icons-material";
import { Paper, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { Box } from "@mui/system";
import LineChart from "../Chart/LineChart/LineChart";
import BarGraph from "../Chart/BarChart/BarChart";
import useGraphCard from "./useGraphCard";

export default function GraphCard() {
  const { selectedChart, handleChange } = useGraphCard();
  return (
    <Paper sx={{ borderRadius: "16px", padding: "1.5rem" }} elevation={3}>
      <Box mb={1}>
        <ToggleButtonGroup
          exclusive
          value={selectedChart}
          onChange={handleChange}
          size="small"
        >
          <ToggleButton value="line">
            <ShowChart />
          </ToggleButton>
          <ToggleButton value="bar">
            <BarChart />
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <Box sx={{ minHeight: "20vh" }}>
        {selectedChart === "line" && <LineChart />}
        {selectedChart === "bar" && <BarGraph />}
      </Box>
    </Paper>
  );
}
