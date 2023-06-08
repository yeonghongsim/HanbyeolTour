package com.project.team.admin.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.project.team.admin.service.AdminService;
import com.project.team.board.service.BoardService;
import com.project.team.member.service.MemberService;

import jakarta.annotation.Resource;

@Controller
@RequestMapping("/adminFirstPage")
public class AdminFirstPageController {
	@Resource(name = "boardService")
	private BoardService boardService;
	@Resource(name = "adminService")
	private AdminService adminService;
	@Resource(name = "memberService")
	private MemberService memberService;
	
	// 로그인 성공 후 관리자 인증 시 오는 관리자 첫 페이지
	@GetMapping("/")
	public String index() {
		return "content/admin/firstPage/first_page";
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	// 심영홍-------------------- //
	
	
	// --------------------//
	
}
