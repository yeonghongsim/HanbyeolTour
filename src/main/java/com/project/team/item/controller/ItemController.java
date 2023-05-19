package com.project.team.item.controller;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.team.item.service.ItemService;

import jakarta.annotation.Resource;

@Controller
@RequestMapping("/item")
public class ItemController {
	@Resource(name = "itemService")
	private ItemService itemService;
	
	//그룹별 아이템 보기 페이지 이동
	@GetMapping("/tourItemListGroup")
	public String tourItemList(String areaName, Model model) {

		Map<String, String> searchKeyword = new HashMap<>();
		
		searchKeyword.put("areaName", areaName);
		model.addAttribute("tourItemList", itemService.getItemListByAreaName(searchKeyword));
		model.addAttribute("areaName", areaName);
		
		
		return "content/item/tour_item_list_group";
	}
	
	//일자별 아이템 보기 페이지 이동
	@GetMapping("/tourItemListDate")
	public String tourItemListDate(String areaName, Model model) {
		//날짜형식변환
		DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		
		Map<String, String> searchKeyword = new HashMap<>();
		
		searchKeyword.put("areaName", areaName);
		
		//일자별 상세조회
		List<HashMap<String, Object>> list = itemService.getItemListByAreaName(searchKeyword);
		
		//도착일자설정
		for(HashMap<String, Object> map : list) {
			//날짜초기화
			Calendar depDate = Calendar.getInstance();
			Calendar setArrDate = Calendar.getInstance();
			//출발일 오늘 날짜로 넣기
			map.put("DEP_DATE", dateFormat.format(depDate.getTime()));
			
			//오늘날짜에 여행기간만큼더하기
			String splitDate = map.get("TRAVER_PERIOD").toString().split("박")[1].split("일")[0];
			setArrDate.add(Calendar.DATE, Integer.parseInt(splitDate));
			map.put("ARR_DATE", dateFormat.format(setArrDate.getTime()));
		}
		
		
		model.addAttribute("areaName", areaName);
		model.addAttribute("tourItemList", list);
		
		return "content/item/tour_item_list_date";
	}
	

	@PostMapping("/tourItemListDateAJAX")
	@ResponseBody
	public String tourItemListDateAJAX(String areaName, Date searchDate ,Model model) throws JsonProcessingException {
		
		DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		//잘짜형식 문자열 형식으로 변환
		String setDate = dateFormat.format(searchDate);
		
		Map<String, String> searchKeyword = new HashMap<>();
		
		searchKeyword.put("areaName", areaName);
		searchKeyword.put("date", setDate);
		
		//쿼리조회
		List<HashMap<String, Object>> list = itemService.getItemListByAreaName(searchKeyword);
		
		for(HashMap<String, Object> map : list) {
			//날짜초기화
			Calendar setArrDate = Calendar.getInstance();
			//출발일 검색일자로 넣기
			map.put("DEP_DATE", setDate);
			
			//출발일자에 여행기간만큼더하기
			String splitDate = map.get("TRAVER_PERIOD").toString().split("박")[1].split("일")[0];
			
			setArrDate.setTime(searchDate);
			setArrDate.add(Calendar.DATE, Integer.parseInt(splitDate));
			map.put("ARR_DATE", dateFormat.format(setArrDate.getTime()));
		}
		
		
		
		ObjectMapper mapper = new ObjectMapper();
		return mapper.writeValueAsString(list);
	}
	
	
	//패키지상품 메인페이지
	@GetMapping("/tourItemListMain")
	public String tourItemListMain() {
		
		return "content/item/tour_item_list_main";
	}
	//패키지상품 상세페이지
	@GetMapping("/tourItemListDetail")
	public String tourItemListDetail() {
		
		return "content/item/tour_item_list_detail";
	}
	

}
