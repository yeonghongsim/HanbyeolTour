package com.project.team.item.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/item")
public class ItemController {
	
	@GetMapping("/tourItemList")
	public String tourItemList() {
		
		return "content/item/tour_item_list_grup";
	}
	

}
