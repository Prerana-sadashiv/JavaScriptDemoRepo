//Card variables

let suits=['Spades','Clubs','Diamonds','Hearts'];
let values=['Ace','King','Queen','Jack','Ten','Nine',
            'Eight','Seven','Six','Five','Four','Three','Two'];


// DOM variables
let paragraph= document.getElementById('text-area');
let ngBtn= document . getElementById('newGameButton');
let hBtn= document. getElementById('hitButton');
let sBtn= document.getElementById('stayButton');



//Game variables

let gameStarted=false,
    gameOver=false,
    playerWon=false,
    dealerCards=[],
    playerCards=[],
    dealerScore=0,
    playerScore=0,
    deck=[];
    
hBtn.style.display='none';
sBtn.style.display='none';
showStatus();

ngBtn.addEventListener('click',function(){
  gameStarted=true;
  gameOver=false;
  playerWon=false;
  
  deck=createDeck();
  shuffleDeck(deck);
  dealerCards=[getNextCard(),getNextCard()];
  playerCards=[getNextCard(),getNextCard()];
  
  ngBtn.style.display='none';
  hBtn.style.display='inline';
  sBtn.style.display='inline';
  showStatus();
  
});

hBtn.addEventListener('click', function(){
  playerCards.push(getNextCard());
  checkForEndOfGame();
  showStatus();
});

sBtn.addEventListener('click', function(){
  gameOver=true;
  checkForEndOfGame();
  showStatus();
});


function createDeck()
{	
	let deckTemp=[];
	for (let i=0;i<suits.length;i++)
	{
  	  for (let j= 0;j<values.length;j++)
  	  {
    	    let card={
    	      suit: suits[i],
    	      value: values[j]
    	    };
    	    deckTemp.push(card);
  	  }
  	  
  }
	return deckTemp;
}	


function shuffleDeck(deck)
{
  for (let i=0; i<deck.length;i++)
  {
    let j= Math.trunc(Math.random()* deck.length);
    let tmp=deck[j];
    deck[j]=deck[i];
    deck[i]=tmp;
  }
}



function getCardString(card)
{
  return card.value + ' of ' + card.suit;
}

function getNextCard()
{
  return deck.shift();
}



function showStatus()
{
  if(!gameStarted)
  {
    paragraph.innerText="Welcome To BlackJack!!! .... \n \n  Click New Button to  start the game \n\n";
    return;
  }
  
  
  let dealerCardString="";
  for(let i =0;i<dealerCards.length;i++)
  {
    dealerCardString +=getCardString(dealerCards[i]) + '\n';
  }
  
  
  let playerCardString="";
  for(let i =0;i<playerCards.length;i++)
  {
    playerCardString +=getCardString(playerCards[i]) + '\n';
  }
  
  updateScore();
  paragraph.innerText =
  'Dealer has :  \n' + dealerCardString + '(Score:' + dealerScore +' )\n\n'
  
   paragraph.innerText +=
  'Player has :  \n' + playerCardString + '(Score:' + playerScore +' )\n\n ';
  
  
  if(gameOver)
  {
    if(playerWon)
    {
      paragraph.innerText += "You win !!! congratulations";
    }
    else
    {
      paragraph.innerText += "Dealer wins .. Better luck next time !!!";
    }
    hBtn.style.display='none';
    sBtn.style.display='none';
    ngBtn.style.display='inline';
   
  }
}


function updateScore()
{
  dealerScore= getScore(dealerCards);
  playerScore= getScore(playerCards);
}


function getScore(cardArray)
{
  let score = 0;
  let hasAce= false;
  
  for(let i=0;i<cardArray.length;i++)
  {
    let card= cardArray[i];
    score += getCardNumberValue(card);
    if (card.value== 'Ace')
    {
      hasAce= true;
    }
  }
  if(hasAce && score+10 <=21)
  {
    return score+10;
  }
  return score;
}

function getCardNumberValue(card)
{
  switch(card.value)
  {
    case 'Ace': return 1;
    case 'Two': return 2;
    case 'Three': return 3;
    case 'Four': return 4;
    case 'Five': return 5;
    case 'Six': return 6;
    case 'Seven': return 7;
    case 'Eight': return 8;
    case 'Nine': return 9;
    default: return 10;
    
  }

}


function checkForEndOfGame()
{
    updateScore();
    
    if(gameOver)
      {
        while(dealerScore<playerScore
        && dealerScore <= 21
        && playerScore <= 21)
        {
          dealerCards.push(getNextCard());
          updateScore();
        }
      }
    
    if (playerScore> 21)
      {
        playerWon=false;
        gameOver=true;
      }
    else if (dealerScore>21 )
      {
        playerWon=true;
        gameOver=true;
      }
    else if(gameOver)
      {
        if(playerScore > dealerScore)
        {
          playerWon=true; 
        }
        else 
        {
          playerWon=false;
        }
        
      }
}




























