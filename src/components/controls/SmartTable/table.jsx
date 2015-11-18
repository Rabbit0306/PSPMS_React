import React, { PropTypes as T } from 'react'
import cNames from 'classnames'
import 'less/table.less'
import TableHeader from './tableHeader'
import TableBody from './tableList'

const SmartTable = React.createClass({
  _myProps: {
    firstFresh: 0,
    tableData: {},
    headers: [],
    body: []
  },

  propTypes: {
    className: T.string,
    hideColumn: T.string,
    extendColumn: T.string,
    data: T.array,
    state: T.number,
    sortable: T.bool,
    editable: T.bool
  },
  getInitialState () {
    return {
      SortBy: 0,
      OrderBy: 1
    }
  },
  render () {
    console.log('this._myProps.firstFresh:' + this.props.state)
    console.log('this.props.state:' + this.props.state)
    if (this.props.sortable) {
      if (this._myProps.firstFresh === -1) {
        console.log('Sort Data..')
        this._myProps.bodyData = this._orderTableData(this._myProps.bodyData)
      } else if (this.props.state === 1) {
        console.log('Resolve Data..')
        this._myProps.tableData = this._modifyTableData()
        this._myProps.headerData = this._getHeaderData(this._myProps.tableData)
        this._myProps.bodyData = this._getBodyData(this._myProps.tableData)
        this._myProps.firstFresh = -1
      } else if (this.props.state === 0) {
        console.log('Init Data..')
        this._myProps.headerData = this._myProps.bodyData = []
      }
    } else {
      this._myProps.tableData = this._modifyTableData()
      this._myProps.headerData = this._getHeaderData(this._myProps.tableData)
      this._myProps.bodyData = this._getBodyData(this._myProps.tableData)
    }
    return (
        <table className='table'>
          <TableHeader data={this._myProps.headerData} onClick={this._clickToSort} sortable={this.props.sortable} />
          <TableBody data={this._myProps.bodyData} extendColumn={this.props.extendColumn} editable={this.props.editable} />
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
        tableHeader.push({ name: dataHeader, sort: 1 } )
      }
    })
  },

  _freshDataList (data, headers, tableData) {
    const tableRow = []
    headers.forEach(function (header) {
      if (data[header['name']] !== undefined) {
        tableRow.push(data[header['name']])
      } else {
        tableRow.push(null)
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
  _clickToSort (event, reactid, sortId) {
    this._myProps.headerData[sortId].sort *= -1
    this.setState({ SortBy: sortId, OrderBy: this._myProps.headerData[sortId].sort })
  },
  _orderTableData (dataList) {
    const self = this
    dataList.sort(function (a, b) {
      if (a[self.state.SortBy] > b[self.state.SortBy]) {
        return self.state.OrderBy
      } else if (a[self.state.SortBy] < b[self.state.SortBy]) {
        return -self.state.OrderBy
      } else {
        return 0
      }
    })
    return dataList
  }
})

export default SmartTable
