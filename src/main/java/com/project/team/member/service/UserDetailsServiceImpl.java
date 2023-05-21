package com.project.team.member.service;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.project.team.member.vo.MemberVO;

import jakarta.annotation.Resource;

@Service("userDetailsService")
public class UserDetailsServiceImpl implements UserDetailsService{
	@Resource(name = "memberService")
	private MemberService memberService;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		//loginInfo 조회
		MemberVO userInfo = memberService.getUserInfoForLogin(username);		
		// 정보를 넣기 전에 미리 오류 예외처리
		if(userInfo == null) {
			//강제 예외 발생 
			throw new UsernameNotFoundException("오류");
		}
		
		//loginInfo를 UserDetails 객체에 넣기 
		UserDetails user = User.withUsername(userInfo.getMemId())
								.password(userInfo.getMemPw())
								.roles(userInfo.getMemRole().split(","))//권한 3개 -> split
								.build();
	    
		return user;
	}
		
}
