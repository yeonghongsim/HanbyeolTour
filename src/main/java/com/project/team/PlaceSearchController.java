package com.project.team;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@RestController
public class PlaceSearchController {

    @PostMapping("/search")
    public ResponseEntity<String> searchPlaces(@RequestBody PlaceSearchRequest request) {
        // Place API 요청을 생성하고 호출
        String query = URLEncoder.encode("식당", StandardCharsets.UTF_8);
//        String url = "https://maps.googleapis.com/maps/api/place/textsearch/json?query="
//                + query
//                + "&radius=5000"
//                + "&location=37.5665,126.9780" // 서울의 위도와 경도
//                + "&key=AIzaSyCHSSBm8zJnVf4ibkR7pcRog2vGLE-TXZ4"; // 자신의 Google Cloud Platform API 키로 변경

       String url = "https://www.googleapis.com/travel/v3/prices?query=Seoul&checkInDate=2023-06-01&checkOutDate=2023-06-05&key=AIzaSyCHSSBm8zJnVf4ibkR7pcRog2vGLE-TXZ4";
        
        // Place API 호출 및 응답 받기
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);

        // 검색 결과를 클라이언트로 반환
        return response;
    }

    public static class PlaceSearchRequest {
        private String keyword;
        private int radius;

        // getter, setter

        public String getKeyword() {
            return keyword;
        }

        public void setKeyword(String keyword) {
            this.keyword = keyword;
        }

        public int getRadius() {
            return radius;
        }

        public void setRadius(int radius) {
            this.radius = radius;
        }
    }
}
