package com.project.team.member.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.project.team.member.service.MemberService;

import jakarta.annotation.Resource;



@Controller
@RequestMapping("/member")
public class MemberController {
	
	@Resource(name = "memberService")
	private MemberService memberService;
	
	
	
	
	
	//회원가입 페이지로 이동 
	@GetMapping("/joinForm")
	public String joinForm() {
		return "content/member/join";
	}
	
	
	//아이디 중복 확인 
	@PostMapping("/isDuplicateMemId")
	@ResponseBody
	public boolean isDuplicateMemId(String memId) {
		return memberService.isDuplicateMemId(memId);
	}
	
	//회원가입 
	@PostMapping("/join")
	public String join() {
		
		return "";
	}
	
	
	
	
	

}
