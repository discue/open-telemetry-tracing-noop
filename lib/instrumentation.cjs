'use strict'

const { createSpan } = require('./noop-span.js')

module.exports = {
    startActiveSpan: (name, callback) => callback(createSpan()),
    startSpan: () => createSpan()
}