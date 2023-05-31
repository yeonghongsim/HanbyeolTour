package com.project.team.member.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.project.team.buy.service.BuyService;
import com.project.team.buy.vo.BuyStateVO;
import com.project.team.buy.vo.BuyVO;
import com.project.team.member.service.MemberService;
import com.project.team.member.vo.MemberDetailVO;
import com.project.team.member.vo.MemberVO;
import com.project.team.util.MailService;

import jakarta.annotation.Resource;
import jakarta.mail.Address;
import jakarta.mail.internet.AddressException;
import jakarta.mail.internet.InternetAddress;



@Controller
@RequestMapping("/member")
public class MemberController {
	
	@Resource(name = "memberService")
	private MemberService memberService;
	
	@Autowired
	private PasswordEncoder encoder;
	
	@Resource(name = "mailService")
	private MailService mailService;
	
	@Resource(name = "buyService")
	private BuyService buyService;
	
	//회원가입 페이지로 이동 
	@GetMapping("/join")
	public String joinForm() {
		return "content/member/join";
	}
	
	
	//아이디 중복 확인 
	@PostMapping("/isDuplicateMemIdAJAX")
	@ResponseBody
	public boolean isDuplicateMemId(String memId) {
		return memberService.isDuplicateMemId(memId);
	}
	
	//이메일 중복 확인 
	@PostMapping("/isDuplicateMemEmailAJAX")
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
		
		
		return "content/member/join_notice";
	}
	
	// 임시로 페이지 보기 위해 만들어 놓음 (회원가입 없이 페이지 보려고)
	@GetMapping("/notice")
	public String joinnotice() {
		return "content/member/join_notice";
	}
	
	

	//로그인 페이지로 이동 
	@GetMapping("/login")
	public String loginForm(){
		
		return "content/member/login";
	}
	
	//임시 비밀번호 발급 여부 판단 
	@PostMapping("/isTemporaryPwAJAX")
	@ResponseBody
	public String getIsTemporaryPw(String memId) {
		String isTemporaryPw = memberService.getIsTemporaryPw(memId);
		return isTemporaryPw;
	} 
	
	
	
	
	//아이디 찾기 페이지로 이동 
	@GetMapping("/findId")
	public String findIdForm() {
		
		return "content/member/find_id";
	}
	
	
	//아이디 찾기 
	@ResponseBody
	@PostMapping("/findIdAJAX")
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
	@PostMapping("/findPwAJAX")
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
			   
			   //4. 임시비밀번호 발급 여부 추가 
			   memberService.updateIsTemporaryPw(memberVO.getMemId());
			   		   
			   String name = memberVO.getMemName();
			   
			   
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
		
		
	//마이 페이지로 이동 
	@GetMapping("/infoManage")	
	public String infoManage(Model model, Authentication authentication) {
		//side menu 
		model.addAttribute("msMenuList", memberService.getMsMenuList());
		
		//회원 정보 
		MemberVO memInfo = memberService.getMemInfo(authentication.getName());
		model.addAttribute("memInfo", memInfo);
		String memCode = memberService.getMemCode(memInfo.getMemId());
		
		// 구매상태 코드 
		List<BuyVO> buyStatusCodeList = memberService.getBuyStatusCode(memCode);
		System.out.println("@@@@@" + buyStatusCodeList);
	    // model.addAttribute("buyStatusCodeList", buyStatusCodeList); // 속성의 이름을 지정해줌
		
		// buyStatusCodeList에 있는 BuyVO 객체들의 buyStatusCode 값을 추출하여 
		//새로운 List<Integer>인 statusCodeList에 저장
		List<Integer> statusCodeList = buyStatusCodeList.stream()
	            .map(BuyVO::getBuyStatusCode)
	            .collect(Collectors.toList());
		System.out.println("!!!!!!" + statusCodeList);
				
		
		//Map<Integer, Integer> buyStatusCodeCount = memberService.getBuyStatusCodeCount(statusCodeList);
	    //System.out.println(buyStatusCodeCount);
		//model.addAttribute("buyStatusCodeCount", buyStatusCodeCount);
		
		
		List<BuyStateVO> buyStatusCodeNameList = memberService.getBuyStatusCodeName();
		System.out.println("@@@ 이름 리스트:" + buyStatusCodeNameList);
		model.addAttribute("buyStatusCodeNameList", buyStatusCodeNameList);
		
		
		return "content/member/info_manage";
	
	}
	
	//휴대폰 번호 중복 확인 
	@PostMapping("/isDuplicateMemDTellAJAX")
	@ResponseBody
	public boolean isDuplicateMemDTell(String memDTell) {
		return memberService.isDuplicateMemDTell(memDTell);
	}
	
	
	
	
	
	
	/*---------- 심영홍 ------------*/
	@GetMapping("/checkMyRequest")
	public String checkMyRequest(Model model) {
		
		model.addAttribute("msMenuList", memberService.getMsMenuList());
		
		return "content/member/check_my_request";
	}

	

}
