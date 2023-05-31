package com.project.team.buy.service;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("buyService")
public class BuyServiceImpl implements BuyService{
	@Autowired
	private SqlSessionTemplate sqlSession;
	
	
	
}
