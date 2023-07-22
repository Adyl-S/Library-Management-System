package com.lms.test;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.lms.bean.MemberBean;
import com.lms.controller.MyController;
import com.lms.dao.MemberDAO;
import com.lms.exception.ResourseNotFoundException;

@RunWith(MockitoJUnitRunner.class)
public class MyControllerTest {

    @Mock
    private MemberDAO dao;

    @InjectMocks
    private MyController controller;

    MemberBean member;
    List<MemberBean> memberList;

    @Before
    public void setUp() {
        member = new MemberBean("1", "Adil", "Nagpur", "staff", "1");
        memberList = new ArrayList<>();
        memberList.add(member);
    }

    @Test
    public void testGetAllMembers() {
        when(dao.findAll()).thenReturn(memberList);
        List<MemberBean> result = controller.getAllMembers();
        assertNotNull(result);
        assertEquals(1, result.size());
    }

    @Test
    public void testInsertMember() {
        when(dao.findById("1")).thenReturn(Optional.empty());
        String result = controller.insertMember(member);
        assertEquals("Record Created", result);
        
    }
    @Test
    public void testInsertMember_existingId() {
        when(dao.findById("1")).thenReturn(Optional.of(member));
        String result = controller.insertMember(member);
        assertEquals("Member with this ID already exists", result);
    }

    @Test
    public void testGetMember_success() {
        when(dao.findById("1")).thenReturn(Optional.of(member));
        ResponseEntity<MemberBean> result = controller.getMember("1");
        assertNotNull(result);
        assertNotNull(result.getBody());
        assertEquals(HttpStatus.OK, result.getStatusCode());
        assertEquals("1", result.getBody().getMember_id());
    }

    @Test(expected = ResourseNotFoundException.class)
    public void testGetMember_failure() {
        when(dao.findById("2")).thenReturn(Optional.empty());
        controller.getMember("2");
    }

    @Test
    public void testUpdateMember_success() {
        when(dao.findById("1")).thenReturn(Optional.of(member));
        MemberBean updateMember = new MemberBean("1", "Adil", "Nagpur", "staff", "2");
        ResponseEntity<MemberBean> result = controller.updateMember("1", updateMember);
        assertNotNull(result);
        assertNotNull(result.getBody());
        assertEquals(HttpStatus.OK, result.getStatusCode());
        assertEquals("Adil", result.getBody().getName());
        assertEquals("2", result.getBody().getPassword());
    }
    @Test(expected = ResourseNotFoundException.class)
    public void testUpdateMember_failure() {
        when(dao.findById("2")).thenReturn(Optional.empty());
        MemberBean updateMember = new MemberBean("2", "Adil", "Nagpur", "staff", "2");
        controller.updateMember("2", updateMember);
    }

    @Test
    public void testDeleteMember_success() {
        when(dao.findById("1")).thenReturn(Optional.of(member));
        doNothing().when(dao).delete(member);
        ResponseEntity<Map<String, Boolean>> result = controller.deleteMember("1");
        assertNotNull(result);
        assertEquals(HttpStatus.OK, result.getStatusCode());
        assertEquals(true, result.getBody().get("Deleted"));
    }

    @Test(expected = ResourseNotFoundException.class)
    public void testDeleteMember_failure() {
        when(dao.findById("2")).thenReturn(Optional.empty());
        controller.deleteMember("2");
    }
}

