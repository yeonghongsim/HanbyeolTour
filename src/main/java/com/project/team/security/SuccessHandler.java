package com.project.team.security;

import java.io.IOException;
import java.io.PrintWriter;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

//로그인 성공 시 자동으로 실행되는 클래스 
public class SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
			Authentication authentication) throws IOException, ServletException {
		//실행되는지 출력 
		System.out.println("@@@@ success handler 실행됨 @@@@");
		//로그인 성공 여부 정보 전달 
		PrintWriter p = response.getWriter();
		p.write("success");
		p.flush();
		
		
		
		//super.onAuthenticationSuccess(request, response, authentication);
				
		
	}

		
	
}
