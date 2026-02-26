// search_name.js
const readline = require('readline');

// Create a readline interface (standard way to read from stdin)
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Data – use `const` because the array never changes
const names = ["David", "Cynthia", "Raymond", "Clayton", "Jennifer"];

// Helper that searches the array and prints the result
function findName(query) {
  const position = names.indexOf(query);
  if (position >= 0) {
    console.log(`Found ${query} at position ${position}`);
  } else {
    console.log(`${query} not found in array.`);
  }
}

//  Prompt the user, then handle the answer
rl.question("Enter a name to search for: ", (answer) => {
  // Trim whitespace so accidental spaces don’t break the lookup
  const name = answer.trim();
  findName(name);
  rl.close(); // always close the interface when done
});