function validateUser(user) {
  const { name, email } = user;
  const errors = [];
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    errors.push('Name is required and must be a non-empty string');
  }
  if (!email || typeof email !== 'string' || !isValidEmail(email)) {
    errors.push('Email is required and must be a valid email address');
  }
  return errors;
}

function isValidEmail(email) {
  // A simple email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

module.exports = {
  validateUser,
  isValidEmail,
};
