import React from 'react'
import { browserHistory } from 'react-router'
import moment from 'moment'
import { Spinner } from 'react-mdl'

const redirect = (date)=> browserHistory.push('/currencyrate?day=' + moment(date).format("DD/MM/YYYY"))

class HomeView extends React.Component {

  render() {
    return (
      <div style={{margin: '100px'}}><Spinner /></div>
    )
  }

  componentDidMount() {
    setTimeout(()=> redirect(Date.now()), 800)
  }
}

export default HomeView
