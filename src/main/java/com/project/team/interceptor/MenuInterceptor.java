package com.project.team.interceptor;

import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import com.project.team.admin.service.AdminService;

import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class MenuInterceptor implements HandlerInterceptor {
	
	@Resource(name = "adminService")
	private AdminService adminService;

	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
			ModelAndView modelAndView) throws Exception {
		
		String prevPage = request.getHeader("Referer");
		System.out.println("인터셉터 : " + prevPage);
		
		if(modelAndView != null) {
		modelAndView.addObject("locMenuList", adminService.getAreaCateList());
		}
	}
	
	

}
