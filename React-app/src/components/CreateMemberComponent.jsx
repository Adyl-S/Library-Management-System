import React, { Component } from "react";
import MemberService from "../services/MemberService";

class CreateMemberComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      member_id: "",
      name: "",
      address: "",
      type: "",
      formErrors: { member_id: "", name: "", address: "", type: "" },
      formValid: false,
      error: "",
    };
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let member_idValid = this.state.member_idValid;
    let nameValid = this.state.nameValid;
    let addressValid = this.state.addressValid;
    let typeValid = this.state.typeValid;

    switch (fieldName) {
      case "member_id":
        member_idValid = value.length >= 1;
        fieldValidationErrors.member_id = member_idValid
          ? ""
          : "Member ID is required";
        break;
      case "name":
        nameValid = value.length >= 1;
        fieldValidationErrors.name = nameValid ? "" : "Name is required";
        break;
      case "address":
        addressValid = value.length >= 1;
        fieldValidationErrors.address = addressValid
          ? ""
          : "Address is required";
        break;
      case "type":
        typeValid = value.length >= 1;
        fieldValidationErrors.type = typeValid ? "" : "Type is required";
        break;
      default:
        break;
    }
    this.setState(
      {
        formErrors: fieldValidationErrors,
        member_idValid: member_idValid,
        nameValid: nameValid,
        addressValid: addressValid,
        typeValid: typeValid,
      },
      this.validateForm
    );
  }

  validateForm() {
    this.setState({
      formValid:
        this.state.member_idValid &&
        this.state.nameValid &&
        this.state.addressValid &&
        this.state.typeValid,
    });
  }

  saveMember = (e) => {
    e.preventDefault();
    let member = {
      member_id: this.state.member_id,
      name: this.state.name,
      address: this.state.address,
      type: this.state.type,
    };
    console.log("member => " + JSON.stringify(member));
    MemberService.createMember(member)
      .then((res) => {
        console.log("Data:", res.data);
        if (res.data === "Record Created") {
          this.props.history.push("/members");
        } else {
          console.log(res.data);
          this.setState({ error: res.data });
          this.setState({
            member_id: "",
            name: "",
            address: "",
            type: "",
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  changeMemberIdHandler = (event) => {
    this.setState({ member_id: event.target.value }, () => {
      this.validateField("member_id", this.state.member_id);
    });
  };
  changeNameHandler = (event) => {
    this.setState({ name: event.target.value }, () => {
      this.validateField("name", this.state.name);
    });
  };
  changeAddressHandler = (event) => {
    this.setState({ address: event.target.value }, () => {
      this.validateField("address", this.state.address);
    });
  };
  changeTypeHandler = (event) => {
    this.setState({ type: event.target.value }, () => {
      this.validateField("type", this.state.type);
    });
  };
  render() {
    return (
      <div>
        <div className="container">
          <div style={{ marginTop: "30px" }} className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3">
              <h3 style={{ marginTop: "10px" }} className="text-center">
                Add Member
              </h3>
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <label> Member ID: </label>
                    <input
                      placeholder="Member ID"
                      name="member_id"
                      className={`form-control ${
                        this.state.formErrors.member_id ? "is-invalid" : ""
                      }`}
                      onChange={this.changeMemberIdHandler}
                      value={this.state.member_id}
                    ></input>
                    <div className="invalid-feedback">
                      {this.state.formErrors.member_id}
                    </div>
                  </div>
                  <div className="form-group">
                    <label> Name: </label>
                    <input
                      placeholder="Name"
                      name="name"
                      className={`form-control ${
                        this.state.formErrors.name ? "is-invalid" : ""
                      }`}
                      onChange={this.changeNameHandler}
                      value={this.state.name}
                    ></input>
                    <div className="invalid-feedback">
                      {this.state.formErrors.name}
                    </div>
                  </div>
                  <div className="form-group">
                    <label> Address: </label>
                    <input
                      placeholder="Address"
                      name="address"
                      className={`form-control ${
                        this.state.formErrors.address ? "is-invalid" : ""
                      }`}
                      onChange={this.changeAddressHandler}
                      value={this.state.address}
                    ></input>
                    <div className="invalid-feedback">
                      {this.state.formErrors.address}
                    </div>
                  </div>
                  <div className="form-group">
                    <label> Type: </label>
                    <select
                      aria-label="Default select example"
                      name="type"
                      className={`form-select ${
                        this.state.formErrors.type ? "is-invalid" : ""
                      }`}
                      value={this.state.type}
                      onChange={this.changeTypeHandler}
                    >
                      <option selected>Select Member Type</option>
                      <option value="Student">Student</option>
                      <option value="Staff">Staff</option>
                    </select>
                    <div className="invalid-feedback">
                      {this.state.formErrors.type}
                    </div>
                  </div>
                  {this.state.error && (
                    <div className="alert alert-danger" role="alert">
                      {this.state.error}
                    </div>
                  )}
                  {/* <div className="text-danger">{this.state.error}</div> */}

                  <button
                    className="btn btn-success btn-block"
                    onClick={this.saveMember}
                    disabled={!this.state.formValid}
                  >
                    Save
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateMemberComponent;
