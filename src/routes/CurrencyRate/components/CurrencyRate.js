import React from 'react'
import DayPicker, { DateUtils } from "react-day-picker";
import CurrencySelectorModal from './CurrencySelector/CurrencySelector'
import ValueTable from './ValueTable/ValueTable'
import { Button, Header } from 'react-mdl'

import moment from 'moment'
import LocaleUtils from "react-day-picker/moment"
import "moment/locale/ru"

export const CurrencyRate = (props) => {console.log(props);return (
  <div>
    <div className="col-md-4 day-picket-container">
      {moment(props.date).isValid() &&
        <DayPicker
          localeUtils={ LocaleUtils } locale="ru"
          initialMonth={ props.date }
          selectedDays={ day => DateUtils.isSameDay(props.date, day) }
          onDayClick={ (e, day)=> props.updateLocation(day) }
        />
      }

    </div>
    <div className="col-md-8 data-table-container">
      <div className="col-md-8">
        <ValueTable {...props.data}/>
      </div>
      {!props.data.isFetching && !props.error &&
        <Button raised accent
                onClick={()=> {
                  props.editFilter.start(props)
                }}
                style={{float: 'left', margin: '0px 40px'}}
        >
          Настроить
        </Button>
      }
    </div>
    <CurrencySelectorModal {...props.editFilter._get(props)}></CurrencySelectorModal>
  </div>
)}

export default CurrencyRate
