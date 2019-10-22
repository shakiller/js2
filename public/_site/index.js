var move = 0;
var size = 0; /* width */
var sizeH = size; /* height */
var BGtransparent = "hsla(0,50%,50%,0.5);"
var FULLtransparent = "hsla(0,50%,50%,0);"
var bg = "https://i.ytimg.com/vi/3p4Gc-dnV3U/maxresdefault.jpg";
var bodyBG = "img/bg_map.png";
var HUEdeg = 0;
var BGposX = 0;
var checkStartCell;
var correctWays=false;
var audioBG=new Audio("aud/Ambient.mp3");
var audioClick=new Audio("aud/Ding-ding-sound.mp3");

playSoundStart();

function playSoundBG(){
    audioBG.play();
    var sndVoff = "<span class='snd'>&#9834;</span> <input type='button' class='snd' value='-' id='snfOfOff' onclick='vSoundOff()'>";
    var sndVon = "<input type='button' class='snd' value='+' id='snfOfOn' onclick='vSoundOn()'>";
    document.getElementById('UI').innerHTML+=sndVoff+sndVon;
}

function playSoundClick(){
    switch(Math.floor(Math.random()*2)+1){
    case 1:audioClick=new Audio("aud/Ding-1.mp3");break;
    case 2:audioClick=new Audio("aud/Ding-2.mp3");break;
    }
    audioClick.play();
}

function playSoundStart(){
    audioClick=new Audio("aud/Ding-ding-sound.mp3");
    audioClick.play();
}

function vSoundOff(){
    function sndDn(){
        var myintervalSD = setInterval(function(){
           if(audioBG.volume >= 0.01){audioBG.volume -= 0.01;}
           if(audioBG.volume <= 0.01)clearInterval(myintervalSD);
       },30);
   
       console.log(audioBG.volume);
   }
   
   sndDn();

    document.getElementById('snfOfOff').setAttribute('style','opacity:0.1;');
    document.getElementById('snfOfOn').setAttribute('style','opacity:1;');
}

function vSoundOn(){
    function sndUp(){
     var myintervalSU = setInterval(function(){
        if(audioBG.volume <= 0.8){audioBG.volume += 0.01;}
        if(audioBG.volume >= 0.8)clearInterval(myintervalSU);
    },30);

    console.log(audioBG.volume);
}

sndUp();
    
    document.getElementById('snfOfOff').setAttribute('style','opacity:1;');
    document.getElementById('snfOfOn').setAttribute('style','opacity:0.1;');
}

function createTable(sizeX, sizeY) {
    var table = document.createElement('table');
    var inTD = "<td class='bl'><div class='bl-1'></div><div class='bl-2'></div></td>";
    for (j = 0; j < sizeY; j++) {
        tr = table.insertRow();
        for (i = 0; i < sizeX; i++) {
            tr.innerHTML = tr.innerHTML + inTD;
        }
    }

    table.setAttribute('id', 'playField');
    document.getElementById('Field').appendChild(table);
    pF = document.getElementById('playField');
    
    start_end_rand();
    
}



function setSize(n) {
    size=n;
    setTimeout(popupAnimate, 1);
    createTable(size, size);
    
    startGame();
    setTimeout(animateStart, 1);
    
}
function popupAnimate(){
    document.getElementById('popup').setAttribute('style','margin-top:-1800px;');
    playSoundBG();
}

function animateStart(){
    document.getElementById('playField').setAttribute("class","animateStart")
}



function createPopup_Select_level(){
    var popup = document.createElement('div');
    popup.setAttribute('id','popup');
    popup.innerHTML='<h2>выберите уровень сложности</h2>';
    document.getElementById('Field').appendChild(popup); 
    popup.innerHTML=popup.innerHTML+'<input type="button" value="1" id="v1" onclick = "setSize(5)"> <input type="button" value="2"  id="v2" onclick = "setSize(7)"> <input type="button" value="3"  id="v3" onclick = "setSize(10)">';
    
    
    
    
}
setTimeout(createPopup_Select_level, 500);




