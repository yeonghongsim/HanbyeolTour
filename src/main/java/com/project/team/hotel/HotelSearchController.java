package com.project.team.hotel;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@RequestMapping("/hotels")
@RestController
public class HotelSearchController {

    //해외호텔검색페이지 이동



    @PostMapping("/search")
    public ResponseEntity<String> searchPlacesAJAX(@RequestBody PlaceSearchRequest request) {



        // Place API 요청을 생성하고 호출
        String query = URLEncoder.encode(request.getKeyword(), StandardCharsets.UTF_8);
        String url = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=%ED%98%B8%ED%85%94%20%EC%84%9C%EC%9A%B8&location=37.5665,126.9780&radius=5000&opennow=true&minprice=0&maxprice=4&key=AIzaSyCHSSBm8zJnVf4ibkR7pcRog2vGLE-TXZ4";

        // Place API 호출 및 응답 받기
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);


        System.out.println(response);
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
