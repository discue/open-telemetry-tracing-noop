'use strict'

const { createSpan } = require('./noop-span.js')

/**
 * @typedef {import('@opentelemetry/api').Tracer} Tracer
 */

/**
 * @typedef {String|Tracer} StringOrTracer
 */

/**
 * @typedef {import('@opentelemetry/api').Span} Span
 */

/**
 * @callback ActiveSpanCallback
 * @param {Span} span
 */

/**
 * @typedef SpanAndTraceId
 * @property {string} [spanId]
 * @property {string} [traceId]
 */

/**
 * 
 * @returns {SpanAndTraceId}
 */
module.exports.getActiveSpanAndTraceIds = function () {
    return {}
}

/**
 * @param {StringOrTracer} tracerNameOrTracer the name of the tracer or the tracer itself
 * @param {String} spanName the name of the span
 * @param {Object} spanAttributes additional metadata for the span
 * @param {ActiveSpanCallback} callback the function to call
 * @returns {Promise}
 */
module.exports.withActiveSpan = async function withActiveSpan(tracerNameOrTracer, spanName, spanAttributes, callback) {
    return callback(createSpan())
}

/**
 * @param {StringOrTracer} tracerNameOrTracer the name of the tracer or the tracer itself
 * @param {String} spanName the name of the span
 * @param {Object} spanAttributes additional metadata for the span
 * @param {ActiveSpanCallback} callback the function to call
 * @returns {any}
 */
module.exports.withActiveSpanSync = function withActiveSpanSync(tracerNameOrTracer, spanName, spanAttributes, callback) {
    return callback(createSpan())
}

/**
 * 
 * @param {StringOrTracer} tracerNameOrTracer the name of the tracer or the tracer itself
 * @param {String} spanName the name of the span
 * @param {Object} spanAttributes additional metadata for the span
 * @param {ActiveSpanCallback} callback the function to call
 * @returns {Promise}
 */
module.exports.withOrphanedSpan = async function withOrphanedSpan(tracerNameOrTracer, spanName, spanAttributes, callback) {
    return callback(createSpan())
}

/**
 * @callback WithActiveSpanFn
 * @param {String} spanName the name of the span
 * @param {Object|ActiveSpanCallback} [spanAttributes] additional attributes for the span
 * @param {ActiveSpanCallback} [callback] the function to call
 */

/**
 * @typedef TracerFacade
 * @property {WithActiveSpanFn} withActiveSpan
 * @property {WithActiveSpanFn} withActiveSpanSync
 * @property {WithActiveSpanFn} withOrphanedSpan
 */

/**
 * @typedef CreateTracerOptions
 * @property {String} [spanPrefix] a prefix to add to each span name
 * @property {String} [spanPrefixDelimiter=#] the delimiter to be used between span prefix and wanted name
 * @property {String} [filepath] the filename of the traced functions. For es6 modules use import.meta.url, for CommonJS use `${__dirname}/${__filename}`
 */

/**
 * 
 * @param {CreateTracerOptions} [options] 
 * @returns {TracerFacade}
 */
// eslint-disable-next-line no-unused-vars
module.exports.createTracer = function createTracer({ filepath, spanPrefix, spanPrefixDelimiter = '#' } = {}) {
    return {
        /**
         * 
         * @param {String} spanName the name of the span
         * @param {Object} [spanAttributes] additional attributes to attach to the span
         * @param {ActiveSpanCallback} callback the function to call
         */
        withActiveSpan: async (spanName, spanAttributes, callback) => {
            const { callback: actualCallback } = prepareAttributes(spanAttributes, filepath, callback)
            return module.exports.withActiveSpan(null, null, null, actualCallback)
        },
        /**
         * 
         * @param {String} spanName the name of the span
         * @param {Object} [spanAttributes] additional attributes to attach to the span
         * @param {ActiveSpanCallback} callback the function to call
         */
        withActiveSpanSync: (spanName, spanAttributes, callback) => {
            const { callback: actualCallback } = prepareAttributes(spanAttributes, filepath, callback)
            return module.exports.withActiveSpanSync(null, null, null, actualCallback)
        },
        /**
         * 
         * @param {String} spanName the name of the span
         * @param {Object} [spanAttributes] additional attributes to attach to the span
         * @param {ActiveSpanCallback} callback the function to call
         */
        withOrphanedSpan: async (spanName, spanAttributes, callback) => {
            const { callback: actualCallback } = prepareAttributes(spanAttributes, filepath, callback)
            return module.exports.withOrphanedSpan(null, null, null, actualCallback)
        }
    }
}

/**
 * 
 * @param {Object|Function} [spanAttributes] 
 * @param {String} filepath 
 * @param {Function} [callback] 
 * @returns 
 */
function prepareAttributes(spanAttributes, filepath, callback) {
    if (!callback && typeof spanAttributes === 'function') {
        callback = spanAttributes
        spanAttributes = {}
    }
    return { callback }
}