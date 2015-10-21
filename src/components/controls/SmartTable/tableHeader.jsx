import React, { PropTypes as T } from 'react'
import cNames from 'classnames'

const tableHeader = React.createClass({
  propTypes: {
    data: T.array
  },
  getDefaultProps () {
  },
  componentDidMount () {
  },
  render () {
    return (
        <thead>
          <tr>{this._modifyTableHeader()}</tr>
        </thead>
    )
  },

  _modifyTableHeader () {
    const headers = []
    this.props.data.forEach(function (header) {
      headers.push(<th>{header}</th>)
    })
    return headers
  }
})

export default tableHeader
