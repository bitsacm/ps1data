const data = require('./ps1_data.json')
const fs = require('fs')
const path = require('path')

const industries = {}
data.forEach(({ industry }) => industries[industry] = true)

// data.forEach((station) => {
//     if (!station.projects) {
//         return
//     }
//     let branches = {}
//     station.projects.forEach((proj) => {
//         proj.preferredDisciplines.forEach((disc) => branches[disc] = true)
//     })
//     branches = Object.keys(branches)
//     station.branches = branches
// })

function cleanArray(array) {
    let clArray = {}
    array.forEach((item) => {
        item.split(' ').forEach((cl) => clArray[cl] = true)
    })
    return Object.keys(clArray)
}

data.forEach((station) => {
    if (!station.projects) return
    station.branches = cleanArray(station.branches)
    station.projects.forEach((proj) => proj.preferredDisciplines = cleanArray(proj.preferredDisciplines))
})

fs.writeFileSync(
    path.join(__dirname, 'ps1_data1.json'),
    JSON.stringify(data, null, 4)
)

console.log(industries)