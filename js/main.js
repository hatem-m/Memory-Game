let box = document.querySelectorAll(".box");
let boxHolder = document.querySelectorAll(".box-holder");
let frontImg = document.querySelectorAll(".box img:first-child");
let backImg = document.querySelectorAll(".box img:last-child");
let form = document.querySelector(".page form");
let input = document.querySelector('[name="name"]');
let result = document.querySelector(".result");
let wrongMusic = document.querySelector(".wrong-music");
let rightMusic = document.querySelector(".right-music");
let tryCount = 0;
let firstClass = '';
let firstElement;
let right = 0;
let wrong = 0;
let playerName = ""
// enter Your Name
window.onload = function(){
    form.style.cssText = "display: flex; z-index: 10;";
}
form.onsubmit = function(event){
    event.preventDefault();
    if(input.value != ""){
        playerName = input.value;
        input.value = "";
        form.style.cssText = "z-index: -1; display:none";
    }
}
// change the order
function boxOrder(){
    let randomArray = [];
    while(randomArray.length < 20){
        randomArray.push(Math.floor(Math.random() * 20));
        randomArray = Array.from(new Set(randomArray));
    }
    boxHolder.forEach((element,index)=>{
        element.style.cssText = `order: ${randomArray[index]};`;
    })
    // console.log(boxHolder)
}
boxOrder()
// click on img
document.addEventListener("click",function(event){
    // console.log(event.target.parentElement);
    if(event.target.parentElement.classList.contains("box")){
        console.log(event.target);
        tryCount++;
        event.target.parentElement.style.cssText = "transform: rotateY(-180deg);";
        if (tryCount == 1){
            firstClass = [...event.target.parentElement.classList][1];
            firstElement = event.target;
            // console.log(firstClassList)
            // event.target.parentElement.classList.add("first-box")
            // console.log(document.querySelector(`src=${souece}`).parentElement.style.cssText = "transform: rotateY(180deg);")
        }
        else if (tryCount == 2){
            console.log([...event.target.parentElement.classList][1])
            console.log(firstClass)
            console.log(firstClass == [...event.target.parentElement.classList][1])

            if(firstClass == [...event.target.parentElement.classList][1]){
                right++;
                rightMusic.play();
                event.target.parentElement.style.pointerEvents = "none";
                firstElement.parentElement.style.pointerEvents = "none";
                console.log("try 2 if")
            }
            else{
                wrong++;
                wrongMusic.play();
                let t = setTimeout(function(){
                    // event.target.parentElement.style.removeProperty("transform");
                    // firstElement.parentElement.style.removeProperty("transform");
                    event.target.parentElement.style.cssText = "transform: rotateY(0);";
                    firstElement.parentElement.style.cssText = "transform: rotateY(0);";
                    // clearTimeout(t)
                },1000);
                console.log("try 2 else")
            }
            tryCount = 0;
        }
        // console.log(souece);
        console.log(tryCount);
        console.log(`right ${right}`);
        if(right == 10){
            endGame(playerName,wrong);
        }
    }
})

function endGame(playerName,wrong) {
    
    let player = document.querySelector(".result .player-name bdi");
    let shoot = document.querySelector(".result .shoot bdi");
    result.style.cssText = "display: flex; z-index: 10;";
    player.textContent = playerName;
    shoot.textContent = wrong + 10;
}

document.addEventListener("click",function(event){
    // console.log(event.target.parentElement);
    if(event.target.className == "replay"){
        right = 0;
        wrong = 0;
        tryCount = 0;
        box.forEach((element)=>{
            element.style.cssText = "transform: rotateY(0);";
            element.style.pointerEvents = "all";
        })
        result.style.cssText = "display: none; z-index: -1;";
    }});