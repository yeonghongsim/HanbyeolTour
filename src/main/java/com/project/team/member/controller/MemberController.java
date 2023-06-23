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

import com.project.team.board.vo.BoardRequestVO;
import com.project.team.board.vo.ReqReplyVO;
import com.project.team.buy.service.BuyService;
import com.project.team.buy.vo.BuyStateVO;
import com.project.team.buy.vo.BuyVO;
import com.project.team.item.vo.DiyTourVO;
import com.project.team.item.vo.ItemVO;
import com.project.team.member.service.MemberService;
import com.project.team.member.vo.MemberDetailVO;
import com.project.team.member.vo.MemberReviewVO;
import com.project.team.member.vo.MemberVO;
import com.project.team.util.MailService;
import com.project.team.util.MailVO;

import jakarta.annotation.Resource;
import jakarta.mail.Address;
import jakarta.mail.internet.AddressException;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;



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
		
	
	//회원가입시 인증 기능 
	@PostMapping("/emailCheckAJAX")
	@ResponseBody
	public String emailCheck(String memEmail) {
	
	  // 입력받은 이메일 주소
	  System.out.println("@@@ 입력받은 이메일 주소 : " + memEmail);
		
	  
		 if(memEmail != null) {
			// 이메일 인증 코드 생성 
			  String authCode = mailService.createKey();
			  
			  // 간단한 메일 발송 (실행할 떄 mailVO 전달받아야한다.(내용, 수신자 필요) 
			   MailVO mailVO = new MailVO();
			   mailVO.setTitle("한별투어 - 이메일 인증 코드가 전송되었습니다.");
			   List<String> emailList = new ArrayList<>(); //이메일 리스트 만들어주기 
			   emailList.add(memEmail);
			   System.out.println("@@@@@" + emailList);
			   mailVO.setRecipientList(emailList); //문자열 리스트 넣어줘야함.
			   mailVO.setContent("이메일 인증 코드 : " + authCode);// 메일 본문에는 암호화 안된 비번 보내기 
			   
			   mailService.sendSimpleEmail(mailVO); // 메일 전송 메소드 실행 
			 
			 return authCode;
		 } 
	  
		 return "fail";
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
	
	// 별점 
	private List<String> getStarIcons(List<Integer> starList) {
	    List<String> stars = new ArrayList<>();
	    
	    for (int rating : starList) {
	        StringBuilder star = new StringBuilder();
	        for (int i = 1; i <= 5; i++) {
	            if (i <= rating) {
	                star.append("<i class=\"bi bi-star-fill\"></i>"); // 별 아이콘
	            } else {
	                star.append("<i class=\"bi bi-star\"></i>"); // 빈 별 아이콘
	            }
	        }
	        stars.add(star.toString());
	    }
	    return stars;
	}

	
		
	//마이 페이지로 이동 
	@GetMapping("/infoManage")	
	public String infoManage(Model model, Authentication authentication, ReqReplyVO reqReplyVO) {
				
		//회원 정보 
		MemberVO memInfo = memberService.getMemInfo(authentication.getName());
		model.addAttribute("memInfo", memInfo);
		String memCode = memberService.getMemCode(memInfo.getMemId());
		
		// 1개월 내 구매상태 정보 조회 - 일반 
		List<BuyStateVO> buyStatusInOneMonthList = memberService.getBuyStatusInOneMonth(memCode);
		System.out.println(buyStatusInOneMonthList);
		model.addAttribute("buyStatusInOneMonthList", buyStatusInOneMonthList);
		
		//1개월 내 구매 관련 정보 리스트 - 일반 
		List<BuyVO> buyListInOneMonth = memberService.getBuyListInOneMonth(memCode);
		System.out.println("@@@ 1개월 이내 예약 리스트 : " + buyListInOneMonth);
		model.addAttribute("buyListInOneMonth", buyListInOneMonth);
		
		// 1개월 내 DIY 구매상태 정보 조회 
		List<BuyStateVO> diyStatusInOneMonthList = memberService.getDiyStatusInOneMonth(memCode);
		System.out.println(diyStatusInOneMonthList);
		model.addAttribute("diyStatusInOneMonthList", diyStatusInOneMonthList);
		
		//1개월 내 구매 관련 정보 리스트 - DIY 
		List<DiyTourVO> diyListInOneMonth = memberService.getDiyTourListInOneMonth(memCode);
		System.out.println(diyListInOneMonth);
		model.addAttribute("diyListInOneMonth", diyListInOneMonth);
		
		//문의 내역 조회 
		List<BoardRequestVO> qnaList =  memberService.getQnaList(memCode);
		System.out.println("*** qnaList : " + qnaList);
		
		// 상품 정보 조회를 위한 itemCodeList
		List<String> itemCodeList = new ArrayList<>();
		for (BoardRequestVO question : qnaList) {
			if(question.getItemVO()!= null) {
				itemCodeList.add(question.getItemVO().getItemCode());
			}
		}
		System.out.println("*** itemCodeList : " + itemCodeList);
		// 아이템 상세 정보 조회
		List<ItemVO> itemDetailList = new ArrayList<>();
		for (String itemCode : itemCodeList) {
		    ItemVO itemDetail = memberService.getItemDetailForQna(itemCode);
		    itemDetailList.add(itemDetail);
		}
		System.out.println("*** itemDetailList : " + itemDetailList);
		
		// 답변 조회 
		List<ReqReplyVO> qnaReplyList = memberService.getQnaReplyList(memCode);
		
		//1:1 문의 관련 데이터 
		Map<String, Object> qnaMap = new HashMap<>();
		qnaMap.put("qnaList", qnaList);
		qnaMap.put("qnaReplyList", qnaReplyList);
		qnaMap.put("itemDetailList", itemDetailList);
		
		model.addAttribute("qnaMap", qnaMap);
		System.out.println("*** MAP DATA : " + qnaMap);

		// 리뷰 리스트 
		model.addAttribute("reviewList", memberService.getMyPageReviewList(memCode));
		List<MemberReviewVO> reviewList = memberService.getMyPageReviewList(memCode);
		// 리뷰 - 별점 
		List<Integer> starList = new ArrayList<>();
		for(MemberReviewVO review : reviewList) {
			starList.add(review.getStars());
		}
		
		List<String> starIcons = getStarIcons(starList);
		model.addAttribute("starList", starList);
		model.addAttribute("starIcons", starIcons);
		
		
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
		
		
		return "content/member/check_my_request";
	}

	

}
