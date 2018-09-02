const fs = require('fs')
const _ = require('lodash')

// const start = Date.now()
let file = fs.readFileSync('./public/index.js').toString().replace(/\n/g, ' ')

const id = (() => {
  let i = 0
  // let symbols = '@§>!£<'
  return {
    get: () => `<${(i++).toString(36)}>`,
    reset () {
      i = 0
    }
  }
})()

const lookups = []
let iteration = 1
let maxIteration = 10
while (iteration <= maxIteration) {
  let words = []

  for (let cursorStart = 0; cursorStart < file.length; cursorStart += 1) {
    let word = null
    let weight = 0
    for (let cursorEnd = cursorStart + 6; cursorEnd < file.length; cursorEnd += 1) {
      const pattern = file.slice(cursorStart, cursorEnd)
      const foundWords = file.match(new RegExp(pattern.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'))
      if (foundWords.length < 2) break
      const patternWeight = foundWords.length * pattern.length
      if (patternWeight > weight) {
        weight = patternWeight
        word = pattern
      }
    }
    if (word) words.push(word)
    words = _.uniq(words)
    console.log(`Progress ${cursorStart}/${file.length}, words length ${words.length}, iteration ${iteration}`)
  }

  const wordsByWeight = {}

  let wordsWithWeight = words.map(word => [
    word,
    file.match(new RegExp(word.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g')).length
  ])

  wordsWithWeight = wordsWithWeight
    .sort((a, b) => (b[0].length * b[1]) - (a[0].length * a[1]))
    .filter((v, i) => (v[0].length * v[1]) > (v[0].length + (v[1] + 1) * `${id.get().toString(36)}`.length))

  wordsWithWeight
    .map(([word], i) => [`${id.get().toString(36)}`, word])
    .forEach(([key, word]) => {
      const foundWords = file.match(new RegExp(word.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'))
      if (foundWords && foundWords.length > 1) {
        file = file.replace(new RegExp(word.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), key)
        wordsByWeight[key] = word
      }
    })

  if (wordsWithWeight.length === 0) break

  lookups.push(JSON.stringify(wordsByWeight))
  iteration += 1
}

const reg = "[-\/\\^$*+?.()|[\]{}]"
const rr = "\\$&"
const code = `
  const lookups = [${lookups.reverse().join(',')}]
  let file = \`${file.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&').replace(/\`/g, '\\`').replace(/\\n/g, '\\\\n')}\`
  for (const lookup of lookups) {
    console.log({ lookup })
    console.log({ file })
    for (const [key, word] of Object.entries(lookup)) {
      file = file.replace(new RegExp(key.replace(new RegExp("${reg}", 'g'), "${rr}"), 'g'), word)
    }
    console.log({ file })
  }
  eval(file)
`

// fs.writeFileSync('./public/file.min.js', code)
fs.writeFileSync('./public/index.min.js', code)


// console.log({ length: wordsWithWeight.length })

// console.log(Date.now() - start, t.length)
