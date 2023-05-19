package com.project.team.member.service;

import com.project.team.member.vo.MemberDetailVO;
import com.project.team.member.vo.MemberVO;

public interface MemberService {
	
	//회원가입 시 아이디 중복 체크 
	boolean isDuplicateMemId(String memId);
	
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
	
	
}
