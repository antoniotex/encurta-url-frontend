import React, { Component } from 'react';
  import logo from '../../images/logo-enc.png'
  import './header.css'

  class Header extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <header>
        <div className="logo-wrapper">
          <img className="logo" src={logo} alt=""/>
        </div>
      </header>
    );
  }
}

export default Header;