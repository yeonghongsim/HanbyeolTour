package com.project.team.admin.service;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.team.admin.vo.AreaVO;
import com.project.team.board.vo.BoardAdminVO;

@Service("adminService")
public class AdminServiceImpl implements AdminService{

	@Autowired
	private SqlSessionTemplate sqlSession;
	
	//여행국가 카테고리 등록
	@Override
	public void regArea(AreaVO areaVO) {
		sqlSession.insert("adminMapper.regArea", areaVO);
		
	}
	
	//여행국가 카테고리 조회
	@Override
	public List<AreaVO> getAreaCateList() {
		
		return sqlSession.selectList("adminMapper.getAreaCateList");
	}
	
	//여행국가 카테고리 삭제
	@Override
	public void deleteAreaCate(String areaCode) {
		sqlSession.delete("adminMapper.deleteAreaCate", areaCode);
		
	}

	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	//------------------- 심영홍 ------
	
	@Override
	public String getBoardNoticeCode() {
		return sqlSession.selectOne("adminMapper.getBoardNoticeCode");
	}

	@Override
	public List<BoardAdminVO> getBoardNoticeList() {
		return sqlSession.selectList("adminMapper.getBoardNoticeList");
	}
	
	
	
}
