import React, { PropTypes as T } from 'react'
import cNames from 'classnames'
import TableElementExtend from './tableElementExtend'
import 'less/table.less'

const tableList = React.createClass({
  propTypes: {
    data: T.array,
    editable: T.bool,
    extendColumn: T.string
  },
  getInitialState () {
    return {
      newData: []
    }
  },
  render () {
    return (
        <tbody className='table body'>
          {this._modifyTableBody()}
        </tbody>
    )
  },
  componentWillReceiveProps (nextProps) {
    this.setState({newData: nextProps.data});
  },
  _modifyTableBody () {
    const body = [], self = this
    // console.log(this.props.data)
    this.state.newData.map(function (line, lineKey) {
      const row = []
      line.map(function (element, elementKey) {
        switch (typeof element) {
        case 'boolean': row.push(<td className='table body bodyLine bodyElement' key={elementKey}><input type='checkbox' checked={element ? 'checked' : null} onChange={self._checkedOnChange} /></td>)
          break
        case 'number': row.push(<td className='table body bodyLine bodyElement' key={elementKey}>{element}</td>)
          break
        case 'object':
          if (element === null) {
            row.push(<td className='table body bodyLine bodyElement' key={elementKey}>{element}</td>)
          } else {
            row.push(<td className='table body bodyLine bodyElement' key={elementKey}><TableElementExtend data={element} /></td>)
          }
          break
        case 'string':
          const value = new Date(element)
          if (self.props.editable) {
            if ( (/^[^\.\-\/:TZ]+$/).test(element) || value.toString() == 'Invalid Date' || !(/\d{1}\/\d{1}\/\d{1}/).test(element) ) {
              row.push(<td className='table body bodyLine bodyElement' key={elementKey}><input value={element} onChange={self._inputOnChange} /></td>)
            } else {
              row.push(<td className='table body bodyLine bodyElement' key={elementKey}><input value={value.toLocaleDateString()} onChange={self._inputOnChange} /></td>)
            }
          } else {
            if ( (/^[^\.\-\/:TZ]+$/).test(element) || value.toString() == 'Invalid Date' || !(/\d{1}\/\d{1}\/\d{1}/).test(element) ) {
              row.push(<td className='table body bodyLine bodyElement' key={elementKey}>{element}</td>)
            } else {
              row.push(<td className='table body bodyLine bodyElement' key={elementKey}>{value.toLocaleDateString()}</td>)
            }
          }
          break
        default:row.push(<td key={elementKey}>{element}</td>)
        }
      })
      body.push(<tr key={lineKey} className={ 'table body bodyLine' + lineKey%2 === 0 ? ' even' : ' odd'}>{row}</tr>)
    })
    return body
  },
  _checkedOnChange (event) {
    console.log(event.target)
  },
  _inputOnChange (event) {
    const index = event.dispatchMarker.split(/\.\$/g)
    const data = this.state.newData
    if (index[2] !== undefined) {
      index[2] = index[2].split('.')[0]
      data[index[1]][index[2]] = event.target.value
    }
    this.setState({newData: data})
  }
})

export default tableList
