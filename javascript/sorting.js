function CArray(numElements) {
   this.dataStore = [];
   this.pos = 0;
   this.numElements = numElements;
   this.insert = insert;
   this.toString = toString;
   this.clear = clear;
   this.setData = setData;
   this.bubbleSort = bubbleSort;
   this.selectionSort = selectionSort;
   this.animateBubbleSort = animateBubbleSort;
   this.insertionSort = insertionSort;
   this.quickSort = quickSort;   
   this.executeQuickSort = executeQuickSort;
   this.partition = partition;
   this.mergeSort = mergeSort;
   this.executeMergeSort = executeMergeSort;
   this.merge = merge;
   for (var i = 0; i < numElements; ++i) {
      this.dataStore[i] = i;
   }
   this.setData = setData;
}


function setData() {
   for (var i = 0; i < this.numElements; ++i) {
      this.dataStore[i] = Math.floor(Math.random() * 
                          (this.numElements+1));
   }
}

function clear() {
   for (var i = 0; i < this.dataStore.length; ++i) {
      this.dataStore[i] = 0;
   }
}

function insert(element) {
   this.dataStore[this.pos++] = element;
}

function toString() {
   var retstr = "";
   for (var i = 0; i < this.dataStore.length; ++i) {
      retstr += this.dataStore[i] + " ";
      if (i > 0 && i % 10 == 0) {
         retstr += "\n";
      }
   }
   return retstr;
}


function bubbleSort() {
   var n = this.dataStore.length;
   // Standard Bubble Sort logic: 
   // Each pass "bubbles" the largest remaining element to the end
   for (var outer = 0; outer < n - 1; outer++) {
      for (var inner = 0; inner < n - 1 - outer; inner++) {
         if (this.dataStore[inner] > this.dataStore[inner + 1]) {
            // Modern JS swap (Destructuring)
            [this.dataStore[inner], this.dataStore[inner + 1]] = 
            [this.dataStore[inner + 1], this.dataStore[inner]];
         }
      }
   }
}

function selectionSort() {
   var min, temp;
   for (var outer = 0; outer <= this.dataStore.length-2; ++outer) {
      min = outer;
      for (var inner = outer + 1; 
           inner <= this.dataStore.length-1; ++inner) {         
         if (this.dataStore[inner] < this.dataStore[min]) {
            min = inner;  
         }
      }
      temp = this.dataStore[outer]; 
      this.dataStore[outer] = this.dataStore[min];
      this.dataStore[min] = temp;
   }
}  

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function animateBubbleSort() {
   var n = this.dataStore.length;
   
   for (var outer = 0; outer < n - 1; outer++) {
      for (var inner = 0; inner < n - 1 - outer; inner++) {
         
         // 2. Clear and Print current state
         console.clear();
         console.log("Animate Bubble Sort:");
         console.log("--------------------");
         console.log(this.toString());
         console.log(`Checking: ${this.dataStore[inner]} and ${this.dataStore[inner+1]}`);

         if (this.dataStore[inner] > this.dataStore[inner + 1]) {
            [this.dataStore[inner], this.dataStore[inner + 1]] = 
            [this.dataStore[inner + 1], this.dataStore[inner]];
         }

         // 3. Pause for 200 milliseconds to see the "move"
         await sleep(1000);
      }
   }
   console.clear();
   console.log("Sort Complete!");
   console.log(this.toString());
}

/*
var mynums = new CArray(10);
mynums.setData();

// We use .then() or an async wrapper because it returns a Promise
mynums.animateBubbleSort().then(() => {
   console.log("Done animating!");
});
*/

function insertionSort() {
   var temp, inner;
   for (var outer = 1; outer <= this.dataStore.length - 1; ++outer) {
      temp = this.dataStore[outer];
      inner = outer;
      while (inner > 0 && (this.dataStore[inner - 1] >= temp)) {
         this.dataStore[inner] = this.dataStore[inner - 1];
         --inner;
      }
      this.dataStore[inner] = temp;
   }
}


function quickSort() {
    this.executeQuickSort(0, this.dataStore.length - 1);
}

function executeQuickSort(left, right) {
    if (left < right) {
        // 1. Pick a random element as pivot to avoid O(n^2)
        let pivotIndex = left + Math.floor(Math.random() * (right - left));
        
        // 2. Partition the array
        let splitIndex = this.partition(left, right, pivotIndex);
        
        // 3. Recurse
        this.executeQuickSort(left, splitIndex - 1);
        this.executeQuickSort(splitIndex + 1, right);
    }
}

function partition(left, right, pivotIndex) {
    let pivotValue = this.dataStore[pivotIndex];
    // Move pivot to end
    [this.dataStore[pivotIndex], this.dataStore[right]] = [this.dataStore[right], this.dataStore[pivotIndex]];
    
    let storeIndex = left;
    for (let i = left; i < right; i++) {
        if (this.dataStore[i] < pivotValue) {
            [this.dataStore[i], this.dataStore[storeIndex]] = [this.dataStore[storeIndex], this.dataStore[i]];
            storeIndex++;
        }
    }
    // Move pivot to final place
    [this.dataStore[storeIndex], this.dataStore[right]] = [this.dataStore[right], this.dataStore[storeIndex]];
    return storeIndex;
}



function mergeSort() {
    this.executeMergeSort(0, this.dataStore.length - 1);
}

function executeMergeSort(left, right) {
    if (left < right) {
        var middle = Math.floor((left + right) / 2);

        // Sort the left half
        this.executeMergeSort(left, middle);
        // Sort the right half
        this.executeMergeSort(middle + 1, right);

        // Merge the two sorted halves
        this.merge(left, middle, right);
    }
}

function merge(left, middle, right) {
    var temp = [];
    var i = left;      // Starting index for left subarray
    var j = middle + 1; // Starting index for right subarray
    var k = 0;         // Starting index for temp array

    // While there are elements in both subarrays
    while (i <= middle && j <= right) {
        if (this.dataStore[i] <= this.dataStore[j]) {
            temp[k++] = this.dataStore[i++];
        } else {
            temp[k++] = this.dataStore[j++];
        }
    }

    // Copy remaining elements of left subarray, if any
    while (i <= middle) {
        temp[k++] = this.dataStore[i++];
    }

    // Copy remaining elements of right subarray, if any
    while (j <= right) {
        temp[k++] = this.dataStore[j++];
    }

    // Copy the merged elements back into the original dataStore
    for (var m = 0; m < temp.length; m++) {
        this.dataStore[left + m] = temp[m];
    }
}



const test = (name, sortFunc) => {
   mynums.setData(); // Force randomization    
   console.log("Original Array:");
   console.log(mynums.toString());
   const start = Date.now();
   sortFunc.call(mynums);
   console.log(`${name}: ${Date.now() - start}ms`);
   console.log("Sorted Array:");
   console.log(mynums.toString());
    
};

var numElements = 10;
var mynums = new CArray(numElements);

console.log(`Testing sorting algorithms with ${numElements} random elements:`);
test("Quicksort", mynums.quickSort);
test("Bubble Sort", mynums.bubbleSort);
test("Selection Sort", mynums.selectionSort);
test("Insertion Sort", mynums.insertionSort);
test("Merge Sort", mynums.mergeSort);
