'use strict'

const NOOP_RETURN_THIS = () => this

module.exports.createSpan = function () {
    return {
        spanContext: NOOP_RETURN_THIS,
        setAttribute: NOOP_RETURN_THIS,
        setAttributes: NOOP_RETURN_THIS,
        addEvent: NOOP_RETURN_THIS,
        setStatus: NOOP_RETURN_THIS,
        updateName: NOOP_RETURN_THIS,
        end: NOOP_RETURN_THIS,
        isRecording: () => false,
        recordException: NOOP_RETURN_THIS
    }
}