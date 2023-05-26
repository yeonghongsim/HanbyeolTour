package com.project.team.interepter;

import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import com.project.team.admin.service.AdminService;

import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class MenuIntercepter implements HandlerInterceptor {
	
	@Resource(name = "adminService")
	private AdminService adminService;

	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
			ModelAndView modelAndView) throws Exception {
		
		if(modelAndView != null) {
			modelAndView.addObject("locMenuList", adminService.getAreaCateList());
		}
		
	}
	
	

}
