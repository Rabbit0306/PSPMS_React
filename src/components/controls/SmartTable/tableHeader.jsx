import React, { PropTypes as T } from 'react'
import cNames from 'classnames'
import 'less/table.less'

const tableHeader = React.createClass({
  propTypes: {
    data: T.array,
    sortable: T.bool,
    onClick: T.func
  },
  getDefaultProps () {
  },
  componentDidMount () {
  },
  render () {
    return (
        <thead className='table head'>
          <tr className={this.props.sortable ? 'table head sortEnable' : 'table head sortDisable'}>{this._modifyTableHeader()}</tr>
        </thead>
    )
  },

  _modifyTableHeader () {
    const headers = [], self = this
    this.props.data.map(function (header, key) {
      headers.push(<th className='headItem' key={key} onClick={self._clickHeader(self.props.onClick, key, self.props.data)}>{header['name']}</th>)
    })
    return headers
  },
  _clickHeader (func, sortId) {
    return (event, reactid) => {
      func && func(event, reactid, sortId)
    }
  }
})

export default tableHeader
