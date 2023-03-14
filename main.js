const n = 6;
const matrixArray = [];

const ladderObj = {
    3: 11,
    5: 23,
    7:15,
    21:33,
    26:31
}

const snakeObj = {
    13: 6,
    9: 4,
    19: 2,
    34: 22,
    29: 16
}
const LADDER_CLASS = "ladder";
const SNAKE_CLASS = "snake";

const createMatrix = () => {
    const matrix = [];
    let count = n*n;
    let isForward = true;
    for (let i = 0; i < n; i++) {
        matrix[i] = [];
        if (isForward) {
        for (let j = 0; j < n; j++) {
            matrix[i][j] = count;
            count--
        }
        } else {
        for (let j = n - 1; j >= 0; j--) {
            matrix[i][j] = count;
            count--
        }
        }
        isForward = !isForward;
    }
    createBoard(matrix)
    console.log(matrix)
}

const createBoard = (matrixArray) => {
    const board = document.querySelector('.main-board')
    let str = "";
    matrixArray.map(row => {
        str += `
            <div class="row">`
        row.map(block => {
            str += `
                    <div class="block ${ladderObj[block] ? LADDER_CLASS : ''} ${snakeObj[block] ? SNAKE_CLASS : ''} ${block === 1 ? 'active' : ''}" data-value=${block}>
                      ${block}
                    </div>
                `
            })   
        str += `</div>`
    })
    board.innerHTML = str;
}

const rollDice = () => {
    const diceValue = Math.ceil(Math.random()*6)
    // console.log({diceValue})
    let diceDiv = document.querySelector('.dice-id')
    diceDiv.innerHTML = `Dice value : ${diceValue}`
    changePosition(diceValue)
    
}

const changePosition = (value) => {
    console.log('in here')
    const activeBlock = document.querySelector('.active');
    const activeblockValue = parseInt(activeBlock.outerText)
    let presentValue = activeblockValue + value
    if(snakeObj[presentValue]){
        presentValue = snakeObj[presentValue]
        changeActiveBlock(presentValue)
    }
    if(ladderObj[presentValue]){
        presentValue = ladderObj[presentValue]
        changeActiveBlock(presentValue)
    }

    if(presentValue <= (n*n)){
        changeActiveBlock(presentValue)
    }


}

const changeActiveBlock = (value) => {
    const activeBlock = document.querySelector('.active');
    activeBlock.classList.remove('active')
    const block = document.querySelector(`[data-value = "${value}"]`);
    block.classList.add('active')
    if(value === (n*n)){
        alert('Congratulations! You have won!')
        const activeBlock = document.querySelector('.active');
        activeBlock.classList.remove('active')
        const block = document.querySelector(`[data-value = "1"]`);
        block.classList.add('active')
    }


}

