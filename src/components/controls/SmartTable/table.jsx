import React, { PropTypes as T } from 'react'
import cNames from 'classnames'
import 'less/table.less'
import TableHeader from './tableHeader'
import TableBody from './tableList'

const SmartTable = React.createClass({
  propTypes: {
    className: T.string,
    hideColumn: T.string,
    extendColumn: T.string,
    data: T.array
  },
  getDefaultProps () {

  },
  componentDidMount () {

  },
  render () {
    const tableData = this._modifyTableData()
    const headerData = this._getHeaderData(tableData)
    const bodyData = this._getBodyData(tableData)
    return (
        <table className={this.props.className}>
          <TableHeader data={headerData} onClick={this._clickHeader} />
          <TableBody data={bodyData} extendColumn={this.props.extendColumn} />
        </table>
    )
  },

  _isHeaderExisted (searchHeader, tableHeader) {
    const hideColumns = this.props.hideColumn ? this.props.hideColumn.split(' ') : []
    for (const hideColumn of hideColumns) {
      if (searchHeader === hideColumn) {
        return true
      }
    }
    for (const header of tableHeader) {
      if (searchHeader === header['name']) {
        return true
      }
    }
    return false
  },

  _freshHeader (dataHeaders, tableHeader) {
    const self = this
    dataHeaders.forEach(function (dataHeader) {
      if (!self._isHeaderExisted(dataHeader, tableHeader)) {
        tableHeader.push({ name: dataHeader, sort: 0 } )
      }
    })
  },

  _freshDataList (data, headers, tableData) {
    const tableRow = []
    headers.forEach(function (header) {
      if (data[header['name']] !== undefined) {
        tableRow.push(data[header['name']])
      } else {
        tableRow.push({})
      }
    })
    tableData.push(tableRow)
  },

  _modifyTableData () {
    const orginData = this.props.data, self = this
    const tableData = { header: [], body: [] }
    if (orginData !== undefined) {
      orginData.forEach(function (data) {
        const currentHeaders = self._getHeaders(data)
        self._freshHeader(currentHeaders, tableData.header)
      })
      orginData.forEach(function (data) {
        self._freshDataList(data, tableData.header, tableData.body)
      })
      return tableData
    }
  },

  _getHeaders (data) {
    const headers = []
    for (const header in data) {
      if (data.hasOwnProperty(header)) {
        headers.push(header)
      }
    }
    return headers
  },

  _getHeaderData (data) {
    return data ? data['header'] : []
  },
  _getBodyData (data) {
    return data ? data['body'] : []
  },

  _clickHeader () {
    console.log(this)
  }
})

export default SmartTable
