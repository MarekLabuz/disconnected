const fs = require('fs')

const dirname = 'src/minified_svg'
const dir = fs.readdirSync('src/minified_svg')

const svgFiles = dir
  .filter(filename => filename.endsWith('.svg'))
  .map(filename => filename.replace('.svg', ''))

const fileContents = svgFiles
  .map(filename => fs.readFileSync(`${dirname}/${filename}.svg`).toString())

const tokens = fileContents
  .map(file => file.split(' '))
  .reduce((acc, curr) => [...acc, ...curr], [])
  // .map(fileTokens => fileTokens.reduce((acc, token) => Object.assign({}, acc, {
  //   [token]: (acc[token] || 0) + 1
  // }), {}))
  .reduce((acc, token) => Object.assign({}, acc, {
    [token]: (acc[token] || 0) + 1
  }), {})

const lookupTable = Object.entries(tokens)
  // .map(fileTokens => Object.entries(fileTokens))
  // .reduce((acc, curr) => [...acc, ...curr], [])
  .sort((a, b) => (b[1] * b[0].length) - (a[1] * a[0].length))
  .filter((tokenValue, i) => (tokenValue[1] * tokenValue[0].length) > (tokenValue[0].length + (tokenValue[1] + 1) * `?${i.toString(36)}?`.length))
  .reduce((acc, token, i) => Object.assign({}, acc, {
    [`?${i.toString(36)}?`]: token[0]
  }), {})

const newFileContents = fileContents
  .map(content => {
    let newContent = content
    Object.entries(lookupTable).forEach(([key, pattern]) => {
      // console.log({ pattern, key })
      newContent = newContent.replace(new RegExp(pattern.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), key)
    })
    return newContent
  })

// console.log({ lookupTable })

newFileContents.forEach((file, i) => {
  fs.writeFileSync(`./src/dist_svg/${svgFiles[i]}.svg`, file)
})

fs.writeFileSync(`./src/dist_svg/lookup.json`, JSON.stringify(lookupTable))

// console.log({ lookupTable, newFileContents })

// console.log(houseSVG.split(' ').reduce((acc, curr) => ))
