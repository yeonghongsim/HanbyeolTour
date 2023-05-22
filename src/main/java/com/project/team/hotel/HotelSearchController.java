package com.project.team.hotel;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@RestController
public class HotelSearchController {

    @PostMapping("/search")
    public ResponseEntity<String> searchPlaces(@RequestBody PlaceSearchRequest request) {
        try {
            // Place API 요청을 생성하고 호출
            //String query = URLEncoder.encode(request.getKeyword(), StandardCharsets.UTF_8);
            String query = URLEncoder.encode("식당", StandardCharsets.UTF_8);
            String location = "37.5665,126.9780";  // Seoul's latitude and longitude
            int radius = 500;

            System.out.println("@@@@@@@@@@@@@@@@@@@@@@@");
            String apiKey = "AIzaSyCHSSBm8zJnVf4ibkR7pcRog2vGLE-TXZ4";
            String url = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=seoul&radius=500&key=AIzaSyCHSSBm8zJnVf4ibkR7pcRog2vGLE-TXZ4";
//            String url =  "https://maps.googleapis.com/maps/api/place/textsearch/json?query=" + query +
//                    "&location=" + location +
//                    "&radius=" + radius +
//                    "&key=" + apiKey;



            // Place API 호출 및 응답 받기
            RestTemplate restTemplate = new RestTemplate();
            ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
            System.out.println(response);
            // 검색 결과를 클라이언트로 반환
            return response;
        } catch (Exception e) {
            // 예외 처리
            e.printStackTrace();
            return ResponseEntity.badRequest().body(e.getMessage());
        }
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
