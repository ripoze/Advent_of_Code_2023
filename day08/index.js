var data = require('fs').readFileSync('day08/input.txt', 'utf8')
data = data.trim().split('\n\n')

let instructions = data[0].split('')
let map = data[1].split('\n').map(row => {
    row = row.match(/\w+/g)
    return { 'position': row[0], 'L': row[1], 'R': row[2] }
})

function findNextPosition(current) {
    let next = map.filter(row => row.position == current)[0]
    let instruction = instructions[currentInstructionIndex]
    next = next[instruction]
    return next
}

//Part 1
let currentPosition = 'AAA'
let currentInstructionIndex = 0
let stepsUsed = 0
while (currentPosition != 'ZZZ') {
    currentPosition = findNextPosition(currentPosition)
    currentInstructionIndex++
    if (currentInstructionIndex == instructions.length) currentInstructionIndex = 0
    stepsUsed++
}
console.log(`Part 1: ${stepsUsed}`)

//Part 2
let currentPositions = map.filter(row => row.position[2] == 'A').map(r => r.position)

let steps=currentPositions.map(pos => {
    currentInstructionIndex = 0
    stepsUsed = 0
    while (pos[2] != 'Z') {
        pos = findNextPosition(pos)
        currentInstructionIndex++
        if (currentInstructionIndex == instructions.length) currentInstructionIndex = 0
        stepsUsed++
    }
    return stepsUsed
})

function gcd(a, b) { 
    for (let temp = b; b !== 0;) { 
        b = a % b; 
        a = temp; 
        temp = b; 
    } 
    return a; 
} 
  
function lcmFunction(a, b) { 
    const gcdValue = gcd(a, b); 
    return (a * b) / gcdValue; 
} 
let part2 = lcmFunction(steps[0], steps[1])
part2= lcmFunction(part2, steps[2])
part2= lcmFunction(part2, steps[3])
part2= lcmFunction(part2, steps[4])
part2= lcmFunction(part2, steps[5])
console.log(`Part 2: ${part2}`) //14299763833181

