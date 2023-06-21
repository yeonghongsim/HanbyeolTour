package com.project.team.interceptor;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class InterceptorConfig implements WebMvcConfigurer {

	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		
		
		
			registry.addInterceptor(getMenuInterceptor())
									.addPathPatterns("/item/**")
									.addPathPatterns("/hotel/**")
									.addPathPatterns("/**/**")
									.excludePathPatterns("/**/*AJAX")
									.excludePathPatterns("/admin/**");
			
			// 마이페이지 - 사이드 메뉴 리스트 조회 
			registry.addInterceptor(getMemberSideMenuInterceptor())
							.addPathPatterns("/member/infoManage")
							.addPathPatterns("/member/checkMyRequest")
							.addPathPatterns("/myPage/checkMyCart")
							.addPathPatterns("/myPage/accountDeletion")
							.addPathPatterns("/myPage/changeMyPwPage")
							.addPathPatterns("/myPage/changeMyPwForm")
							.addPathPatterns("/myPage/updateMyInfo")
							.addPathPatterns("/myPage/checkMyReservation")
							.addPathPatterns("/myPage/checkDiyReservation")
							.addPathPatterns("/myPage/reservationDetail")
							.addPathPatterns("/myPage/diyDetail")
							.addPathPatterns("/myPage/checkMyCancelation")
							.addPathPatterns("/myPage/checkMyRequest") //영홍씨 작업 부분
							.addPathPatterns("/myPage/regRequestForm")
							.addPathPatterns("/myPage/reqDetail")
							.addPathPatterns("/myPage/checkMyReview")
							.addPathPatterns("/myPage/getMyReview")
							.excludePathPatterns("/**/*AJAX"); 
			
	}
	

	
	@Bean
	public MenuInterceptor getMenuInterceptor() {
		return new MenuInterceptor();
	}
	
	@Bean
	public MemberSideMenuInterceptor getMemberSideMenuInterceptor() {
		return new MemberSideMenuInterceptor();
	}
	
	

}
