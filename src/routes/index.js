// We only need to import the modules necessary for initial render
import CoreLayout from '../layouts/CoreLayout'
import Home from './Home'
import CurrencyRateRoute from './CurrencyRate'
import Notfound from './Notfound'

/*  Using react-router PlainRoute objects to build route definitions.   */

export const createRoutes = (store) => ({
  path        : '/',
  component   : CoreLayout,
  indexRoute  : Home,
  childRoutes : [
    CurrencyRateRoute(store), Notfound(store)
  ]
})

export default createRoutes
