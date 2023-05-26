package com.project.team.member.controller;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.project.team.member.service.MemberService;
import com.project.team.member.vo.MemberDetailVO;
import com.project.team.member.vo.MemberVO;

import jakarta.annotation.Resource;

@Controller
@RequestMapping("/myPage")
public class MyPageController {

	@Resource(name = "memberService")
	private MemberService memberService;
	
	@Autowired
	private PasswordEncoder encoder;
	
	
	
	// 회원 탈퇴 페이지로 이동 
	@GetMapping("/accountDeletion")
	public String accountDeletionPage(Model model) {
	
		// side 메뉴 리스트 
		model.addAttribute("msMenuList", memberService.getMsMenuList());
		
		return "content/member/myPage/account_deletion";
	}
	
	
	//탈퇴 기능 실행 
	@PostMapping("/accountDeletion")
	@ResponseBody
	public String accountDeletion(Model model, String memId) {
		// side 메뉴 리스트 
		model.addAttribute("msMenuList", memberService.getMsMenuList());
		
		//상태코드 변경 (2)
		memberService.updateMemStatusCodeTo2(memId);
		
		return "success";
	}
	
	
	//비밀번호 변경 페이지로 이동
	@GetMapping("/changeMyPwPage")
	public String changeMyPwPage(Model model) {
		// side 메뉴 리스트 
		model.addAttribute("msMenuList", memberService.getMsMenuList());
		
		return "content/member/myPage/check_pw";
	}
	
	//비밀번호 변경전 정보 확인 
	@PostMapping("/checkPwAJAX")
	@ResponseBody
	public boolean checkPwAjax(Model model, String checkPw, Authentication authentication) {
		// side 메뉴 리스트 
		model.addAttribute("msMenuList", memberService.getMsMenuList());
		System.out.println("@@ 인풋태그 입력값 : " + checkPw);
		
		//입력한 비밀번호 가져와서 암호화 처리 
		//String inputPw = encoder.encode(checkPw);
		//System.out.println("@@input에 입력한 비번 : " + inputPw);
		//암호화 된 비밀번호와 일치하는지 확인 
		// 무조건 () 안의 앞에는 암호화 되지 않은 입력값이 와야함!! 
		// ex)encoder.matches("1234", ss);//true, false
		String memId = authentication.getName();
		System.out.println("@@로그인한 사람 아이디 : " + memId);
		String encodedPw = memberService.getMemPw(memId);
		System.out.println("@@회원의 DB에 등록된 비번 : " + encodedPw);
		Boolean result = encoder.matches(checkPw, encodedPw);
		// 해결할것 : DB에 저장되어있는 비밀번호 데이터 가져오기 
		
		System.out.println(result);
				
		return result == true ? true : false;
	}
	
	// 새로운 비밀번호 입력 페이지로 이동
	@GetMapping("/changeMyPwForm")
	public String changeMyPwForm(Model model) {
		// side 메뉴 리스트 
		model.addAttribute("msMenuList", memberService.getMsMenuList());
		
		return "content/member/myPage/change_my_pw";
	}
	
	
	@PostMapping("/changeMyPwFormAJAX")
	@ResponseBody
	public String changeMyPwFormAjax(Model model, String memId, String memPw) {
		// side 메뉴 리스트 
		model.addAttribute("msMenuList", memberService.getMsMenuList());
		
		System.out.println("@@ 아이디 :" + memId);
		System.out.println("@@ 비밀번호 :" + memPw);
		// 비밀번호 암호화 
		String newPw = encoder.encode(memPw);
					
		//비밀번호 수정 쿼리 실행 
		MemberVO memberVO = new MemberVO();
		memberVO.setMemId(memId);
		memberVO.setMemPw(newPw);
		
		memberService.updateMemPw(memberVO);
		

		return "success";
	}
	
	
	

	
	
	
	
   
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
