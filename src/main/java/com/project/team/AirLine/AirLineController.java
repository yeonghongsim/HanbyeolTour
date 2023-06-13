package com.project.team.AirLine;

import org.springframework.stereotype.Controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.project.team.AirLine.vo.SearchAirLineVO;

@Controller
@RequestMapping("/airLine")
public class AirLineController {
	
	@ResponseBody
	@PostMapping("/searchAirLineAJAX")
	public void searchAirLineAJAX(SearchAirLineVO searchAirLineVO) throws IOException {
		
		System.out.println("searchAirLineAJAX run~" + searchAirLineVO);
		
		
		StringBuilder urlBuilder = new StringBuilder("http://apis.data.go.kr/B551177/StatusOfPassengerFlightsDSOdp/getPassengerArrivalsDSOdp"); /*URL*/
		String serviceKey = "CjAiz1amkVJUNEWgPQo963nHN3%2FmHY1CtYIrTr%2FbyYft8%2FW%2BxX%2Fa%2FMIaAmkR1WBGkxFz1LmAm0Z%2FXKzPCQaylw%3D%3D";
		
		urlBuilder.append("?" + URLEncoder.encode("serviceKey","UTF-8") + "=" + serviceKey); /*Service Key*/
        urlBuilder.append("&" + URLEncoder.encode("airport_code","UTF-8") + "=" + URLEncoder.encode("IAD", "UTF-8")); /*공항 코드*/
        urlBuilder.append("&" + URLEncoder.encode("type","UTF-8") + "=" + URLEncoder.encode("xml", "UTF-8")); /*응답유형 [xml, json] default=xml*/
        URL url = new URL(urlBuilder.toString());
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("GET");
        conn.setRequestProperty("Content-type", "application/json");
        System.out.println("Response code: " + conn.getResponseCode());
        BufferedReader rd;
        if(conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
            rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
        } else {
            rd = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
        }
        StringBuilder sb = new StringBuilder();
        String line;
        while ((line = rd.readLine()) != null) {
            sb.append(line);
        }
        rd.close();
        conn.disconnect();
        System.out.println(sb.toString());
		
		
		
		
		
	}
	
	

}
