import React, { PropTypes as T } from 'react'
import cNames from 'classnames'
import 'less/button.less'

const TableElementExtend = React.createClass({
  propTypes: {
    data: T.object,
    extendColumn: T.string
  },
  getDefaultProps () {
  },
  componentDidMount () {
    // console.log(this.props.data)
  },
  render () {
    let accountClass = 'btn btn-primary'
    if (this._EmptyObject(this.props.data)) {
      accountClass += ' disabled'
    }
    return (
        <div>
          <button className='btn btn-success'>Edit</button>
          <button className={accountClass}>Account</button>
          <button className='btn btn-error'>Remove</button>
        </div>
    )
  },
  _EmptyObject (object) {
    if (typeof object === 'object' && !(object instanceof Array)) {
      let hasProp = true
      for (const prop in object) {
        hasProp = false
        break
      }
      return hasProp
    }
  }
})

export default TableElementExtend
