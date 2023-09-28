export const AddressInputs = {
  main: [
    {
      type: 'text',
      name: 'streetName',
      label: 'Street',
      placeholder: 'Street',
    },
    {
      type: 'text',
      name: 'city',
      label: 'City',
      placeholder: 'City',
    },
    {
      type: 'text',
      name: 'postalCode',
      label: 'Postcode',
      placeholder: 'Postcode',
    },
    {
      type: 'text',
      name: 'country',
      label: 'Country',
      placeholder: 'Country',
    },
  ],
  checkboxes: [
    {
      type: 'checkbox',
      name: 'checkboxDefaultBilling',
      label: 'Set Billing address as default',
      placeholder: '',
    },
    {
      type: 'checkbox',
      name: 'checkboxDefaultShipping',
      label: 'Set Shipping address as default',
      placeholder: '',
    },
  ],
};
