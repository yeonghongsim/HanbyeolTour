package com.project.team.interceptor;

import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import com.project.team.member.service.MemberService;

import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class MemberSideMenuInterceptor implements HandlerInterceptor{
	@Resource(name = "memberService")
	private MemberService memberService;
	
	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
		//사용중인 마이페이지 메뉴 리스트 조회 
		modelAndView.addObject("msMenuList", memberService.getMsMenuList());
		System.out.println("!!!! MEMBER SIDE MENU INTERCEPTER EXECUTED !!!!"); 
	}
	
	
}
