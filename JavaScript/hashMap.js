class hashMap {

  constructor() {
    this.groupMap = new Object();
  }

  put(k,v){
    if (!this.groupMap[k]) {
      this.groupMap[k] = [];
    }
    this.groupMap[k].push(v);
    return this.groupMap;
  }

  getValue(k){
    return this.groupMap[k]
  }
  getGroupValues(k){
    var subArray = this.groupMap[k];
    var arr = [];
    for (var j=0; j<subArray.length; ++j) {
      arr.push(subArray[j]);
      // console.log(arr[j]);
    }
    return arr;
  }

  isExist(k,v){
    if (!this.groupMap[k]) {
      console.log("Error: Key "+k+" doesn't exist.");
      return false;
    }
    else {
      return (this.groupMap[k].includes(v));
    }
  }

  findKeyByValue(v){
    for(var i = 0; i<9; i++){
      if (this.isExist(i,v)) {
        return i;
      }
    }
  }
}
