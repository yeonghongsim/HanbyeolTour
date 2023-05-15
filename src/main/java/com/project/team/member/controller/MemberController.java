package com.project.team.member.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;



@Controller
@RequestMapping("/member")
public class MemberController {

	//회원가입 페이지로 이동 
	@GetMapping("/join")
	public String joinForm() {
		
		return "content/member/join";
	}
	
	
	
	

}
