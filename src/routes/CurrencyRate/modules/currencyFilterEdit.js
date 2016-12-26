// ------------------------------------
// Constants
// ------------------------------------
export const CURRENCY_FILTER_EDIT = 'CURRENCY_FILTER_EDIT'
export const CURRENCY_FILTER_EDIT_SET = 'CURRENCY_FILTER_EDIT_SET'

// ------------------------------------
// Actions
// ------------------------------------

export function toggleCurrencyFilter (value) {
  return {
    type    : CURRENCY_FILTER_EDIT,
    payload : value
  }
}

export function setCurrencyFilter (filter = []) {
  return {
    type    : CURRENCY_FILTER_EDIT_SET,
    payload : filter
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
let set = new Set()
const ACTION_HANDLERS = {
  [CURRENCY_FILTER_EDIT]    : (state, action) => {
    if (set.has(action.payload)) {
      set.delete(action.payload)
    } else {
      set.add(action.payload)
    }
    return [...set]
  },
  [CURRENCY_FILTER_EDIT_SET] : (state, action) => {
    set = new Set(action.payload)
    return [...set]
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
export default function currencyFilterReducer (state = [...set], action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
