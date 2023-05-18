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
//					.successHandler(getSuccessHandler())
//					.failureHandler(getFailureHandler())
					.permitAll(); // 로그인은 인증없어도 가야하니까, 모든 로그인 관련 페이지는 다 허용 
		
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
	 
	
	
	
	
	
	
	
	
}
