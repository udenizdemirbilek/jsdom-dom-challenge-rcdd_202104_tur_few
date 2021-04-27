const minus = document.querySelector("#minus")
const plus = document.querySelector("#plus")
const heart = document.querySelector("#heart")
const pause = document.querySelector("#pause")
const comments = document.querySelector("#list")
let counter = document.querySelector("#counter")
let firstLike = true;
let counterRun;
let counterOn;

function counterStart (){
    counterRun = setInterval(counterIncrement, 1000);
    counterOn = true;
}

function counterStop (){
    clearInterval(counterRun);
    counterOn = false; 
}

function counterIncrement (){
    let counterInt = parseInt(counter.textContent);
    counterInt++;    
    strCounter(counterInt);
}

//convert to string and change counter
function strCounter(number){
    let counterStr = String(number);
    counter.textContent = counterStr;
}
//Start counter on DOM content load
document.addEventListener('DOMContentLoaded', counterStart);

//minus, plus, heart, pause buttons
minus.addEventListener("click",function (){
    let counterInt = parseInt(counter.textContent);
    counterInt--;    
    strCounter(counterInt);
})

plus.addEventListener("click",function (){
    counterIncrement();
})

//need to check if counter is different, if it is then create a new li, else just increment likedCount
heart.addEventListener("click",function (){
    let likedCount;
    let counterNow;
    let ulLikesList = document.querySelector(".likes"); 
    if (firstLike || counter.textContent != counterNow){
        let counterNow = counter.textContent;
        likedCount = 1;
        let liList = document.createElement("li");
        liList.setAttribute("id", counterNow);
        liList.appendChild(document.createTextNode(`${counter.textContent} has been liked ${likedCount} times`));
        ulLikesList.appendChild(liList);
        firstLike = false;
        console.log()
    }    
    else if (counter.textContent == counterNow){
        let liList = document.getElementById(`${counterNow}`);         
        likedCount++;
        liList.textContent = `${counterNow} has been liked ${likedCount} times`;
    }
    // else {
    //     likedCount = 1;
    //     let liList = document.createElement("li");
    //     liList.appendChild(document.createTextNode(`${counter.textContent} has been liked ${likedCount} times`));
    // }    
})

// checks if the counter is paused or not, pauses if its running, resumes if its paused, 
// disables all buttons on the page when paused

pause.addEventListener("click", function (){
if (counterOn){
    counterStop ()
    pause.textContent = "resume";
    document.querySelectorAll('button').forEach(elem => { //selects all button elements and disables them
        elem.disabled = true;
    });
    pause.disabled = false; //enables pause
}else{
    counterStart ()
    pause.textContent = "pause";
    document.querySelectorAll('button').forEach(elem => { //selects all button elements and enables them
        elem.disabled = false;
    }); 
}
});

//prevent default action of submit and add the content of input form to an list element inside task ul
document.querySelector("#submit").addEventListener("click", function(event) {
    event.preventDefault();
    let commentList = document.querySelector("#list")
    let ulCommentList = commentList.appendChild(document.createElement("ul")); 
    let newTask = document.querySelector("#comment-input");    
    let buttonList = document.createElement("button");
    let liList = document.createElement("li");
    liList.appendChild(document.createTextNode(newTask.value + " "));
    liList.appendChild(buttonList);
    buttonList.setAttribute("class",`delete`);
    buttonList.innerText = "X";
    ulCommentList.appendChild(liList); 
    
    //delete button uses button class "delete" and removes the parent node of that button
    // adda common class to all the buttons
    let deleteBtn = document.getElementsByClassName("delete");
    // converting html collection to array, to use array methods
    Array.prototype.slice.call(deleteBtn).forEach(function(item) {
    // iterate and add the event handler to it
    item.addEventListener("click", function(e) {
    e.target.parentNode.remove()})
  });
  }, false);

