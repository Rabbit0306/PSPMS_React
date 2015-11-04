import React, { PropTypes as T } from 'react'
import cNames from 'classnames'
import TableElementExtend from './tableElementExtend'
import 'less/table.less'

const tableList = React.createClass({
  propTypes: {
    data: T.array,
    extendColumn: T.string
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
    const body = [], self = this
    this.props.data.map(function (list, key) {
      const row = []
      list.map(function (element, key) {
        switch (typeof element) {
        case 'boolean': row.push(<td key={key}><input type='checkbox' checked={element ? 'checked' : null} onChange={self._checkedOnChange} /></td>)
          break
        case 'number': row.push(<td key={key}>{element}</td>)
          break
        case 'object':
          if (element === null) {
            row.push(<td key={key}>{element}</td>)
          } else {
            row.push(<td key={key}><TableElementExtend data={element} /></td>)
          }
          break
        case 'string':
          const value = new Date(element)
          if (value.toString() === 'Invalid Date') {
            row.push(<td key={key}>{element}</td>)
          } else {
            row.push(<td key={key}>{value.toLocaleDateString()}</td>)
          }
          break
        default:row.push(<td key={key}>{element}</td>)
        }
      })
      body.push(<tr key={key} className={key%2 === 0 ? 'table even' : 'table odd'}>{row}</tr>)
    })
    return body
  },
  _checkedOnChange () {

  }
})

export default tableList
