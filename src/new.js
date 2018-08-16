/*import React, {
    Component
  } from 'react'
  import {
    Link
  } from 'react-router'
  import {
    HiddenOnlyAuth,
    VisibleOnlyAuth
  } from './util/wrappers.js'
  //import FundContract from '../build/contracts/Fund.json'
  
  
  
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

 class App extends Component{
     constructor(props) {
         super(props)
         this.state = {
            web3Provider: null,
    contracts: {}, 

    init: function() {
    
        return App.initWeb3();
      },

      initWeb3: function() {
        // Is there an injected web3 instance?
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider;
    } else {
      // If no injected web3 instance is detected, fall back to Ganache
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    }
    web3 = new Web3(App.web3Provider);
    
        return App.initContract();
      },

      initContract: function() {
        $.getJSON('Fund.json', function(data) {
          // Get the necessary contract artifact file and instantiate it with truffle-contract
          var FundArtifact = data;
          App.contracts.Fund = TruffleContract(FundArtifact);
        
          // Set the provider for our contract
          App.contracts.Fund.setProvider(App.web3Provider);
        
          // Use our contract to retrieve and mark the adopted pets
          return App.marklastDonated();
        });
        return App.bindEvents();
      },




         }
     
    
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
                                  <strong>5 ether</strong>  of 50 ether
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
                                        <option value="15">15 Eth</option>
                                        <option value="20">20 Eth</option>
                                        <option value="25">25 Eth</option>
                                      </select>
                                      <span className="input-group-btn">
                                        <button className="btn btn-default btn-fill btn-icon btn-sm" type="submit" value="Submit">
                                          {/* <i className="ti-angle-right"></i> 
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

  */