'use strict'

module.exports.createSpan = function () {
    const span = {}
    const NOOP = () => span
    Object.assign(span, {
        spanContext: NOOP,
        setAttribute: NOOP,
        setAttributes: NOOP,
        addEvent: NOOP,
        setStatus: NOOP,
        updateName: NOOP,
        end: NOOP,
        isRecording: () => false,
        recordException: NOOP
    })
    return span
}