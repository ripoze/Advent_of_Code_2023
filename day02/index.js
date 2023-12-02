var data = require('fs').readFileSync('day02/input.txt', 'utf8')
data = data.trim().split('\n')

//Format data
data = data.map(s => {
    let result = { 'id': 0, shows: [] }
    result.id = Number(s.split(':')[0].match(/\d+/)[0])
    result.shows = s.split(':')[1].split(';').map(str => str.split(',').map(str => str.trim()))
    return result
})
data.map(game => {
    game.shows = game.shows.map(show => {
        let result = { 'red': 0, 'green': 0, 'blue': 0 }
        show.map(s => {
            s = s.split(' ')
            if (s[1] == 'red') result.red = Number(s[0])
            if (s[1] == 'green') result.green = Number(s[0])
            if (s[1] == 'blue') result.blue = Number(s[0])
        })
        return result
    })
})


//Part 1
const maxReds = 12
const maxBlues = 14
const maxGreens = 13

let part1 = data.filter(game => {
    return game.shows.every(show => show.red <= maxReds && show.blue <= maxBlues && show.green <= maxGreens)
}).reduce((acc, game) => acc += game.id, 0)
console.log(`Part 1: ${part1}`); //1734

//Part 2
let part2 = data.map(game => {
    return game.shows.reduce((acc, show) => {
        acc.red = Math.max(show.red, acc.red)
        acc.blue = Math.max(show.blue, acc.blue)
        acc.green = Math.max(show.green, acc.green)
        acc.power = acc.red * acc.blue * acc.green
        return acc
    }, { 'red': 0, 'green': 0, 'blue': 0 })
}).reduce((acc, game) => acc += game.power, 0)

console.log(`Part 2: ${part2}`); //70387