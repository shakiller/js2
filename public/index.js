var move=0;
var checkStartCell;
function Board() {
  var table_Temp=this["table"] = {}
  this.writeChanges = (tid, goal, customWay) => {
      if (this["table"][tid] === undefined) { this["table"][tid] = {} }
      table_Temp[tid].top = goal ? customWay[0] : window[current_figure_id].ways[0]
      table_Temp[tid].right = goal ? customWay[1] : window[current_figure_id].ways[1]
      table_Temp[tid].bottom = goal ? customWay[2] : window[current_figure_id].ways[2]
      table_Temp[tid].left = goal ? customWay[3] : window[current_figure_id].ways[3]
      table_Temp[tid].ways = goal ? customWay : window[current_figure_id].ways
      table_Temp[tid].start=undefined;
  }
  this.checkWin = () => {
     // console.log(this.table)
      checkStartCell=0;
      for (cell in this.table) {

                
          var top = this["table"][+cell].top;//1
          var topParent = () => {
              if (+cell <= 4) {
                  return 0
              } else if (this["table"][+cell - 5]) {
                  return this["table"][+cell - 5].bottom
              } else return 0
          }
          var right = this["table"][+cell].right;
          var rightParent = () => {
              if (!(+cell + 1) % 5) {
                  return 0
              } else if (this["table"][+cell + 1]) {
                  return this["table"][+cell + 1].left
              } else return 0
          }
          var bottom = this["table"][+cell].bottom;
          var bottomParent = () => {
              if ((+cell >= 20)) {
                  return 0
              } else if (this["table"][+cell + 5]) {
                  return this["table"][+cell + 5].top
              } else return 0

          }
          var left = this["table"][+cell].left;
          var leftParent = () => {
              if (!(+cell + 5) % 5) {
                  return 0
              } else if (this["table"][+cell - 1]) {
                  return this["table"][+cell - 1].right
              } else return 0

          }
          
          var checkTop = top ? !!top == !!topParent() : true;
          var checkRight = right ? !!right == !!rightParent() : true;
          var checkBottom = bottom ? !!bottom == !!bottomParent() : true;
          var checkLeft = left ? !!left == !!leftParent() : true;
          if (!checkTop || !checkRight || !checkBottom || !checkLeft) { 
              console.log("fail");
                document.getElementById("win").innerHTML="fail"; 
                break; } 
          else var a = "prostotak";
      }
      
      console.log(checkStartCell+" win");      
  }
}
var board = new Board();

var bl1 = {
  block_class: `bl1`,
  ways: [0, 1, 0, 1]
}
var bl2 = {
  block_class: `bl2`,
  ways: [1, 0, 1, 0]
}
var bl3 = {
  block_class: `bl3`,
  ways: [1, 0, 0, 1]
}
var bl4 = {
  block_class: `bl4`,
  ways: [1, 1, 0, 0]
}
var bl5 = {
  block_class: `bl5`,
  ways: [0, 1, 1, 0]
}
var bl6 = {
  block_class: `bl6`,
  ways: [0, 0, 1, 1]
}
var bl7 = {
  block_class: `bl7`,
  ways: [0, 1, 1, 1]
}
var bl8 = {
  block_class: `bl8`,
  ways: [1, 1, 0, 1]
}
var bl9 = {
  block_class: `bl9`,
  ways: [1, 0, 1, 1]
}
var bl10 = {
  block_class: `bl10`,
  ways: [1, 1, 1, 0]
}
var bl11 = {
  block_class: `bl11`,
  ways: [1, 1, 1, 1]
}


var start;
var end;
var pF = document.getElementById('playField');
var current_figure = 1;
var current_figure_id;
var fF = document.getElementById('figures');
var start_ways;
var end_ways;
var startId;
var endId;
function current_figure_rand() {
  current_figure = Math.floor(Math.random() * 11) + 1;
  current_figure_id = "bl" + current_figure;
  document.getElementById(current_figure_id).setAttribute('style', 'display:block;');
  return current_figure_id;

}
function freeways(innerId, outerId){
  console.log(innerId, outerId);
  if (innerId == 0) {
    start_ways=[0,1,1,0]
  } else if (innerId == 4) {
    start_ways=[1,1,0,0]
  } else  {start_ways=[1,1,1,0]};

  if (outerId == 0) {
    end_ways=[0,0,1,1]
  } else if (outerId == 4){
    end_ways=[1,0,0,1]
  } else  {end_ways=[1,0,1,1]}

}

