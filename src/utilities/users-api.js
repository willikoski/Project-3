import sendRequest from './send-request';

const BASE_URL = '/api/users';

export function signUp(userData) {
  return sendRequest(BASE_URL, 'POST', userData);
}

export function login(credentials) {
  return sendRequest(`${BASE_URL}/login`, 'POST', credentials);
}

export function updateBalance(newBalance) {
  return sendRequest(`${BASE_URL}/balance`, 'PUT', { balance: newBalance });
}

export function getUser(userId) {
  return sendRequest(`${BASE_URL}/${userId}`, 'GET');
}