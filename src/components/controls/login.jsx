import React, { PropTypes as T } from 'react'
import cNames from 'classnames'
import request from 'lgutil/common/ajax'

const LoginTest = React.createClass({
  propTypes: {
  },
  getDefaultProps () {
  },
  componentDidMount () {
    const url = 'http://10.10.73.208:1339/user/login'
    const headers = {
      'Content-Type': 'application/json'
    }
    const body = {
      'uid': 'admin',
      'pwd': '123456'
    }
    request.post(url, JSON.stringify(body), {
      headers
    })
  },
  render () {
    return (
      <div>
        <lable>用户名</lable>
        <input id='uid'></input>
        <lable>密码</lable>
        <input id='pwd'></input>
        <button onClick={this.login(onClick)}>递交</button>
      </div>
    )
  },
})

export default LoginTest
