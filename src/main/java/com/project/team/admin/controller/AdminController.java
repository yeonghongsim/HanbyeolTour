package com.project.team.admin.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/admin")
public class AdminController {
	
	//상품관리 페이지
	@GetMapping("/itemManage")
	public String itemManage() {
		
		return "content/admin/item_manage";
		
	}
	
}
