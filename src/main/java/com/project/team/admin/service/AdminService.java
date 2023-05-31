package com.project.team.admin.service;


import java.lang.reflect.Member;
import java.util.List;
import java.util.Map;

import com.project.team.board.vo.BoardRequestVO;
import com.project.team.board.vo.FreqRequestVO;
import com.project.team.admin.vo.ImgVO;
import com.project.team.admin.vo.MemListSearchVO;
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
	
	//여행 국가 카테고리 메인 노출 여부
	int changeIsExposeMain(String areaCode);
		
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
	
	//회원 코드 조회 By 회원 아이디
	String getMemCode(String memid);
	
	//판매 상품 수정
	void updateItem(ItemVO itemVO);
	

	//상품 이미지 수정
	void regImgsForItemDetail(ItemVO itemVO);
	
	//상품 상세 정보 X 클릭 시 이미지 삭제
	void deleteItemImg(ImgVO imgVO);
	
	//회원 리스트 조회
	List<MemberVO> getMemList(MemListSearchVO memListSearchVO);
	
	//회원 검색 조건에 맞는 데이터 수
	int getMemListCnt(MemListSearchVO memListSearchVO);
	
	//회원 상세 정보 조회
	MemberVO getMemDetailInfo(String memId);
	
	//첨부 파일명 조회
	String getAttachedFileName(String itemImgCode);
	
	//회원 권한 변경
	void updateMemRole(MemberVO memberVO);

	
	
	
	
	
	//-------------------- 심영홍 -------
	
	
	


	// 자주 문의 글 등록
	void insertBoardForFreReq(FreqRequestVO freqRequestVO);
	
	// 자주 문의 글 조회 By 문의유형 코드
	List<FreqRequestVO> getFreqRequestList(String typeRequestCode);
	
	// 자주 문의 글 삭제
	void delFreqReq(FreqRequestVO freqRequestVO);
	
	// 자주 문의 글 수정
	void updateFreqReq(FreqRequestVO freqRequestVO);

	//메인페이지 이미지 업로드
	void uploadMainSlideImg(Map<String, String> uploadImg);

	//메인페이지 이미지 로드
	List<Map<String,String>> getMainSlideImg();

	//추천아이템 목록 조회
	List<Map<String,String>> getRecomItem();
	//판매중인 상품
	List<Map<String,String>> getItemList();
	//추천 아이템 업데이트
	void setRecomItemList(List<Map<String,String>> list);
	//메인슬라이드이미지삭제
	void deleteMainSlideImg(String imgCode);
	//판매중인 모든 상품리스트조회
	List<Map<String,String>> getItemListAll();
	//패키지화면 추천 아이템 업데이트
	void addRecomImgForPKG(List<Map<String, String>> list);
	//패키지 추천 아이템 목록 조회
	List<Map<String,String>> getRecomImgListForPKG();

}
