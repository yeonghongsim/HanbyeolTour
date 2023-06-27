package com.project.team.member.controller;

import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;
import java.time.Month;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.Calendar;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.team.admin.vo.HotelImgVO;
import com.project.team.admin.vo.HotelVO;
import com.project.team.admin.vo.ImgVO;
import com.project.team.admin.vo.TourImgVO;
import com.project.team.admin.vo.TourItemImgVO;
import com.project.team.admin.vo.TourItemVO;
import com.project.team.board.service.BoardService;
import com.project.team.board.vo.BoardRequestVO;
import com.project.team.buy.service.BuyService;
import com.project.team.buy.vo.BuyDetailVO;
import com.project.team.buy.vo.BuySearchVO;
import com.project.team.buy.vo.BuyStateVO;
import com.project.team.buy.vo.BuyVO;
import com.project.team.item.service.ItemService;
import com.project.team.item.vo.DiyDetailVO;
import com.project.team.item.vo.DiyTourVO;
import com.project.team.item.vo.ItemVO;
import com.project.team.member.service.MemberService;
import com.project.team.member.vo.CartVO;
import com.project.team.member.vo.MemberDetailVO;
import com.project.team.member.vo.MemberReviewVO;
import com.project.team.member.vo.MemberSideMenuVO;
import com.project.team.member.vo.MemberVO;
import com.project.team.util.DateUtil;

import io.grpc.Context.Key;
import jakarta.annotation.Resource;
import kotlin.jvm.internal.Lambda;

@Controller
@RequestMapping("/myPage")
public class MyPageController {

	@Resource(name = "memberService")
	private MemberService memberService;
	
	@Autowired
	private PasswordEncoder encoder;
	
	@Resource(name = "buyService")
	private BuyService buyService;
	
	@Resource(name = "boardService")
	private BoardService boardService;
	
	@Resource(name = "itemService")
	private ItemService itemService;
	
	// 회원 탈퇴 페이지로 이동 
	@GetMapping("/accountDeletion")
	public String accountDeletionPage(Model model) {
		// sideMenu colorActivate를 위한 msMenuCode 
		model.addAttribute("msMenuCode", "MS_MENU_008");
		
		return "content/member/myPage/account_deletion";
	}
	
	
	//탈퇴 기능 실행 
	@PostMapping("/accountDeletionAJAX")
	@ResponseBody
	public String accountDeletion(Model model, String memId) {
		//상태코드 변경 (2)
		memberService.updateMemStatusCodeTo2(memId);
		
		return "success";
	}
	
	
	//비밀번호 변경 페이지로 이동
	@GetMapping("/changeMyPwPage")
	public String changeMyPwPage(Model model) {
		// sideMenu colorActivate를 위한 msMenuCode 
		model.addAttribute("msMenuCode", "MS_MENU_007");
		
		return "content/member/myPage/check_pw";
	}
	
	//비밀번호 변경 전 정보 확인 
	@PostMapping("/checkPwAJAX")
	@ResponseBody
	public boolean checkPwAjax(Model model, String checkPw, Authentication authentication) {
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
		// sideMenu colorActivate를 위한 msMenuCode 
		model.addAttribute("msMenuCode", "MS_MENU_007");
		
		return "content/member/myPage/change_my_pw";
	}
	
