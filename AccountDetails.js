const form = document.querySelector('.account-form');
const usernameInput = document.getElementById('username');
const phoneInput = document.getElementById('phone');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');

const usernameError = document.getElementById('usernameError');
const phoneError = document.getElementById('phoneError');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const confirmPasswordError = document.getElementById('confirmPasswordError');

const ruleCapital = document.querySelector('.capital');
const ruleSymbol = document.querySelector('.symbol');
const ruleLength = document.querySelector('.length');
const ruleNumber = document.querySelector('.number');

function showError(input, errorEl, message) {
  errorEl.textContent = message;
  input.classList.toggle('invalid', Boolean(message));
  return !message;
}

function validateRequired(input, errorEl, message) {
  return showError(input, errorEl, input.value.trim() ? '' : message);
}

function validateEmail() {
  const value = emailInput.value.trim().toLowerCase();
  const ok = value.endsWith('@gmail.com') && value.length > '@gmail.com'.length;
  return showError(emailInput, emailError, ok ? '' : 'Email must end with @gmail.com.');
}

function validatePhone() {
  const digits = phoneInput.value.replace(/\D/g, '');
  return showError(phoneInput, phoneError, digits.length >= 8 ? '' : 'Phone number must have at least 8 digits.');
}

function checkPasswordRules() {
  const password = passwordInput.value;
  const hasCapital = /[A-Z]/.test(password);
  const hasSymbol = /[*!.,-]/.test(password);
  const hasLength = password.length >= 8;
  const hasTwoNumbers = (password.match(/\d/g) || []).length >= 2;

  ruleCapital.classList.toggle('valid', hasCapital);
  ruleSymbol.classList.toggle('valid', hasSymbol);
  ruleLength.classList.toggle('valid', hasLength);
  ruleNumber.classList.toggle('valid', hasTwoNumbers);

  if (!password.trim()) {
    return showError(passwordInput, passwordError, 'Password is required.');
  }
  return showError(
    passwordInput,
    passwordError,
    hasCapital && hasSymbol && hasLength && hasTwoNumbers ? '' : 'Password does not meet all rules.'
  );
}

function validateConfirmPassword() {
  if (!confirmPasswordInput.value.trim()) {
    return showError(confirmPasswordInput, confirmPasswordError, 'Please confirm your password.');
  }
  return showError(
    confirmPasswordInput,
    confirmPasswordError,
    passwordInput.value === confirmPasswordInput.value ? '' : 'Passwords do not match.'
  );
}

usernameInput.addEventListener('input', () =>
  validateRequired(usernameInput, usernameError, 'Username is required.')
);
phoneInput.addEventListener('input', validatePhone);
emailInput.addEventListener('input', validateEmail);
passwordInput.addEventListener('input', () => {
  checkPasswordRules();
  validateConfirmPassword();
});
confirmPasswordInput.addEventListener('input', validateConfirmPassword);

form.addEventListener('submit', (e) => {
  const ok =
    validateRequired(usernameInput, usernameError, 'Username is required.') &&
    validatePhone() &&
    validateEmail() &&
    checkPasswordRules() &&
    validateConfirmPassword();

  if (!ok) e.preventDefault();
});

