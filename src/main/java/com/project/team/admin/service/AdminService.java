package com.project.team.admin.service;


import java.lang.reflect.Member;
import java.util.List;
import java.util.Map;

import com.project.team.board.vo.BoardRequestVO;
import com.project.team.board.vo.FreqRequestVO;
import com.project.team.admin.vo.ImgVO;
import com.project.team.admin.vo.TourAreaVO;
import com.project.team.item.vo.ItemVO;
import com.project.team.member.vo.MemberVO;

public interface AdminService {
	
	//여행국가 카테고리 등록
	void regArea(TourAreaVO tourAreaVO);
	
	//여행국가 카테고리 중복 확인
	int checkAreaName(TourAreaVO tourAreaVO);
	
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
	
	//상품 등록 (이미지 포함)
	void regItem(ItemVO itemVO);
	
	//다음 상품 코드 조회 
	String getNextItemCode();
	
	// 회원 코드 조회 By 회원 아이디
	String getMemCode(String memid);
	
	//판매 상품 수정
	void updateItem(ItemVO itemVO);
	

	//상품 이미지 수정
	void regImgsForItemDetail(ItemVO itemVO);
	
	//상품 상세 정보 X 클릭 시 이미지 삭제
	void deleteItemImg(ImgVO imgVO);
	
	//회원 리스트 조회
	List<MemberVO> getMemList();
	
	//회원 상세 정보 조회
	MemberVO getMemDetailInfo(String memId);
	
	//첨부 파일명 조회
	String getAttachedFileName(String itemImgCode);

	
	
	
	
	
	//-------------------- 심영홍 -------
	// 공지글 글번호
	String getBoardNoticeCode();
	
	// 공지글 목록 조회
	List<BoardRequestVO> getBoardNoticeList();
	
	


	// 자주 문의 글 등록
	void insertBoardForFreReq(FreqRequestVO freqRequestVO);
	
	// 자주 문의 글 조회 By 문의유형 코드
	List<FreqRequestVO> getFreqRequestList(String typeRequestCode);

	//메인페이지 이미지 업로드
	void uploadMainSlideImg(Map<String, String> uploadImg);

	//메인페이지 이미지 로드
	List<Map<String,String>> getMainSlideImg();
}
