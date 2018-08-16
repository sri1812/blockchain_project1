import React, {
  Component
} from 'react'
import {
  Link
} from 'react-router'
import {
  HiddenOnlyAuth,
  VisibleOnlyAuth
} from './util/wrappers.js'
import FundContract from '../build/contracts/Fund.json'
import getWeb3 from './utils/getWeb3'

// UI Components
import LoginButtonContainer from './user/ui/loginbutton/LoginButtonContainer'
import LogoutButtonContainer from './user/ui/logoutbutton/LogoutButtonContainer'

// import moment from 'moment';
import Countdown from './user/ui/countdown/Countdown.js';

// Styles
import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './css/bootstrap.min.css'
import './css/datetimepicker.css'
import './css/themify-icons.css'
import './css/dashboard.css'
import './css/styles.css'
import './App.css'

class App extends Component {

   // Declaring this for later so we can chain functions on fund contract
   fundInstance;
   fromAccount;

  constructor(props) {
    super(props)

    this.state = {
      web3: null,
      ethAmount: 5,
      curBal: 5,
      contract: null,
      account: null    
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
      .then(results => {
        this.setState({
          web3: results.web3
        })

        // Instantiate contract once web3 provided.
        this.instantiateContract()
      })
      .catch(() => {
        console.log('Error finding web3.')
      })
  }

  instantiateContract() {
   
    const contract = require('truffle-contract')
    const fund = contract(FundContract)
    fund.setProvider(this.state.web3.currentProvider)
    
    // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {
      fund.deployed().then((instance) => {
        this.fundInstance = instance;
        this.fromAccount = accounts[0];
        console.log("from account1: " + accounts[0]);
        console.log("from account2: " + accounts[1]);
        console.log("from account3: " + accounts[2]);
        console.log("Here's the instance");
        console.log(instance);
      })
    })
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log("handle submit invoked");
    console.warn("handleSubmit  :: ", this.state.ethAmount);


    //const contract = this.setState.contract
    //const account = this.setState.account
    console.log("fundInstance = " + this.fundInstance);
    console.log("account = " + this.fromAccount);
    
    if (!this.fundInstance) {
      return;
    }

   
    this.fundInstance.payOut.sendTransaction( {
      from: this.fromAccount,
      value:(this.state.ethAmount * 1000000000000000000),
      gas: 210000
    })
    .then(result => {
        alert(result);
        this.state.curBal += parseInt(this.state.ethAmount);
        console.log(this.state.curBal);
         document.getElementById("curBalId").textContent = this.state.curBal;
    })
        
      
  }

  render() {


  console.warn(this.props);

  // {this.props.authData.name}
    const OnlyAuthLinks = VisibleOnlyAuth(() =>
        <LogoutButtonContainer />
    )

    const OnlyGuestLinks = HiddenOnlyAuth(() =>
      <LoginButtonContainer />
    )

    const noOfMonths = 4;
    const currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() + noOfMonths);
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const date = currentDate.getDate();

    return (

      <div className="App">
        <div className="wrapper">
          <div className="main-panel background">
            <nav className="navbar navbar-default">
              <div className="container-fluid">
                <div className="navbar-header">
                  <button type="button" className="navbar-toggle">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar bar1"></span>
                    <span className="icon-bar bar2"></span>
                    <span className="icon-bar bar3"></span>
                  </button>
                  <Link to="/" className="navbar-brand ng-binding"> Sri Dapp </Link>
                </div>
                <div className="collapse navbar-collapse">
                  <ul className="nav navbar-nav navbar-right">
                    <OnlyGuestLinks />
                    <OnlyAuthLinks />
                  </ul>
                </div>
              </div>
            </nav>

            <div className="content layer">
              <div className="container-fluid">

              {this.props.children}

                <div className="row">
                  <div className="col-md-8 col-md-offset-2">
                    <div className="card">
                      <div className="card-content">
                        <div className="row">
                          <div className="col-xs-7">
                            <div className="numbers pull-left">
                               We appreciate your beautiful gesture!!!
                            </div>
                          </div>
                          <div className="col-xs-5">
                            <div className="pull-right">
                              <span className="label label-danger">
                                Cause: Education for girls in El Paso
												      </span>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <h3 className="text-center"> TIME REMAINING</h3>

                          <Countdown date={`${year}-${month}-${date}T00:00:00`} />

                          <hr />

                          <h3 className="card-title text-center">Target Amount is <strong>50 Ether</strong></h3>
                          <div className="amount text-center">
                            <strong><span id="curBalId" >{this.state.curBal}</span> ether</strong>  of 50 ether
                          </div>

                          <br />
                          <br />

                          <form onSubmit={this.handleSubmit}>
                            <div className="col-md-4 col-md-offset-4">
                              <h5 className="card-title">Ether Amount</h5>
                              <div className="input-group">
                                <select name="ethAmount" className="form-control" value={this.state.ethAmount} onChange={this.handleChange}>
                                  <option value="">- Select -</option>
                                  <option value="5">5 Eth</option>
                                  <option value="10">10 Eth</option>
                                  <option value="12">12 Eth</option>
                                  <option value="15">15 Eth</option>
                                  <option value="20">20 Eth</option>
                                  <option value="25">25 Eth</option>
                                </select>
                                <span className="input-group-btn">
                                  <button className="btn btn-default btn-fill btn-icon btn-sm" type="submit" value="Submit">
                                    {/* <i className="ti-angle-right"></i> */}
                                    Donate
                                  </button>
                                </span>
                              </div>
                            </div>
                          </form>

                          <br />
                          <br />

                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            <footer className="footer">
              <div className="container-fluid">
                <nav className="pull-left">
                  <ul>
                    <li>
                      <a href="#"> Sri dapp </a>
                    </li>
                  </ul>
                </nav>
                <div className="copyright pull-right">
                  ©
                          <script>
                    document.write(new Date().getFullYear())
                          </script>2018
                </div>
              </div>
            </footer>
          </div>
        </div>




      </div>
    );
  }
}


export default App




