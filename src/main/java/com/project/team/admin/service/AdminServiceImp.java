package com.project.team.admin.service;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("adminService")
public class AdminServiceImp implements AdminService{
	@Autowired
	private SqlSessionTemplate sqlSession;
	
	
	
	
	
	
}
