export function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

export function validatePassword(password) {
  return password && password.length >= 8;
}

export function validateRequired(value) {
  return value !== null && value !== undefined && value !== '';
}

export function validateNumeric(value) {
  return !isNaN(parseFloat(value)) && isFinite(value);
}

export function validateRange(value, min, max) {
  const num = parseFloat(value);
  return num >= min && num <= max;
}

export function validateForm(rules) {
  const errors = {};
  for (const [field, fieldRules] of Object.entries(rules)) {
    for (const rule of fieldRules) {
      const result = rule.validate(rule.value);
      if (!result) {
        errors[field] = rule.message;
        break;
      }
    }
  }
  return { isValid: Object.keys(errors).length === 0, errors };
}
