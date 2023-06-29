package com.project.team.util;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.text.DateFormat;
import java.text.SimpleDateFormat;

@Configuration
public class AppConfig {
    //날짜데이터 포맷설정
    @Bean
    public DateFormat dateFormat() {
        return new SimpleDateFormat("yyyy-MM-dd");
    }
}
