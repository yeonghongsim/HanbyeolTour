package com.project.team.AirLine;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.project.team.AirLine.service.AirlineService;
import jakarta.annotation.Resource;
import kotlinx.serialization.json.JsonObject;
import org.json.JSONException;
import org.json.JSONObject;
import org.json.XML;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;


import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.List;
import java.util.Map;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.project.team.AirLine.vo.SearchAirLineVO;
import org.springframework.web.client.RestTemplate;

@Controller
@RequestMapping("/airline")
public class AirLineController {
	@Resource(name = "airlineService")
	private AirlineService airlineService;

	@GetMapping("/airline")
	public String airline(Model model){
		model.addAttribute("areaList", airlineService.getArea());

		return "content/airLine/air_line_index";
	}

	@PostMapping("/getNationalNamesAJAX")
	@ResponseBody
	public List<Map<String, Object>> getNationalNames(String areaName){

		return airlineService.getNationalNames(areaName);
	}

	//항공정보조회
	@PostMapping("/getFlightAJAX")
	@ResponseBody
	public String getFlightAJAX(String depAirport, String arrAirport, String depDate, String arrDate) throws IOException {

		System.out.println(depDate);
		System.out.println(arrDate);
		String result = getFlightAPI(depAirport, arrAirport, depDate);
		System.out.println(result);
		return result;
	}


	//항공데이터api 호출

	public String getFlightAPI(String depAirport, String arrAirport, String date) throws IOException
	{
		StringBuilder urlBuilder = new StringBuilder("http://openapi.airport.co.kr/service/rest/FlightScheduleList/getIflightScheduleList"); /*URL*/
		String serviceKey = "=CjAiz1amkVJUNEWgPQo963nHN3%2FmHY1CtYIrTr%2FbyYft8%2FW%2BxX%2Fa%2FMIaAmkR1WBGkxFz1LmAm0Z%2FXKzPCQaylw%3D%3D";

		urlBuilder.append("?" + URLEncoder.encode("serviceKey","UTF-8") + "=CjAiz1amkVJUNEWgPQo963nHN3%2FmHY1CtYIrTr%2FbyYft8%2FW%2BxX%2Fa%2FMIaAmkR1WBGkxFz1LmAm0Z%2FXKzPCQaylw%3D%3D"); /*Service Key*/
		urlBuilder.append("&" + URLEncoder.encode("schDate","UTF-8") + "=" + URLEncoder.encode(date, "UTF-8")); /*검색일자*/
		urlBuilder.append("&" + URLEncoder.encode("schDeptCityCode","UTF-8") + "=" + URLEncoder.encode(depAirport, "UTF-8")); /*출발 도시 코드*/
		urlBuilder.append("&" + URLEncoder.encode("schArrvCityCode","UTF-8") + "=" + URLEncoder.encode(arrAirport, "UTF-8")); /*도착 도시 코드*/
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


		JSONObject json = XML.toJSONObject(sb.toString());

		System.out.println(json.toString());

		return json.toString();
	}


}
