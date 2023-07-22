import React, { Component } from "react";
import MemberService from "../services/MemberService";

class ListMemberComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      members: [],
    };
  }

  deleteMember(id) {
    MemberService.deleteMember(id).then((res) => {
      this.setState({
        members: this.state.members.filter((member) => member.member_id !== id),
      });
    });
  }

  editMember(id) {
    this.props.history.push(`/update-member/${id}`);
  }

  componentDidMount() {
    MemberService.getMembers().then((res) => {
      this.setState({ members: res.data });
    });
  }

  addMember = () => {
    this.props.history.push("/add-member");
  };

  render() {
    return (
      <div>
        <h2 style={{ margin: "10px" }} className="text-center">
          Members List
        </h2>
        <div className="row">
          <button
            style={{ marginBottom: "10px" }}
            className="btn btn-outline-dark btn-lg"
            onClick={this.addMember}
          >
            Add Member
          </button>
        </div>
        <div className="row">
          <table className="table table-striped table-bordered">
            <thead className="bg-dark text-light">
              <tr>
                <th>Member ID</th>
                <th>Name</th>
                <th>Address</th>
                <th>Type</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {this.state.members.map((member) => (
                <tr key={member.member_id}>
                  <td>{member.member_id}</td>
                  <td>{member.name}</td>
                  <td>{member.address}</td>
                  <td>{member.type}</td>
                  <td>
                    <button
                      onClick={() => this.editMember(member.member_id)}
                      className="btn btn-info"
                    >
                      Update
                    </button>
                    <button
                      style={{ marginLeft: "10px" }}
                      onClick={() => this.deleteMember(member.member_id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default ListMemberComponent;
