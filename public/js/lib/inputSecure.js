/**
 * Secure input by encoding special characters.
 * @param {string} input - The input string to be secured.
 * @returns {string} - The secured input string.
 */
export function inputSecure(input) {
  // Initialize an empty string to store the secured result
  let securedResult = '';

  // Loop through each character in the input string
  for (let i = 0; i < input.length; i++) {
    const char = input[i];

    // Check if the character is a special character, excluding spaces
    if (/[^a-zA-Z0-9]/.test(char) && char !== ' ') {
      // Use encodeURIComponent to encode the character and replace %20 with '+'
      securedResult += encodeURIComponent(char).replace(/%20/g, '+');
    } else {
      // If the character is not a special character or space, append it unchanged
      securedResult += char;
    }
  }

  // Return the secured result
  return securedResult;
}
