import { ShowChart, BarChart } from "@mui/icons-material";
import { Paper, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import LineChart from "../LineChart/LineChart";
import BarGraph from "../BarChart/BarChart";

export default function GraphCard() {
  const [selectedChart, setSelectedChart] = useState("line");

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newChart: string | null
  ) => {
    if (newChart !== null) {
      setSelectedChart(newChart);
    }
  };

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
      <Box>
        {selectedChart === "line" && <LineChart />}
        {selectedChart === "bar" && <BarGraph />}
      </Box>
    </Paper>
  );
}
