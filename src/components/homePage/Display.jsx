import { Link } from "react-router-dom"
import React from 'react';
import './HomePage.css';
import deleteIcon from '../../assets/delete-black-18dp.svg';
import editIcon from '../../assets/create-black-18dp.svg';
import AddressBookServices from "../../services/AddressBookServices";

const service =  new AddressBookServices();

export default class Display extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      addressArray: [],
      message: 'Once data deleted, cannnot be retrieved back.\n Do you want to Continue',
      update: ''
    }
  }

  updateAddress = (id) => {
    console.log(id)
    localStorage.setItem('idA', id);
  }

  deleteAddress = (id) => {
    service.deleteAddress(id).then(() => {
      this.setState({update: "updates"});
      this.props.callUpdate();
    }).catch(err => {
      console.log(err);
    })
  }

  render() {
    return(
      <table id="table-diplay" className="table">
        <tbody>
          <tr key={-1}>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone Number</th>
            <th>Address</th>
            <th>City</th>
            <th>State</th>
            <th>Email Id</th>
            <th>Zip Code</th>
            <th>Actions</th>
          </tr>
          {
            this.props.addressArray && this.props.addressArray.map((element) => (
              <tr key={element.addressId}>
                <td>{element.firstName}</td>
                <td>{element.lastName}</td>
                <td>{element.phoneNumber}</td>
                <td>{element.address}</td>
                <td>{element.city}</td>
                <td>{element.state}</td>
                <td>{element.emailId}</td>
                <td>{element.zipCode}</td>
                { <td><img onClick={() => {if(window.confirm(this.state.message)){this.deleteAddress(element.addressId)}}} src={deleteIcon} alt="delete" />
                    <Link to="Update">
                      <img onClick={() => this.updateAddress(element.addressId)} src={editIcon} alt="edit" />
                    </Link>
                </td> }
              </tr>
            ))
          }
        </tbody>
      </table>
    )
  }
}