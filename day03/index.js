var data = require('fs').readFileSync('day03/input.txt', 'utf8')
data = data.trim().split('\n')

let numbers = []
let symbols = []

data.map((row, y) => {
    //Find part numbers
    let re = /\d+/g
    while ((match = re.exec(row)) != null) {
        numbers.push({ 'x': match.index, 'y': y, 'partNumber': Number(match[0]), 'adjacentTo': 0 })
    }
    //Find symbols
    re = /[^0-9.]/g
    while ((match = re.exec(row)) != null) {
        symbols.push({ 'x': match.index, 'y': y, 'symbol': match[0], 'adjacentTo': [] })
    }
})

numbers.map(partnumber => {
    symbols.map(symbol => {
        if (isAdjacent(symbol.x, symbol.y, partnumber.x, partnumber.y, partnumber.partNumber.toString().length)) {
            partnumber.adjacentTo++
        }
    })
})
symbols.map(symbol => {
    numbers.map(partnumber => {
        if (isAdjacent(symbol.x, symbol.y, partnumber.x, partnumber.y, partnumber.partNumber.toString().length)) {
            symbol.adjacentTo.push(partnumber.partNumber)
        }
    })
})

function isAdjacent(symbolX, symbolY, partX, partY, partLength) {
    let adjacent = false
    for (let i = 0; i < partLength; i++) {
        if (Math.abs(symbolX - (partX + i)) <= 1 && Math.abs(symbolY - partY) <= 1) {
            adjacent = true
        }
    }
    return adjacent
}



let part1 = numbers.filter(number => number.adjacentTo > 0).reduce((acc, number) => acc + number.partNumber, 0)
console.log(`Part 1:${part1}`) //512794

let part2 = symbols.filter(symbol => symbol.symbol == '*' && symbol.adjacentTo.length == 2)
    .reduce((acc, symbol) => acc + symbol.adjacentTo[0] * symbol.adjacentTo[1], 0)
console.log(`Part 2:${part2}`) //67779080


