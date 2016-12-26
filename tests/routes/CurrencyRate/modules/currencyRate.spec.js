import {
  FETCH_CURRENCY_RATE,
  fetchSuccess,
  fetchCurrencyRateFactory,
  default as currencyRateReducer
} from 'routes/CurrencyRate/modules/currencyRate'

describe('(Redux Module) CurrencyRate', () => {
  it('Should export a constant FETCH_CURRENCY_RATE.', () => {
    expect(FETCH_CURRENCY_RATE).to.equal('FETCH_CURRENCY_RATE')
  })

  describe('(Reducer)', () => {
    it('Should be a function.', () => {
      expect(currencyRateReducer).to.be.a('function')
    })

    it('Should initialize with a state of {isFetching: false}', () => {
      expect(currencyRateReducer(undefined, {})).to.deep.equal({isFetching: false})
    })

    it('Should return the previous state if an action was not matched.', () => {
      let state = currencyRateReducer(undefined, {})
      expect(state).to.deep.equal({isFetching: false})
      state = currencyRateReducer(state, { type: 'UNKNOWN' })
      expect(state).to.deep.equal({isFetching: false})
      state = currencyRateReducer(state, fetchSuccess([{ value: '100', code: 'usd' }]))
      expect(state).to.deep.equal({isFetching: false, data: [{ value: '100', code: 'usd' }]})
      state = currencyRateReducer(state, { type: 'UNKNOWN' })
      expect(state).to.deep.equal({isFetching: false, data: [{ value: '100', code: 'usd' }]})
    })
  })

  describe('(Action Creator) fetchCurrencyRate', () => {
    let _globalState
    let _dispatchSpy
    let _getStateSpy
    let fetchCurrencyRate
    let _api

    beforeEach(() => {
      _globalState = {
        currencyRate : currencyRateReducer(undefined, {})
      }
      _dispatchSpy = sinon.spy((action) => {
        _globalState = {
          ..._globalState,
          currencyRate : currencyRateReducer(_globalState.currencyRate, action)
        }
      })
      _getStateSpy = sinon.spy(() => {
        return _globalState
      })

      _api = {
        getCurrencyRate: ()=> {
          return Promise.resolve([{value: '100', code: 'usd'}, {value: '200', code: 'eur'}])
        }
      }
      fetchCurrencyRate = fetchCurrencyRateFactory(_api)

    })

    it('Should be exported as a function.', () => {
      expect(fetchCurrencyRate).to.be.a('function')
    })

    it('Should return a function (is a thunk).', () => {
      expect(fetchCurrencyRate()).to.be.a('function')
    })

    it('Should return a promise from that thunk that gets fulfilled.', () => {
      return fetchCurrencyRate()(_dispatchSpy, _getStateSpy).should.eventually.be.fulfilled
    })

    it('Should call dispatch.', () => {
      return fetchCurrencyRate()(_dispatchSpy, _getStateSpy)
        .then(() => {
          _dispatchSpy.should.have.been.calledOnce
        })
    })

    it('Should produce a state with data provided by api', () => {
      _globalState = { currencyRate: { isFetching: false } }

      return fetchCurrencyRate()(_dispatchSpy, _getStateSpy)
        .then(() => {
          expect(_globalState.currencyRate).to.deep.equal(
            { isFetching: false, data: [{value: '100', code: 'usd'}, {value: '200', code: 'eur'}] }
          )
          return fetchCurrencyRate()(_dispatchSpy, _getStateSpy)
        })
    })
  })

})
