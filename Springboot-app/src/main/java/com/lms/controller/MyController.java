package com.lms.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;

import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.PathVariable;

import org.springframework.web.bind.annotation.PostMapping;

import org.springframework.web.bind.annotation.PutMapping;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lms.bean.MemberBean;

import com.lms.dao.MemberDAO;
import com.lms.exception.ResourseNotFoundException;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1")
public class MyController {
	@Autowired

	MemberDAO dao;

	@GetMapping(path = "/members")

	public List<MemberBean> getAllMembers() {

		ArrayList<MemberBean> list = (ArrayList<MemberBean>) dao.findAll();

		return list;

	}
	
	@PostMapping(path = "/members")
    public String insertMember(@RequestBody MemberBean mem) {
        String password = mem.getMember_id();
        Optional<MemberBean> existingMember = dao.findById(mem.getMember_id());
        if(existingMember.isPresent()){
            return "Member with this ID already exists";
        }
        dao.save(mem);
        mem.setPassword(password);
        return "Record Created";
    }



	@GetMapping(path = "/members/{member_id}")

	public ResponseEntity<MemberBean> getMember(@PathVariable String member_id) {
			
		MemberBean member = dao.findById(member_id)
				.orElseThrow(() -> new ResourseNotFoundException("Member does not exist with this ID: " + member_id));
		
		return ResponseEntity.ok(member);

	}


	@PutMapping(path = "/members/{member_id}")

	public ResponseEntity<MemberBean> updateMember(@PathVariable String member_id, @RequestBody MemberBean mem) {
		
		MemberBean member = dao.findById(member_id)
				.orElseThrow(() -> new ResourseNotFoundException("Member does not exist with this ID: " + member_id));
		
		member.setMember_id(mem.getMember_id());
		member.setName(mem.getName());
		member.setAddress(mem.getAddress());
		member.setType(mem.getType());
		member.setPassword(mem.getMember_id());
		

		MemberBean updatedMember =  dao.save(member);

		return ResponseEntity.ok(updatedMember);

	}

	@DeleteMapping(path = "/members/{member_id}")

	public ResponseEntity<Map<String, Boolean>> deleteMember(@PathVariable String member_id) {
		
		MemberBean member = dao.findById(member_id)
				.orElseThrow(() -> new ResourseNotFoundException("Member does not exist with this ID: " + member_id));
		
		dao.delete(member);
		Map<String, Boolean> response = new HashMap<>();
		response.put("Deleted" , Boolean.TRUE);
		return ResponseEntity.ok(response);

	}

}