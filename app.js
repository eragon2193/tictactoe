
const gameBoard = (() => {
  // create 2 players

  const Player = function (name, token) {
    this.name = name
    this.token = token
  }
  const inputDiv = document.querySelector('#names')
  const nameOne = document.getElementById('nameOne')
  const nameTwo = document.getElementById('nameTwo')
  const playerOne = new Player('Player One', 'X')
  const playerTwo = new Player('Player Two', 'O')
  const winnerDisplay = document.querySelector('.winner')
  const turnDisplay = document.querySelector('.turn')
  const gridBoard = document.querySelector('.grid-board')
  let activePlayer = playerOne
  let winner = null

  // click event listeners for each cell

  const cell = document.querySelectorAll('.cell')
  const cellArr = [...cell]

  // start the board

  function startGame (startButton) {
    cellArr.forEach((x, index) => {
      x.addEventListener('click', handleClick, { once: true })
      x.setAttribute('data-index', index)
    })
    if (nameOne.value) {
      playerOne.name = nameOne.value
    }
    if (nameTwo.value) {
      playerTwo.name = nameTwo.value
    }
    inputDiv.classList.add('hidden')
    startButton.classList.add('hidden')
    gridBoard.classList.remove('hidden')
    turnDisplay.textContent = playerOne.token + '`s turn'
  }
  // reset the board

  function resetGame () {
    cellArr.forEach((x, index) => {
      x.removeEventListener('click', handleClick)
      x.addEventListener('click', handleClick, { once: true })
      x.textContent = ''
    })
    winner = null
    activePlayer = playerOne
    winnerDisplay.classList.add('hidden')
    turnDisplay.classList.remove('hidden')
    turnDisplay.textContent = playerOne.token + '`s turn'
  }

  function handleClick (e) {
    const cell = e.target.dataset.index
    // drop token
    dropToken(cell)
    // check for win
    checkWinner()
    // check for draw
    checkDraw()
    // switch active turn
    switchPlayer()
    // update display
    updateDisplay()
  }

  function updateDisplay () {
    const winnerText = document.querySelector('.winnerText')
    turnDisplay.textContent = activePlayer.token + '`s turn'
    if (winner) {
      turnDisplay.classList.add('hidden')
      winnerDisplay.classList.remove('hidden')
      if (winner === 'Draw') {
        winnerText.textContent = 'It is a Draw!'
      } else {
        winnerText.textContent = activePlayer.name + ' Won!'
      }
    }
  }
  function checkDraw () {
    const boardFilled = cellArr.every((x) => {
      return (x.textContent)
    })
    if (boardFilled && winner === null) {
      winner = 'Draw'
    }
  }

  function checkWinner () {
    const winningCombinations =
    [
      [0, 1, 2], [0, 3, 6],
      [3, 4, 5], [6, 7, 8],
      [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ]
    winningCombinations.forEach((x) => {
      if (cellArr[x[0]].textContent === cellArr[x[1]].textContent &&
        cellArr[x[0]].textContent === cellArr[x[2]].textContent &&
        cellArr[x[0]].textContent) {
        const winningToken = cellArr[x[0]].textContent
        winner = winningToken === playerOne.token ? playerOne.name : playerTwo.name
        console.log(winner)
      }
    })
  }

  function dropToken (index) {
    const value = cellArr[index].textContent
    if (!value && winner === null) {
      cellArr[index].textContent = activePlayer.token
    }
  }

  function switchPlayer () {
    if (winner) {
      return
    }
    activePlayer = activePlayer === playerOne ? playerTwo : playerOne
  }
  return { startGame, resetGame }
})()

const gameController = () => {
  const game = gameBoard
  const startButton = document.querySelector('#start-btn')
  startButton.addEventListener('click', () => {
    game.startGame(startButton)
  }, { once: true })
  const resetButton = document.querySelector('#restart-btn')
  resetButton.addEventListener('click', () => {
    game.resetGame()
  })
}
const ticTacToe = gameController()
