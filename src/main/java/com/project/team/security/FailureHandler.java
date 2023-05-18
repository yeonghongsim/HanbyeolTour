package com.project.team.security;

import java.io.IOException;
import java.io.PrintWriter;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;


//로그인 실패 시 자동으로 실행되는 클래스 
public class FailureHandler extends SimpleUrlAuthenticationFailureHandler {

	@Override
	public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response,
			AuthenticationException exception) throws IOException, ServletException {
		
		//에러가 났을 때 메세지 문자 
		String eMsg = "";
		
		if (exception instanceof UsernameNotFoundException) {
		    eMsg = "가입된 계정이 존재하지 않습니다.";
		}
		else if (exception instanceof BadCredentialsException) {
		    eMsg = "아이디 혹은 비밀번호를 확인하세요.";
		}
		else {
			eMsg = "알 수 없는 이유로 로그인에 실패했습니다.";
		}
					

        // 로그인 시 입력한 id 값 가져오기
        String memId = request.getParameter("memId");

        // 로그인 실패 여부 정보 전달
        PrintWriter p = response.getWriter();
        p.write("fail");
        p.flush();	
		

		//super.onAuthenticationFailure(request, response, exception);
	}
	
	
	
}
