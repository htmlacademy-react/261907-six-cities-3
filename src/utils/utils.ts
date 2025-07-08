import {EMAIL_CHECKING_REGEXP} from '../const';

function capitalize(value: string): string {
  return `${value.charAt(0).toUpperCase()}${value.slice(1)}`;
}

function isEmailValid(email: string): boolean {
  return EMAIL_CHECKING_REGEXP.test(email);
}

function isPasswordValid(password: string): boolean {
  return password.length > 1 && /\d/.test(password) && /([a-zA-Z])/.test(password);
}

export {
  capitalize,
  isEmailValid,
  isPasswordValid
};
