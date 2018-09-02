const fs = require('fs')
const _ = require('lodash')

const start = Date.now()
let file = fs.readFileSync('./public/index.js').toString().replace(/\n/g, ' ')

const lookups = []

for (let i = 0; i < 2; i += 1) {

}

let words = []

for (let cursorStart = 0; cursorStart < file.length / 100; cursorStart += 1) {
  let word = null
  let weight = 0
  for (let cursorEnd = cursorStart + 4; cursorEnd < file.length; cursorEnd += 1) {
    const pattern = file.slice(cursorStart, cursorEnd)
    const foundWords = file.match(new RegExp(pattern.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'))
    if (foundWords.length < 2) break
    const patternWeight = foundWords.length * pattern.length
    if (patternWeight > weight) {
      weight = patternWeight
      word = pattern
    }
    // console.log({ foundWords })
    // const weight =
  }
  if (word) words.push(word)
  words = _.uniq(words)
  console.log(`Progress ${cursorStart}/${file.length}, words length ${words.length}`)
}

const wordsWithWeight = words.map(word => [
  word,
  file.match(new RegExp(word.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g')).length
])

// const noSubstring = ([word, no]) => wordsWithWeight
//   .filter(([w]) => w.includes(word))
//   .reduce((acc, [_, n]) => [acc[0], acc[1] - n], [word, no])

const wordsByWeight = {}
const s1 = '@'
const s2 = '!'

wordsWithWeight
  // .map(noSubstring)
  .sort((a, b) => (b[0].length * b[1]) - (a[0].length * a[1]))
  .filter((v, i) => (v[0].length * v[1]) > (v[0].length + (v[1] + 1) * `${s1}${i.toString(36)}${s2}`.length))
  // .forEach(([word], i) => {
  //   wordsByWeight[`?${i.toString(36)}?`] = word
  // })
  .map(([word], i) => [`${s1}${i.toString(36)}${s2}`, word])
  .forEach(([key, word]) => {
    const foundWords = file.match(new RegExp(word.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'))
    if (foundWords && foundWords.length > 1) {
      file = file.replace(new RegExp(word.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), key)
      wordsByWeight[key] = word
    }
  })


const reg = "/[-\/\\^$*+?.()|[\]{}]/g"
const rr = "'\\$&'"
const code = `
  const lookups = ${JSON.stringify(wordsByWeight)}
  let file = \`${file.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&').replace(/\`/g, '\\`').replace(/\\n/g, '\\\\n')}\`
  for (const lookup of Object.entries(lookup)) for (const [key, word] of Object.entries(lookup)) file = file.replace(new RegExp(key.replace(new RegExp(${reg}), ${rr}), 'g'), word)
  eval(file)
`

fs.writeFileSync('./public/file.min.js', code)
fs.writeFileSync('./public/index.min.js', code)


// console.log({ length: wordsWithWeight.length })

// console.log(Date.now() - start, t.length)
