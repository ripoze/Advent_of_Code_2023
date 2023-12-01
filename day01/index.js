var data = require('fs').readFileSync('day01/input.txt', 'utf8')
data = data.trim().split('\n')


//Part 1
function sumFirstAndLastDigit(data) {
    return data.reduce((acc, str) => {
        let digits = str.match(/\d/g)
        return acc + Number(digits[0] + digits[digits.length - 1])
    }, 0)
}
console.log(`Part 1: ${sumFirstAndLastDigit(data)}`)



//Part2
function strToNumber(str) {
    switch (str) {
        case 'one':
            return 1
        case 'two':
            return 2
        case 'three':
            return 3
        case 'four':
            return 4
        case 'five':
            return 5
        case 'six':
            return 6
        case 'seven':
            return 7
        case 'eight':
            return 8
        case 'nine':
            return 9
        default:
            return Number(str)
    }
}

let part2 = data.reduce((acc, str) => {
    let firstDigit = str.match(/one|two|three|four|five|six|seven|eight|nine|\d/g)
    firstDigit = strToNumber(firstDigit[0])

    str = str.split('').reverse().join('');
    let lastDigit = str.match(/eno|owt|eerht|ruof|evif|xis|neves|thgie|enin|\d/)
    lastDigit = strToNumber(lastDigit[0].split('').reverse().join(''))

    return acc + 10 * firstDigit + lastDigit
}, 0)
console.log(`Part 2: ${part2}`) //55291