import React from 'react'
import { IndexLink, Link } from 'react-router'

class HomeView extends React.Component {

  render() {
    return (
      <div style={{margin: '100px'}}>Такой страницы не существует
        <br/><br/>
        <IndexLink to='/' activeClassName='route--active'>
          На стартовую
        </IndexLink>
      </div>
    )
  }

  componentDidMount() {
  }
}

export default HomeView
