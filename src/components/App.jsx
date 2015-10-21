import React, { PropTypes as T } from 'react'
import SmartButton from './controls/button'
import SmartTable from './controls/SmartTable/table'
import { json as request } from 'lgutil/common/ajax'
// import LoginTest from './controls/login'
import 'less/site.less'

const Demo = React.createClass({
  propTypes: {
    data: T.object
  },
  componentDidMount () {
    const url = 'http://10.10.73.208:1339/user/login'

    const body = {
      'uid': 'admin',
      'pwd': '123456'
    }

    const pending = request.post(url, body)

    pending.then((res) => {
      const url = 'http://10.10.73.208:1339/rest/resource?conditions.resourceId.$gt=0&token='
      return request.get(url + res.body.session.token)
    }).then((res) => {
      this.props.data = res.body
      console.log(this.props.data)
      this.setState({ tableState: 1 })
      // console.log(SmartTable.setState)
    })
  },

  getInitialState () {
    return {
      buttonState: 1,
      tableState: 0
    }
  },

  render () {
    return (
      <div className='container'>
        <h2>Demo page</h2>
        <div className='section'>
          <SmartButton className='btn-ghost btn-primary' onClick={this._handleClick}
            state={this.state.buttonState}>{this._getButtonContent()}</SmartButton>
          <SmartButton className='btn-ghost btn-success'>按钮1</SmartButton>
          <SmartButton className='btn-ghost btn-warning'>按钮2</SmartButton>
          <SmartButton className='btn-ghost btn-error' onClick={this._handleAnotherClick}>按钮3</SmartButton>
        </div>
        <div className='section'>
          <SmartButton className='btn btn-default'>按钮00</SmartButton>
          <SmartButton className='btn btn-primary'>按钮0</SmartButton>
          <SmartButton className='btn btn-success'>按钮1</SmartButton>
          <SmartButton className='btn btn-warning'>按钮2</SmartButton>
          <SmartButton className='btn btn-error'>按钮3</SmartButton>
          {/* disabled */}
          <SmartButton className='btn btn-error' state={-1}>按钮4</SmartButton>
        </div>
        <SmartTable className='table' data={this.props.data} />
      </div>
    )
  },
  _handleClick () {
    this.setState({ buttonState: 0 })
    // delay 3s
    setTimeout(() => {
      this.setState({ buttonState: 1 })
    }, 3000)
  },
  _handleAnotherClick () {
    this.setState({ buttonState: -this.state.buttonState })
  },
  _getButtonContent () {
    if (this.state.buttonState === 0) {
      return (
        <span>测试按钮<i className='fa fa-spinner rotate infinite'></i></span>
      )
    }
    else return <span>测试按钮</span>
  }
})

export default Demo
