package com.project.team.admin.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/admin")
public class AdminController {
	
	
	//상품 등록 페이지(관리자 페이지 첫 화면)
	@GetMapping("/regItem")
	public String regItem() {
		
		return "content/admin/reg_item";
	}
	
	//카테고리 관리 페이지
	@GetMapping("/cateManage")
	public String cateManage() {
		
		return "content/admin/cate_manage";
		
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	// ------------------ 심영홍 ------------- //
	
	// 1대1문의 관리 페이지
	@GetMapping("/requestManage")
	public String requestManage() {
		
		return "content/admin/request_manage";
		
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
}
