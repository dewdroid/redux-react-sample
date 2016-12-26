import CurrencyRateRoute from 'routes/CurrencyRate'

describe('(Route) Counter', () => {
  let _route

  beforeEach(() => {
    _route = CurrencyRateRoute({})
  })

  it('Should return a route configuration object', () => {
    expect(typeof _route).to.equal('object')
  })

  it('Configuration should contain path `counter`', () => {
    expect(_route.path).to.equal('currencyrate')
  })
})