function Board() {
    var table_Temp = this["table"] = {}
    this.writeChanges = (tid, goal, customWay) => {
        if (this["table"][tid] === undefined) {
            this["table"][tid] = {}
        }
        table_Temp[tid].top = goal ? customWay[0] : window[current_figure_id].ways[0]
        table_Temp[tid].right = goal ? customWay[1] : window[current_figure_id].ways[1]
        table_Temp[tid].bottom = goal ? customWay[2] : window[current_figure_id].ways[2]
        table_Temp[tid].left = goal ? customWay[3] : window[current_figure_id].ways[3]
        table_Temp[tid].ways = goal ? customWay : window[current_figure_id].ways
        table_Temp[tid].start = undefined;
    }
    this.checkWin = () => {
        // console.log(this.table)
        checkStartCell = 0;
        for (cell in this.table) {


            var top = this["table"][+cell].top; 
            var topParent = () => {
                if (+cell <= (size - 1)) {
                    return 0
                } else if (this["table"][+cell - size]) {
                    return this["table"][+cell - size].bottom
                } else return 0
            }
            var right = this["table"][+cell].right;
            var rightParent = () => {
                if (!(+cell + 1) % size) {
                    return 0
                } else if (this["table"][+cell + 1]) {
                    return this["table"][+cell + 1].left
                } else return 0
            }
            var bottom = this["table"][+cell].bottom;
            var bottomParent = () => {
                if ((+cell >= (size * (size - 1)))) {
                    return 0
                } else if (this["table"][+cell + size]) {
                    return this["table"][+cell + size].top
                } else return 0

            }
            var left = this["table"][+cell].left;
            var leftParent = () => {
                if (!(+cell + size) % size) {
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
                document.getElementById("win").innerHTML = " ";
                correctWays=false;
                break;
            } else var a = "prostotak";
        }

        console.log(checkStartCell + " win");
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
var pF;
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
    document.getElementById(current_figure_id).setAttribute('style', 'filter:sepia(0);order:1; z-index:1;transform:translateY(-10px);background-image: url(img/card_general.png);');
    return current_figure_id;

}

function freeways(innerId, outerId) {
    console.log(innerId, outerId);
    if (innerId == 0) {
        start_ways = [0, 1, 1, 0]
    } else if (innerId == (size - 1)) {
        start_ways = [1, 1, 0, 0]
    } else {
        start_ways = [1, 1, 1, 0]
    };

    if (outerId == 0) {
        end_ways = [0, 0, 1, 1]
    } else if (outerId == (size - 1)) {
        end_ways = [1, 0, 0, 1]
    } else {
        end_ways = [1, 0, 1, 1]
    }

}

function start_end_rand() {
    current_figure_rand();
    start = Math.floor(Math.random() * size);console.log(start," start");
    end = Math.floor(Math.random() * size);console.log(end," end");
    var start_block = pF.rows[start].cells[0];
    var end_block = pF.rows[end].cells[(size - 1)];
    freeways(start, end);
    startId = start * size;
    endId = end * size + size - 1;
    console.log(startId," ",endId," s e");
    board.writeChanges(startId, true, start_ways);
    board.writeChanges(endId, true, end_ways);
    start_block.setAttribute("id", "start");
    end_block.setAttribute("id", "end");
    return current_figure_id;
}




document.getElementById("body").setAttribute('style', "background-image:url(" + bodyBG + ");background-size:cover;background-position:" + BGposX + "% 50%;");
var id = 0
function startGame(){
pF.querySelectorAll('td').forEach(function (e) {
    console.log(e);
    
    e.setAttribute('data-id', id++);
    e.onclick = function () {
        document.getElementById("playField").setAttribute('style', "background-image:url(" + bg + ");background-size:cover;background-position:center;");

        HUEdeg = HUEdeg + 5;
        playSoundClick();
        var setAttr = "tdblock bl " + current_figure_id;
        var tempThis = this;
        this.setAttribute('class', setAttr);
        var id = this.dataset.id;
        if ((id == endId) || (id == startId)) {
            return
        }
        board.writeChanges(id, false);
        document.getElementById("move").innerHTML = ++move;
        document.getElementById(current_figure_id).setAttribute('style', 'filter:sepia(100%);order:0; z-index:0;transform:translateY(0px);background-image: url(img/card_general.png);');
        document.getElementById("body").setAttribute('style', "background-image:url(" + bodyBG + ");background-size:cover;background-position:" + BGposX + "% 50%;");
        if (BGposX < 100) {
            BGposX++
        } else {
            BGposX = 0
        };
        document.getElementById("win").innerHTML = "win";
        correctWays=true;
        for (var i = 0; i <= (size * size - 1); i++) {
            pF.rows[Math.floor((i) / size)].cells[(i) % size].setAttribute('style', 'background:' + FULLtransparent + ';');
        }
        current_figure_rand();
        board.checkWin();
        var count = 0;
        if (board["table"][endId] == "start") {
            document.getElementById("win").innerHTML = "!!!";
            return;
        }
        for (cell in board["table"]) {
            board["table"][cell].start = undefined;
        }


        for (var i = 0; i <= (size * size - 1); i++) {
            pF.rows[Math.floor((i) / size)].cells[(i) % size].setAttribute('style', 'background:orange;');
        }

        checkway(startId, count);
        console.log("checkStartCell ", checkStartCell, checkStartCell == (size * size))

        for (cell in board["table"]) {
            if (board["table"][cell].start == true) {
                checkStartCell++;
                console.log(checkStartCell);
            }
        }

        if ((board["table"][endId].start == true) && (checkStartCell == (size * size)) && (correctWays==true)) {
            pF.rows[Math.floor((endId) / size)].cells[(endId) % size].innerHTML = "WIN!";
            playSoundStart();
            for (var i = 0; i <= (size * size - 1); i++) {
                pF.rows[Math.floor((i) / size)].cells[(i) % size].setAttribute('style', 'background:' + FULLtransparent + ';--varBG2: #00ffff00;outline: dotted 1px #80808000;');
            }
        }

    }

    function checkway(Id, recurs) {

        recurs++;

        if ((board["table"][Id].top == 1) && (board["table"][Id - size] != undefined) && (board["table"][Id - size].bottom == 1) && (board["table"][Id - size].start == undefined)) {
            board["table"][Id - size].start = true;
            pF.rows[Math.floor((Id - size) / size)].cells[(Id - size) % size].setAttribute('style', 'background:' + BGtransparent + ';');
            if (recurs < size * size) {
                checkway(Id - size, recurs);
            }
        }
        if ((board["table"][Id].bottom == 1) && (board["table"][Id + size] != undefined) && (board["table"][Id + size].top == 1) && (board["table"][Id + size].start == undefined)) {
            board["table"][Id + size].start = true;
            pF.rows[Math.floor((Id + size) / size)].cells[(Id + size) % size].setAttribute('style', 'background:' + BGtransparent + ';');
            if (recurs < (size * size)) {
                checkway(Id + size, recurs);
            }
        }
        if ((board["table"][Id].right == 1) && (board["table"][Id + 1] != undefined) && (board["table"][Id + 1].left == 1) && (board["table"][Id + 1].start == undefined)) {
            board["table"][Id + 1].start = true;
            pF.rows[Math.floor((Id + 1) / size)].cells[(Id + 1) % size].setAttribute('style', 'background:' + BGtransparent + ';');
            if (recurs < (size * size)) {
                checkway(Id + 1, recurs);
            }
        }
        if ((board["table"][Id].left == 1) && (board["table"][Id - 1] != undefined) && (board["table"][Id - 1].right == 1) && (board["table"][Id - 1].start == undefined)) {
            board["table"][Id - 1].start = true;
            pF.rows[Math.floor((Id - 1) / size)].cells[(Id - 1) % size].setAttribute('style', 'background:' + BGtransparent + ';');
            if (recurs < (size * size)) {
                checkway(Id - 1, recurs);
            }
        }

    }
})};
