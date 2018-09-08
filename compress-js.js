const fs = require('fs')

let file = fs.readFileSync('public/index.js').toString()

file = file.replace(/\\n(\s)*/g, '\\n')
file = file.replace(/:(\s)*/g, ':')
file = file.replace(/;(\s)*/g, ';')
file = file.replace(/Error\("[^"]*"\)/g, 'Error("")')

// file = file.replace(/startScreen/g, 'a')
// file = file.replace(/shadowScreenText/g, 'b')
// file = file.replace(/introStory/g, 'c')
// file = file.replace(/inIntroZone/g, 'd')
// file = file.replace(/wifiCrossVisible/g, 'e')
// file = file.replace(/wifiFixed/g, 'f')
// file = file.replace(/leverFixed/g, 'g')
// file = file.replace(/wireFixed/g, 'h')
// file = file.replace(/gearFixed/g, 'j')
// file = file.replace(/tapeTaken/g, 'i')
// file = file.replace(/oilTaken/g, 'k')
// file = file.replace(/gearTaken/g, 'l')
// file = file.replace(/wifiCrossVisible/g, 'm')

fs.writeFileSync(`public/index.js`, file)
