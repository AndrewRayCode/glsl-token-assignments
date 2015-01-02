const tokenize = require('glsl-tokenizer/string')
const test     = require('tape')
const assigns  = require('../')

test('simple: assignment', (t) => {
  var src = 'x = 1.0;'
  var tokens = tokenize(src)

  assigns(tokens)

  t.plan(1)
  for (var i = 0; i < tokens.length; i++) {
    if (tokens[i].data !== 'x') continue
    t.ok(tokens[i].assignment, 'x is an assignment')
  }
})

test('simple: definition', (t) => {
  var src = 'float x;'
  var tokens = tokenize(src)

  assigns(tokens)

  t.plan(1)
  for (var i = 0; i < tokens.length; i++) {
    if (tokens[i].data !== 'x') continue
    t.ok(tokens[i].definition, 'x is an definition')
  }
})

test('simple: definition + assignment', (t) => {
  var src = 'float x = 1.0;'
  var tokens = tokenize(src)

  assigns(tokens)

  t.plan(2)
  for (var i = 0; i < tokens.length; i++) {
    if (tokens[i].data !== 'x') continue
    t.ok(tokens[i].definition, 'x is an definition')
    t.ok(tokens[i].assignment, 'x is an assignment')
  }
})
