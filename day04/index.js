var data = require('fs').readFileSync('day04/input.txt', 'utf8')
data = data.trim().split('\n')

let cards = []
data.map(row => {
    let result = { cardNumber: 0, 'winningNumbers': [], 'numbers': [], 'matches': 0 }
    result.cardNumber = Number(row.match(/\d+/)[0])
    row = row.split(':')[1].split('|')
    result.winningNumbers = row[0].match(/\d+/g).map(n => Number(n))
    result.numbers = row[1].match(/\d+/g).map(n => Number(n))
    cards.push(result)
})

function countPointsPart1(card) {
    return card.matches > 0 ? Math.pow(2, card.matches - 1) : 0
}
function countMacthingNumbers(winningNumbers, numbers) {
    return numbers.reduce((acc, number) => winningNumbers.includes(number) ? acc + 1 : acc, 0)
}
cards = cards.map(c => {
    c.matches = countMacthingNumbers(c.winningNumbers, c.numbers)
    return c
})

//Part 1
let part1 = cards.reduce((acc, card) => acc + countPointsPart1(card), 0)
console.log(`Part 1: ${part1}`) //25231


//Part 2
let index = 0;
while (index < cards.length) {
    for (let i = 0; i < cards[index].matches; i++) {
        cards.push({ cardNumber: cards[cards[index].cardNumber + i].cardNumber, matches: cards[cards[index].cardNumber + i].matches })
    }
    index++
}

console.log(`Part 2: ${cards.length}`) //9721255