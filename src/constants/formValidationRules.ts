interface IValidationRule {
  rule: RegExp;
  errorText: string;
}

interface IValidationRules {
  password: IValidationRule;
  firstName: IValidationRule;
  lastName: IValidationRule;
  email: IValidationRule;
  birthDate: IValidationRule;
  streetShipping: IValidationRule;
  cityShipping: IValidationRule;
  postcodeShipping: IValidationRule;
  streetBilling: IValidationRule;
  cityBilling: IValidationRule;
  postcodeBilling: IValidationRule;
}

const formValidationRules: IValidationRules = {
  password: {
    rule: /^(?=.*\p{Lu})(?=.*\p{Ll})(?=.*\d).{8,}$/u,
    errorText: 'Requires minimum 8 characters, 1 uppercase, 1 lowercase and 1 number',
  },
  firstName: {
    rule: /^[^\d!@#$%^&*()_+[\]{};':"\\|,.<>/?]+$/,
    errorText: 'Requires at least one letter, no special characters or numbers',
  },
  lastName: {
    rule: /^[^\d!@#$%^&*()_+[\]{};':"\\|,.<>/?]+$/,
    errorText: 'Requires at least one letter, no special characters or numbers',
  },
  email: {
    rule: /^\S+@\S+\.\S+$/,
    errorText: 'Requires a valid email address (e.g., example@email.com)',
  },
  birthDate: {
    rule: /^\d{4}-\d{2}-\d{2}$/,
    errorText: 'Please enter your date of birth in the format "dd.mm.yyyy"',
  },
  streetShipping: {
    rule: /^.+$/,
    errorText: 'Requires at least one letter',
  },
  cityShipping: {
    rule: /^[^\d!@#$%^&*()_+[\]{};':"\\|,.<>/?]+$/,
    errorText: 'Requires at least one letter, no special characters or numbers',
  },
  postcodeShipping: {
    rule: /^\d{5}$/,
    errorText: 'Requires exactly 5 digits, follow the format for the country (e.g., 12345 for the U.S)',
  },
  streetBilling: {
    rule: /^.+$/,
    errorText: 'Requires at least one letter',
  },
  cityBilling: {
    rule: /^[^\d!@#$%^&*()_+[\]{};':"\\|,.<>/?]+$/,
    errorText: 'Requires at least one letter, no special characters or numbers',
  },
  postcodeBilling: {
    rule: /^\d{5}$/,
    errorText: 'Requires exactly 5 digits, follow the format for the country (e.g., 12345 for the U.S)',
  },
};

export default formValidationRules;
