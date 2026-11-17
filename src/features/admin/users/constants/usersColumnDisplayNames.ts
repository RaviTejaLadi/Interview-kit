export const usersColumnDisplayNames = [
  { key: 'select', value: 'Select Row' },
  { key: 'name', value: 'Name' },
  { key: 'email', value: 'Email' },
  { key: 'provider', value: 'Provider' },
  { key: 'role', value: 'Role' },
  { key: 'action', value: 'Action' },
];

export const getColumnNames = (key: string) => {
  const column = usersColumnDisplayNames.find((item) => item.key === key);
  return column?.value || key;
};

export const getColumnKeys = (columns = usersColumnDisplayNames) => {
  return columns
    .filter((column) => !['select', 'action'].includes(column.key))
    .map((column) => column.key);
};
