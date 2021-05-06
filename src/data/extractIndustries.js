const data = require('./ps1_data.json')

const industries = {}
data.forEach(({ industry }) => industries[industry] = true)

console.log(industries)