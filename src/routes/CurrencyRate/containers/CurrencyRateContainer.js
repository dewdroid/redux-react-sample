import { connect } from 'react-redux'
import { fetchCurrencyRateFactory } from '../modules/currencyRate'
import { displaySettings, closeSettings } from '../modules/settings'
import { toggleCurrencyFilter, setCurrencyFilter } from '../modules/currencyFilterEdit'
import { applyCurrencyFilter } from '../modules/currencyFilter'
import { browserHistory } from 'react-router'
import { bindActionCreators } from 'redux'
import React from 'react'
import { createSelector } from 'reselect'
import moment from 'moment'
import {default as api} from '../../../api/api'

import CurrencyRate from '../components/CurrencyRate'

const mapDispatchToProps = {
  fetchCurrencyRate: fetchCurrencyRateFactory(api),
  updateLocation: (date)=> browserHistory.push('/currencyrate?day=' + moment(date).format("DD/MM/YYYY")),

  _editFilter_display: displaySettings,
  _editFilter_close: closeSettings,
  _editFilter_applyCurrencyFilter: applyCurrencyFilter,
  _editFilter_toggleCurrencyFilter: toggleCurrencyFilter,
  _editFilter_setCurrencyFilter: setCurrencyFilter,

}

const query = (state, props) => props.location.query
const daySelector = createSelector(
  query,
  query => moment(query.day, "DD/MM/YYYY").toDate()
)

const currencyRate = (state, props) => state.currencyRate
const filter = (state, props) => state.currencyFilter
const dataSelector = createSelector(
  currencyRate, filter,
  (currencyRate, filter) => {
    return {
      ...currencyRate,
      data: (currencyRate.data || []).filter(v => filter.includes(v.code))
    }
  }
)

const currencySelector = createSelector(
  currencyRate,
  (currencyRate) => (currencyRate.data || []).map(v => {
    return {charCode: v.code, displayName: v.name + ' (' + v.code + ')'}
  })
)

const mapStateToProps = (state, props) => ({
  /* */
  data: dataSelector(state, props),
  /* */
  date: daySelector(state, props),

  currencyFilter: state.currencyFilter,

  editFilter: {
    _get: (props)=> {
      return {
        ...props.editFilter,
        _actions: props
      }
    },

    isStarted: state.isSettingsDisplayed,
    currencyFilter: state.currencyFilter_Edit,
    currencyList: currencySelector(state, props),

    start: (props) => {
      props._editFilter_setCurrencyFilter(props.currencyFilter)
      props._editFilter_display()
    },
    toggleCurrencyFilter: (code)=> (props) => props._actions._editFilter_toggleCurrencyFilter(code),
    complete: (props) => {
      props._actions._editFilter_close()
      props._actions._editFilter_applyCurrencyFilter(props.currencyFilter)
    },
    cancel: (props) => {
      props._actions._editFilter_close()
    }
  }

})

class CurrencyRateContainer extends React.Component {

  componentDidMount() {
    if (!moment(this.props.date).isValid()) {
      browserHistory.push('/')
    } else {
      this.props.fetchCurrencyRate(this.props.date)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.date !== nextProps.date) {
      this.props.fetchCurrencyRate(nextProps.date)
    }
  }

  render() {
    return <CurrencyRate {...this.props} />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrencyRateContainer)
