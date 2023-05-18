package com.project.team.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;



@Configuration
@EnableWebSecurity
public class SecurityConfig {
	
	@Bean
	public SecurityFilterChain filterChain(HttpSecurity security) throws Exception{
		
		security.csrf().disable()
				.authorizeHttpRequests()
					.requestMatchers("/**").permitAll()
					.anyRequest().authenticated()
				.and()
					.formLogin() //로그인할때 폼태그 쓸꺼다.
					.loginPage("/member/login") //로그인할 페이지 경로 설정 
					.loginProcessingUrl("/member/login")// 실제로 로그인을 하는 url 
					.usernameParameter("memId")//넘어올 아이디 이름 
					.passwordParameter("memPw")//넘어올 비밀번호 이름 
					.successHandler(getSuccessHandler())
					.failureHandler(getFailureHandler())
					.permitAll() // 모든 로그인 관련 페이지는 다 허용 
				.and()
					.logout()
					.logoutUrl("/member/logout") //실제로 로그아웃 하는 url 
					.invalidateHttpSession(true) //로그아웃시 작동하는 것 (세션데이터 지우기)
					.logoutSuccessUrl("/"); // 로그아웃시 이동할 경로 
					// index controller로 이동하면 알아서 권한에 따라 페이지 이동 시켜줌
		return security.build();
		
		
	}
	
	@Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return (web) -> web.ignoring().requestMatchers("/js/**", "/css/**", "image/**");
    }
	
	
	//암호화 객체 생성 
	@Bean
	public PasswordEncoder getPasswordEncoder() {
		return new BCryptPasswordEncoder();
	}
	 
	// 로그인 성공시 실행되는 클래스 객체 생성
	@Bean
	public SuccessHandler getSuccessHandler() {
		return new SuccessHandler();
	}
	
	//로그인 실패시 실행되는 클래스 객체 생성 
	@Bean
	public FailureHandler getFailureHandler() {
		
		return new FailureHandler();
	}
	
	
	
	
}
