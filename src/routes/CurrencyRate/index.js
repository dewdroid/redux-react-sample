import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'currencyrate',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const CurrencyRate = require('./containers/CurrencyRateContainer').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'currencyRate', reducer: require('./modules/currencyRate').default})

      /* todo: Consider handling these together*/
      injectReducer(store, { key: 'isSettingsDisplayed', reducer: require('./modules/settings').default})
      injectReducer(store, { key: 'currencyFilter_Edit', reducer: require('./modules/currencyFilterEdit').default})
      injectReducer(store, { key: 'currencyFilter', reducer: require('./modules/currencyFilter').default})

      /*  Return getComponent   */
      cb(null, CurrencyRate)

    /* Webpack named bundle   */
    }, 'counter')
  }
})
