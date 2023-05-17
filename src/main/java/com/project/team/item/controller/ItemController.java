package com.project.team.item.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

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
		
		
		model.addAttribute("tourItemList", itemService.getItemListByAreaName(areaName));
		
		
		return "content/item/tour_item_list_group";
	}
	
	//일자별 아이템 보기 페이지 이동
	@GetMapping("/tourItemListDate")
	public String tourItemListDate(String areaName, Model model) {
		
		
		//model.addAttribute("tourItemList", itemService.getItemListByAreaName(areaName));
		
		return "content/item/tour_item_list_date";
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
