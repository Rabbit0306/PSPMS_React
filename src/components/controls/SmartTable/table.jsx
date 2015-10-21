import React, { PropTypes as T } from 'react'
import cNames from 'classnames'
import TableHeader from './tableHeader'
import TableBody from './tableList'

const SmartTable = React.createClass({
  propTypes: {
    className: T.string,
    tableData: T.object,
    data: T.array
  },
  getDefaultProps () {

  },
  componentDidMount () {

  },
  render () {
    this._modifyTableData()
    const headerData = this._getHeaderData()
    const bodyData = this._getBodyData()
    return (
        <table>
          <TableHeader data={headerData} />
          <TableBody data={bodyData} />
        </table>
    )
  },

  _freshHeaderAndBody (line) {
    const tempLine = []
    for (const headerName in line) {
      let headerNeedPush = true
      if (line.hasOwnProperty(headerName)) {
        if (this.props.tableData['header'].length !== 0) {
          for (const header of this.props.tableData['header']) {
            if (headerName === header) {
              headerNeedPush = false
              break
            }
          }
          if (headerNeedPush === true) {
            this.props.tableData['header'].push(headerName)
          }
        } else {
          this.props.tableData['header'].push(headerName)
        }
        tempLine.push(line[headerName])
      }
    }
    this.props.tableData['body'].push(tempLine)
  },

  _modifyTableData () {
    const orginData = this.props.data, self = this
    this.props.tableData = { header: [], body: [] }
    if (orginData !== undefined) {
      orginData.forEach(function (line) {
        self._freshHeaderAndBody(line)
      })
    }
  },

  _getHeaderData () {
    return this.props.tableData['header']
  },
  _getBodyData () {
    return this.props.tableData['body']
  }
})

export default SmartTable
