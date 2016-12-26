import React from 'react'
import './CoreLayout.scss'
import '../../styles/core.scss'
import { Layout, Header, Content } from 'react-mdl'

export const CoreLayout = ({ children }) => (
  <div className='container text-center'>
    <Header title={<span><strong>Redux + React</strong></span>}>
    </Header>
    <div className='core-layout__viewport'>
      {children}
    </div>
  </div>
)

CoreLayout.propTypes = {
  children : React.PropTypes.element.isRequired
}

export default CoreLayout