	// 비밀번호 변경 
	@PostMapping("/changeMyPwFormAJAX")
	@ResponseBody
	public boolean changeMyPwFormAjax(Model model, String memId, String memPw, Authentication authentication) {
				
		//기존의 비밀번호 
		String encodedPw = memberService.getMemPw(memId);
		System.out.println("@@회원의 DB에 등록된 비번 : " + encodedPw);
		
		// 비밀번호 암호화 전에 이전의 비밀번호와 같은지 비교 필요 
		Boolean result = encoder.matches(memPw, encodedPw);
		System.out.println("바꾸고자 하는 비밀번호 : " + memPw);
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
		// sideMenu colorActivate를 위한 msMenuCode 
		model.addAttribute("msMenuCode", "MS_MENU_006");
		
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
	
	// 일반 패키지 - 예약 확인 페이지 
	@RequestMapping("/checkMyReservation")
	public String checkMyReservation(Model model, BuySearchVO buySearchVO, Authentication authentication) {
		//memCode 
		String memCode = memberService.getMemCode(authentication.getName());
		buySearchVO.setMemCode(memCode);
		
		//페이징 세팅에 필요한 정보 세팅 
		System.out.println("buySearchVO : " + buySearchVO);
		
		// 개월 수 조건 세팅 (날짜 세팅)
		// 전체 :  전체 누르면 공백이라서 날짜 조건 쿼리에서 안 탐 
		if(buySearchVO.getMonth() == 1) {
			buySearchVO.setFromDate("");
			buySearchVO.setToDate("");
		}
		if(buySearchVO.getMonth() < 0) {
			buySearchVO.setFromDate(getMonthDate(buySearchVO.getMonth()));
			buySearchVO.setToDate(getMonthDate(0));
		}
		
		buySearchVO.setDisplayCnt(6);
		buySearchVO.setDisplayPageCnt(5);
		
		// 검색 데이터 갯수 조회 
		int totalDataCnt = memberService.getBuyListCount(buySearchVO);
		buySearchVO.setTotalDataCnt(totalDataCnt);
		// 페이징 세팅 
		buySearchVO.setPageInfo();
		
		//상단바 조회
		model.addAttribute("buyStatusCodeCountList" ,memberService.getBuyStatusCount(buySearchVO)); 
		
		//diy 패키지 구매 리스트 
		model.addAttribute("buyList", memberService.getBuyList(buySearchVO)); 
		
		// sideMenu colorActivate를 위한 msMenuCode 
		model.addAttribute("msMenuCode", "MS_MENU_001");
		
		
		return "content/member/myPage/check_my_reservation";
	}
	
	//일반 패키지 - 예약 취소 처리 AJAX 
	@PostMapping("/cancelReservationAJAX")
	@ResponseBody
	public String cancelReservationAJAX(String buyCode) {
		memberService.cancelReservation(buyCode);
		
		return "success";
	}
	

	//일반 패키지 - 예약 상세 페이지로 이동 
	@GetMapping("/reservationDetail")
	public String reservationDetail(Model model, String buyCode, BuyVO buyVO, Authentication authentication) {
		// sideMenu colorActivate를 위한 msMenuCode 
		model.addAttribute("msMenuCode", "MS_MENU_001");
		
		// id, buyCode set 
		buyVO.setBuyCode(buyCode);
		String memCode = memberService.getMemCode(authentication.getName());
		buyVO.setMemCode(memCode);
		
		model.addAttribute("buyDetail", memberService.getBuyDetail(buyVO));
			
		return"content/member/myPage/reservation_detail";
	}
	
	// 일반패키지 - 예약 상세 페이지 - 예약 취소 
	@GetMapping("/cancelReservation")
	public String cancelReservation(Model model , String buyCode) {
		System.out.println("@@@@@ 전달받은 buyCode :" + buyCode);
		//예약 취소
		memberService.cancelReservation(buyCode);
		
		return "redirect:/myPage/reservationDetail?buyCode=" + buyCode;

	}
	
	//날짜 구하기 
	 public static String getMonthDate(int num) {
	        LocalDate today = LocalDate.now();
	        LocalDate targetDate = today.plusMonths(num);
	        
	        return targetDate.toString();
	    }
	
	
	// DIY 패키지 예약 확인 페이지 
	@RequestMapping("/checkDiyReservation")
	public String checkDiyReservation(Model model, Authentication authentication, BuySearchVO buySearchVO) {
		//memCode 
		String memCode = memberService.getMemCode(authentication.getName());
		buySearchVO.setMemCode(memCode);
		
		//페이징 세팅에 필요한 정보 세팅 
		System.out.println("buySearchVO : " + buySearchVO);
		
		// 개월 수 조건 세팅 (날짜 세팅)
		// 전체 :  전체 누르면 공백이라서 날짜 조건 쿼리에서 안 탐 
		if(buySearchVO.getMonth() == 1) {
			buySearchVO.setFromDate("");
			buySearchVO.setToDate("");
		}
		if(buySearchVO.getMonth() < 0) {
			buySearchVO.setFromDate(getMonthDate(buySearchVO.getMonth()));
			buySearchVO.setToDate(getMonthDate(0));
		}
		
		buySearchVO.setDisplayCnt(6);
		buySearchVO.setDisplayPageCnt(5);
		
		// 검색 데이터 갯수 조회 
		int totalDataCnt = memberService.getDiyListCnt(buySearchVO);
		buySearchVO.setTotalDataCnt(totalDataCnt);
		// 페이징 세팅 
		buySearchVO.setPageInfo();
		
		//상단바 조회
		model.addAttribute("diyStatusCountList" ,memberService.getDiyStatusCountList(buySearchVO)); 
		//diy 패키지 구매 리스트 
		model.addAttribute("diyTourList", memberService.getDiyTourList(buySearchVO)); 
		
		// sideMenu colorActivate를 위한 msMenuCode 
		model.addAttribute("msMenuCode", "MS_MENU_002");
		
		return "content/member/myPage/check_diy_reservation";
	}
	
	
	// DIY 예약 상세 페이지로 이동 
	@GetMapping("/diyDetail")
	public String diyDetail(Model model, String hbtDiyCode, Authentication authentication) {
		// sideMenu colorActivate를 위한 msMenuCode 
		model.addAttribute("msMenuCode", "MS_MENU_002");
		
		String memCode = memberService.getMemCode(authentication.getName());
		
		// 상단 예약 정보리스트 
		model.addAttribute("tourDetail",  memberService.getDiyTourByDiyCode(hbtDiyCode));
		System.out.println("예약 정보간단히 : " + memberService.getDiyTourByDiyCode(hbtDiyCode));
		 
		//예약자 정보 
		model.addAttribute("memInfo", memberService.getMemInfo(authentication.getName()));
				
		// ditList ver.1
		List<DiyTourVO> originDiyList =  memberService.getDiyDetaiList(hbtDiyCode);
		System.out.println("HERE!!!! : " +originDiyList);
		// 전체 여행 일자 
		int travelPeriod = Integer.parseInt(originDiyList.get(0).getTraverPeriod());
		
		//일자별 호텔과 투어 정보 가져오기 위한 List 
		List<DiyDetailVO> detailList = memberService.getDiyDetaiListNew(hbtDiyCode);
		System.out.println(detailList);
				
		//없는 일자 추가한 리스트 생성 
		List<DiyDetailVO> resultList = new ArrayList<>();
		
		// 1부터 travelPeriod까지 반복
		for (int i = 1; i <= travelPeriod; i++) {
		    boolean found = false;
		    
		    // detailList에서 현재 i와 동일한 hbtDiyDay를 가진 DiyDetailVO를 찾음
		    for (DiyDetailVO diyDetailVO : detailList) {
		        int hbtDiyDay = Integer.parseInt(diyDetailVO.getHbtDiyDay());

		        if (hbtDiyDay == i) {
		            found = true;
		            resultList.add(diyDetailVO);
		            break; // 동일한 hbtDiyDay를 가진 DiyDetailVO를 찾았으므로 더 이상 반복할 필요가 없음
		        }
		    }
		    // 현재 i와 동일한 hbtDiyDay를 가진 DiyDetailVO가 없는 경우
		    if (!found) {
		        DiyDetailVO nullVO = new DiyDetailVO();
		        nullVO.setHbtDiyCode(hbtDiyCode);
		        nullVO.setHbtDiyDay(String.valueOf(i));

		        resultList.add(nullVO);
		    }
		}
		
		System.out.println("***** resultList : " + resultList);
		model.addAttribute("resultList", resultList);
		
		
		//호텔 정보 리스트 
		List<DiyTourVO> hotelInfoList = memberService.getInDiyHotelInfoList(hbtDiyCode);
		System.out.println("HOTEL :" + hotelInfoList);
		
		for (DiyTourVO diyTour : hotelInfoList) {
		    for (DiyDetailVO detail : diyTour.getDiyDetailList()) {
		        List<HotelVO> hotelList = detail.getHotelList();
		        String hbtHotelCode = hotelList.get(0).getHbtHotelCode();
		        
		        // 이미지 정보 조회 및 매핑
		        List<HotelImgVO> hotelImgList = memberService.getDiyHotelImgList(hbtHotelCode);
		        hotelList.get(0).setHotelImgList(hotelImgList);
		    }
		}
		
		model.addAttribute("hotelInfoList", hotelInfoList);
		
		
		//투어 정보 리스트 
		List<DiyTourVO> tourInfoList = memberService.getInDiyTourInfoList(hbtDiyCode);
		System.out.println("ver 1 @@@@"+ tourInfoList);
		for (DiyTourVO diyTour : tourInfoList) {
		    for (DiyDetailVO detail : diyTour.getDiyDetailList()) {
		        List<TourItemVO> tourList = detail.getTourItemList();
		        String hbtTourItemCode = tourList.get(0).getHbtTourItemCode();
		        
		     // 이미지 정보 조회 및 매핑
		        List<TourItemImgVO> tourImgList = memberService.getDiyTourImgList(hbtTourItemCode);
		        tourList.get(0).setTourItemImgList(tourImgList);
		    }
		}
		
		model.addAttribute("tourInfoList", tourInfoList);
		System.out.println("@@@@투어"+ tourInfoList);
		
		return"content/member/myPage/diy_detail";
	}
	
	
	//diy 예약 취소 
	@PostMapping("/cancelDiyReservationAJAX")
	@ResponseBody
	public String cancelDiyReservation(String hbtDiyCode){
		
        memberService.cancelDiyReservation(hbtDiyCode);
        return "success";
	}

	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	//----------------------------------------------------------
	
	
	//예약취소 내역 확인 페이지로 이동 -- 사용하지 않음 (추후 삭제 예정 
//	@GetMapping("/checkMyCancelation")
//	public String checkMyCancelation(Model model) {
//		// sideMenu colorActivate를 위한 msMenuCode 
//		model.addAttribute("msMenuCode", "MS_MENU_002");
//		
//		return "content/member/myPage/check_my_cancelation";
//	}
	
	// 장바구니 페이지로 이동
	@GetMapping("/checkMyCart")
	public String checkMyCart(Model model, String memId) {
		String memCode = memberService.getMemCode(memId);
		
		// sideMenu colorActivate를 위한 msMenuCode 
		model.addAttribute("msMenuCode", "MS_MENU_003");
		model.addAttribute("myCartList", buyService.getCartList(memCode));
		model.addAttribute("myDiyList", itemService.getDiyTourList(memCode));
		
		List<DiyTourVO> diyTourListBefore = itemService.testGetDiyTourList(memCode);
		
		for(DiyTourVO diyTourVO : diyTourListBefore) {
			List<Integer> diyDayList = new ArrayList<>();
			for(DiyDetailVO diyDetailVO : diyTourVO.getDiyDetailList()) {
				int day = Integer.parseInt(diyDetailVO.getHbtDiyDay());
				diyDayList.add(day);
			}
			
			//ex> 2,3 -> 1
			//ex> 1 -> 2,3
			List<Integer> emptyDayList =checkEmptyDay(diyDayList);
			
			for(int day : emptyDayList) {
				DiyDetailVO diyDetailVO = new DiyDetailVO();
				diyDetailVO.setHbtDiyCode(diyTourVO.getHbtDiyCode());
				diyDetailVO.setHbtDiyDay(String.valueOf(day));
				diyTourVO.getDiyDetailList().add(diyDetailVO);
			}
		}
		//model.addAttribute("diyTourList", diyTourListBofore);
		
		List<DiyTourVO> diyTourList = diyTourListBefore;
		
		DiyTourVO setDiyTourVO = new DiyTourVO();
		
		List<DiyDetailVO> sortedDetailList = new ArrayList<>();
		
		for(DiyTourVO diyTourVO : diyTourListBefore) {
			
			for(int i = 1 ; i <= Integer.valueOf(diyTourVO.getTraverPeriod()) ; i++) {
			
				for(DiyDetailVO diyDetailVO : diyTourVO.getDiyDetailList()) {
					if(i == Integer.valueOf(diyDetailVO.getHbtDiyDay())) {
						sortedDetailList.add(diyDetailVO);
						
						
						break ;
					}
				}  
				setDiyTourVO.setDiyDetailList(sortedDetailList);
			}
			
			
			//diyTourVO.setDiyDetailList(sortedDetailList);
		}
		model.addAttribute("diyList", diyTourList);
		
		return "content/member/myPage/check_my_cart";
	}
	
	public List<Integer> checkEmptyDay(List<Integer> diyDayList) {
		List<Integer> emptyDayList = new ArrayList<>();
		for(int i = 1 ; i <= 3 ; i++ ) {
			if(!diyDayList.contains(i)) {
				emptyDayList.add(i);
			}
		}
		return emptyDayList;
	}
	
	@ResponseBody
	@RequestMapping("/delMyCartAJAX")
	public String delMyCartAJAX(String cartCode, DiyTourVO diyTourVO, String memCode) {
		System.out.println("delMyCartAJAX~" + cartCode + "/" + diyTourVO);
		
		if(!cartCode.equals("empty")) {
			buyService.delCart(cartCode);
		}
		
		if(!diyTourVO.getHbtDiyCode().equals("empty")) {
			System.out.println("diyCode--"+diyTourVO.getHbtDiyCode());
			List<DiyDetailVO> diyDetailCodeList = itemService.getDiyDetailCodeList(diyTourVO.getHbtDiyCode());
			
			for(int i = 0 ; i < diyDetailCodeList.size() ; i++) {
				diyTourVO.setDiyDetailList(diyDetailCodeList);
			}
			
			itemService.delDiyTour(diyTourVO);
			
		}
		
		String memId = memberService.getMemId(memCode);
		return memId;
		
	}
	
	@ResponseBody
	@PostMapping("/buyMyCartAjax")
	public String buyMyCartAjax(String data) throws JsonProcessingException {
		
		 ObjectMapper mapper = new ObjectMapper();
		 
	    TypeReference<Map<String, Object>> typeReference = new TypeReference<Map<String,Object>>() {};
		 Map<String, Object> map =  mapper.readValue(data, typeReference);
		 
		 
		 if(map.get("type").equals("cart")) {
			 System.out.println("!!!" + map);
			 BuyVO buyVO = new BuyVO();
			 String buyCode = buyService.getNextBuyCode();
			 String memId = memberService.getMemId((String)map.get("memberVO.memCode"));
			 buyVO.setBuyCode(buyCode);
			 buyVO.setMemCode(memId);
			 buyVO.setBuyTotalPrice(Integer.valueOf((String)map.get("buyTotalPrice")));
			 
			 buyVO.setBuyDetailVO(new BuyDetailVO());
			 buyVO.getBuyDetailVO().setItemCode((String)map.get("itemCode"));
			 buyVO.getBuyDetailVO().setBuyCode(buyVO.getBuyCode());
			 buyVO.getBuyDetailVO().setAreaCode((String)map.get("areaCode"));
			 buyVO.getBuyDetailVO().setDepartDate((String)map.get("departDate"));
			 buyVO.getBuyDetailVO().setArriveDate((String)map.get("arriveDate"));
			 buyVO.getBuyDetailVO().setReservedPeopleNum(Integer.valueOf((String)map.get("numOfPeople")));
			 buyVO.getBuyDetailVO().setBuyDPrice(Integer.valueOf((String)map.get("buyTotalPrice")));
			 
			 
			 try {
				 buyService.setBuy(buyVO, buyVO.getBuyDetailVO());
				 buyService.delCart((String)map.get("cartCode"));
				
			} catch (Exception e) {
				System.out.println("errorMessege" + e.getMessage());
				e.printStackTrace();
			}
			 
			 System.out.println("!@#!@#!@#"+ buyVO);
			 
			 
			 return memId;
			 
		 } else {
			 //System.out.println("@@@" + map);
			 
			 itemService.setDiyTourIsPaidToY((String)map.get("hbtDiyCode"));
			 
			 String memId = memberService.getMemId((String)map.get("memCode"));
			 
			 return memId;
			 
			 
		 }
		 
	}
	
	
	
	// 1:1 문의 내역 페이지로 이동 
	@GetMapping("/checkMyRequest")
	public String checkMyRequest(Model model, Authentication authentication, BoardRequestVO boardRequestVO) {
		//회원 정보 
		MemberVO memInfo = memberService.getMemInfo(authentication.getName());
		model.addAttribute("memInfo", memInfo);
		
		
		if(boardRequestVO.getMemberVO() == null) {
			boardRequestVO.setMemberVO(new MemberVO());
		}
		boardRequestVO.getMemberVO().setMemCode(memInfo.getMemCode());
		boardRequestVO.getMemberVO().setMemRole(memInfo.getMemRole());
		
		boardRequestVO.setIsAnswer("N");
		model.addAttribute("requestListN", boardService.getBoardReqList(boardRequestVO));
		
		boardRequestVO.setIsAnswer("Y");
		model.addAttribute("requestListY", boardService.getBoardReqList(boardRequestVO));
		
		// sideMenu colorActivate를 위한 msMenuCode 
		model.addAttribute("msMenuCode", "MS_MENU_005");
		
		return "content/member/myPage/check_my_request";
	}
	
	@GetMapping("/regRequestForm")
	public String regRequestForm(MemberVO memberVO, Model model) {
		model.addAttribute("typeRequestList", boardService.getTypeRequestList());
		model.addAttribute("memInfo", memberVO);
		model.addAttribute("itemImgList", itemService.getItemMainImg());
		
		// sideMenu colorActivate를 위한 msMenuCode 
		model.addAttribute("msMenuCode", "MS_MENU_005");
		
		return "content/member/myPage/reg_request_form";
	}
	
	@GetMapping("/reqDetail")
	public String reqDetail(Model model, String hbtBoardRequestNum, String itemCode, Authentication authentication) {
		//회원 정보 
		MemberVO memInfo = memberService.getMemInfo(authentication.getName());
		model.addAttribute("memInfo", memInfo);
		
		model.addAttribute("reqDetail", boardService.getRequestDetail(hbtBoardRequestNum));
		model.addAttribute("itemCode", itemCode);
		
		if(boardService.getReqReply(hbtBoardRequestNum) != null) {
			model.addAttribute("reqReply", boardService.getReqReply(hbtBoardRequestNum));
			model.addAttribute("answerId", memberService.getMemId(boardService.getReqReply(hbtBoardRequestNum).getMemberVO().getMemCode()));
		}
		
		model.addAttribute("typeRequestList", boardService.getTypeRequestList());
		
		// sideMenu colorActivate를 위한 msMenuCode 
		model.addAttribute("msMenuCode", "MS_MENU_005");
		
		return "content/member/myPage/req_detail";
		
	}
	
	@ResponseBody
	@PostMapping("/updateMyReqAJAX")
	public void updateMyReqAJAX(BoardRequestVO boardRequestVO) {
		String requestPw = boardService.chkReqPw(boardRequestVO.getHbtBoardRequestNum());
		boardRequestVO.setRequestPw(requestPw);
		
		System.out.println("!@#!D@#!@D!S#S!S#" + boardRequestVO);
		
		boardService.regRequest(boardRequestVO);
		
	}
	
	@PostMapping("/regRequest")
	public String regRequest(BoardRequestVO boardRequestVO) {
		String reqNum = boardService.getNextByBoardRequestNum();
		boardRequestVO.setHbtBoardRequestNum(reqNum);
		
		System.out.println("!@#!@#!@#!@#" + boardRequestVO);
		boardService.regRequest(boardRequestVO);
		
		return "redirect:/myPage/checkMyRequest";
	}
	
	@ResponseBody
	@PostMapping("/delMyRequestAJAX")
	public void delMyRequestAJAX(String hbtBoardRequestNum) {
		
		boardService.delMyRequest(hbtBoardRequestNum);
		
	}
	
	@ResponseBody
	@PostMapping("/chkMyRequestAJAX")
	public String chkMyRequestAJAX(String hbtBoardRequestNum) {
		
		System.out.println("chkMyRequestAJAX run~" + hbtBoardRequestNum);
		
		return boardService.chkMyRequest(hbtBoardRequestNum);
		
	}
	
	
	// 나의 여행 후기 목록 페이지로 이동 
	@GetMapping("/checkMyReview")
	public String checkMyReview(Model model, MemberVO memberVO) {
		String memCode = memberService.getMemCode(memberVO.getMemId());

		System.out.println("받아온 memCode : " + memberVO.getMemCode());
		model.addAttribute("memCode", memberVO.getMemCode());
		
		model.addAttribute("myBuyList", buyService.getBuyList(memCode));
		
		// sideMenu colorActivate를 위한 msMenuCode 
		model.addAttribute("msMenuCode", "MS_MENU_004");
		
		return "content/member/myPage/check_my_review";
	}
	
	@GetMapping("/getMyReview")
	public String getMyReview(String buyCode, Model model) {
		
		model.addAttribute("buyDetail", buyService.getBuyDetail(buyCode));
		
		// sideMenu colorActivate를 위한 msMenuCode 
		model.addAttribute("msMenuCode", "MS_MENU_004");
		
		return "content/member/myPage/my_review_form";
	}
	
	@ResponseBody
	@PostMapping("/getNeedReviewAJAX")
	public List<BuyVO> getNeedReviewAJAX(BuyVO buyVO) {
		
		String memCode = memberService.getMemCode(buyVO.getMemberVO().getMemId());
		
		return memberService.getNeedReviewList(memCode);

	}
	
	
	
	@ResponseBody
	@PostMapping("/getWritenReviewAJAX")
	public List<MemberReviewVO> getWritenReviewAJAX(MemberReviewVO memberReviewVO) {
		String memCode = memberService.getMemCode(memberReviewVO.getMemberVO().getMemId());
		memberReviewVO.getMemberVO().setMemCode(memCode);
		
		System.out.println("getWritenReviewAJAX run~");
		return memberService.getMyReviewList(memberReviewVO);
	}
	
	@ResponseBody
	@PostMapping("/getBuyDetailAJAX")
	public BuyVO getBuyDetailAjax(String buyCode) {
		
		return buyService.getBuyDetail(buyCode);
		
	}
	
	@ResponseBody
	@PostMapping("/chkMyReviewAJAX")
	public MemberReviewVO chkMyReviewAJAX(String buyCode) {
		
		return memberService.chkIsReviewed(buyCode);
		
	}
	
	
	
	@ResponseBody
	@PostMapping("/delMyReviewAJAX")
	public void delMyReviewAJAX(String hbtMemReviewNum) {
		
		memberService.delMyReview(hbtMemReviewNum);

	}
	
	@ResponseBody
	@PostMapping("/regMyReviewAJAX")
	public void regMyReviewAJAX(MemberReviewVO memberReviewVO) {
		System.out.println("@@@@@@@@@@@@@@@@@@@@@@" +memberReviewVO);
		
		if(memberReviewVO.getHbtMemReviewNum() == null) {
			String hbtMemReviewNum = memberService.getNextMyReviewNum();
			memberReviewVO.setHbtMemReviewNum(hbtMemReviewNum);
		}
		memberReviewVO.setIsReviewed("Y");
		
		memberService.regMyReivew(memberReviewVO);
		
	}
	
	
	
	
   
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
