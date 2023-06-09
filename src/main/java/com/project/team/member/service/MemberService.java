package com.project.team.member.service;

import java.util.List;
import java.util.Map;

import com.project.team.admin.vo.HotelImgVO;
import com.project.team.admin.vo.TourImgVO;
import com.project.team.admin.vo.TourItemImgVO;
import com.project.team.board.vo.BoardRequestVO;
import com.project.team.board.vo.ReqReplyVO;
import com.project.team.buy.vo.BuySearchVO;
import com.project.team.buy.vo.BuyStateVO;
import com.project.team.buy.vo.BuyVO;
import com.project.team.item.vo.DiyDetailVO;
import com.project.team.item.vo.DiyTourVO;
import com.project.team.item.vo.ItemVO;
import com.project.team.member.vo.MemberDetailVO;
import com.project.team.member.vo.MemberReviewVO;
import com.project.team.member.vo.MemberSideMenuVO;
import com.project.team.member.vo.MemberVO;

public interface MemberService {
	
	//회원가입 시 아이디 중복 체크 
	boolean isDuplicateMemId(String memId);
	
	//회원가입 시 이메일 중복 체크 
	boolean isDuplicateMemEmail(String memEmail);
	
	//회원가입 
	void join(MemberVO memberVO, MemberDetailVO memberDetailVO);
		
	//시큐리티 로그인 정보 가져오기
	MemberVO getUserInfoForLogin(String memId);
	
	//아이디 찾기 
	String findId(MemberVO memberVO);
	
	//비밀번호 찾기 - 이메일 주소 가져오기 
	String getMemEmailForFindPw(MemberVO memberVO);
	
	//비밀번호 수정
	void updateMemPw(MemberVO memberVO);
	
	//임시 비밀번호 발급 여부 수정
	void updateIsTemporaryPw(String memId);
	
	//임시 비밀번호 발급 여부 확인
	String getIsTemporaryPw(String memId);
	
	//임시 비밀번호 발금 회원 - 비밀번호 변경 후 상태 변경 
	void updateIsTemporaryPwToN(String memId);
	
	//회원 탈퇴 신청 - 상태코드 변경 
	void updateMemStatusCodeTo2(String memId);
	
	// 아이디 조회
	String getMemId(String memCode);
	
	//비밀번호 조회 
	String getMemPw(String memId);
	
	//회원정보 조회 - myPage
	MemberVO getMemInfo(String memId);
	
	//휴대폰 번호 중복 확인 
	boolean isDuplicateMemDTell(String memDTell);
	
	//회원정보 변경
	void updateMyInfo(MemberVO memberVO, MemberDetailVO memberDetailVO);
	
	// 1개월 내 구매 - 상태 코드별 갯수 조회 (마이페이지 첫 화면 조회)
	List<BuyStateVO> getBuyStatusInOneMonth(String memCode);
	
	//구매내역 조회 * 
	List<BuyVO> getBuyList(BuySearchVO buySearchVO);

	// 구매 기간에 따른 상태 코드별 갯수 조회 (예약 내역 조회 페이지) * 
	List<BuySearchVO> getBuyStatusCount(BuySearchVO buySearchVO);
	
	// 구매내역 갯수 조회 *
	int getBuyListCount(BuySearchVO buySearchVO);
	
	// 예약 취소 
	void cancelReservation(String buyCode);
	
	//예약 상세 정보 
	BuyVO getBuyDetail(BuyVO buyVO);
	
	// 문의 내역 조회 
	List<BoardRequestVO> getQnaList(String memCode);
	List<ReqReplyVO> getQnaReplyList(String memCode);
	
	//상품 문의 관련 
	ItemVO getItemDetailForQna(String itemCode);
	
	// 마이페이지 메인 - 리뷰 리스트 조회
	List<MemberReviewVO> getMyPageReviewList(String memCode); 
	
	// 마이페이지 메인 - 예약 1개월내 내역 조회 
	List<BuyVO> getBuyListInOneMonth(String memCode);
	
	// 예약 내역 조회 - DIY (검색 조건 포함)
	List<DiyTourVO> getDiyTourList(BuySearchVO buySearchVO);
	
	// 예약 내역 상세 조회 - DIY 
	List<DiyTourVO> getDiyDetaiList(String hbtDiyCode);
	
	// 예약 내역 상세 페이지 - 상단 정보 조회 
	DiyTourVO getDiyTourByDiyCode(String hbtDiyCode);
	
	// 예약 내역 상세 페이지 - 상단 정보 조회 v.2 
	List<DiyDetailVO> getDiyDetaiListNew(String hbtDiyCode);
	
	// 예약 상세 - 투어 코드 리스트 
	List<String> getInDiyReservedTourList(String hbtDiyCode);
	// 예약 상세 - 호텔 코드 리스트 
	List<String> getInDiyReservedHotelList(String hbtDiyCode);
	
	//예약 상세 - 호텔 정보 리스트 
	List<DiyTourVO> getInDiyHotelInfoList(String hbtDiyCode);
	List<HotelImgVO> getDiyHotelImgList(String hbtHotelCode);
	
	//예약 상세 - 투어 정보 리스트 
	List<DiyTourVO> getInDiyTourInfoList(String hbyDiyCode);
	List<TourItemImgVO> getDiyTourImgList(String hbtTourItemCode);
	
	//마이페이지 - 메인 DIY 투어 1개월 이내 상태 코드 갯수 조회 
	List<BuyStateVO> getDiyStatusInOneMonth(String memCode);
	//마이페이지 - 메인 DIY 투어 1개월 이내 내역 조회 
	List<DiyTourVO> getDiyTourListInOneMonth(String memCode);
	
	// 페이징 - 갯수 카운팅 
	int getDiyListCnt(BuySearchVO buySearchVO);
	
	//diy - 예약 조회 페이지 상태 코드 상단바 
	List<BuyStateVO> getDiyStatusCountList(BuySearchVO buySearchVO);
	
	//diy - 예약 취소 
	void cancelDiyReservation(String hbyDiyCode);
	
	
	
	
	
	
	
	
	//----------------------------------------
	
	
	
		
	// 회원 사이드 메뉴 목록 조회
	List<MemberSideMenuVO> getMsMenuList();
	
	// 회원 코드 조회 By 회원 아이디
	String getMemCode(String memid);
	
	// 회원 리뷰 리스트
	List<MemberReviewVO> getMyReviewList(MemberReviewVO memberReviewVO);
	
	// 리뷰 여부 체크
	MemberReviewVO chkIsReviewed(String BuyCode);
	
	// 리뷰 코드 조회
	String getNextMyReviewNum();
	
	// 리브 등록
	void regMyReivew(MemberReviewVO memberReviewVO);
	
	// 리뷰 삭제
	void delMyReview(String hbtMemReviewNum);
	
	// 논 리뷰 리스트
	List<BuyVO> getNeedReviewList(String memCode);
}
