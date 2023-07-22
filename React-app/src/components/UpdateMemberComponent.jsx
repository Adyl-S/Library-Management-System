import React, { Component } from "react";
import MemberService from "../services/MemberService";

class UpdateMemberComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      member_id: this.props.match.params.id,
      name: "",
      address: "",
      type: "",
    };

    this.changeMemberIdHandler = this.changeMemberIdHandler.bind(this);
    this.changeNameHandler = this.changeNameHandler.bind(this);
    this.changeAddressHandler = this.changeAddressHandler.bind(this);
    this.updateMember = this.updateMember.bind(this);
  }

  componentDidMount() {
    MemberService.getMemberById(this.state.member_id).then((res) => {
      let member = res.data;
      this.setState({
        member_id: member.member_id,
        name: member.name,
        address: member.address,
        type: member.type,
      });
    });
  }

  updateMember = (e) => {
    e.preventDefault();
    let member = {
      member_id: this.state.member_id,
      name: this.state.name,
      address: this.state.address,
      type: this.state.type,
    };
    console.log("member => " + JSON.stringify(member));
    MemberService.updateMember(member, this.state.member_id).then((res) => {
      this.props.history.push("/members");
    });
  };

  changeMemberIdHandler = (event) => {
    this.setState({ member_id: event.target.value });
  };
  changeNameHandler = (event) => {
    this.setState({ name: event.target.value });
  };
  changeAddressHandler = (event) => {
    this.setState({ address: event.target.value });
  };
  changeTypeHandler = (event) => {
    this.setState({ type: event.target.value });
  };

  render() {
    return (
      <div>
        <div className="container">
          <div style={{ marginTop: "30px" }} className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3">
              <h3 style={{ marginTop: "10px" }} className="text-center">
                Update Member
              </h3>
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <label> Name: </label>
                    <input
                      placeholder="Name"
                      name="name"
                      className="form-control"
                      onChange={this.changeNameHandler}
                      value={this.state.name}
                    ></input>
                  </div>
                  <div className="form-group">
                    <label> Address: </label>
                    <input
                      placeholder="Address"
                      name="address"
                      className="form-control"
                      onChange={this.changeAddressHandler}
                      value={this.state.address}
                    ></input>
                  </div>
                  <div className="form-group">
                    <label> Type: </label>
                    <select
                      aria-label="Default select example"
                      name="type"
                      className="form-select"
                      value={this.state.type}
                      onChange={this.changeTypeHandler}
                    >
                      <option selected>Select Member Type</option>
                      <option value="Student">Student</option>
                      <option value="Staff">Staff</option>
                    </select>
                  </div>
                  <button
                    className="btn btn-success btn-block"
                    onClick={this.updateMember}
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

export default UpdateMemberComponent;
