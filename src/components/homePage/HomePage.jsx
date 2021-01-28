import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import addIcon from '../../assets/add-24px.svg'
import './HomePage.css'
import Display from "./Display";
import AddressBookServices from '../../services/AddressBookServices';

const service = new AddressBookServices();

export default class HomePage extends React.Component {
  
  constructor() {
    super();
    this.state = {
      addressArray: [],
      callUpdate: ''
    }
  }
  
  componentDidMount() {
    this.getAddressData();
  }

  update = () => {
    this.getAddressData();
  }

  getAddressData = () => {
    service.getAllAddressess().then(data => {
      this.setState({ addressArray: data.data.data});
      console.log(this.state.addressArray)
    }).catch(err => {
      console.log(err);
    })
  }

  render() {
    return(
    <div className="Address-main">
      <header className="header-content header">
        <div className="logo-content">
          <img src={logo} alt="" />
            <div>
              <span className="address-text">ADDRESS</span><br />
              <span className="address-text book">BOOK</span>
            </div>
        </div>
      </header>
      <div className="main-content">
      <div className="header-content">
        <div className="person-detail-text">
          Person Details <div className="person-count">{this.state.addressArray.length}</div>
        </div>
        <Link to="AddressForm" className="add-button">
          <img src={addIcon} alt="" />Add Person</Link>
        </div>
        <div className="table-main">
          <table id="table-display" className="table">
            <tbody>
              <Display addressArray={this.state.addressArray} callUpdate={this.update}/>
            </tbody>
          </table>
        </div> 
      </div>
    </div>
    )
  }
}