package com.project.team.admin.service;

import java.util.List;

import com.project.team.admin.vo.AreaVO;

public interface AdminService {
	
	//여행국가 카테고리 등록
	void regArea(AreaVO areaVO);
	
	//여행국가 카테고리 조회
	List<AreaVO> getAreaCateList();
	
	//여행국가 카테고리 삭제
	void deleteAreaCate(String areaCode);

}
