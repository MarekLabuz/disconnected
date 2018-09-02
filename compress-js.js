const fs = require('fs')

let file = fs.readFileSync('public/index.js').toString()

file = file.replace(/\\n(\s)*/g, '\\n')
file = file.replace(/:(\s)*/g, ':')
file = file.replace(/;(\s)*/g, ';')

fs.writeFileSync(`public/index.js`, file)
