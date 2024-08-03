var board;
var taskId, taskList;
var activeTask, input;
var element;
var monitor;
var last;
var isBinOn;

function init() {
    isBinOn = false;
    element = null;
    board = document.body;
    //monitor = document.getElementById("monitor");
    taskId = -1;
    taskList = [];
}

function attachInput(tid) {
    if (!last) {
        activeTask = taskList[tid];
        input = activeTask.childNodes[1];
        input.style.display = "block";
        input.focus();
    }
}

function setInput(e) {
    if (e.keyCode === 13) {
        var content = input.value;
        if (content.length !== 0) {
            content = content.split(":");
            if (content.length > 1) {
                activeTask.setAttribute("class", "mission " + content[0]);
                var astate = content[0].split(" ")[0];
                activeTask.childNodes[0].setAttribute("class", "anchor " + astate + "a");
                activeTask.childNodes[2].innerHTML = content[1];
            } else {
                activeTask.childNodes[2].innerHTML = content;
            }
        }
        input.style.display = "none";
    }
}

function create() {
    taskList[++taskId] = $("div", [
        "id=" + taskId,
        "class=mission",
        "onclick=attachInput(" + taskId + ")",
    ])
        .add($("div", [
            "class=anchor",
            "onmousedown=dragOn(event," + taskId + ")",
            "onmouseup=dragOn(event," + taskId + ")"
        ]))
        .add($("input",
            [
                "class=input",
                "onkeypress=setInput(event)"
            ]))
        .add($("h3", ["innerHTML=" + taskId, "class=content"]))
        .get();
    board.appendChild(taskList[taskId]);
}


function bodyCreate() {
    if (evt.keyCode === 61) {
        create();
    }
}

function dragOn(evt, tid) {
    if (element == null) {
        //monitor.innerHTML = tid;
        element = taskList[tid];
    } else {
        element = null;
        //monitor.innerHTML = "null"
        last = true;
    }
    evt.stopPropagation()
}

function drag(evt) {
    last = false;
    if (element != null) {
        element.style.top = (evt.clientY - 15) + "px";
        element.style.left = (evt.clientX - 15) + "px";
    }
}

function check(tid) {
    element = null;
}

function activateBin() {
    isBinOn = true;
}