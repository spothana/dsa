function Set() {
   this.dataStore = [];
   this.add = add;
   this.remove = remove;
   this.size = size;
   this.union = union;
   this.contains = contains;
   this.intersect = intersect;
   this.subset = subset;
   this.difference = difference;
   this.show = show;
}

function add(data) {
   if (this.dataStore.indexOf(data) < 0) {
      this.dataStore.push(data);
      return true;
   } 
   else {
      return false;
   }
}

function remove(data) {
   var pos = this.dataStore.indexOf(data);
   if (pos > -1) {
      this.dataStore.splice(pos,1);
      return true;
   }
   else {
      return false;
   }
}

function size() {
   return this.dataStore.length;
}

function show() {
   return "[" + this.dataStore + "]";
}

function contains(data) {
   if (this.dataStore.indexOf(data) > -1) {
      return true;
   }
   else {
      return false;
   }
}

function union(set) {
   var tempSet = new Set();
   for (var i = 0; i < this.dataStore.length; ++i) {
      tempSet.add(this.dataStore[i]);
   }
   for (var i = 0; i < set.dataStore.length; ++i) {
      if (!tempSet.contains(set.dataStore[i])) {
         tempSet.dataStore.push(set.dataStore[i]);
      }
   }
   return tempSet;
}

function intersect(set) {
   var tempSet = new Set();
   for (var i = 0; i < this.dataStore.length; ++i) {
      if (set.contains(this.dataStore[i])) {
         tempSet.add(this.dataStore[i]);
      }
   }
   return tempSet;
}

function subset(set) {
   if (this.size() > set.size()) {
      return false;
   }
   else {
      for (var i = 0; i < this.dataStore.length; ++i) {
         if (!set.contains(this.dataStore[i])) {
            return false;
         }
      }
   }
   return true;
}

function difference(set) {
   var tempSet = new Set();
   for (var i = 0; i < this.dataStore.length; ++i) {
      if (!set.contains(this.dataStore[i])) {
         tempSet.add(this.dataStore[i]);
      }
   }
   return tempSet;
}  


// main program

var cis = new Set();
var it = new Set();
cis.add("Clayton");
cis.add("Jennifer");
cis.add("Danny");
it.add("Bryan");
it.add("Clayton");
it.add("Jennifer");
var diff = new Set();
diff = cis.difference(it);
console.log(cis.show() + " difference " + it.show() + " -> " + diff.show());


var it = new Set();
it.add("Cynthia");
it.add("Clayton");
it.add("Jennifer");
it.add("Danny");
it.add("Jonathan");
it.add("Terrill");
it.add("Raymond");
it.add("Mike");
var dmp = new Set();
dmp.add("Cynthia");
dmp.add("Raymond");
dmp.add("Jonathan");
if (dmp.subset(it)) {   
   console.log(dmp.show() + " subset of " + it.show());
}
else {
   console.log(dmp.show() + " not a subset of " + it.show());
}


var cis = new Set();
cis.add("Mike");
cis.add("Clayton");
cis.add("Jennifer");
cis.add("Raymond");
var dmp = new Set();
dmp.add("Raymond");
dmp.add("Cynthia");
dmp.add("Bryan");
var inter = cis.intersect(dmp);

console.log("intersection of " + dmp.show() + " is " + cis.show() + " -> " + inter.show());



var cis = new Set();
cis.add("Mike");
cis.add("Clayton");
cis.add("Jennifer");
cis.add("Raymond");
var dmp = new Set();
dmp.add("Raymond");
dmp.add("Cynthia");
dmp.add("Jonathan");
var it = new Set();
it = cis.union(dmp);

console.log("Union of " + cis.show() + " is " + dmp.show() + " -> " + it.show());