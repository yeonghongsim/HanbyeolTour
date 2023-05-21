package com.project.team;

import java.net.URLEncoder;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
public class ApiTest {

    @GetMapping("/placesAJAX")
    @ResponseBody
    public ResponseEntity<String> getPlaces() {
    	
    	
    	 String location = "오사카";
    	 int radius = 5000;
    	 String types = "hotel";
    	 String fromDate = "2023-06-01";
    	 String toDate = "2323-06-05";

    	String url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json" +
    	        "?location=" + location +
    	        "&radius=" + radius +
    	        "&types=" + types +
    	        "&fromDate=" + fromDate +
    	        "&toDate=" + toDate +
    	        "&key=AIzaSyBE5wTnNiPxcL1W78flB4lu75UASNdSigM";
    	
    	System.out.println(url);
    	
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
        System.out.println(response);
        
        return response;
    }
}

