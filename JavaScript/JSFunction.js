window.onload = function() {
  let group = ["TopLeftCorner", "TopBorder", "TopRightCorner",
              "LeftBorder" ,        "",       "RightBorder",
              "BottomLeftCorner","BottomBorder","BottomRightCorner"];
  puzzleArr = {"f00":1, "f20":5,"f40":7,"f70":4,"f01":3,"f11":2,"f02":4
                ,"f22":6,"f32":8,"f52":1,"f62":2,"f72":7,"f82":5,"f13":6
                ,"f33":1,"f53":4,"f83":7,"f44":8,"f05":8,"f35":7,"f55":6
                ,"f75":2,"f06":5,"f16":1,"f26":9,"f36":6,"f56":3,"f66":7
                ,"f86":2,"f77":1,"f87":4,"f18":7,"f48":1,"f68":9};
  createPuzzle(puzzleArr);
  doSomethingElse(group, 0, 0,0);
};

let times = 0;
var nonet = new hashMap();
var puzzleArr;

function createPuzzle(puzzleArr){
  for (r= 0; r< 9; r++) {
    for (c = 0; c < 9; c++) {
      if (("f"+c+""+r) in puzzleArr){
        document.getElementById("Game_Frame").innerHTML +=("afterend","<div class='g0' id='c00' ><input value = '"+puzzleArr["f"+c+r]+"'  readOnly = 'true' autocomplete='off' maxlength='1' id='f"+c+r+"'></div>");
      }
      else {
        document.getElementById("Game_Frame").innerHTML +=("afterend","<div class='g0' id='c00' ><input autocomplete='off' maxlength='1' id='f"+c+r+"' style = 'color:#cc4563'></div>");
      }
    }
  }
}

function doSomethingElse(group, row, column,index){
    for (r= 0+row; r< 3 + row; r++) {
      for (c = 0+column; c < 3+column; c++) {
          var d = document.getElementById("f"+c+""+r);
          nonet.put(times,"f"+c+""+r);
          if(group[index] != ""){
            d.classList.add(group[index]);
          }
          index++;
        }
    }
    if(times < 8){
      if (column < 5) {
        column+=3;
      }
      else {
        column = 0;
        row+=3;
      }
      times++;
      doSomethingElse(group, row,column,0);
    }
}

function myFunction(){
  let value;
  let id;
  let notFinished = false;
  for (r= 0; r< 9; r++) {
    for (c = 0; c < 9; c++) {
      value = document.getElementById("f"+c+""+r).value;
      if ((value !== "")) {
        if ((!(("f"+c+""+r) in puzzleArr)) && (value !== "")){ // if "fxy"is not in puzzleArr && value is not empty, do this
          var k = nonet.findKeyByValue("f"+c+""+r); //Group 0,1,2,->8 commonly known as A-I
          var arr = nonet.getGroupValues(k);        //arr of group -> f00, f01,f02, f01, etc..
          arr.forEach(function(item, i) { //Notent - surroundings/group
            var itemValue = document.getElementById(item).value;
            if((itemValue !== " ") && (item !== "f"+c+""+r)){
              if (value === itemValue) {
                arr.forEach(function(item, i) {
                  document.getElementById(item).style.background = "#f2fffe";
                  // return;
                });
                notFinished = true;
                console.log(notFinished);
              }
            }
          });
          for (h = 0; h < 9; h++) { //Horizontal
            var horizontalPeer = document.getElementById("f"+h+""+r).value;
            if ((h !== c) && (horizontalPeer === value)){
              for (h = 0; h < 9; h++) { //0,1,2,3,4,5,6,7,8,9
                document.getElementById(("f"+h+""+r)).style.background = "#f8f5ff";
              }
              notFinished = true;
              console.log(notFinished);

            }
          }
          for (v = 0; v < 9; v++) { //Vertical
            var horizontalPeer = document.getElementById("f"+c+""+v).value;
            if ((v !== r) && (horizontalPeer === value)){
              for (v = 0; v < 9; v++) {
                document.getElementById(("f"+c+""+v)).style.background = "#f8f5ff";
              }
              notFinished = true;
              console.log(notFinished);

            }
          }
        }
      }
      else {
        notFinished = true;
        console.log(notFinished);
      }
    }
  }
  if (!notFinished) {
    document.getElementById("Btn").value = "Done";
    console.log("Yay, done");
  }
}
