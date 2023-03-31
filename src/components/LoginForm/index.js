// Write your JS code here
import {Component} from 'react'
import './index.css'

class LoginForm extends Component {
  state = {
    userName: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onSubmitSuccess = () => {
    const {history} = this.props
    history.replace('/')
  }

  onSubmitFailure = msg => {
    this.setState({showSubmitError: true, errorMsg: msg})
  }

  onClickSubmit = async event => {
    event.preventDefault()
    const {userName, password} = this.state
    const userDetails = {userName, password}
    const url = 'https://apis.ccbp.in/login/'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess()
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  changePassword = e => {
    this.setState({password: e.target.value})
  }

  changeUserName = e => {
    this.setState({userName: e.target.value})
  }

  renderUserDetails = () => {
    const {userName} = this.state
    return (
      <>
        <label htmlFor="username">USERNAME</label>
        <input
          type="text"
          id="username"
          value={userName}
          placeholder="username"
          onChange={this.changeUserName}
        />
      </>
    )
  }

  renderPassword = () => {
    const {password} = this.state
    return (
      <>
        <label htmlFor="password">PASSWORD</label>
        <input
          type="password"
          value={password}
          id="password"
          placeholder="password"
          onChange={this.changePassword}
        />
      </>
    )
  }

  render() {
    const {showSubmitError, errorMsg} = this.state
    return (
      <div className="login-container">
        <img
          className="small-login-logo"
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
          alt="website logo"
        />
        <img
          className="login-image"
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
          alt="website login"
        />
        <form className="login-card" onClick={this.onClickSubmit}>
          <img
            className="login-logo"
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
            alt="website logo"
          />

          {this.renderUserDetails()}
          {this.renderPassword()}
          {showSubmitError && <p>{errorMsg}</p>}
          <button className="submit-button" type="submit">
            Login
          </button>
        </form>
      </div>
    )
  }
}
export default LoginForm
