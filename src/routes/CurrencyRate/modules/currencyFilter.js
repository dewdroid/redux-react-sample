// ------------------------------------
// Constants
// ------------------------------------
export const CURRENCY_FILTER_APPLY = 'CURRENCY_FILTER_APPLY'

// ------------------------------------
// Actions
// ------------------------------------
export function applyCurrencyFilter (filter = ['USD', 'EUR']) {
  return {
    type    : CURRENCY_FILTER_APPLY,
    payload : filter
  }
}


// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [CURRENCY_FILTER_APPLY]    : (state, action) => action.payload
}


// ------------------------------------
// Reducer
// ------------------------------------
const initialState = ['USD', 'EUR']
export default function currencyFilterReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
