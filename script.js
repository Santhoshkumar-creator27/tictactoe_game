const gameBoard = document.querySelector("#gameboard")
const infodisplay = document.querySelector("#info")

const startcells = [
    "", "", "", "", "", "", "", "", "", 
]

let go = "circle"
infodisplay.textContent = "Circle's Turn"

function createBoard(){
    startcells.forEach((cell, index) =>{
        const cellelement = document.createElement('div')
        cellelement.classList.add('square')
        cellelement.id = index
        cellelement.addEventListener('click', addGo)
        gameBoard.append(cellelement)
    })
}

createBoard()

function addGo(e){
    const godisplay = document.createElement('div')
    godisplay.classList.add(go)
    e.target.append(godisplay)
    go = go === "circle" ? "cross" : "circle"

    infodisplay.textContent = go + "'s Turn"
    e.target.removeEventListener("click", addGo)

    checkScore()
}

function checkScore(){
    const allsquares = document.querySelectorAll(".square")
   
    const winningcombos = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6] 
    ]

    winningcombos.forEach(array =>{
        const circlewins = array.every(cell => allsquares[cell].firstChild?.classList.contains('circle'))
    
        if(circlewins){
            infodisplay.textContent = "Circle Win's"
            allsquares.forEach(square => square.replaceWith(square.cloneNode(true)))
            return 
        }
    })

    winningcombos.forEach(array =>{
        const crosswins = array.every(cell => allsquares[cell].firstChild?.classList.contains('cross'))
    
        if(crosswins){
            infodisplay.textContent = "Cross Win's"
            allsquares.forEach(square => square.replaceWith(square.cloneNode(true)))
            return 
        }
    })
}