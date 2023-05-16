package com.project.team.admin.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.project.team.admin.service.AdminService;
import com.project.team.admin.vo.AreaVO;

import jakarta.annotation.Resource;

@Controller
@RequestMapping("/admin")
public class AdminController {
	
	@Resource(name = "adminService")
	private AdminService adminService;
	
	//상품 등록 페이지(관리자 페이지 첫 화면)
	@GetMapping("/regItem")
	public String regItem() {
		
		return "content/admin/reg_item";
	}
	
	//여행지 카테고리 관리 페이지
	@GetMapping("/cateManage")
	public String cateManage(Model model) {
		
		//등록된 여행지 카테고리 조회
		model.addAttribute("areaCateList", adminService.getAreaCateList());
		
		return "content/admin/cate_manage";
		
	}
	
	//여행지 카테고리 등록
	@ResponseBody
	@PostMapping("/regAreaAjax")
	public void regArea(@RequestBody AreaVO areaVO) {
		//카테고리 등록
		adminService.regArea(areaVO);
	}
	
	//카테고리 삭제
	@GetMapping("/deleteAreaCate")
	public String deleteAreaCate(String areaCode) {
		adminService.deleteAreaCate(areaCode);
		
		return "redirect:/admin/cateManage";
	}
}
