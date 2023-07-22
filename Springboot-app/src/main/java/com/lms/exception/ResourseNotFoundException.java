package com.lms.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import javassist.SerialVersionUID;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class ResourseNotFoundException extends RuntimeException{
	
	private static final long SerialVersionUID = 1L;
	
	public ResourseNotFoundException(String message) {
		super(message);
	}

}
