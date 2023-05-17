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

import com.project.team.board.service.BoardService;
import com.project.team.board.vo.BoardAdminVO;
import com.project.team.util.DateUtil;

import jakarta.annotation.Resource;

@Controller
@RequestMapping("/admin")
public class AdminController {
	
	@Resource(name = "boardService")
	private BoardService boardService;
	@Resource(name = "adminService")
	private AdminService adminService;

	
	//상품 등록 페이지(관리자 페이지 첫 화면)
	@GetMapping("/regItem")
	public String regItem(Model model) {
		
		//여행지 카테고리 조회
		model.addAttribute("areaCateList", adminService.getAreaCateList());
		
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
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	// ------------------ 심영홍 ------------- //
	
	// 1대1문의 관리 페이지
	@GetMapping("/requestManage")
	public String requestManage(Model model) {
		
		model.addAttribute("typeRequestList", boardService.getTypeRequestList());
		
		return "content/admin/board/request_manage";
		
	}
	
	// 공지사항
	@GetMapping("/noticeManage")
	public String noticeManage(Model model) {
		
		model.addAttribute("boardNoticeList", adminService.getBoardNoticeList());
		
		return "content/admin/board/notice_manage";
		
	}
	
	// 공지글 등록 양식 페이지 이동
	@GetMapping("/regNoticeForm")
	public String regNoticeForm(Model model) {
		
		model.addAttribute("nowDate", DateUtil.getNowDateToString());
		
		return "content/admin/board/reg_notice_form";
		
	}
	
	// 공지글 등록 쿼리 실행
	@PostMapping("/regNotice")
	public String regNotice(BoardAdminVO boardAdminVO) {
		
		String noticeCode = adminService.getBoardNoticeCode();
		
		boardAdminVO.setHbtBoardAdminNum(noticeCode);
		System.out.println("@@@@@@@@" + boardAdminVO);
		return "redirect:/admin/noticeManage";
		
	}
	
	// 공지사항 상세 조회
	@GetMapping("/noticeDetail")
	public String noticeDetail() {
		
		
		return "content/admin/board/notice_detail";
		
	}
	
	// 공지글 정보 수정
	@GetMapping("/updateNoticeForm")
	public String updateNoticeForm() {
		
		return "content/admin/board/update_notice_form";
		
	}
	
	@GetMapping("/updateNotice")
	public String updateNotice() {
		
		return "redirect:/admin/updateNoticeForm";
	}
	
	
	// 공지글 삭제 쿼리
	@GetMapping("/deleteNotice")
	public String deleteNotice(String hbtBoardAdminNum) {
		System.out.println("@@@@@@" + hbtBoardAdminNum);
		
		return "redirect:/admin/noticeManage";
		
	}

}
