import React from 'react';
import logo from '../../assets/logo.png'
import cancel from '../../assets/cancel.jpeg'
import { Link } from 'react-router-dom';
import stateCityObj from './cityState.js';
import './AddressBook.css'
import AddressBookServices from '../../services/AddressBookServices';

const service = new AddressBookServices();
export default class AddressBook extends React.Component{
  constructor() {
    super()
    this.state={
      firstName: '',
      lastName: '',
      phoneNumber: '',
      address: '',
      city: '',
      state: '',
      email: '',
      zipCode: ''
    }
  }

  handleChange = (event) => {
    this.setState({...this.state, [event.target.name]: event.target.value})
  }


  save = (event) => {
    event.preventDefault();

    let object = {
      "firstName": this.state.firstName,
      "lastName": this.state.lastName,
      "address": this.state.address,
      "city": this.state.city,
      "state":this.state.state,
      "emailId": this.state.email,
      "phoneNumber": this.state.phoneNumber,
      "zipCode": this.state.zipCode
    }

    console.log(object);

    service.addressRegistration(object).then(data => {
      console.log(data);
      this.props.history.push('/');
    }).catch(err => {
      console.log(err);
    })
  }

  render () {
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
        <div className="form-content">
          <form className="form" action="#" onsubmit>
            <div className="form-head" >PERSON ADDRESS FORM
              <Link to="/" className="add-button">
                <img src={cancel} alt="" /></Link>
            </div>
            <div className="row-content">
              <div className="row-50">
                <label className="label text" htmlFor="firstName">First Name</label>
                <input className="input" type="text" id="firstName" name="firstName" value={this.state.firstName}  onChange={this.handleChange}  />
                <error-output className="text-error" for="text"></error-output>
              </div>
              <div className="row-50">
                <label className="label text" htmlFor="lastName">Last Name</label>
                <input className="input" type="text" id="lastName" name="lastName" value={this.state.lastName} onChange={this.handleChange}  />
                <error-output className="text-error" for="text"></error-output>
              </div>
            </div>
            <div class="row-content">
              <div className="row-50">
                <label className="label text" htmlFor="phoneNumber">Phone Number</label>
                <input className="input" type="text" id="phoneNumber" name="phoneNumber" value={this.state.phoneNumber}  onChange={this.handleChange}  />
                <error-output className="phone-error" for="phone"></error-output>
              </div>
              <div className="row-50">
              <label className="label text" htmlFor="email">Email Id</label>
                <input className="input" type="text" id="email" name="email" value={this.state.email}  onChange={this.handleChange}  />
                <error-output className="email-error" for="email"></error-output>
              </div>
            </div>	
            <div className="row-content">
              <label className="label text" htmlFor="address">Address</label>
              <textarea id="notes" className="input" name="address" style={{height: '100px'}} value={this.state.address}  onChange={this.handleChange} ></textarea>
            </div>
            <div className="row-content">
              <div className="row-33">
                <label className="label drop" htmlFor="state">State</label>
                <select id="state" name="state">
                  <option value={this.state.state} selected = "selected" style={{width: '100%' }} onChange={this.handleChange} >Select State</option>
                </select>
              </div>
              <div className="row-33">
                <label className="label drop" htmlFor="city">City</label>
                <select id="city" name="city">
                  <option value={this.state.city} selected="selected" style={{width: '100%' }} onChange={this.handleChange} >Select City</option>
                </select>
              </div>
              <div className="row-33">
                <label className="label text" htmlFor="zipCode">Zip Code</label>
                <input className="input" type="text" id="zipCode" name="zipCode" value={this.state.zipCode} onChange={this.handleChange}  />
              </div>
            </div>
            <div className="row-content">
              <div className="button-content">
                <button type="submit" className="button submitButton" id="submitButton" onClick={this.save}>Add</button>
                <button type="reset" className="resetButton button">Reset</button>
              </div>
            </div>
          </form>
        </div>
      </div>  
    )
  }
}