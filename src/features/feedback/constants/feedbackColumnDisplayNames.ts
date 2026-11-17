export const feedbackColumnDisplayNames = [
  { key: 'select', value: 'Select Row' },
  { key: 'title', value: 'Feedback' },
  { key: 'status', value: 'Status' },
  { key: 'createdAt', value: 'Created' },
  { key: 'action', value: 'Action' },
];

export const getColumnNames = (key: string) => {
  const column = feedbackColumnDisplayNames.find((item) => item.key === key);
  return column?.value || key;
};

export const getColumnKeys = (columns = feedbackColumnDisplayNames) => {
  return columns
    .filter((column) => !['select', 'action'].includes(column.key))
    .map((column) => column.key);
};
