import React, { Component } from 'react'

class Dashboard extends Component {
  constructor(props, { authData }) {
    super(props)
    authData = this.props
  }

  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            {/* <h1>UPort Login Successful</h1> */}
            <p><strong>Hello,   {this.props.authData.name}!</strong> </p>
          </div>
        </div>
      </main>
    )
  }
}

export default Dashboard
