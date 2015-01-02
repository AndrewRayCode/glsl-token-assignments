const tokenize = require('glsl-tokenizer/string')
const test     = require('tape')
const assigns  = require('../')

test('for loops', (t) => {
  var src = `
    vec3 x = vec3(0.0);

    for (int i = 0; i < 2; i++) {
      x += vec3(float(i));
    }
  `

  var tokens = tokenize(src)
  var j      = 0

  assigns(tokens)

  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i]
    if (token.data !== 'i') continue; j++
    if (j === 1) {
      t.ok(token.assignment, 'first `i` is an assignment')
      t.ok(token.definition, 'first `i` is a definition')
    } else
    if (j === 2) {
      t.ok(!token.assignment, 'second `i` is not an assignment')
      t.ok(!token.definition, 'second `i` is not a definition')
    } else
    if (j === 3) {
      t.ok(token.assignment, 'third `i` is an assignment')
      t.ok(!token.definition, 'third `i` is not a definition')
    } else
    if (j === 4) {
      t.ok(!token.assignment, 'fourth `i` is not an assignment')
      t.ok(!token.definition, 'fourth `i` is not a definition')
    }
  }

  t.end()
})
