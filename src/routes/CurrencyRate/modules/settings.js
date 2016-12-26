// ------------------------------------
// Constants
// ------------------------------------
export const SETTINGS_TOGGLE = 'SETTINGS_TOGGLE'

// ------------------------------------
// Actions
// ------------------------------------
export function displaySettings () {
  return {
    type    : SETTINGS_TOGGLE,
    payload : true
  }
}

export function closeSettings () {
  return {
    type    : SETTINGS_TOGGLE,
    payload : false
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = false
export default function settingsReducer (state = initialState, action) {
  return action.type === SETTINGS_TOGGLE
    ? action.payload
    : state
}
