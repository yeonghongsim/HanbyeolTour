package com.project.team.admin.service;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.team.admin.vo.TourAreaVO;
import com.project.team.item.vo.ItemVO;


@Service("adminService")
public class AdminServiceImpl implements AdminService{

	@Autowired
	private SqlSessionTemplate sqlSession;
	
	//여행국가 카테고리 등록
	@Override
	public void regArea(TourAreaVO tourAreaVO) {
		sqlSession.insert("adminMapper.regArea", tourAreaVO);
		
	}
	
	//여행국가 카테고리 조회
	@Override
	public List<TourAreaVO> getAreaCateList() {
		
		return sqlSession.selectList("adminMapper.getAreaCateList");
	}
	
	//여행국가 카테고리 사용여부 변경 (정현 추가) 
	@Override
	public int changeAreaIsUse(String areaCode) {
		return sqlSession.update("adminMapper.changeAreaIsUse", areaCode);
	}
	
	//여행국가 카테고리 삭제
	@Override
	public void deleteAreaCate(String areaCode) {
		sqlSession.delete("adminMapper.deleteAreaCate", areaCode);
		
	}
	
	//다음 상품 코드 조회
	@Override
	public String getNextItemCode() {
		
		return sqlSession.selectOne("adminMapper.getNextItemCode");
	}
	
	
	//상품 등록
	@Override
	@Transactional(rollbackFor = Exception.class)
	public void regItem(ItemVO itemVO) {
		sqlSession.insert("adminMapper.regItem", itemVO);
		//상품 이미지 등록
		sqlSession.insert("adminMapper.regImgs", itemVO);
	}

	

	
	
	
}
