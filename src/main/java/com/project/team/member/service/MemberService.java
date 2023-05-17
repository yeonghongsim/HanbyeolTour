package com.project.team.member.service;


public interface MemberService {
	
	//회원가입 시 아이디 중복 체크 
	boolean isDuplicateMemId(String memId);
	
	
	
	
	/*
	
	
	//join
	void join(MemberVO memberVO);
	
	//로그인
	MemberVO login(MemberVO memberVO);
	
	//시큐리티 로그인 
	MemberVO getUserInfoForLogin(String memId);
	
	//비밀번호 찾기 
	String getMemEmail(MemberVO memberVO);
	
	//비밀번호 변경
	void updateMemPw(MemberVO memberVO);
	*/
	
	
}
