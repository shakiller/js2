var move = 0;
var size = 0; /* width */
var sizeH = size; /* height */
var BGtransparent = "#00f3ff78;"
var FULLtransparent = "hsla(0,50%,50%,0);"
var bg /*= "https://i.ytimg.com/vi/3p4Gc-dnV3U/maxresdefault.jpg"*/ ;
var bodyBG /*= "img/bg_map.png"*/ ;
var HUEdeg = 0;
var BGposX = 0;
var checkStartCell;
var correctWays = false;
var audioBG = new Audio("aud/ambient for maze game 2.mp3");
var audioClick = new Audio("aud/Ding-ding-sound.mp3");



function playSoundBG() {
    audioBG.play();
    audioBG.volume = 0.2;
    var sndVoff = "<span class='snd'>&#9834;</span> <input type='button' class='snd' value='-' id='snfOfOff' onclick='vSoundOff()'>";
    var sndVon = "<input type='button' class='snd' value='+' id='snfOfOn' onclick='vSoundOn()'>";
    document.getElementById('UI').innerHTML += sndVoff + sndVon;
}

function playSoundClick() {
    switch (Math.floor(Math.random() * 8) + 1) {
        case 1:
            audioClick = new Audio("aud/nn_1.mp3");
            break;
        case 2:
            audioClick = new Audio("aud/nn_2.mp3");
            break;
        case 3:
            audioClick = new Audio("aud/nn_3.mp3");
            break;
        case 4:
            audioClick = new Audio("aud/nn_4.mp3");
            break;
        case 5:
            audioClick = new Audio("aud/nn_5.mp3");
            break;
        case 6:
            audioClick = new Audio("aud/nn_6.mp3");
            break;
        case 7:
            audioClick = new Audio("aud/nn_7.mp3");
            break;
        case 8:
            audioClick = new Audio("aud/nn_8.mp3");
            break;
    }
    audioClick.play();
}

function playSoundStart() {
    audioClick.play();
    audioBG.volume = 0.2;
}

function vSoundOff() {
    function sndDn() {
        var myintervalSD = setInterval(function () {
            if (audioBG.volume >= 0.01) {
                audioBG.volume -= 0.01;
            }
            if (audioBG.volume <= 0.01) clearInterval(myintervalSD);
        }, 30);

        console.log(audioBG.volume);
    }

    sndDn();

    document.getElementById('snfOfOff').setAttribute('style', 'opacity:0.1;');
    document.getElementById('snfOfOn').setAttribute('style', 'opacity:1;');
}

function vSoundOn() {
    function sndUp() {
        var myintervalSU = setInterval(function () {
            if (audioBG.volume <= 0.8) {
                audioBG.volume += 0.01;
            }
            if (audioBG.volume >= 0.8) clearInterval(myintervalSU);
        }, 30);

        console.log(audioBG.volume);
    }

    sndUp();

    document.getElementById('snfOfOff').setAttribute('style', 'opacity:1;');
    document.getElementById('snfOfOn').setAttribute('style', 'opacity:0.1;');
}
var figures_tile = {
    figure1: [
              [1, 1, 1, 1],
              [0, 0, 0, 0],
              [0, 0, 0, 0],
              [0, 0, 0, 0]
            ],
    figure2: [
              [1, 1, 1, 0],
              [0, 1, 0, 0],
              [0, 0, 0, 0],
              [0, 0, 0, 0]
            ],
    figure3: [
              [1, 1, 1, 0],
              [0, 0, 1, 0],
              [0, 0, 0, 0],
              [0, 0, 0, 0]
            ],
    figure4: [
              [0, 0, 1, 0],
              [1, 1, 1, 0],
              [0, 0, 0, 0],
              [0, 0, 0, 0]
            ],
    figure5: [
              [1, 1, 0, 0],
              [0, 1, 1, 0],
              [0, 0, 0, 0],
              [0, 0, 0, 0]
            ],
    figure6: [
              [0, 1, 1, 0],
              [1, 1, 0, 0],
              [0, 0, 0, 0],
              [0, 0, 0, 0]
            ],
    figure7: [
              [1, 1, 0, 0],
              [1, 1, 0, 0],
              [0, 0, 0, 0],
              [0, 0, 0, 0]
            ],
    figure8: [
              [1, 1, 0, 0],
              [0, 0, 0, 0],
              [0, 0, 0, 0],
              [0, 0, 0, 0]
            ]
    }





