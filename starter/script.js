const specialCharacters = ['@', '%', '+', '\\', '/', "'", '!', '#', '$', '^', '?', ':', ',', '(', ')', '{', '}', '[', ']', '~', '-', '_', '.'];
const numericCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const lowerCasedCharacters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const upperCasedCharacters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

const options = {
  specialCharacters,
  numericCharacters,
  lowerCasedCharacters,
  upperCasedCharacters
}

const getRandomElement = (arr) => {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

// Function to prompt user for password options
const getPasswordOptions = () => {
  const MINIMUM_PASSWORD_LENGTH = 8;
  const MAXIMUM_PASSWORD_LENGTH = 128;

  const length = document.getElementById('password-length').valueAsNumber;

  if (isNaN(length) || length < MINIMUM_PASSWORD_LENGTH || length > MAXIMUM_PASSWORD_LENGTH) {
    alert(`Password length must be between ${MINIMUM_PASSWORD_LENGTH} and ${MAXIMUM_PASSWORD_LENGTH} characters.`);
    return null;
  }

  const hasSpecialCharacters = document.getElementById('include-special-characters').checked;
  const hasNumericCharacters = document.getElementById('include-numeric-characters').checked;
  const hasLowerCasedCharacters = document.getElementById('include-lowercase-characters').checked;
  const hasUpperCasedCharacters = document.getElementById('include-uppercase-characters').checked;

  if (!hasSpecialCharacters && !hasNumericCharacters && !hasLowerCasedCharacters && !hasUpperCasedCharacters) {
    alert('Please select at least one character type.');
    return null;
  }

  return {
    length,
    hasSpecialCharacters,
    hasNumericCharacters,
    hasLowerCasedCharacters,
    hasUpperCasedCharacters
  };
}

const getSelectedOptions = (passwordOptions) => {
  const selectedOptions = [];
  if (passwordOptions.hasSpecialCharacters) {
    selectedOptions.push(getRandomElement(options.specialCharacters));
  }
  if (passwordOptions.hasNumericCharacters) {
    selectedOptions.push(getRandomElement(options.numericCharacters));
  }
  if (passwordOptions.hasLowerCasedCharacters) {
    selectedOptions.push(getRandomElement(options.lowerCasedCharacters));
  }
  if (passwordOptions.hasUpperCasedCharacters) {
    selectedOptions.push(getRandomElement(options.upperCasedCharacters));
  }
  return selectedOptions;
}

// Function to generate password with user input
const generatePassword = (length, selectedOptions) => {
  let generatedPassword = '';
  for (let index = 0; index < length; index++) {
    const selectedOption = getRandomElement(selectedOptions);
    generatedPassword += selectedOption;
  }
  return generatedPassword;
}

// Get references to the #generate element
const generateBtn = document.querySelector('#generate');

// Write password to the #password input
const writePassword = () => {
  const passwordOptions = getPasswordOptions();
  if (!passwordOptions) return;
  const selectedOptions = getSelectedOptions(passwordOptions);
  console.log("Password length:", passwordOptions.length);
  const password = generatePassword(passwordOptions.length, selectedOptions);
  console.log("Password:", password);
  const passwordText = document.querySelector('#password');

  passwordText.value = password;
  passwordText.focus();
  passwordText.select();
  alert('Password generated successfully!');
}

// Add event listener to generate button
generateBtn.addEventListener('click', writePassword);
