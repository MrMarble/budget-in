import { useState } from "react";

export default function useGraphCard() {
  const [selectedChart, setSelectedChart] = useState("line");

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newChart: string | null
  ) => {
    if (newChart !== null) {
      setSelectedChart(newChart);
    }
  };

  return { selectedChart, handleChange };
}