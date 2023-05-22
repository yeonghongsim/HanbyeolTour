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

import com.project.team.admin.service.AdminService;
import com.project.team.member.service.MemberService;
import com.project.team.member.vo.MemberDetailVO;
import com.project.team.member.vo.MemberVO;
import com.project.team.util.MailService;
import com.project.team.util.MailVO;

import jakarta.annotation.Resource;
import jakarta.mail.Address;
import jakarta.mail.internet.AddressException;
import jakarta.mail.internet.InternetAddress;



@Controller
@RequestMapping("/member")
public class MemberController {
	@Resource(name = "adminService")
	private AdminService adminService;
	
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
	
	//이메일 중복 확인 
	@PostMapping("/isDuplicateMemEmail")
	@ResponseBody
	public boolean isDuplicateMemEmail(String memEmail) {
		return memberService.isDuplicateMemEmail(memEmail);
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
	public boolean findPwAjax(MemberVO memberVO, MemberDetailVO memberDetailVO) throws AddressException {
		
		memberVO.setMemberDetailVO(memberDetailVO);
		
		//이메일 주소 조회
		String memEmail = memberService.getMemEmailForFindPw(memberVO);
		
		System.out.println(memEmail);
		
		 if(memEmail != null) {
			   
			 //메일 발송 전에 임시 비밀번호를 DB에 비밀번호로 저장을 해주기 
			   //1. 임시비밀번호 생성 
			   String temporaryPw = mailService.createRandomPw();
			   //2. 암호화 
			   String encodedPw = encoder.encode(temporaryPw);
			   memberVO.setMemPw(encodedPw);
			   //3. 임시비밀번호로 비밀번호 DB 수정
			   memberService.updateMemPw(memberVO); 
			   
			   String name = memberVO.getMemName();
			   System.out.println("!!!!!"+name);
			   
			   
			   // 간단한 메일 발송 (실행할 떄 mailVO 전달받아야한다.(내용, 수신자 필요) 
//			   MailVO mailVO = new MailVO();
//			   mailVO.setTitle("한별투어 - 임시 비밀번호가 전송되었습니다.");
//			   List<String> emailList = new ArrayList<>(); //이메일 리스트 만들어주기 
//			   emailList.add(memEmail);
//			   System.out.println("@@@@@" + emailList);
//			   mailVO.setRecipientList(emailList); //문자열 리스트 넣어줘야함.
//			   mailVO.setContent("임시 비밀번호 : " + temporaryPw);// 메일 본문에는 암호화 안된 비번 보내기 
//			   mailService.sendSimpleEmail(mailVO); // 메일 전송 메소드 실행 
			   
			   
			   // HTML 메일 발송 
			   List<String> emailList = new ArrayList<>(); //이메일 리스트 만들어주기 
			   emailList.add(memEmail);
			   System.out.println("@@@@@" + emailList);
			   
			   //emailList -> address[] 형태, InternetAddress 객체로 변환
			   Address[] recipientAddresses = new InternetAddress[emailList.size()];
			   for (int i = 0; i < emailList.size(); i++) {
			       recipientAddresses[i] = new InternetAddress(emailList.get(i));
			   }
			   			   
			   mailService.sendHTMLEmail(recipientAddresses, temporaryPw, name);
			  
			   
			   return true;
		   }
		   	   
		   return false;
	}
		
		
	
	
	
	// 회원 정보 관리 / 마이페이지
	@GetMapping("/infoManage")
	public String infoManage(Model model) {
		
		//메인페이지 열릴때 해외패키지 하위메뉴 조회
		model.addAttribute("locMenuList", adminService.getAreaCateList());
		
		// 회원 사이드 메뉴 조회
		model.addAttribute("msMenuList", memberService.getMsMenuList());
		
		return "content/member/info_manage";
		
		
	}
	
	
	
	
	
	

}