function setSize(n) {
    size = n;
    setTimeout(popupAnimate, 1);
    createTable(size, size*2);

//    startGame();
    setTimeout(animateStart, 1);

}

function popupAnimate() {
    document.getElementById('popup').setAttribute('style', 'margin-top:-1800px;');
    playSoundBG();
}

function animateStart() {
    document.getElementById('playField').setAttribute("class", "animateStart")
}


function createPopup_Select_level() {
    var popup = document.createElement('div');
    popup.setAttribute('id', 'popup');
    popup.innerHTML = '<h2>выберите уровень сложности</h2>';
    document.getElementById('Field').appendChild(popup);
    popup.innerHTML = popup.innerHTML + '<input type="button" value="1" id="v1" onclick = "setSize(5)"> <input type="button" value="2"  id="v2" onclick = "setSize(7)"> <input type="button" value="3"  id="v3" onclick = "setSize(10)">';

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
                correctWays = false;
                break;
            } else var a = "prostotak";
        }

        console.log(checkStartCell + " win");
    }
}
var board = new Board();



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
var current_figure_name;
var main_table=[];

function createTable(sizeX, sizeY) {
    var table = document.createElement('table');
    var inTD = "<td class='bl'><div class='bl-1'></div><div class='bl-2'></div></td>";
    main_table=new Array(sizeY);
    for (j = 0; j < sizeY; j++) {
        tr = table.insertRow();
        main_table[j]=new Array(sizeX);
        for (i = 0; i < sizeX; i++) {
            main_table[j][i]=0;
            inTD = "<td class='bl'>"+main_table[j][i]+"</td>";
            tr.innerHTML = tr.innerHTML + inTD;
        }
    }

    table.setAttribute('id', 'playField');
    document.getElementById('Field').appendChild(table);
    pF = document.getElementById('playField');
    current_figure_rand();
    startGame();

}

function current_figure_rand() {
    current_figure = Math.floor(Math.random() * 8) + 1;
    current_figure_name="figure"+current_figure;
    current_figure_id = figures_tile[current_figure_name];
    
    var current_figure_table = document.createElement('table');
    var inTD = "";
    for (j = 0; j < 4; j++) {
        tr = current_figure_table.insertRow();
        for (i = 0; i < 4; i++) {
            inTD = "<td class='paint_"+current_figure_id[j][i]+"'></td>";
            tr.innerHTML = tr.innerHTML + inTD;
        }
    }
    document.getElementById('current_figure_UI').innerHTML="";
    document.getElementById('current_figure_UI').append(current_figure_table);
    return current_figure_id;

}

function startGame() {
    document.getElementById('current_figure_UI').onclick=function (e) {
        current_figure_rand();
      }
};


/*
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
    start = Math.floor(Math.random() * size);
    console.log(start, " start");
    end = Math.floor(Math.random() * size);
    console.log(end, " end");
    var start_block = pF.rows[start].cells[0];
    var end_block = pF.rows[end].cells[(size - 1)];
    freeways(start, end);
    startId = start * size;
    endId = end * size + size - 1;
    console.log(startId, " ", endId, " s e");
    board.writeChanges(startId, true, start_ways);
    board.writeChanges(endId, true, end_ways);
    start_block.setAttribute("id", "start");
    end_block.setAttribute("id", "end");
    return current_figure_id;
}




document.getElementById("body").setAttribute('style', "background-image:url(" + bodyBG + ");background-size:cover;background-position:" + BGposX + "% 50%;");
var id = 0


*/