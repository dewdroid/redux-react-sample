import React from 'react'
import { bindActionCreators } from 'redux'
import { CurrencyRate } from 'routes/CurrencyRate/components/CurrencyRate'
import { shallow } from 'enzyme'
import DayPicker from "react-day-picker";
import { Button } from 'react-mdl'
import { ValueTable } from 'routes/CurrencyRate/components/ValueTable/ValueTable'

describe('(Component) Counter', () => {
  let _props, _spies, _wrapper

  beforeEach(() => {
    _spies = {}
    _props = {
      date : new Date(),
      data: [{value: 100, code: 'usd'}],
      editFilter: {
        _get: (props)=> {
          return {
            ...props.editFilter,
            _actions: props
          }
        }
      },
      ...bindActionCreators({
      }, _spies.dispatch = sinon.spy())
    }
    _wrapper = shallow(<CurrencyRate {..._props} />)
  })

  it('Should render DayPicker', () => {
    expect(_wrapper.find(DayPicker)).to.have.length(1)
  })

  it('Should render Button.', () => {
    expect(_wrapper.find(Button)).to.have.length(1)
  })

  it('Should render ValueTable.', () => {
    expect(_wrapper.find(ValueTable)).to.have.length(1)
  })

  describe('A DayPicker button...', () => { // todo: Implement

    beforeEach(() => {
    })

    // it('Should dispatch a `fetch` action when clicked', () => {
    // })
  })

  describe('A ValueTable button...', () => { // todo: Implement

    beforeEach(() => {
    })

    // it('Should display fetched data', () => {
    // })
  })

  describe('A Настроить button...', () => { // todo: Implement
    let _button

    beforeEach(() => {
      _button = _wrapper.find(Button).filterWhere(a => a.text() === 'Настроить')
    })

    // it('Should dispatch a `display` action when clicked', () => {
    // })
  })

})
