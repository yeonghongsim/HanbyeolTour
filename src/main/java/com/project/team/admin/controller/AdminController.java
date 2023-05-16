package com.project.team.admin.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.project.team.board.service.BoardService;

import jakarta.annotation.Resource;

@Controller
@RequestMapping("/admin")
public class AdminController {
	@Resource(name = "boardService")
	private BoardService boardService;
	
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
	public String requestManage(Model model) {
		
		model.addAttribute("typeRequestList", boardService.getTypeRequestList());
		
		return "content/admin/request_manage";
		
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
}
