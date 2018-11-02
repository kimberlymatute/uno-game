let Game = {
    deck: null,
    players: {},
    playersTurn: null,
    turnDirection: 1,
    topCard: null,
    topCardColor: null,
    topCardValue: null
}

function makeNewCards(){
    const cards = [
        'red_0',
        'red_1', 'red_2', 'red_3', 'red_4', 'red_5', 'red_6', 'red_7', 'red_8', 'red_9',
        'red_1', 'red_2', 'red_3', 'red_4', 'red_5', 'red_6', 'red_7', 'red_8', 'red_9',
        'red_skip', 'red_reverse', 'red_draw_two',
        'red_skip', 'red_reverse', 'red_draw_two',
        
        'green_0',
        'green_1', 'green_2', 'green_3', 'green_4', 'green_5', 'green_6', 'green_7', 'green_8', 'green_9',
        'green_1', 'green_2', 'green_3', 'green_4', 'green_5', 'green_6', 'green_7', 'green_8', 'green_9',
        'green_skip', 'green_reverse', 'green_draw_two',
        'green_skip', 'green_reverse', 'green_draw_two',
        
        'blue_0',
        'blue_1', 'blue_2', 'blue_3', 'blue_4', 'blue_5', 'blue_6', 'blue_7', 'blue_8', 'blue_9',
        'blue_1', 'blue_2', 'blue_3', 'blue_4', 'blue_5', 'blue_6', 'blue_7', 'blue_8', 'blue_9',
        'blue_skip', 'blue_reverse', 'blue_draw_two',
        'blue_skip', 'blue_reverse', 'blue_draw_two',
        
        'yellow_0',
        'yellow_1', 'yellow_2', 'yellow_3', 'yellow_4', 'yellow_5', 'yellow_6', 'yellow_7', 'yellow_8', 'yellow_9',
        'yellow_1', 'yellow_2', 'yellow_3', 'yellow_4', 'yellow_5', 'yellow_6', 'yellow_7', 'yellow_8', 'yellow_9',
        'yellow_skip', 'yellow_reverse', 'yellow_draw_two',
        'yellow_skip', 'yellow_reverse', 'yellow_draw_two',
        
        'wild_draw_four','wild_draw_four', 'wild', 'wild',
        'wild_draw_four','wild_draw_four', 'wild', 'wild',
    ]    
    
    return cards
}
function shuffle( cards ){
    const deck = [ ]
    while (cards.length > 0) {
        let randomNumber = Math.floor(Math.random() * cards.length)
        let card = cards[randomNumber]
        deck.push(card)
        cards.splice(randomNumber, 1)        
    }
    return deck
}

function dealCard(deck){
    return deck.shift()
}

function startNewGame(){
    let cards = makeNewCards()
    let deck = shuffle(cards)
    Game.deck = deck
    showGameObject()

    const playerNames = ["Kimberlina", "Jimmie", "Jeremy", "Alberito"]
    const ALPHABET = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']
    for (let i = 0;i < playerNames.length; i++){
        let name = playerNames[i]
        let id = ALPHABET[i]
        let player = createNewPlayer(name, id)
        Game.players[id] = player
    }
   
    let discard = dealCard(Game.deck)
    Game.topCard = discard
    let color = getColorOfCard(discard)
    let val = getValueOfCard(discard)

    let topCard = document.querySelector('#deck')
    topCard.setAttribute('src', 'images/'+discard+'.png')
    
    Game.playersTurn = 'A'
    Game.topCardColor = color
    Game.topCardValue = val
    
    showGameObject()
}

function showGameObject(){
    var codeSection = document.querySelector('#game-object')
    codeSection.innerHTML = JSON.stringify(Game, null, 2)
}
function createNewPlayer(playerName, id){
    let player = {
        id: id, 
        name: playerName,
        cards : [ ],
        points: 0,
    }
    // runs 7 times, and deals the players 7 cards into their hands
    for (let i = 0; i< 7; i++){
        let card = dealCard(Game.deck)
        player.cards.push(card)
    }
    return player
    
}
function showGameObject(){
    var codeSection = document.querySelector('#game-object')
    codeSection.innerHTML = JSON.stringify(Game, null, 2)
    
}


function changePlayerTurn(currentPlayerId){
    const ALPHABET = Object.keys(Game.players)
    const currentDirection = Game.turnDirection
    const idx = ALPHABET.indexOf(currentPlayerId)  
    let newIdx = idx + currentDirection
    if (newIdx < 0) {
        newIdx = ALPHABET.length - 1
    }
    if (newIdx >= ALPHABET.length) {
        newIdx = 0
    }
    const newPlayersTurn = ALPHABET[newIdx]
    Game.playersTurn = newPlayersTurn
}


function getColorOfCard(cardName){
    const splitCard = cardName.split('_')
    const color = splitCard[0]
    return color
}
function getValueOfCard(){
    function getValueOfCard(cardName){
    const splitCard = cardName.split('_')
    let value = splitCard[1]
    if(splitCard.length === 3){
        value += '_' +splitCard[2]
    }
    return value
}
function playCard(){
    
}
function playerDrawCard(playerId){
    let player = Game.players[playerId]
}
function skipTurn(){
    
}
function playerDrawTwo(){
    let topCard = Game.topCard
    if(topCard === 'draw_two'){
        
    }
}
function playerDrawFour(playerId){
    function reverseTurn(){
    Game.turnDirection = Game.turnDirection * -1
    }
}
function reverseTurn(){
    Game.turnDirection = Game.turnDirection
    
}
function playWildCard(){
    
}
function cardIsPlayable(cardColor, cardValue, playerId){
    let Id = playerId
    let topCard = Game.topCard
    let topCardColor = getColorOfCard(Game.topCard)
    let topCardValue = getValueOfCard(Game.topCard)
    
    let color = getColorOfCard(cardColor)
    let val = getValueOfCard(cardValue)
    
    if(color ===  topCardColor && val === 'draw_two'){
        console.log('True')
        alert('HA HA, draw two cards from the deck!')
        playerDrawTwo(Id)
    } else if(color != topCardColor && val === topCardValue && 'draw_two'){
        console.log('True')
        alert('HA HA, draw two cards from the deck!')
        playerDrawTwo(Id)
    } else if(color !=  topCardColor && val === 'draw_four'){
    } else if(color === topCardColor && val === 'draw_four'){
    } else if(color != topCardColor && color === 'wild'){
    } else if(color === topCardColor && color === 'wild'){
    } else {
        console.log('False')
    }
    if(color !=  topCardColor && val === 'draw_four'){
        console.log('True')
        alert('HA HA HA, draw four cards from the deck!')
        playerDrawFour(Id)
    } else if(color === topCardColor && val === 'draw_four'){
        console.log('True')
        alert('HA HA HA, draw four cards from the deck!')
        playerDrawFour(Id)
    }
    if(color != topCardColor && color === 'wild'){
        console.log('True')
        alert('Pick a color')
    } else if(color === topCardColor && color === 'wild'){
        console.log('True')
        alert('Pick a color')
    }
    if(color === topCardColor || val === topCardValue){
        console.log('TRUE')
    } else if(color != topCardColor && val === 'draw_four'){
    } else if(color != topCardColor && color === 'wild'){
    } else {
        console.log('FALSE')
    }
}
}