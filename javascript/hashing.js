function HashTable() {
   this.table = new Array(137);
   this.values = new Array(137);
   this.chains = new Array(137); 
   for (var i = 0; i < this.chains.length; i++) {
       this.chains[i] = [];
   }
   this.simpleHash = simpleHash;
   this.betterHash = betterHash;
   this.showDistroLinear = showDistroLinear;
   this.showDistroSeparateChaining = showDistroSeparateChaining;
   this.putLinearProbing = putLinearProbing;
   this.putSeparateChaining = putSeparateChaining;
   this.getLinearProbing = getLinearProbing;
   this.getSeparateChaining = getSeparateChaining;
}
function simpleHash(data) {
   var total = 0;
   for (var i = 0; i < data.length; ++i) {
      total += data.charCodeAt(i);
   }
   return total % this.table.length;
}

function betterHash(string) {
   const H = 37;
   var total = 0;
   for (var i = 0; i < string.length; ++i) {
      total += H * total + string.charCodeAt(i);
   }
   total = total % this.table.length;
   if (total < 0) {
      total += this.table.length-1;
   }
   return parseInt(total);
}


function putLinearProbing(key, data) {
   var pos = this.betterHash(key);
   
   // If the slot is occupied, move to the next one
   while (this.table[pos] !== undefined) {
      pos = (pos + 1) % this.table.length; // Wrap around the array
   }
   
   this.table[pos] = key;
   this.values[pos] = data;
}

function putSeparateChaining(key, data) {
   var pos = this.betterHash(key);
   var index = 0;

   // Find the first empty slot in this specific chain
   while (this.chains[pos][index] !== undefined) {
      index++;
   }
   
   // Store Key at index, Data at index + 1
   this.chains[pos][index] = key;
   this.chains[pos][index + 1] = data;
}

function getLinearProbing(key) {
   var pos = this.betterHash(key);
   var startPos = pos; // To prevent infinite loops if the table is full

   while (this.table[pos] !== undefined) {
      if (this.table[pos] === key) {
         return this.values[pos];
      }
      pos = (pos + 1) % this.table.length; // Move to the next slot
      
      if (pos === startPos) break; // We've searched the whole table
   }
   return undefined;
}

function getSeparateChaining(key) {
   var pos = this.betterHash(key);
   var index = 0;

   // Search the chain for the key
   while (this.chains[pos][index] !== undefined) {
      if (this.chains[pos][index] === key) {
         return this.chains[pos][index + 1]; // Return the data next to the key
      }
      index += 2; // Jump to the next key-value pair
   }
   return undefined;
}


function showDistroLinear() {
   for (var i = 0; i < this.table.length; ++i) {
      if (this.table[i] !== undefined) {
         // Shows the index, the Key, and the Value stored in the parallel array
         console.log(i + ": [Key: " + this.table[i] + "] -> [Value: " + this.values[i] + "]");
      }
   }
}

function showDistroSeparateChaining() {
   for (var i = 0; i < this.chains.length; ++i) {
      // Check if the chain has any data
      if (this.chains[i] !== undefined && this.chains[i].length > 0) {
         var chainOutput = "";
         for (var j = 0; j < this.chains[i].length; ++j) {
            chainOutput += "[" + this.chains[i][j] + "] ";
         }
         console.log(i + ": " + chainOutput);
      }
   }
}

function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function genStuData(arr) {
   for (var i = 0; i < arr.length; ++i) {
      var num = "";
      for (var j = 1; j <= 9; ++j) {
         num += Math.floor(Math.random() * 10);
      }
      num += getRandomInt(50,100);
      arr[i] = num;
   }
}



var someNames = ["David", "Jennifer", "Donnie", "Raymond",
                 "Cynthia", "Mike", "Clayton", "Danny", "Bryan"];
var hTable = new HashTable();
for (var i = 0; i < someNames.length; ++i) {
   hTable.putLinearProbing(someNames[i],someNames[i]);
}
hTable.showDistroLinear();



var numStudents = 10;
var arrSize = 97;
var idLen = 9;
var students = new Array(numStudents);
genStuData(students);
console.log ("Student data: \n");
var hTable = new HashTable();
for (var i = 0; i < students.length; ++i) {
   var id = students[i].substring(0, 9);  // The 9-digit ID
   var score = students[i].substring(9);  // The score (50-100)
   console.log("ID: " + id + ", Score: " + score);
   // Store ID as the key and Score as the data
   hTable.putSeparateChaining(id, score);
}
console.log("\n\nData distribution: \n");
hTable.showDistroSeparateChaining();
