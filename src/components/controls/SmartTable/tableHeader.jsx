import React, { PropTypes as T } from 'react'
import cNames from 'classnames'
import 'less/table.less'

const tableHeader = React.createClass({
  propTypes: {
    data: T.array,
    onClick: T.func
  },
  getInitialState () {
    return {
      sortBy: 0
    }
  },
  getDefaultProps () {
  },
  componentDidMount () {
  },
  render () {
    const a = 1
    return (
        <thead ref='thead'>
          <tr>{this._modifyTableHeader()}</tr>
        </thead>
    )
  },

  _modifyTableHeader () {
    const headers = [], self = this
    this.props.data.map(function (header, key) {
      headers.push(<th key={key} onClick={self.props.onClick}>{header['name']}</th>)
    })
    return headers
  }
})

export default tableHeader
