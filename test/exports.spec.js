'use strict'

describe('Exports', () => {

    it('exports /status-codes', () => {
        require('@discue/open-telemetry-tracing-noop/status-codes')
    })

    it('exports /instrumentation', () => {
        require('@discue/open-telemetry-tracing-noop/instrumentation')
    })
})