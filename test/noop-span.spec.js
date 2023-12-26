const { expect } = require('chai')
const { createSpan } = require('../lib/noop-span.js')

describe('CreateSpan', () => {
    it('returns a span object', () => {
        expect(createSpan()).not.to.be.null
    })
    it('allows method chaining', () => {
        createSpan() 
            .setAttribute()
            .setAttributes()
            .addEvent()
            .setStatus()
            .updateName()
            .end()
            .recordException()
    })
})