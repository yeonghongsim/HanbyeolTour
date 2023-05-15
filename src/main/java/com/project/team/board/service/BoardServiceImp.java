package com.project.team.board.service;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service("boardService")
public class BoardServiceImp implements BoardService{
	@Autowired
	private SqlSessionTemplate sqlSession;
	
}
