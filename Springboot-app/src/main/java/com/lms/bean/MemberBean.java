package com.lms.bean;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "member_table")
public class MemberBean {

	@Id
	@Column(name = "member_id")
	private String member_id;
	@Column(name = "name")
	private String name;
	@Column(name = "address")
	private String address;
	@Column(name = "type")
	private String type;
	@Column(name="password")
	private String password;

	public MemberBean() {
		
	}
	
	public MemberBean(String member_id, String name, String address, String type, String password) {
		super();
		this.member_id = member_id;
		this.name = name;
		this.address = address;
		this.type = type;
		this.password = password;
	}

	public String getMember_id() {
		return member_id;
	}

	public void setMember_id(String member_id) {
		this.member_id = member_id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getPassword() { 
		return password; 
		} 
	public void setPassword(String password) { 
		this.password = password; 
		}

	@Override
	public String toString() {
		return "<tr>" +"<td>"+ member_id + "</td>"+"<td>" + name +"</td>"+"<td>" + address + "</td>"+"<td>" + type+"</td>"+"</tr>";
	}

	
}
