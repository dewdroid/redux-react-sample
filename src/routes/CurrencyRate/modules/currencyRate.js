import $ from 'jquery'
import xml2js from 'xml2js'
import { browserHistory } from 'react-router'
import moment from 'moment'
import {default as api} from '../../../api/api'

// ------------------------------------
// Constants
// ------------------------------------
export const FETCH_CURRENCY_RATE = 'FETCH_CURRENCY_RATE'

export const Status = {
  SUCCESS: 'succes',
  ERROR: 'error'
}

// ------------------------------------
// Actions
// ------------------------------------

var Timer = {}
Timer = Object.assign(Timer, {
  isLoading: false,

  timerId: undefined,

  signalStart: function () {
    let self = this
    self.isLoading = true
    return new Promise((resolve)=> {
      clearTimeout(self.timerId)
      self.timerId = setTimeout(() => {
        if (self.isLoading) {
          resolve()
        }
      }, 300)
    })
  },

  signalStop: (function() { this.isLoading = false }).bind(Timer)
})

export const fetchSuccess = (data) => {
  return {
    type: FETCH_CURRENCY_RATE,
    status: Status.SUCCESS,
    payload: data
  }
}

export const fetchError = (e) => {
  return {
    type: FETCH_CURRENCY_RATE,
    status: Status.ERROR,
    error: e
  }
}

export const fetchCurrencyRateFactory = (api) => (date) => {
  return (dispatch, getState) => {

    Timer.signalStart().then(()=> {
      dispatch({
        type: FETCH_CURRENCY_RATE
      })
    })

    return api.getCurrencyRate(date)
      .then((data)=> {
        dispatch(fetchSuccess(data))
      }).catch((e)=> {
        dispatch(fetchError(e))
      }).then(Timer.signalStop) // signal that we are done
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {

  [FETCH_CURRENCY_RATE] : (state, action) => {
    switch (action.status) {
      case Status.ERROR: return { isFetching: false, error: action.error}
      case Status.SUCCESS: return { isFetching: false, data: action.payload}
      default:
        return {
          isFetching: true
        }
    }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  isFetching: false
}
export default function currencyRateReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
