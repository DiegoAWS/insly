
export const transformData = (data) => {
  const insurance_data = data?.insurance_data;
  const columns = Object.keys(insurance_data);

  const dataKeys= data.data_keys;
  const dataLabels = data.data_labels;

  const transformedData = {};

  if (!insurance_data || !dataKeys|| !dataLabels ||columns?.length === 0) {
    return null;
  }

  columns.forEach((column) => {
    const data = insurance_data[column];

    const items = Object.keys(data);

    items.forEach((item) => {
      transformedData[item] = {
        ...(transformedData[item] || {}),
        [column]: data[item]
      };
    });
  });

  const arrayData = dataKeys.map((key, index) => ({
    ...transformedData[key],
    label: dataLabels[index]
  }));

  const transformed = { arrayData, columns };

  console.log(transformed);
  return transformed;
};
