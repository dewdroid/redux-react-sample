import React from 'react'
import { Checkbox } from 'react-mdl'

export const ModalContent = (props) => (
    <div>
      {props.currencyList.map((v, index)=> {
          return (
              <Checkbox label={v.displayName} key={v.charCode}
                        value={v.charCode}
                        checked={
                          props.currencyFilter.indexOf(v.charCode) !=-1}
                        onChange={
                          () => props.toggleCurrencyFilter(v.charCode)(props)
                        }
                        className="checkbox-bounded"
              />
          )
        }
      )}
    </div>
)

export default ModalContent
