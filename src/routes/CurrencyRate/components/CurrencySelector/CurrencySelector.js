import React from 'react'
import Modal from 'react-modal'
import ModalContent from './ModalContent'
import { Button, Header } from 'react-mdl'

const style = {
  content: {
    width: '470px',
    borderRadius: '0px',
    top: '0px',
    // bottom: 'auto',
    left: 'auto',
    padding: '20px 0px'
  }
}

export const CurrencySelectorModal = (props) => (
  <Modal
    isOpen={props.isStarted}
    style={style}
    contentLabel=""
  >
    <div className="modal-header-fixed">
      <Header title={<span>Выберите</span>}></Header>
    </div>
    <div className="modal-content-container"><ModalContent {...props}/></div>

    <div className="modal-button-container">
      <Button className='btn btn-default pull-right'
              onClick={()=> {
                props.cancel(props)
              }}
      >
        Отмена
      </Button>
      <Button className='btn btn-default pull-right'
              onClick={()=> {
                props.complete(props)
              }}
              disabled={props.currencyFilter.length == 0}
      >
        Применить
      </Button>
    </div>
  </Modal>
)

export default CurrencySelectorModal
