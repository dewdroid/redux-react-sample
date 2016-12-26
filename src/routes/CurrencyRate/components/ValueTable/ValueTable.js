import React from 'react'
import { DataTable, TableHeader, Spinner } from 'react-mdl'

export const ValueTable = (props) => {console.log(props);return (
  <div>
    {props.error &&
      <div>Что-то не так</div>
    }
    {props.data && props.data.length > 0 &&
      <DataTable
        shadow={0}
        rows={props.data}
      >
        <TableHeader {...{name: "code"}}>Валюта</TableHeader>
        <TableHeader numeric {...{name: "value"}}>Курс</TableHeader>
      </DataTable>
    }
    {props.isFetching &&
      <Spinner />
    }
  </div>

)}

export default ValueTable
