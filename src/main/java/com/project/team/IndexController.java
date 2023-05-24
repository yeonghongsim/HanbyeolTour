package com.project.team;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.project.team.admin.service.AdminService;

import jakarta.annotation.Resource;

@Controller
public class IndexController {
	@Resource(name = "adminService")
	private AdminService adminService;
	
	@GetMapping("/")
	public String index(Model model) {

		//메인메뉴 이미지 조회
		model.addAttribute("mainSlideImg", adminService.getMainSlideImg());
		//추천 상품 목록 조회
		model.addAttribute("recomItem", adminService.getRecomItem());

		return "content/main/main_page";
	}
	
	//미인가 시 이동할 페이지 
	@GetMapping("/accessDeny")
	public String accessDeny() {
		return "content/access_deny";
	}
	
	
	
}
