const priceFilterOptions = [
  {
    label: 'Price',
    value: '',
  },
  {
    label: 'under $1,500',
    value: 'range (* to 150000)',
  },
  {
    label: '$1,500 - $2,000',
    value: 'range (150000 to 200000)',
  },
  {
    label: '$2,000 - $2,500',
    value: 'range (200000 to 250000)',
  },
  {
    label: '$2,500 - $3,000',
    value: 'range (250000 to 300000)',
  },
  {
    label: 'over $3,000',
    value: 'range (300000 to *)',
  },
];

export default priceFilterOptions;
