export function getAccountsViaAPI(username, password) {
  return cy.request({
    method: 'GET',
    url: `/parabank/services/bank/customers/${username}/accounts`,
    auth: { username, password }
  });
}

export function updateProfileViaAPI(customerId, data) {
  return cy.request({
    method: 'POST',
    url: `/parabank/services/bank/updateprofile/${customerId}`,
    body: data,
    form: true
  });
}

export const loginAPI = (username, password) => {
  return cy.request({
    method: 'POST',
    url: '/parabank/services/login',
    body: { username, password }
  });
};

export const getAccounts = () => {
  return cy.request('/services/accounts');
};

export const createAccountAPI = (type, fromAccountId) => {
  return cy.request({
    method: 'POST',
    url: '/parabank/services/accounts',
    body: { type, fromAccountId }
  });
};

export const transferFundsAPI = (fromId, toId, amount) => {
  return cy.request({
    method: 'POST',
    url: '/parabank/services/transfer',
    body: { fromId, toId, amount }
  });
};

export const updateProfileAPI = (profileData) => {
  return cy.request({
    method: 'PUT',
    url: '/parabank/services/customers/update',
    body: profileData
  });
};
