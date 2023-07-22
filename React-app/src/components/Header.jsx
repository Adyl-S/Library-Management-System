import React, { Component } from "react";

class Header extends Component {
  render() {
    return (
      <div>
        <header>
          <nav className="navbar navbar-expand-md navbar-dark bg-dark">
            <div>
              <a href="http://localhost:3000" className="navbar-brand">
                Library Management System
              </a>
            </div>
          </nav>
        </header>
      </div>
    );
  }
}

export default Header;
