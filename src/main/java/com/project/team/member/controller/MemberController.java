package com.project.team.member.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.project.team.member.service.MemberService;
import com.project.team.member.vo.MemberDetailVO;
import com.project.team.member.vo.MemberVO;

import jakarta.annotation.Resource;



@Controller
@RequestMapping("/member")
public class MemberController {
	
	@Resource(name = "memberService")
	private MemberService memberService;
	
	@Autowired
	private PasswordEncoder encoder;
	
	
	
	
	//회원가입 페이지로 이동 
	@GetMapping("/join")
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
	public String join(MemberVO memberVO, MemberDetailVO memberDetailVO) {
		//비밀번호 암호화 
		String encodedPw = encoder.encode(memberVO.getMemPw());
		memberVO.setMemPw(encodedPw);
		
		System.out.println("@@@@@@" + memberVO);
		System.out.println("@@@@@@" + memberDetailVO);
		memberVO.setMemberDetailVO(memberDetailVO);
		
		memberService.join(memberVO, memberDetailVO);
		
		
		return "redirect:/member/login";
	}
	
	

	//로그인 페이지로 이동 
	@GetMapping("/login")
	public String loginForm(MemberVO memberVO, Model model
			, @RequestParam(required = false) String eMsg
			, @RequestParam(required = false, defaultValue = "false") String isError) {
		
		// 가져온 데이터 (로그인 실패시에만 발생 ) 을 전달해주기 
		model.addAttribute("eMsg", eMsg);
		model.addAttribute("isError", isError);
		
		return "content/member/login";
	}
	
	

	
	
	
	
	
	
	
	
	

}
