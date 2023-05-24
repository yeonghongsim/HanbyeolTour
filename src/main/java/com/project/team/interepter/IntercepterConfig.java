package com.project.team.interepter;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class IntercepterConfig implements WebMvcConfigurer {

	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		
		
		
			registry.addInterceptor(getMenuIntercepter())
									.addPathPatterns("/item/**")
									.addPathPatterns("/hotel/**")
									.excludePathPatterns("/**/*AJAX");
	}
	

	
	@Bean
	public MenuIntercepter getMenuIntercepter() {
		return new MenuIntercepter();
	}
	

}
