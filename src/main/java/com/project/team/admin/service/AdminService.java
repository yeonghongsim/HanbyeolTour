package com.project.team.admin.service;


import java.util.List;

import com.project.team.admin.vo.AreaVO;
import com.project.team.board.vo.BoardAdminVO;

public interface AdminService {
	
	//여행국가 카테고리 등록
	void regArea(AreaVO areaVO);
	
	//여행국가 카테고리 조회
	List<AreaVO> getAreaCateList();
	
	//여행국가 카테고리 삭제
	void deleteAreaCate(String areaCode);
	
	
	
	
	
	
	
	//-------------------- 심영홍 -------
	// 공지글 글번호
	String getBoardNoticeCode();
	
	// 공지글 목록 조회
	List<BoardAdminVO> getBoardNoticeList();
	
	
	

}
