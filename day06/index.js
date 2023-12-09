var data = require('fs').readFileSync('day06/input.txt', 'utf8')
data = data.trim().split('\n').map(row => row.match(/\d+/g).map(Number))

let races = []
for (let i = 0; i < data[0].length; i++) {
    races.push({ 'time': data[0][i], 'recordDistance': data[1][i], 'results': [] })
}
function distance(time, chargeTime) {
    let movingTime = time - chargeTime
    let distance = movingTime * chargeTime
    return distance
}

races.map(race => {
    for (let i = 0; i < race.time; i++) {
        race.results.push(distance(race.time, i))
    }
    race.winningRaces = race.results.filter(r => r > race.recordDistance).length
})

//Part 1
console.log(`Part 1: ${races.reduce((acc, race) => acc * race.winningRaces, 1)}`)

//Part 2
let part2race = { 'time': 0, 'recordDistance': 0, 'results':[] }
part2race.time = Number(races.reduce((acc, race)=>acc + race.time, ''))
part2race.recordDistance = Number(races.reduce((acc, race)=>acc + race.recordDistance, ''))

for (let i = 0; i < part2race.time; i++) {
    part2race.results.push(distance(part2race.time, i))
}
part2race.winningRaces = part2race.results.filter(r => r > part2race.recordDistance).length
console.log(`Part 2: ${part2race.winningRaces}`)