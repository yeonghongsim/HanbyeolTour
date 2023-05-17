package com.project.team.admin.service;


import java.util.List;

import com.project.team.admin.vo.ImgVO;
import com.project.team.admin.vo.TourAreaVO;
import com.project.team.item.vo.ItemVO;

public interface AdminService {
	
	//여행국가 카테고리 등록
	void regArea(TourAreaVO tourAreaVO);
	
	//여행국가 카테고리 조회
	List<TourAreaVO> getAreaCateList();
	
	//여행국가 카테고리 삭제
	void deleteAreaCate(String areaCode);
	
	//상품 등록 (이미지 포함)
	void regItem(ItemVO itemVO);
	
	//다음 상품 코드 조회 
	String getNextItemCode();

}
