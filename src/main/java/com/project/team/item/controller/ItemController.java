package com.project.team.item.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/item")
public class ItemController {
	
	//그룹별 아이템 보기 페이지 이동
	@GetMapping("/tourItemList")
	public String tourItemList() {
		
		return "content/item/tour_item_list_grup";
	}
	
	//일자별 아이템 보기 페이지 이동
	@GetMapping("/tourItemListDate")
	public String tourItemListDate() {
		
		return "content/item/tour_item_list_date";
	}
	
	
	//패키지상품 메인페이지
	@GetMapping("/tourItemListMain")
	public String tourItemListMain() {
		
		return "conte"
				+ "nt/item/tour_item_list_main";
	}
	//패키지상품 메인페이지
	@GetMapping("/tourItemListDetail")
	public String tourItemListDetail() {
		
		return "content/item/tour_item_list_detail";
	}
	

}
