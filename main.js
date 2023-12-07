// Start Select Elements
let userName = document.querySelector(".container .info .name > span");
let wrongTimes = document.querySelector(".container .info .wrong-times > span");
let blocksContainer = document.querySelector(".container .game-blocks");
let blocksElement = document.querySelectorAll(".container .game-blocks .block");
let blocksArray = Array.from(blocksElement);
let startControls = document.querySelector(".controls-buttons");
let correctAudio = document.getElementById("correct");
let wrongAudio = document.getElementById("wrong");
let winnerAudio = document.getElementById("winner");
let loserAudio = document.getElementById("loser");
// End Select Elements

//Counters
let duration = 1000;
document.querySelector(".controls-buttons span").addEventListener("click",_=> {
  startControls.remove();
  setInfo();
})


let orderRange = [...Array(blocksArray.length).keys()];


shuffle(orderRange);
blocksArray.forEach((block, index)=> {
  block.style.order = orderRange[index];
  block.addEventListener(`click`, _=> {
    isflippedBlocks(block);
    winner();
  })
})




function isflippedBlocks(selectBlock) {
  selectBlock.classList.add("is-flipped");

  let flippedBlocks = blocksArray.filter(block=> block.classList.contains("is-flipped"));
  if(flippedBlocks.length === 2) {
    matching(flippedBlocks[0], flippedBlocks[1]);
    stopClicking();
  }
}


function stopClicking() {
blocksContainer.classList.add("no-clicking");
setTimeout(_=> {
  blocksContainer.classList.remove("no-clicking");
}, duration)

}

function matching(firstBlock, secondBlock){
  if(firstBlock.getAttribute("pictures-data") == secondBlock.getAttribute("pictures-data")) {
    firstBlock.classList.remove("is-flipped");
    secondBlock.classList.remove("is-flipped");
    correctAudio.play();
    firstBlock.classList.add("has-matched");
    secondBlock.classList.add("has-matched");
  }else {
    wrongTimes.innerHTML = parseInt(wrongTimes.innerHTML) + 1;
    wrongAudio.play();
    setTimeout(_=> {
    firstBlock.classList.remove("is-flipped");
    secondBlock.classList.remove("is-flipped");
  }, 1000)
}
}


// Start

// Start Functions 

// Set Info Data And SOme Effects
function setInfo() {
  
  let nameValue = window.prompt("Type Yur Name");
  if (nameValue == "" || nameValue === null) {
    craeteLetterEmptyNameUser() 
    setTimeout((_) => {
      window.location.reload();
    }, 5000);
  }
  blocksElement.forEach(block=> {
    block.classList.add("is-flipped");
  })
  blocksElement.forEach(block=> {
    setTimeout(_=> {
      block.classList.remove("is-flipped");
    }, 2000);
  })
  userName.innerHTML = `${nameValue}👋`;
  // Here I Will Set Counter By Wrong Times
  console.log();
  
}

function craeteLetterEmptyNameUser() {
  document.body.innerHTML = `<span>No Name No Game 😘</span>`;
  document.querySelector("body > span").style.cssText = `position:absolute;
  top:50%;
  left:50%;
  transform:translate(-50%,-50%);
  font-size:4vw;
  background-color:#333;
  padding:20px;
  color:#fff;
  font-weight:bold;
  border-radius:6px;
  `;
}

// Shuffle Order Range 
function shuffle(array) {
  let current = array.length,
  temp, 
  random;

  while(current > 0) {
    random = Math.floor(Math.random() * current);
    current--;
    //Set the last element in the stash
    temp = array[current];
    //Assign random element in current element
    array[current] = array[random];
    //Bring the temp value and assign it to the random position
    array[random] = temp;
    
  }
  return array;
}

function winner() {
 
    let hasMatched = blocksArray.filter(block=> block.classList.contains("has-matched"));
    if (hasMatched.length === 20) {
      winnerAudio.play()
    }

}



// End Functions 




// End
