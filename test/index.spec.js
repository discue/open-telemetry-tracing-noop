const { expect } = require('chai')
const { createTracer, getActiveSpanAndTraceIds } = require('../lib/index.js')

describe('Tracing', () => {
    describe('.getActiveSpanAndTraceIds', () => {
        it('returns an empty object', () => {
            const result = getActiveSpanAndTraceIds()
            expect(Object.keys(result)).to.have.length(0)
        })
    })
    describe('.createTracer', () => {
        describe('.withActiveSpan', () => {
            it('calls the callback with the span as first attribute', (done) => {
                const tracer = createTracer('test')
                tracer.withActiveSpan('withActiveSpan-test-span', (span) => {
                    try {
                        expect(span.isRecording()).to.be.false
                        done()
                    } catch (e) {
                        done(e)
                    }
                })
            })
        })

        describe('.withActiveSpanSync', () => {
            it('calls the callback with the span as first attribute', (done) => {
                const tracer = createTracer('test')
                tracer.withActiveSpanSync('withActiveSpanSync-test-span', (span) => {
                    try {
                        expect(span.isRecording()).to.be.false
                        done()
                    } catch (e) {
                        done(e)
                    }
                })
            })
        })

        describe('.withOrphanedSpan', () => {
            it('calls the callback with the span as first attribute', (done) => {
                const tracer = createTracer('test')
                tracer.withOrphanedSpan('withOrphanedSpan-test-span', (span) => {
                    try {
                        expect(span.isRecording()).to.be.false
                        done()
                    } catch (e) {
                        done(e)
                    }
                })
            })
        })
    })
})