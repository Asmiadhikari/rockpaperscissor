let scoreCard = JSON.parse(localStorage.getItem('score'));

    if(!scoreCard){
    scoreCard = {
      win: 0,
      lose: 0,
      tie: 0,
    };
    }


    updateScoreElement();


    function playGame(playerMove) {
      const computerMove = ComputerMove();
      let result = '';
      if (playerMove === 'rock') {
        if (computerMove === 'rock') {
          result = 'Tie'
        }
        else if (computerMove=== 'paper') {
          result = 'You lose'
        }
        else if (computerMove=== 'scissors') {
          result = 'You win'
        }
        showResult(result);
        gameScore(result);
        displayMove(playerMove, computerMove);
       
      }
      else if(playerMove === 'paper'){
        if(computerMove === 'rock') {
          result ='You win'
        }
        else if (computerMove === 'paper') {
       result = 'Tie'
         }
        else if (computerMove === 'scissors') {
       result = 'You lose'
        }
        
        showResult(result);
        gameScore(result);
        displayMove(playerMove, computerMove);
        
      }
      else{
       if(computerMove === 'rock') {
         result ='You lose'
       }
       else if (computerMove === 'paper') {
         result = 'You win'
       }
       else if (computerMove === 'scissors') {
         result = 'Tie'
       }

       gameScore(result);
       displayMove(playerMove, computerMove);
       showResult(result);

      
     }
    }

    function ComputerMove() {
     const randomNumber = Math.random();
     let computerMove = '';

     if (randomNumber >= 0 &&   randomNumber < 1 / 3) {
     computerMove = 'rock';
      }
      else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
     computerMove = 'paper';
      }
      else {
     computerMove = 'scissors';
      }
      return computerMove;
    }
 
    function gameScore(result){
      if(result === 'You win'){
        scoreCard.win = scoreCard.win + 1;
      }
      else if (result === 'You lose'){
        scoreCard.lose = scoreCard.lose + 1;
      }
      else if(result === 'Tie'){
        scoreCard.tie = scoreCard.tie + 1;
      }

      localStorage.setItem('score', JSON.stringify(scoreCard));  
   
      updateScoreElement();
    }

    function updateScoreElement(){
      document.querySelector('.js-score')
      .innerHTML = `Win: ${scoreCard.win} Lose: ${scoreCard.lose} Tie: ${scoreCard.tie}`;
    }

    function showResult(result){
      if(!result){
      document.querySelector('.js-result').innerHTML = ``;
      }
      else{
      document.querySelector('.js-result').innerHTML = `${result}`;
      }
    }

    function displayMove(playerMove, computerMove) {
      if (!playerMove && !computerMove) {
        document.querySelector('.js-moves').innerHTML = ``;
      } else {
        document.querySelector('.js-moves').innerHTML = `
        you <img src="${playerMove}-emoji.png" alt="">
        <img src="${computerMove}-emoji.png" alt=""> computer`;
      } 
    }


  let isAutoplaying = false;
  let intervalId;
  
    function autoPlay() {
       if(!isAutoplaying){
         intervalId = setInterval(() => {
            const playerMove = ComputerMove();
            playGame(playerMove);
            }, 1000);
          isAutoplaying = true;
          document.querySelector('.js-autoplay').innerHTML= `Stop play`;
        } else {
            clearInterval(intervalId);
            isAutoplaying = false;
            document.querySelector('.js-autoplay').innerHTML= `Auto play`;
          }
    }
