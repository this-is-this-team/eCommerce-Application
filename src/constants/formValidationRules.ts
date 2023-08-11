interface IValidationRule {
  rule: RegExp;
  errorText: string;
}

interface IValidationRules {
  password: IValidationRule;
  firstName: IValidationRule;
  lastName: IValidationRule;
  email: IValidationRule;
}

const formValidationRules: IValidationRules = {
  password: {
    rule: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
    errorText: 'Requires minimum 8 characters, 1 uppercase, 1 lowercase and 1 number',
  },
  firstName: {
    rule: /^(?=.*[a-zA-Z])[a-zA-Z\s]*$/,
    errorText: 'Requires at least one letter, no special characters or numbers',
  },
  lastName: {
    rule: /^(?=.*[a-zA-Z])[a-zA-Z\s]*$/,
    errorText: 'Requires at least one letter, no special characters or numbers',
  },
  email: {
    rule: /^\S+@\S+\.\S+$/,
    errorText: 'Requires a valid email address (e.g., example@email.com)',
  },
};

export default formValidationRules;
