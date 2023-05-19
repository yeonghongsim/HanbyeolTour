package com.project.team.item.controller;

import java.util.HashMap;
import java.util.List;

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
		
		System.out.println("@@@@@@@@@@@" +areaName);
		
		model.addAttribute("tourItemList", itemService.getItemListByAreaName(areaName));
		model.addAttribute("areaName", areaName);
		
		
		return "content/item/tour_item_list_group";
	}
	
	//일자별 아이템 보기 페이지 이동
	@GetMapping("/tourItemListDate")
	public String tourItemListDate(String areaName, Model model) {
		
		List<HashMap<String, Object>> list = itemService.getItemListByAreaName(areaName);
		
		for(HashMap<String, Object> map : list) {
			String splitDate = map.get("TRAVER_PERIOD").toString().split("박")[1].split("일")[0];
			
			map.put("END_DATE", splitDate);
		}
		System.out.println(list);
		
		
		model.addAttribute("areaName", areaName);
		model.addAttribute("tourItemList", list);
		
		return "content/item/tour_item_list_date";
	}
	

	@PostMapping("/tourItemListDateAJAX")
	@ResponseBody
	public String tourItemListDateAJAX(String areaName, Model model) throws JsonProcessingException {
		
		System.out.println(areaName);
		model.addAttribute("tourItemList", itemService.getItemListByAreaName(areaName));
		
		List<HashMap<String, Object>> list = itemService.getItemListByAreaName(areaName);
		
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
