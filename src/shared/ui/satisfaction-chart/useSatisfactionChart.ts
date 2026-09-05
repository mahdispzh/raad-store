export function useSatisfactionChart(chartPercentage: number = 80) {
  const getItemColor = (index: number) => {
    if (index < 2) return "var(--color-success)";
    if (index === 2) return "var(--color-primary)";
    return "var(--color-danger)";
  };

  const chartData = [
    {
      value: chartPercentage,
    },
  ];

  return {
    getItemColor,
    chartData,
  };
}
