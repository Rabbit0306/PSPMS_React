import React, { PropTypes as T } from 'react'
import cNames from 'classnames'

const tableList = React.createClass({
  propTypes: {
    data: T.array
  },
  getDefaultProps () {
  },
  componentDidMount () {
  },
  render () {
    return (
        <tbody>
          {this._modifyTableBody()}
        </tbody>
    )
  },

  _modifyTableBody () {
    const body = []
    this.props.data.forEach(function (list) {
      const row = []
      list.forEach(function (element) {
        row.push(<td key={Date().now}>{element}</td>)
      })
      body.push(<tr key={Date().now}>{row}</tr>)
    })
    return body
  }
})

export default tableList
