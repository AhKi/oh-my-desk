/**
 * BROADCAST(broadcast)
 * - broadcast action is dispatched All(main and all renderer) process
 *
 * ex)
 * {
 *  type: some-action-type
 *  payload: // some payload
 *  meta: {
 *    category: 'broadcast'
 *  }
 * }
 *
 * SELF(self)
 * - self action is dispatched itself. Not transmit another process
 *
 * ex)
 * {
 *  type: some-action-type
 *  payload: // some payload
 *  meta: {
 *    category: 'self'
 *  }
 * }
 *
 * TARGET(target)
 * - target action is dispatched targeting process
 * - targeted process is id of array in action.meta.target
 *
 * ex)
 * {
 *  type: some-action-type
 *  payload: // some payload
 *  meta: {
 *    category: 'target'
 *    self: true || false
 *    target: [(id)?]
 *    containMain: true || false
 *  }
 * }
 */

export const BROADCAST = 'BROADCAST';
export const SELF = 'SELF';
export const TARGET = 'TARGET';
