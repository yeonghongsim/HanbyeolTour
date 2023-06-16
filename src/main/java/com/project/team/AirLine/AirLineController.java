package com.project.team.AirLine;

import com.project.team.AirLine.service.AirlineService;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.List;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.project.team.AirLine.vo.SearchAirLineVO;

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
	public List<String> getNationalNames(String areaName){

		return airlineService.getNationalNames(areaName);
	}
	
	@ResponseBody
	@PostMapping("/searchAirLineAJAX")
	public void searchAirLineAJAX(SearchAirLineVO searchAirLineVO) throws IOException {

        //네이버항공권주소 임시저장
        String temp = "https://flight.naver.com/flights/international/ICN-SGN-20230627/SGN-ICN-20230630?adult=1&fareType=Y";
	}


}
