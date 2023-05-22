package com.project.team.hotel;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@RestController
@RequestMapping("/hotel")
public class HotelSearchController {

    @PostMapping("/search")
    public ResponseEntity<String> searchPlaces(String areaName, String cityName) {
        try {
            // Place API 요청을 생성하고 호출
            //String query = URLEncoder.encode(request.getKeyword(), StandardCharsets.UTF_8);
            String areaName1 = URLEncoder.encode("areaName", StandardCharsets.UTF_8);
            String cityName1 = URLEncoder.encode("cityName", StandardCharsets.UTF_8);
            String apiKey = "AIzaSyCHSSBm8zJnVf4ibkR7pcRog2vGLE-TXZ4";
            System.out.println(areaName);
            System.out.println(areaName1);
            int radius = 5000;
            String url = "https://maps.googleapis.com/maps/api/place/textsearch/json?query="
                    + areaName + cityName + "&key="
                    + apiKey;
            url = "https://maps.googleapis.com/maps/api/place/autocomplete/json?input="
                     + cityName + "&types=(cities)&key="
                     + apiKey;

            System.out.println(url);

            // Place API 호출 및 응답 받기
            RestTemplate restTemplate = new RestTemplate();
            ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
            System.out.println(response);
            //응답받은 데이터에서 location 추출
            String jsonData = response.getBody();

            String result = restTemplate.getForObject(url, String.class);
            JsonObject jsonObject = JsonParser.parseString(result).getAsJsonObject();
            String placeId = jsonObject.getAsJsonArray("predictions").get(0).getAsJsonObject().get("place_id").getAsString();

            // Place Details API를 사용하여 좌표값 얻기
            String detailsUrl = "https://maps.googleapis.com/maps/api/place/details/json?place_id="
                                + placeId + "&fields=geometry&key="
                                + apiKey;
            //요청결과
            String detailsResult = restTemplate.getForObject(detailsUrl, String.class);
            //결좌 JSON에서 좌표값 얻기
            JsonObject detailsObject = JsonParser.parseString(detailsResult).getAsJsonObject();
            JsonObject locationObject = detailsObject.getAsJsonObject("result").getAsJsonObject("geometry").getAsJsonObject("location");
            double latitude = locationObject.get("lat").getAsDouble();
            double longitude = locationObject.get("lng").getAsDouble();

            System.out.println(latitude);

            //추출한 정보로 APIURL 다시세팅
            String finalUrl = "https://maps.googleapis.com/maps/api/place/textsearch/json?photo=true&radius=5000&language=ko&query="
                    + cityName + "hotel&location=" + latitude + "," + longitude
                    + "&key=" + apiKey;

            System.out.println(finalUrl);
            //추출한 location 정보로 API 재호출

            response = restTemplate.getForEntity(finalUrl, String.class);

            System.out.println(response);
            // 검색 결과를 클라이언트로 반환
            return response;
        } catch (Exception e) {
            // 예외 처리
            e.printStackTrace();
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}

