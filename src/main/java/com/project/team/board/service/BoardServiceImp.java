package com.project.team.board.service;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.team.board.vo.TypeRequestVO;


@Service("boardService")
public class BoardServiceImp implements BoardService{
	@Autowired
	private SqlSessionTemplate sqlSession;

	@Override
	public List<TypeRequestVO> getTypeRequestList() {
		return sqlSession.selectList("boardMapper.getTypeRequestList");
	}

	
}
