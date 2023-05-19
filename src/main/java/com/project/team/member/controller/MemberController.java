package com.project.team.member.controller;

import java.util.ArrayList;
import java.util.List;

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
import com.project.team.util.MailService;
import com.project.team.util.MailVO;

import jakarta.annotation.Resource;



@Controller
@RequestMapping("/member")
public class MemberController {
	
	@Resource(name = "memberService")
	private MemberService memberService;
	
	@Autowired
	private PasswordEncoder encoder;
	
	@Resource(name = "mailService")
	private MailService mailService;
	
	
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
	public String loginForm(){
		
		return "content/member/login";
	}
	
	//아이디 찾기 페이지로 이동 
	@GetMapping("/findId")
	public String findIdForm() {
		
		return "content/member/find_id";
	}
	
	
	//아이디 찾기 
	@ResponseBody
	@PostMapping("/findIdAjax")
	public MemberVO findIdAjax(MemberVO memberVO, MemberDetailVO memberDetailVO) {
		memberVO.setMemberDetailVO(memberDetailVO);
		String memId = memberService.findId(memberVO);
		System.out.println(memId);
		System.out.println(memberVO.getMemName());
		String memName= memberVO.getMemName();
		
		memberVO.setMemId(memId);
		memberVO.setMemName(memName);
		
		return memberVO;
	}
	
	
	
	//비밀번호 찾기 페이지로 이동 
	@GetMapping("/findPw")
	public String findPwAjax() {
		
		return "content/member/find_pw";
	}
	
	
	//비밀번호 찾기 
	@ResponseBody
	@PostMapping("/findPwAjax")
	public boolean findPwAjax(MemberVO memberVO, MemberDetailVO memberDetailVO) {
		
		memberVO.setMemberDetailVO(memberDetailVO);
		
		//이메일 주소 조회
		String memEmail = memberService.getMemEmailForFindPw(memberVO);
		
		 if(memEmail != null) {
			   //메일 발송 전에 임시 비밀번호를 DB에 비밀번호로 저장을 해주기 
			   //1. 임시비밀번호 생성 
			   String temporaryPw = mailService.createRandomPw();
			   //2. 암호화 
			   String encodedPw = encoder.encode(temporaryPw);
			   memberVO.setMemPw(encodedPw);
			   
			   
			   // 빈 값에는 아이디, 비밀번호 채워야함 
			   // 이미 입력한 아이디 값은 들어있다. getMemEmail 메소드 덕분에 
			   memberService.updateMemPw(memberVO); 
			   
			   // 간단한 메일 발송 (실행할 떄 mailVO 전달받아야한다.(내용, 수신자 필요) 
			   MailVO mailVO = new MailVO();
			   mailVO.setTitle("한별투어 - 임시 비밀번호가 전송되었습니다.");
			   
			   List<String> emailList = new ArrayList<>(); //이메일 리스트 만들어주기 
			   emailList.add(memEmail);
			   
			   
			   mailVO.setRecipientList(emailList); //문자열 리스트 넣어줘야함.
			   mailVO.setContent("임시 비밀번호 : " + temporaryPw);// 메일 본문에는 암호화 안된 비번 보내기 
			    
			   
			   mailService.sendSimpleEmail(mailVO);
			   
		   }
		   	   
		   return memEmail != null ? true : false;
		
	}
		
		
		
		
		
		
		
//		String memPw = memberService.findPw(memberVO);
//		System.out.println(memPw);
//		
//		System.out.println(memberVO.getMemId());
//		System.out.println(memberVO.getMemName());
//		
//		String memId = memberVO.getMemId();
//		String memName = memberVO.getMemName();
//		
//		memberVO.setMemId(memId);
//		memberVO.setMemName(memName);
//		memberVO.setMemPw(memPw);
		

	
	
	
	
	
	
	
	
	
	
	

}
