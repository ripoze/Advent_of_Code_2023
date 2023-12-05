var data = require('fs').readFileSync('day05/input.txt', 'utf8')
data = data.trim().split('\n\n')

let seeds = []
seeds = data[0].match(/\d+/g).map(n => {
    return { 'seed': Number(n), 'soil': '', 'fertilizer': '', 'water': '', 'light': '', 'temperature': '', 'humidity': '', 'location': '' }
})
data.shift(2)
data = data.map(n => n.split(':')).map(n => {
    return { 'name': n[0], values: n[1].trim().split('\n') }
})
data = data.map(n => {
    n.values = n.values.map(row => row.match(/\d+/g))
    n.values = n.values.map(row => {
        return {
            'destinationRangeStart': Number(row[0]),
            'sourceRangeStart': Number(row[1]),
            'range': Number(row[2])
        }
    })
    return n
})

function findNextDestination(source, map) {
    let values = data.filter(row => row.name == map)[0].values
    for (let i = 0; i < values.length; i++) {
        if (source >= values[i].sourceRangeStart && source <= values[i].sourceRangeStart + values[i].range) {
            return values[i].destinationRangeStart + source - values[i].sourceRangeStart
        }
    }
    return source
}
function findPreviousDestination(source, map) {
    let values = data.filter(row => row.name == map)[0].values
    for (let i = 0; i < values.length; i++) {
        if (source >= values[i].destinationRangeStart && source <= values[i].destinationRangeStart + values[i].range) {
            return values[i].sourceRangeStart + source - values[i].destinationRangeStart
        }
    }
    return source
}
function findLocation(source) {
    let res = findNextDestination(source, 'seed-to-soil map')
    res = findNextDestination(res, 'soil-to-fertilizer map')
    res = findNextDestination(res, 'fertilizer-to-water map')
    res = findNextDestination(res, 'water-to-light map')
    res = findNextDestination(res, 'light-to-temperature map')
    res = findNextDestination(res, 'temperature-to-humidity map')
    res = findNextDestination(res, 'humidity-to-location map')

    return res
}
function findSeed(location) {
    let res = findPreviousDestination(location, 'humidity-to-location map')
    res = findPreviousDestination(res, 'temperature-to-humidity map')
    res = findPreviousDestination(res, 'light-to-temperature map')
    res = findPreviousDestination(res, 'water-to-light map')
    res = findPreviousDestination(res, 'fertilizer-to-water map')
    res = findPreviousDestination(res, 'soil-to-fertilizer map')
    res = findPreviousDestination(res, 'seed-to-soil map')
    return res
}

let seedsPart2 = []
for (let i = 0; i < seeds.length; i += 2) {
    let seed = { 'start': seeds[i].seed, 'end': seeds[i].seed + seeds[i + 1].seed - 1 }
    seedsPart2.push(seed)
}
function seedExists(seed){
    let res=false
    seedsPart2.map(range=>{
        if(range.start <= seed && range.end >=seed) res = true
    })
    return res
}

//Part1
seeds = seeds.map(seed => {
    seed.location = findLocation(seed.seed)
    return seed
})

let part1 = seeds.sort((a, b) => a.location - b.location)[0].location
console.log(`Part 1: ${part1}`) //462648396



//Part 2
let minLocation = Number.MAX_SAFE_INTEGER

for (location = 0; location <= minLocation; location++) {
    let seed = findSeed(location)
    if (seedExists(seed)) {
        minLocation = Math.min(location, minLocation)
    }
}

console.log(`Part 2: ${minLocation}`); //2520479