package com.lms.dao;

import org.springframework.data.repository.CrudRepository;

import com.lms.bean.MemberBean;



public interface MemberDAO extends CrudRepository<MemberBean, String> {

}
