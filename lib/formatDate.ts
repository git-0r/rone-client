export function formatDate(createdAt: string) {
  const date = new Date(createdAt);

  // Extract the components
  const day = String(date.getDate()).padStart(2, "0"); // Day (2 digits)
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Month (0-indexed, so +1)
  const year = date.getFullYear(); // Year

  // Format as dd-mm-yyyy
  const formattedDate = `${day}-${month}-${year}`;

  return formattedDate; // Output: "18-12-2024"
}
