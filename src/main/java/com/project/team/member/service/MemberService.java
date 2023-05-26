package com.project.team.member.service;

import java.util.List;

import com.project.team.member.vo.MemberDetailVO;
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
	
	//비밀번호 조회 
	String getMemPw(String memId);
	
	
		
	// 회원 사이드 메뉴 목록 조회
	List<MemberSideMenuVO> getMsMenuList();
	
	// 회원 코드 조회 By 회원 아이디
	String getMemCode(String memid);
}
