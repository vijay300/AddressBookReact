import React from 'react';
import logo from '../../assets/logo.png'
import cancel from '../../assets/cancel.jpeg'
import { Link } from 'react-router-dom';
import './AddressBook.css'
import AddressBookServices from '../../services/AddressBookServices';
import cityState from '../../assets/db.json'

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
      zipCode: '',
			states : [],
			cities : [],
			selectedCity : '--Choose City--',
			selectedState : '--Choose State--'
    }
    this.changeState = this.changeState.bind(this);
    this.changeCity = this.changeCity.bind(this);
  }

  componentDidMount() {
		this.setState({
			states : [
				{ name: 'Andhra Pradesh', cities: ['Vizag', 'Vijayawada', 'Kakinada'] },
				{ name: 'Arunachal Pradesh', cities: ["Naharlagun", "Pasighat"]},
				{ name: 'Goa', cities: ["Mapusa", "Margao", "Marmagao", "Panaji"] },
				{ name: 'Harayana', cities: ['Gurgaon', 'Rohtak', 'Yamunanagar'] },
        { name: 'Karnataka', cities: ['Bangalore', "Ballari", "Chikkamagaluru", "Davanagere", "Gokak"] },
        { name: 'Kerala', cities: ["Kochi", "Kodungallur", "Kollam", "Kottayam", "Kozhikode"] },
        { name: 'Madhya Pradesh', cities: ["Bhopal", "Ganjbasoda", "Gwalior", "Indore", "Itarsi"] },
        { name: 'Maharashtra', cities: ['Mumbai', 'Pune', 'Nagpur', 'Nashik'] },
        { name: 'Tamil Nadu', cities: ['Chennai', 'Salem', 'Tirichy', 'Coimbatore'] },
        { name: 'Telangana', cities: ['Hyderabad', 'Warangal', 'Karim Nagar', 'Nalgonda'] },
        { name: 'Uttar Pradesh', cities: ['Kanpur', 'Lucknow', 'Agra', 'Noida'] },
			]
		});
  }
  
  changeCity(event) {
    this.setState({selectedCity: event.target.value})
  }
  
	changeState(event) {
		this.setState({selectedState: event.target.value});
		this.setState({cities : this.state.states.find(cntry => cntry.name === event.target.value).cities});
	}

  handleChange = (event) => {
    this.setState({...this.state, [event.target.name]: event.target.value})
  }

  reset = () => {
    this.setState({firstName: ''})
    this.setState({lastName: ''})
    this.setState({phoneNumber: ''})
    this.setState({email: ''})
    this.setState({address: ''})
    this.setState({city: ''})
    this.setState({state: ''})
    this.setState({zipCode: ''})
  }

  save = (event) => {
    event.preventDefault();

    let object = {
      "firstName": this.state.firstName,
      "lastName": this.state.lastName,
      "address": this.state.address,
      "city": this.state.selectedCity,
      "state":this.state.selectedState,
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
                <select placeholder="State" value={this.state.selectedState} onChange={this.changeState}>
                  <option>--Choose State--</option>
                  {this.state.states.map((e, key) => {
                    return <option key={key} value={e.name} >{e.name}</option>;
                  })}
                </select>
              </div>
              <div className="row-33">
                <label className="label drop" htmlFor="city">City</label>
                <select placeholder="City" value={this.state.selectedCity} onChange={this.changeCity}>
                  <option>--Choose City--</option>
                  {this.state.cities.map((e, key) => {
                    return <option key={key} value={e}>{e}</option>;
                  })}
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
                <button type="reset" className="resetButton button" onClick={this.reset}>Reset</button>
              </div>
            </div>
          </form>
        </div>
      </div>  
    )
  }
}