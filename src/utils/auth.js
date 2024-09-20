import users from '../data.json';

export function authenticate(email, password) {
  const user = users.find((user) => user.email === email && user.password === password);
  return user !== undefined;
}