package com.project.team.member.controller;

import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;

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

import com.project.team.buy.service.BuyService;
import com.project.team.buy.vo.BuyStateVO;
import com.project.team.buy.vo.BuyVO;
import com.project.team.member.service.MemberService;
import com.project.team.member.vo.MemberDetailVO;
import com.project.team.member.vo.MemberVO;
import com.project.team.util.DateUtil;

import jakarta.annotation.Resource;

@Controller
@RequestMapping("/myPage")
public class MyPageController {

	@Resource(name = "memberService")
	private MemberService memberService;
	
	@Autowired
	private PasswordEncoder encoder;
	
	@Resource(name = "buyService")
	private BuyService buyService;
	
	
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
	
	//비밀번호 변경 전 정보 확인 
	@PostMapping("/checkPwAJAX")
	@ResponseBody
	public boolean checkPwAjax(Model model, String checkPw, Authentication authentication) {
		// side 메뉴 리스트 
		//model.addAttribute("msMenuList", memberService.getMsMenuList());
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
	
	// 비밀번호 변경 
	@PostMapping("/changeMyPwFormAJAX")
	@ResponseBody
	public boolean changeMyPwFormAjax(Model model, String memId, String memPw, Authentication authentication) {
		// side 메뉴 리스트 
		//model.addAttribute("msMenuList", memberService.getMsMenuList());
		
		//기존의 비밀번호 
		String encodedPw = memberService.getMemPw(memId);
		System.out.println("@@회원의 DB에 등록된 비번 : " + encodedPw);
		
		// 비밀번호 암호화 전에 이전의 비밀번호와 같은지 비교 필요 
		Boolean result = encoder.matches(memPw, encodedPw);
		System.out.println("@@ 기존의 비밀번호와 일치한지 여부 : " + result);
		
		// 이전과 비밀번호가 일치한지에 대한 결과에 따라서 진행 
		if(!result) {
			// 비밀번호 암호화 
			String newPw = encoder.encode(memPw);
			
			//비밀번호 수정 쿼리 실행 
			MemberVO memberVO = new MemberVO();
			memberVO.setMemId(memId);
			memberVO.setMemPw(newPw);
			
			memberService.updateMemPw(memberVO);
			
			// 임시비밀번호 발급 여부 변경 
			memberService.updateIsTemporaryPwToN(memId);
			
			result = true;
		}
		else {
			
			result = false;			
		}
		
		return result;
	}
	
	
	// 내정보 수정 페이지로 이동 
	@GetMapping("/updateMyInfo")
	public String updateMyInfoPage(Model model, Authentication authentication) {
		// side 메뉴 리스트 
		model.addAttribute("msMenuList", memberService.getMsMenuList());
		
		MemberVO memInfo = memberService.getMemInfo(authentication.getName());
		System.out.println("@@ Info 정보 :" + memInfo);
		//회원 정보 
		model.addAttribute("memInfo", memInfo);
		
		return "content/member/myPage/update_my_info";
	}
	
	
	// 내정보 수정 
	@PostMapping("/updateMyInfoPage")
	public String updateMyInfo(Model model, MemberVO memberVO, MemberDetailVO memberDetailVO) {
		
		memberVO.setMemberDetailVO(memberDetailVO);
		
		memberService.updateMyInfo(memberVO, memberDetailVO);
		 
		return "redirect:/myPage/updateMyInfo";
	}
	

	
	//예약확인 페이지로 이동 
	@RequestMapping("/checkMyReservation")
	public String checkMyReservation(Model model, BuyVO buyVO, Authentication authentication) {
		
		// 오늘 날짜 
		String nowDate = DateUtil.getNowDateToString();
		// 이번 달의 첫번째 날짜
		String firstDate = DateUtil.getFirstDateOfMonth();
		
		// 로그인 정보 이용 -> memCode 가져오기 
		String memCode = memberService.getMemCode(authentication.getName());
		System.out.println("memCode : " + memCode);
		
		buyVO.setMemCode(memCode);
		
		// 구매상태 정보 조회 (상단바)
		List<BuyStateVO> buyStatusCodeCountList = memberService.getBuyStatusCount(buyVO);
		System.out.println(buyStatusCodeCountList);
		model.addAttribute("buyStatusCodeCountList", buyStatusCodeCountList);
		
		// 구매 내역 리스트 데이터 조회 
		List<BuyVO> buyList = memberService.getBuyList(buyVO);
		System.out.println("@@@@ 구매내역 조회 :" + buyList);
		model.addAttribute("buyList",buyList);
		
		// 넘어온 날짜 데이터 없을 경우 기본값으로 날짜 세팅
		if(buyVO.getFromDate() == null) {
			buyVO.setFromDate(firstDate);
		}
		if(buyVO.getToDate() == null) {
			buyVO.setToDate(nowDate);
		}
		
		
		// side 메뉴 리스트 
		model.addAttribute("msMenuList", memberService.getMsMenuList());
		
		return "content/member/myPage/check_my_reservation";
	}
	
	
	//예약취소 내역 확인 페이지로 이동 
	@GetMapping("/checkMyCancelation")
	public String checkMyCancelation(Model model) {
		// side 메뉴 리스트 
		model.addAttribute("msMenuList", memberService.getMsMenuList());
		
		return "content/member/myPage/check_my_cancelation";
	}
	
	
	// 1:1 문의 내역 페이지로 이동 
	@GetMapping("/checkMyRequest")
	public String checkMyRequest(Model model) {
		// side 메뉴 리스트 
		model.addAttribute("msMenuList", memberService.getMsMenuList());
		
		return "content/member/myPage/check_my_request";
	}
	
	
	
	// 나의 여행 후기 목록 페이지로 이동 
	@GetMapping("/checkMyReview")
	public String checkMyReview(Model model) {
		// side 메뉴 리스트 
		model.addAttribute("msMenuList", memberService.getMsMenuList());
		
		return "content/member/myPage/check_my_review";
	}
	
	
	
	
	
	
	
	
	
	
   
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
