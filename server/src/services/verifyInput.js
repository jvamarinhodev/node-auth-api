//Security check
export const passwordValidator = (password) => {
  const error = []; // It stores and returns all errors to the client

  if (!password || password.trim() === '') {
    error.push('Empty password field!');
    return error;
  }
  // Checks if it contains at least one uppercase latter, lowercase latter, special character, or number with a regex pattern
  if (!/[A-Z]/.test(password)) {
    error.push('Password must contain at lest 1 capital latter!');
  }

  if (!/[a-z]/.test(password)) {
    error.push('Password must contain at least 1 lowercase latter!');
  }

  if (!/[0-9]/.test(password)) {
    error.push('Password must contain at least 1 number!');
  }

  if (!/.{8,}/.test(password)) {
    error.push('Password must be at least 8 characters long!');
  }

  return error;
};
//Validate email in the correct format
export const emailValidator = (email) => {
  const error = [];

  if (!email || email.trim() === '') {
    error.push('Empty email field!');
    return error;
  }

  if (email.length > 254) {
    error.push('This email is too long (maximum 254 characters)!');
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    error.push('Invalid email format!');
  }

  return error;
};

export const nameValidator = (name) => {
  const error = [];

  if (!name || name.trim() == '') {
    error.push('Name field is empty');
    return error;
  }

  if (name.length < 3 || name.length > 50) {
    error.push('The name must be between 3 and 50 characters long!');
  }

  return error;
};
