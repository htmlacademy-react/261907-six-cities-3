import {AUTHORIZATION_TOKEN_KEY} from '../const';

type Token = string;

function dropToken(): void {
  localStorage.removeItem(AUTHORIZATION_TOKEN_KEY);
}

function getToken(): Token {
  const token = localStorage.getItem(AUTHORIZATION_TOKEN_KEY);

  return token ?? '';
}

function saveToken(token: Token): void {
  localStorage.setItem(AUTHORIZATION_TOKEN_KEY, token);
}

export {
  dropToken,
  getToken,
  saveToken
};
