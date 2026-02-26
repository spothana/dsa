// chap3_2.js
const fs = require('fs');                     // ← file‑system module
const readline = require('readline');       // ← readline module for user input
const rl = readline.createInterface({ input: process.stdin, output: process.stdout }); // ← readline interface

const titles = [
  'The Godfather',
  'Pulp Fiction',
  'The Shawshank Redemption',
  'Inception',
  'The Dark Knight',
  'Forrest Gump',
  'The Matrix',
  'Star Wars: Episode IV : A New Hope',
  'The Lord of the Rings: The Fellowship of the Ring',
  'Back to the Future'
];
fs.writeFileSync('films.txt', titles.join('\n'), 'utf8');
console.log('films.txt created with', titles.length, 'titles');


const movies = fs.readFileSync('films.txt', 'utf8')
                 .split(/\r?\n/)               // split into lines
                 .filter(line => line.length); // drop empty lines


class List {
  constructor() {
    this.items = [];
  }
  append(item) {
    this.items.push(item);
  }
  // returns a shallow copy for safe iteration
  toArray() {
    return this.items.slice();
  }
}


function displayList(list) {
  list.toArray().forEach(item => console.log(item));
}

function checkOut(customerName, movieTitle, movieList, customerList) {
  // find the movie in the available list
  const idx = movieList.items.indexOf(movieTitle);
  if (idx === -1) {
    console.log(`Sorry, "${movieTitle}" is not available.`);
    return;
  }

  // remove from movie list
  const [movie] = movieList.items.splice(idx, 1);

  // record the rental for the customer
  const entry = `${customerName} rented "${movie}"`;
  customerList.append(entry);
}


const movieList = new List();
const customers = new List();

for (let i = 0; i < movies.length; ++i) {
  movieList.append(movies[i]);
}

console.log('Available movies:\n');
displayList(movieList);

rl.question('\nEnter your name: ', (name) => {
  rl.question('Enter the movie you want to rent: ', (movie) => {
    checkOut(name.trim(), movie.trim(), movieList, customers);  
    console.log('\n');
    console.log('Available movies:\n');
    displayList(movieList);
    console.log('\nCustomer Rentals:\n');
    displayList(customers);
    rl.close();
  });
});
        
//checkOut('Jane Doe', 'The Godfather', movieList, customers);

//console.log('\nCustomer Rentals:\n');
//displayList(customers);