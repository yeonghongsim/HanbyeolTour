package com.project.team.admin.service;


import java.util.List;

import com.project.team.board.vo.BoardRequestVO;
import com.project.team.admin.vo.ImgVO;
import com.project.team.admin.vo.TourAreaVO;
import com.project.team.item.vo.ItemVO;

public interface AdminService {
	
	//여행국가 카테고리 등록
	void regArea(TourAreaVO tourAreaVO);
	
	//여행국가 카테고리 조회
	List<TourAreaVO> getAreaCateList();
	
	//카테고리 사용여부 변경 (정현 추가)
	int changeAreaIsUse(String areaCode);
		
	//여행국가 카테고리 삭제
	void deleteAreaCate(String areaCode);
	
	//판매 상품 조회
	List<ItemVO> saleListForAdmin();
	
	//판매 상품 삭제
	void deleteItem(String itemCode);
	
	//판매 상품 선택 삭제
	void deleteCheckItems(ItemVO itemVO);
	
	//판매 상품 상세 조회
	ItemVO getItemDetailForAdmin(String itemCode);
	
	//판매 상품 수정
	void updateItem(ItemVO itemVO);
	
	
	
	
	
	
	//-------------------- 심영홍 -------
	// 공지글 글번호
	String getBoardNoticeCode();
	
	// 공지글 목록 조회
	List<BoardRequestVO> getBoardNoticeList();
	
	
	
	//상품 등록 (이미지 포함)
	void regItem(ItemVO itemVO);
	
	//다음 상품 코드 조회 
	String getNextItemCode();

}
