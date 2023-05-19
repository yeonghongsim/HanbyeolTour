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
		
		//메인페이지 열릴때 해외패키지 하위메뉴 조회
		model.addAttribute("locMenuList", adminService.getAreaCateList());
		
		return "content/main/main_page";
	}
	
	
	
	
	
}
