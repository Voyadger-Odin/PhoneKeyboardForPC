
//import * as cm from './context-menu.js';

let objKeyboard;
let objMouse;
let objTouchPad;
let objScrollPad;
let objInputKeyboard;

function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

function httpPost(url, data)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "POST", url, true ); // false for synchronous request

    xmlHttp.onreadystatechange = function() {
        if (this.readyState != 4) return;
        return this.responseText
    }

    xmlHttp.send(data);

}

function ClickButton(param){
    let url = '/keyboardkeys?data=' + param
    let request = httpGet(url)
    console.log(request)
}

function VolumeButton(param){
    let url = '/volume?data=' + param
    let request = httpGet(url)
    console.log(request)
}

function OrientationCheck(){
    if (window.orientation == 0){
        return 0
    }else{
        return 1
    }
}

function SetInterface(orientation){
    if (orientation == 0){
        objMouse.classList.remove("disable")
        objKeyboard.classList.add("disable")
    }else{
        objMouse.classList.add("disable")
        objKeyboard.classList.remove("disable")
    }
}

function leftMouseButton(){
    let url = '/mousebuttons?data=left'
    let request = httpGet(url)
}
function rightMouseButton(){
    let url = '/mousebuttons?data=right'
    let request = httpGet(url)
}

function leftArrowButton(){
    let url = '/keyboardkeys?data=left-arrow'
    let request = httpGet(url)
}
function rightArrowButton(){
    let url = '/keyboardkeys?data=right-arrow'
    let request = httpGet(url)
}
function spaceButton(){
    let url = '/keyboardkeys?data=space'
    let request = httpGet(url)
}

function keyboardInput(data) {
    let url = '/keyboardkeys?data=' + data
    let request = httpGet(url)
}

let mousePositionX;
let mousePositionY;
let leftClick
function TouchPad(evt){
    let touches = evt.changedTouches
    if (touches.length > 0){

        // Начало
        if (evt.type == 'touchstart'){
            mousePositionX = touches[0].clientX
            mousePositionY = touches[0].clientY
            leftClick = true
        }

        // Продолжение
        if (evt.type == 'touchmove'){
            let deltaX = touches[0].clientX - mousePositionX
            let deltaY = touches[0].clientY - mousePositionY

            if (deltaX + deltaY > 2){
                leftClick = false
            }

            mousePositionX = touches[0].clientX
            mousePositionY = touches[0].clientY

            let params = 'x='+ deltaX + '&y=' + deltaY
            let url = '/mouse?' + params
            let request = httpGet(url)
            //console.log(touches[0])
        }

        if (evt.type == 'touchend'){
            if (leftClick){
                //leftMouseButton()
            }
        }
    }
}

function ScrollPadEvent(evt){
    let touches = evt.changedTouches
    if (touches.length > 0){

        // Начало
        if (evt.type == 'touchstart'){
            mousePositionY = touches[0].clientY
        }

        // Продолжение
        if (evt.type == 'touchmove'){
            let deltaY = touches[0].clientY - mousePositionY

            mousePositionY = touches[0].clientY

            let params = 'y=' + deltaY
            let url = '/scrollmove?' + params
            let request = httpGet(url)
        }
    }
}

window.addEventListener('load', (event) => {
    objKeyboard = document.getElementById('keyboard')
    objMouse = document.getElementById('mouse')
    objInputKeyboard = document.getElementById('input-keyboard')

    objTouchPad = document.getElementById('touchpad')
    objTouchPad.addEventListener('touchstart', TouchPad);
    objTouchPad.addEventListener('touchend', TouchPad);
    objTouchPad.addEventListener('touchcancel', TouchPad);
    objTouchPad.addEventListener('touchmove', TouchPad);

    objScrollPad = document.getElementById('scrollpad')
    objScrollPad.addEventListener('touchstart', ScrollPadEvent);
    objScrollPad.addEventListener('touchend', ScrollPadEvent);
    objScrollPad.addEventListener('touchcancel', ScrollPadEvent);
    objScrollPad.addEventListener('touchmove', ScrollPadEvent);


    SetInterface(OrientationCheck())
});

window.addEventListener("orientationchange", function () {
    SetInterface(OrientationCheck())
});