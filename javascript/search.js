function readFile(filename) {
    const fs = require('fs');
    
    // Check if file exists first
    if (!fs.existsSync(filename)) {
        console.error("ERROR: File not found at " + filename);
        return [];
    }

    const rawData = fs.readFileSync(filename, 'utf8');
    
    // Check the raw character count
    //console.log("Raw character count in file: " + rawData.length);
    
    const data = rawData.trim();
    if (data.length === 0) {
        console.log("WARNING: File is empty or only contains whitespace.");
        return [];
    }

    const words = data.split(/\s+/);
    //console.log("First word: [" + words[0] + "]");
    //console.log("Last word: [" + words[words.length - 1] + "]");
    
    return words;
}

//var words = readFile("words.txt");
//console.log(words.length + " words read.");


function seqSearch(arr, data) {
   for (var i = 0; i < arr.length; ++i) {
      if (arr[i] == data) {
         return i;
      }
   }
   return -1;
}

var words = readFile("words.txt");
var word = "rhetoric";
var start = new Date().getTime();
var position = seqSearch(words, word);
var stop = new Date().getTime();
var elapsed = stop - start;
if (position >= 0) {
   console.log("Found " + word + " at position " + position + ".");
   console.log("Sequential search took " + elapsed + " milliseconds.");
} 
else {
   console.log(word + " is not in the file.");
}


function insertionSort(arr) {
   var temp, inner;
   for (var outer = 1; outer <= arr.length - 1; ++outer) {
      temp = arr[outer];
      inner = outer;
      while (inner > 0 && (arr[inner - 1] >= temp)) {
         arr[inner] = arr[inner - 1];
         --inner;
      }
      arr[inner] = temp;
   }
}

function binSearch(arr, data) {
   var upperBound = arr.length-1;
   var lowerBound = 0;
   while (lowerBound <= upperBound) {
      var mid = Math.floor((upperBound + lowerBound) / 2);
      if (arr[mid] < data) {
         lowerBound = mid + 1;
      }
      else if (arr[mid] > data) {
         upperBound = mid - 1;
      }
      else {
         return mid;
      }
   }
   return -1;
}




var words = readFile("words.txt");
insertionSort(words);
var word = "rhetoric";
var start = new Date().getTime();
var position = binSearch(words, word);
var stop = new Date().getTime();
var elapsed = stop - start;
if (position >= 0) {
   console.log("Found " + word + " at position " + position + ".");
   console.log("Binary search took " + elapsed + " milliseconds.");
}
else {
   console.log(word + " is not in the file."); 
}
