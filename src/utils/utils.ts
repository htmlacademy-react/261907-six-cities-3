function capitalize(value: string): string {
  return `${value.charAt(0).toUpperCase()}${value.slice(1)}`;
}

function isPasswordValid(password: string) {
  return password.length > 1 && /\d/.test(password) && /([a-zA-Z])/.test(password);
}

export {
  capitalize,
  isPasswordValid
};
