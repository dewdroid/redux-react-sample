import $ from 'jquery'
import xml2js from 'xml2js'
import moment from 'moment'

const property = {
  value: (obj) => obj.Value[0],
  code: (obj) => obj.CharCode[0],
  name: (obj) => obj.Name[0]
}

export const getCurrencyRate = (date)=> {
  return new Promise((resolve, reject) => {

    const onsuccess = (data, s, jqXHR)=> {
      console.log(data)
      xml2js.parseString(jqXHR.responseText, (e, result) => {
        if (e) {
          console.error(e)
          reject(e)
        } else if (!result.ValCurs.Valute) {
          console.error(result)
          reject(result.ValCurs)
        } else {
          resolve(result.ValCurs.Valute.map( v => {
            return Object.keys(property).reduce((target, key) => {
              target[key] = property[key] (v)
              return target
            }, {})
          }))
        }
      })
    }

    const onerror = (jqXHR, status, error)=> {
      console.error(status + ': ' + error.message)
      reject('Ошибка сервера')
    }

    $.ajax({
      method: 'GET',
      url: "/XML_daily.asp?date_req=" + moment(date).format("DD/MM/YYYY"),
      dataType: 'xml ',
      success: onsuccess,
      error: onerror
    })
  })
}

export default {
  getCurrencyRate: getCurrencyRate
}
