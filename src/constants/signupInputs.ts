export const signupInputs = {
  infoInputs: [
    {
      type: 'text',
      name: 'firstName',
      label: 'First Name',
      placeholder: 'First Name',
    },
    {
      type: 'text',
      name: 'lastName',
      label: 'Last Name',
      placeholder: 'Last Name',
    },
    {
      type: 'email',
      name: 'email',
      label: 'Email',
      placeholder: 'Email',
    },
    {
      type: 'password',
      name: 'password',
      label: 'Password',
      placeholder: 'Password',
    },
    {
      type: 'date',
      name: 'birthDate',
      label: 'Date of birth',
      placeholder: 'Date of birth',
    },
    {
      type: 'text',
      name: 'country',
      label: 'Country',
      placeholder: 'Country',
    },
  ],
  addressInputs: [
    {
      type: 'text',
      name: 'streetShipping',
      label: 'Shipping address (street)',
      placeholder: 'Street',
    },
    {
      type: 'text',
      name: 'cityShipping',
      label: 'Shipping address (city)',
      placeholder: 'City',
    },
    {
      type: 'text',
      name: 'postcodeShipping',
      label: 'Shipping address (postcode)',
      placeholder: 'Postcode',
    },
    {
      type: 'checkbox',
      name: 'checkboxAddress',
      label: 'The shipping address matches the billing address',
      placeholder: '',
    },
    {
      type: 'text',
      name: 'streetBilling',
      label: 'Billing address (street)',
      placeholder: 'Street',
    },
    {
      type: 'text',
      name: 'cityBilling',
      label: 'Billing address (city)',
      placeholder: 'City',
    },
    {
      type: 'text',
      name: 'postcodeBilling',
      label: 'Billing address (postcode)',
      placeholder: 'Postcode',
    },
  ],
};
