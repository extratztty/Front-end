var canvasWidth = Math.min(640,$(window).width()*3/4);
var canvasHeight = Math.min(640,$(window).width()*3/4);
var block = 16;
var margin = 120;
var flag = 0;

var array = [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,1,1,1,1,0,0,0,0,1,1,1,1,0,0],
            [0,1,0,0,1,0,0,0,0,0,1,0,0,1,0,0],
            [0,0,0,1,1,1,0,0,0,0,1,1,1,1,0,0],
            [0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0],
            [0,0,1,1,1,1,1,0,0,0,1,1,1,1,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,1,0,1,0,0,0,0,0,1,1,1,0,0,0],
            [0,0,1,0,1,1,1,0,0,1,0,1,0,0,0,0],
            [0,1,1,1,1,0,1,0,0,1,0,1,0,0,0,0],
            [0,1,1,0,1,1,1,1,0,1,1,1,1,1,0,0],
            [0,0,1,0,1,0,0,0,0,0,0,1,0,0,0,0],
            [0,0,1,1,0,1,1,0,0,1,0,1,0,1,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]];
var book = new Array(block);
for(var i = 0;i < block;i ++){
    book[i] = new Array(block);
    for(var j = 0;j < block;j ++){
        book[i][j] = 0;
    }
}
var count = [["","1 1","4 4","1 1 1","3 4","1 1 1","5 4","","","1 1 3","1 3 1 1","4 1 1 1","2 4 5","1 1 1","2 2 1 1",""],
            ["","2 1","6 1 2","1 1 1 1 1","5 6","1 1 1 1 1 1","1 3 1","1","","1 3","1 1 5","6 1 1 1","1 1 1 1 1","1 5","",""]];


var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
canvas.width = canvasWidth;
canvas.height = canvasHeight;
drawGrid();

var isMouseDown = false;
function pointToij(point) {
    var rect = canvas.getBoundingClientRect();
    var x = point.x - rect.left * (canvas.width / rect.width);
    var y = point.y - rect.top * (canvas.height / rect.height);
    var cellWidth = (canvasWidth - margin - 12)/block;
    var cellHeight = (canvasHeight - margin - 12)/block;
    return {i:Math.floor((x-margin-6)/cellWidth),j:Math.floor((y-margin-6)/cellHeight)};
}
function drawCell(i,j) {
    if(i < 0 || j < 0)return false;
    if(array[j][i] === 0){
        alert("此方块不应被填充");
        endStroke();
    }
    else{
        if(!book[j][i]){
            var cellWidth = (canvasWidth - margin - 12)/block;
            var cellHeight = (canvasHeight - margin - 12)/block;
            context.fillStyle = "rgba(0,0,0,.75)";
            context.fillRect(margin + 6 + cellHeight * i,margin + 6 + cellWidth * j,cellHeight,cellWidth);
            book[j][i] = 1;
            flag ++;
        }
    }
}
function beginStroke(point) {
    isMouseDown = true;
    drawCell(point.i,point.j);
}
function endStroke() {
    isMouseDown = false;
    if(flag === 72)alert("生日快乐~");
}
function moveStroke(point) {
    drawCell(point.i,point.j);
}

canvas.onmousedown = function (e) {
    e.preventDefault();
    beginStroke(pointToij({x:e.clientX,y:e.clientY}));
};
canvas.onmouseup = function (e) {
    e.preventDefault();
    endStroke();
};
canvas.onmouseout = function (e) {
    e.preventDefault();
    endStroke();
};
canvas.onmousemove = function (e) {
    e.preventDefault();
    if(isMouseDown){
        moveStroke(pointToij({x:e.clientX,y:e.clientY}));
    }
};
canvas.addEventListener('touchstart',function (e) {
    e.preventDefault();
    var touch = e.touches[0];
    beginStroke(pointToij({x:touch.pageX,y:touch.pageY}));
});
canvas.addEventListener('touchmove',function (e) {
    e.preventDefault();
    if(isMouseDown){
        var touch = e.touches[0];
        moveStroke(pointToij({x:touch.pageX,y:touch.pageY}));
    }
});
canvas.addEventListener('touchend',function (e) {
    e.preventDefault();
    endStroke();
});


function drawGrid() {
    var i;
    context.save();
    context.strokeStyle = "rgb(75,75,75)";
    context.beginPath();
    context.moveTo(margin + 3,margin + 3);
    context.lineTo(canvasWidth - 3,margin + 3);
    context.lineTo(canvasWidth - 3,canvasHeight - 3);
    context.lineTo(margin + 3,canvasHeight - 3);
    context.closePath();
    context.lineWidth = 6;
    context.stroke();
    context.fillStyle = "rgba(0,0,0,0)";
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;
    context.shadowColor = "#888";
    context.shadowBlur = 1000;
    context.fillRect(margin,margin,canvasHeight - margin,canvasWidth - margin);


    context.strokeStyle = "rgb(100,100,100)";
    context.beginPath();
    for(i = 1;i < block;i ++){
        context.moveTo((canvasWidth - margin - 12) / block * i + margin + 6,margin + 6);
        context.lineTo((canvasWidth - margin - 12) / block * i + margin + 6,canvasHeight - 6);
        context.moveTo(margin + 6,(canvasHeight -margin - 12) / block * i + margin + 6);
        context.lineTo(canvasWidth - 6,(canvasHeight- margin - 12) / block * i + margin + 6);
    }
    context.lineWidth = 1;
    context.stroke();

    // context.shadowBlur=10;
    // context.shadowColor="rgb(50 50 50)";
    // context.fillStyle = "rgba(0,0,0,0)";
    // context.fillRect(margin,margin,canvasWidth,canvasHeight);

    for(i = 0;i < count[0].length;i ++){
        context.font = "16px bold 黑体";
        context.fillStyle = "#555";
        context.textAlign = "right";
        context.textBaseline = "middle";
        context.fillText(count[0][i], margin - 20, margin + (canvasHeight - margin - 12) / block * i + 25);
    }
    for(i = 0;i < count[1].length;i ++){
        context.font = "16px bold 黑体";
        context.fillStyle = "#555";
        context.textAlign = "center";
        context.textBaseline = "middle";
        for(var j = 0;j < count[1].length;j ++){
            context.fillText(count[1][i].charAt(j),margin + (canvasWidth - margin - 12) / block * i + 20,margin - 20 - j * 9);
        }
    }

    context.restore();
}