function start_end_rand() {
  current_figure_rand();
  start = Math.floor(Math.random() * 5);
  end = Math.floor(Math.random() * 5);
  var start_block = pF.rows[start].cells[0];
  var end_block = pF.rows[end].cells[4];
  freeways(start,end);
  startId=start * 5;
  endId=end * 5 + 4;
  board.writeChanges(startId, true, start_ways);
  board.writeChanges(endId, true, end_ways);
  start_block.setAttribute("id", "start");
  end_block.setAttribute("id", "end");
  return current_figure_id;
}


start_end_rand();

var id = 0
pF.querySelectorAll('td').forEach(function (e) {
  console.log(e)
  e.setAttribute('data-id', id++);
  e.onclick = function () {

      var setAttr = "tdblock bl " + current_figure_id;
      var tempThis=this;
      this.setAttribute('class', setAttr);
      var id = this.dataset.id;
      if ((id==endId) || (id==startId)){return}
      board.writeChanges(id, false)
      document.getElementById("move").innerHTML=++move;
      document.getElementById(current_figure_id).setAttribute('style', 'display:none;');
      document.getElementById("win").innerHTML="win";
      document.getElementById("move").innerHTML=++move;
      current_figure_rand();
      board.checkWin();
      var count=0;
      if (board["table"][endId]=="start"){document.getElementById("win").innerHTML="!!!";return;}
      for (cell in board["table"]){
      board["table"][cell].start=undefined;}

      
     for (var i=0;i<=24;i++){ 
         pF.rows[Math.floor((i)/5)].cells[(i)%5].setAttribute('style','background:orange;');}
      
      checkway(startId,count);
      console.log("checkStartCell ",checkStartCell,checkStartCell==25)

      for (cell in board["table"]) {
          if (board["table"][cell].start==true){checkStartCell++;
          console.log(checkStartCell);}}

      if ((board["table"][endId].start==true) && (checkStartCell==25)){pF.rows[Math.floor((endId)/5)].cells[(endId)%5].innerHTML="WIN!";}
        
  }
  
  function checkway(Id,recurs){
      
      recurs++;
      
    if ((board["table"][Id].top==1) && (board["table"][Id-5]!=undefined) && (board["table"][Id-5].bottom==1) && (board["table"][Id-5].start==undefined)) {
        board["table"][Id-5].start=true;
        pF.rows[Math.floor((Id-5)/5)].cells[(Id-5)%5].setAttribute('style','background:red;');
        if (recurs<25){
          checkway(Id-5,recurs);
          }
    }
     if ((board["table"][Id].bottom==1) && (board["table"][Id+5]!=undefined) && (board["table"][Id+5].top==1) && (board["table"][Id+5].start==undefined)) {
        board["table"][Id+5].start=true;
        pF.rows[Math.floor((Id+5)/5)].cells[(Id+5)%5].setAttribute('style','background:red;');
        if (recurs<25){
          checkway(Id+5,recurs);
          }
    }
    if ((board["table"][Id].right==1) && (board["table"][Id+1]!=undefined) && (board["table"][Id+1].left==1) && (board["table"][Id+1].start==undefined)) {
        board["table"][Id+1].start=true;
        pF.rows[Math.floor((Id+1)/5)].cells[(Id+1)%5].setAttribute('style','background:red;');
        if (recurs<25){
          checkway(Id+1,recurs);
          }
    }
    if ((board["table"][Id].left==1) && (board["table"][Id-1]!=undefined) && (board["table"][Id-1].right==1) && (board["table"][Id-1].start==undefined)) {
        board["table"][Id-1].start=true;
        pF.rows[Math.floor((Id-1)/5)].cells[(Id-1)%5].setAttribute('style','background:red;');
        if (recurs<25){
          checkway(Id-1,recurs);
          }
    }

}
});


