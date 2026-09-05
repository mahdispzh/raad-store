export const exportCSV = <T extends object>(
  data: T[],
  filename = "data.csv",
): void => {
  if (!data.length) return;

  const headers = Object.keys(data[0]);

  const rows = data.map((item) =>
    headers.map((header) => item[header as keyof T]),
  );

  const csvContent = [
    headers.join(","),
    ...rows.map((row) => row.join(",")),
  ].join("\n");

  const blob = new Blob([csvContent], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;
  link.download = filename;

  link.click();
};
