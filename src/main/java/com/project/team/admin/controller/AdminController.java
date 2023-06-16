package com.project.team.admin.controller;

import java.util.*;
import java.util.stream.Collectors;

import com.project.team.item.controller.ItemController;
import com.project.team.util.DateUtil;
import com.project.team.util.MessageService;
import com.project.team.util.UploadPath;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.team.admin.service.AdminService;
import com.project.team.admin.vo.BuyListSearchVO;
import com.project.team.admin.vo.ImgVO;
import com.project.team.admin.vo.MemListSearchVO;
import com.project.team.admin.vo.TourAreaVO;

import jakarta.annotation.Resource;

import net.nurigo.java_sdk.Coolsms;
import net.nurigo.java_sdk.api.Message;
import net.nurigo.java_sdk.exceptions.CoolsmsException;
import net.nurigo.sdk.message.service.DefaultMessageService;
//import oracle.net.aso.l;

import com.project.team.board.service.BoardService;
import com.project.team.board.vo.BoardRequestVO;
import com.project.team.board.vo.BoardVO;
import com.project.team.board.vo.FreqRequestVO;
import com.project.team.board.vo.GroundSearchVO;
import com.project.team.board.vo.ReqReplyVO;
import com.project.team.board.vo.RequestSearchVO;
import com.project.team.buy.vo.BuyVO;
import com.project.team.item.vo.ItemVO;
import com.project.team.member.service.MemberService;
import com.project.team.member.vo.MemberVO;
import com.project.team.util.UploadUtil;


@Controller
@RequestMapping("/admin")
public class AdminController {
	
	@Resource(name = "boardService")
	private BoardService boardService;
	@Resource(name = "adminService")
	private AdminService adminService;
	@Resource(name = "memberService")
	private MemberService memberService;
	@Resource(name = "messageService")
	private MessageService messageService;
	
	
	// 초기화면 이동
	@GetMapping("/")
	public String index() {
		
		return "redirect:/adminIndex/";
	}
	
	//상품 관리 페이지
	@GetMapping("/itemManage")
	public String itemManage() {
		
		return "redirect:/admin/itemManageForSale";
	}
	
	//여행지 카테고리 관리 페이지
	@GetMapping("/cateManage")
	public String cateManage(Model model) {
		
		//등록된 여행지 카테고리 조회
		model.addAttribute("areaCateList", adminService.getAreaCateList());
		
		return "content/admin/cate_manage";
		
	}
	
	//여행지 카테고리 등록
	@ResponseBody
	@PostMapping("/regAreaAJAX")
	public List<TourAreaVO> regArea(@RequestBody TourAreaVO tourAreaVO) {
		//카테고리 등록
		adminService.regArea(tourAreaVO);
		
		return adminService.getAreaCateList();
	}
	
	//여행지 카테고리 중복 여부 확인
	@ResponseBody
	@PostMapping("/checkAreaAJAX")
	public int checkAreaAjax(TourAreaVO tourAreaVO) {
		
		System.out.println(tourAreaVO);
		
		return adminService.checkAreaName(tourAreaVO);
	}
	
	
	//여행지 카테고리 사용여부 변경 (정현 추가)
	@ResponseBody
	@PostMapping("/changeAreaIsUseAJAX")
	public int changeAreaIsUse(String areaCode) {
		return adminService.changeAreaIsUse(areaCode);
	}
	
	//여행지 카테고리 메인 노출 여부
	@ResponseBody
	@PostMapping("/changeIsExposeMainAJAX")
	public int changeIsExposeMain(String areaCode) {
		
		return adminService.changeIsExposeMain(areaCode);
	}
	
	//여행지 카테고리 삭제
	@GetMapping("/deleteAreaCate")
	public String deleteAreaCate(String areaCode) {
		adminService.deleteAreaCate(areaCode);
		
		return "redirect:/admin/cateManage";
	}
	
	//상품 등록 페이지
	@GetMapping("/regItem")
	public String regItem(Model model) {
		
		//등록된 여행지 카테고리 조회
		model.addAttribute("areaCateList", adminService.getAreaCateList());
		
		return "content/admin/reg_item";
	}
	
	//상품 등록
	@PostMapping("/regItemProcess")
	public String regItem(ItemVO itemVO, MultipartFile mainImg, MultipartFile[] subImg) {
		
		//메인 이미지 세팅
		ImgVO attachecdImgVO = UploadUtil.uploadFile(mainImg, UploadPath.ITEM_IMG_UPLOAD_PATH);
		//imgVO에 첨부 이미지 정보 저장되어있음. 쿼리 빈값 채울 용도
		
		//서브 이미지 세팅
		List<ImgVO> attachedImgList = UploadUtil.multiFileUpload(subImg, UploadPath.ITEM_IMG_UPLOAD_PATH);
		
		//상품 이미지 DB 등록
		//등록될 다음 상품 코드 조회
		String itemCode = adminService.getNextItemCode();
		itemVO.setItemCode(itemCode);
		
		//상품 이미지 등록 쿼리 실행 시 쿼리 빈 값 채워줄 데이터를 가진 리스트
		//서브 이미지 첨부 정보 추가
		List<ImgVO> imgList = attachedImgList;
		//메인 이미지 첨부 정보 추가
		imgList.add(attachecdImgVO);
		
		//imgVO에 itemCode 세팅
		for(ImgVO img : imgList) {
			img.setItemCode(itemCode);
		}
		
		//itemVO에 상품 등록 시 필요한 모든 이미지 정보 세팅
		itemVO.setImgList(imgList);

		//상품 등록 쿼리
		adminService.regItem(itemVO);

		
		return "redirect:/admin/regItem";
	}
	
	//등록 판매 상품 목록 조회
	@GetMapping("/itemManageForSale")
	public String itemManageForSale(Model model, MultipartFile mainImg, MultipartFile[] subImg) {
		
		model.addAttribute("itemSaleList", adminService.saleListForAdmin());
		//등록된 여행지 카테고리 조회
		List<TourAreaVO> areaCateList = adminService.getAreaCateList();
		model.addAttribute("areaCateList", areaCateList);
		
		return "content/admin/item_manage_for_sale";
	}
	
	//판매 상품 삭제
	@GetMapping("/deleteItem")
	public String deleteItem(String itemCode) {
		adminService.deleteItem(itemCode);
		
		return "redirect:/admin/itemManageForSale";
	}
	
	//판매 상품 선택 삭제
	@GetMapping("/deleteCheckItems")
	public String deleteCheckItems(String[] itemCodes, ItemVO itemVO) {
		List<String> itemCodeList = Arrays.asList(itemCodes);
		itemVO.setItemCodeList(itemCodeList);
		
		adminService.deleteCheckItems(itemVO);
		
		return "redirect:/admin/itemManageForSale";
	}
	
	//판매 상품 상세 정보
	@ResponseBody
	@RequestMapping("/getItemDetailForAdminAJAX")
	public ItemVO getItemDetailForAdminAjax(Model model, String itemCode) {
		
		return adminService.getItemDetailForAdmin(itemCode);
		
	}
	
	//상품 수정 이미지 삭제
	@ResponseBody
	@PostMapping("/deleteItemImgAJAX")
	public void deleteItemImgAjax(ImgVO imgVO) {
		adminService.deleteItemImg(imgVO);
	}
	

	//상품 수정 (이미지 포함)
	@PostMapping("/updateItem")
	public String updateItem(ItemVO itemVO, MultipartFile mainImg, MultipartFile[] subImg) {
		//아이템 코드 세팅
		String itemCode = itemVO.getItemCode();
		itemVO.setItemCode(itemCode);

		ImgVO attachecdImgVO = null;
		if(mainImg != null) {
			//단일 첨부 - 첨부 없으면 null
			attachecdImgVO = UploadUtil.uploadFile(mainImg, UploadPath.ITEM_IMG_UPLOAD_PATH);
		}
		
		//다중 첨부 - 첨부 없으면 빈 리스트
		List<ImgVO> attachedImgList = UploadUtil.multiFileUpload(subImg, UploadPath.ITEM_IMG_UPLOAD_PATH);

		adminService.updateItem(itemVO);

		if(attachecdImgVO != null || attachedImgList.size() != 0){
			List<ImgVO> imgList = new ArrayList<>();
			
			if(attachecdImgVO != null){
				imgList.add(attachecdImgVO);
			}
			if(attachedImgList.size() != 0) {
				imgList.addAll(attachedImgList);
			}

			itemVO.setImgList(imgList);
			//이미지 수정 쿼리
			adminService.regImgsForItemDetail(itemVO);
		}
		return "redirect:/admin/itemManageForSale";
	}
	
	//회원 관리 페이지
	@GetMapping("/memManage")
	public String memManage() {
		
		return "redirect:/admin/memInfo";
	}
	
	
	//회원 리스트 조회
	@RequestMapping("/memInfo")
	public String memInfo(Model model, MemListSearchVO memListSearchVO) {
		//검색 조건에 맞는 데이터 수 조회
		int totalDataCnt = adminService.getMemListCnt(memListSearchVO);
		memListSearchVO.setTotalDataCnt(totalDataCnt);
		
		memListSearchVO.setPageInfo();

		//전체 회원 조회
		model.addAttribute("memList", adminService.getMemList(memListSearchVO));

		return "content/admin/mem_info";
	}
	
	//회원 상세 정보 조회
	@ResponseBody
	@PostMapping("/getMemDetailAJAX")
	public MemberVO getMemDetailAjax(String memId) {
		
		System.out.println(memId);
		
		return adminService.getMemDetailInfo(memId);
	}
	
	//회원 권한 변경
	@GetMapping("/updateMemRole")
	public String updateMemRole(MemberVO memberVO) {
		System.out.println(memberVO);
		
		adminService.updateMemRole(memberVO);
		
		return "redirect:/admin/memInfo";
	}
	
	//예약 관리 페이지
	@GetMapping("/reserveManage")
	public String reserveManage() {
		
		return "redirect:/admin/reservationInquiry";
	}
	
	//예약 조회
	@RequestMapping("/reservationInquiry")
	public String reservationInquiry(Model model, BuyListSearchVO buyListSearchVO) {
		
		//System.out.println(buyListSearchVO);
		
		//검색 조건에 맞는 예약 수 조회
		int totalDataCnt = adminService.getBuyListCnt(buyListSearchVO);
		buyListSearchVO.setTotalDataCnt(totalDataCnt);
		
		//buyListSearchVO.setDisplayCnt(10);
		
		//페이지 정보 세팅
		buyListSearchVO.setPageInfo();
		
		//구매 내역
		model.addAttribute("buyList", adminService.getBuyListForAdmin(buyListSearchVO));
		
		//구매 상태 리스트
		model.addAttribute("buyStatusList", adminService.getBuyStatus());
		
		return "content/admin/reservation_inquiry";
	}
	
	/*
	//예약 상태 변경 버튼 클릭 시
	@ResponseBody
	@PostMapping("/changeBuyStatusAJAX")
	public List<String> changeBuyStatusAjax(@RequestBody HashMap<String, Object> map) throws CoolsmsException{
		
		//System.out.println(map);
		
		List<Object> sendSmsInfo = new ArrayList();
		sendSmsInfo.add(map.get("memDTells"));
		sendSmsInfo.add(map.get("memNames"));
		
		List<String> memDTellList = new ArrayList<>();
		List<String> memNameList = new ArrayList<>();
		
	    if (sendSmsInfo.get(0) instanceof List) {
	        memDTellList = (List<String>) sendSmsInfo.get(0);
	    }

	    if (sendSmsInfo.get(1) instanceof List) {
	        memNameList = (List<String>) sendSmsInfo.get(1);
	    }
		
		//System.out.println(sendSmsInfo);
		
	
		//쿼리 빈값 채우기
		Map<String, Object> mapData = new HashMap<>();
		mapData.put("buyStatusCode", map.get("buyStatusCode"));
		mapData.put("buyCodeList", map.get("buyCodeList"));
		
		adminService.changeBuyStatus(mapData);
		
		return messageService.sendMessage(memNameList, memDTellList);
	}
	
	
	//예약 상태 변경
	@GetMapping("/updateReservation")
	public String updateReservation() {
		
		return "content/admin/update_reservation";
	}
	
	//예약 확정으로 예약 상태 변경 시 문자 전송
	@ResponseBody
	@PostMapping("/")
	public String UpdateReservSendSms() {
		
		return "";
	}
	*/
	
	
	//예약 상세 페이지
	@GetMapping("/reservDetail")
	public String reservDetail(Model model, String buyCode) {
		
		model.addAttribute("reservDetail", adminService.getReservDetail(buyCode));
		
		return "content/admin/reservation_detail";
	}
	
	
	//매출 관리 페이지
	@GetMapping("/salesManage")
	public String salesManage() {
		
		return "redirect:/admin/salesStatisticsByPeriod";
	}
	
	//기간별 매출 현황 페이지
	@GetMapping("/salesStatisticsByPeriod")
	public String salesStatisticsByPeriod(Model model, @RequestParam(required = false, defaultValue = "0") int year) {
		//year 데이터 안 넘어오는 경우
		if(year == 0) {
			year = DateUtil.getYear();
		}
		
		List<Map<String, Integer>> mapList = adminService.getSalesStatisticsByPeriod(year);
		//System.out.println(mapList.get(0));
		//System.out.println(adminService.getSalesStatisticsByPeriod(year));
		
		//hashMap으로 받아온 데이터 treeMap으로 변경(월별 순서대로 뽑기 위함)
		List<Map<String, Integer>> dataList = new ArrayList<>();
		
		for(Map<String, Integer> map : mapList) {
			
			Map<String, Integer> data1 = new TreeMap<>(map);
			dataList.add(data1);
			
			//System.out.println(data1);
			
			Set<String> keySet = data1.keySet();
			
			for(String key : keySet) {
				//System.out.println("key : " + key + " / value : " + data1.get(key));
			}
			//System.out.println();
		}
		
		model.addAttribute("dataList", dataList);
		model.addAttribute("year", year);
		model.addAttribute("thisYear", DateUtil.getYear());
		
		System.out.println("@@@@@" + dataList);
		
		return "content/admin/sales_statistics_by_period";
	}
	
	//기간별 매출 현황 페이지 오면 바로 실행(차트)
	@ResponseBody
	@PostMapping("/getChartDataAJAX")
	public Map<String, List<Object>> getChartDataAJAX(int year) {
		
		//기간별 매출 (월, 당해년도 작년 대비 차트)
		List<Map<String, Integer>> mapList = adminService.getSalesStatisticsByPeriod(year);
		List<Map<String, Integer>> resultList = new ArrayList<>();
		
		//해쉬맵으로 변환
		for(Map<String, Integer> map : mapList) {
			Map<String, Integer> map1 = new TreeMap<>(map);
			resultList.add(map1);
		}
		//자료형 Integer로 하면 json에서 인식 오류남!
		List<Object> thisYearCntList = resultList.get(0).values().stream().collect(Collectors.toCollection(ArrayList::new));
		List<Object> thisYearSaleList = resultList.get(1).values().stream().collect(Collectors.toCollection(ArrayList::new));
		List<Object> lastYearSaleList = resultList.get(2).values().stream().collect(Collectors.toCollection(ArrayList::new));
		
		
		//분기별 매출
		List<Map<String, Integer>> mapList2 = adminService.getQuarterlySales(year);
		
		System.out.println(adminService.getQuarterlySales(year));
		
		for(Map<String, Integer> map2 : mapList2) {
			Map<String, Integer> map3 = new TreeMap<>(map2);
			resultList.add(map3);
			
		}
		
		List<Object> quarterSaleList = resultList.get(3).values().stream().collect(Collectors.toCollection(ArrayList::new));
		
		Map<String, List<Object>> map = new HashMap<>();
		map.put("thisYearCntList", thisYearCntList);
		map.put("thisYearSaleList", thisYearSaleList);
		map.put("lastYearSaleList", lastYearSaleList);
		map.put("quarterSaleList", quarterSaleList);
		
		System.out.println(adminService.getQuarterlySales(year));
		
		return map;
	}
	
	
	//카테고리별 매출 현황 페이지
	@GetMapping("/salesStatisticsByCategory")
	public String salesStatisticsByCategory() {
		
		return "content/admin/sales_statistics_by_category";
	}
	
	
	
	
	
	
	
	

	
	
	
	// 공지사항
	@GetMapping("/noticeManage")
	public String noticeManage(Model model, BoardVO boardVO) {
		if(boardVO.getGroundSearchVO() == null) {
			boardVO.setGroundSearchVO(new GroundSearchVO());
		}
		boardVO.setIsNotice("Y");
		boardVO.setIsPrivate("N");
		model.addAttribute("noticeList", boardService.getBoardList(boardVO));
		
		return "content/admin/board/notice_manage";
		
	}
	
	// 공지글 등록 양식 페이지 이동
	@GetMapping("/regNoticeForm")
	public String regNoticeForm() {
		
		
		return "content/admin/board/reg_notice_form";
		
	}
	
	// 공지글 등록 쿼리 실행
	@PostMapping("/regNotice")
	public String regNotice(BoardVO boardVO) {
		
		String hbtBoardNum = boardService.getNextByBoardNum();
		String memCode = adminService.getMemCode(boardVO.getMemberVO().getMemId());
		
		boardVO.setHbtBoardNum(hbtBoardNum);
		boardVO.getMemberVO().setMemCode(memCode);
		
		boardService.regBoard(boardVO);
		
		return "redirect:/admin/noticeManage";
		
	}
	
	
	// 공지사항 상세 조회------
	@GetMapping("/noticeDetail")
	public String noticeDetail(String hbtBoardNum, Model model) {
		
		model.addAttribute("noticeDetail", boardService.getBoardDetail(hbtBoardNum));
		
		return "content/admin/board/notice_detail";
		
	}
	
	// 공지글 정보 수정 양식@@@@@@@@@@@@@@@@
	@GetMapping("/updateNoticeForm")
	public String updateNoticeForm(String hbtBoardNum, Model model) {
		
		model.addAttribute("noticeDetail", boardService.getBoardDetail(hbtBoardNum));
		
		return "content/admin/board/update_notice_form";
		
	}
	
	// 공지글 수정 @@@@@@@@@@@@@@@
	@PostMapping("/updateNotice")
	public String updateNotice(BoardVO boardVO) {
		
		boardService.updateBoardNotice(boardVO);

		return "redirect:/admin/noticeManage";
	}
	
	
	// 공지글 삭제 쿼리
	@ResponseBody
	@PostMapping("/delboardNoticeAJAX")
	public void delboardNoticeAJAX(String hbtBoardNum) {
		
		boardService.delNotice(hbtBoardNum);
		
	}
	
	// 1대1문의 관리 페이지
	@RequestMapping("/requestManage")
	public String requestManage(Model model, RequestSearchVO requestSearchVO, BoardRequestVO boardRequestVO) {
		
		model.addAttribute("typeRequestList", boardService.getTypeRequestList());
		boardRequestVO.setIsAnswer("Y");
		model.addAttribute("reqListY", boardService.getBoardReqList(boardRequestVO));
		
		boardRequestVO.setIsAnswer("N");
		model.addAttribute("reqListN", boardService.getBoardReqList(boardRequestVO));
		
		System.out.println("@@@@@@@@@" +requestSearchVO);
		
		return "content/admin/board/request_manage";
		
	}
	
	@GetMapping("/regReqReplyForm")
	public String regReqReplyForm(Model model, String hbtBoardRequestNum, String itemCode) {

		model.addAttribute("reqDetail", boardService.getRequestDetail(hbtBoardRequestNum));
		model.addAttribute("reqReplyList", boardService.getReqReplyList(hbtBoardRequestNum));
		model.addAttribute("itemCode", itemCode);
		
		return "content/admin/board/reg_req_reply_form";
	}
	
	@ResponseBody
	@PostMapping("/regReqReplyAJAX")
	public void regReqReplyAJAX(ReqReplyVO reqReplyVO) {
		reqReplyVO.setReplyDepth(1);
		String memCode = memberService.getMemCode(reqReplyVO.getMemberVO().getMemId());
		reqReplyVO.getMemberVO().setMemCode(memCode);

		
		String reqReplyNum = null;
		if(reqReplyVO.getReqReplyNum() == null) {
			reqReplyNum = boardService.getNextByReqReplyNum();
		} else {
			reqReplyNum = reqReplyVO.getReqReplyNum();
		}
		reqReplyVO.setReqReplyNum(reqReplyNum);
		
		boardService.insertReqReply(reqReplyVO);
		
	}
	
	@ResponseBody
	@PostMapping("/delReqRplAJAX")
	public void delReqRplAJAX(ReqReplyVO reqReplyVO) {
		
		boardService.delPrivateReqReply(reqReplyVO);
		
	}
	
	@ResponseBody
	@PostMapping("/searchRequestAjax")
	public List<BoardRequestVO> searchRequestAjax(RequestSearchVO requestSearchVO) {
		
		System.out.println("@@@@@@@@@ 문의 사항 검색 ajax" + requestSearchVO);
		
		return boardService.getBoardReqListBySearch(requestSearchVO);
		
	}
	
	// 자주 묻는 문의 사항 관리 페이지
	@GetMapping("/frequncyRequestMng")
	public String frequncyRequestMng(Model model, String typeRequestCode) {

		model.addAttribute("getFreqRequestList", boardService.getFreqRequestList(typeRequestCode));

		model.addAttribute("typeRequestList", boardService.getTypeRequestList());

		return "content/admin/board/frequncy_request_mng";


	}
	
	@ResponseBody
	@PostMapping("/searchFreqRequestByCodeAJAX")
	public List<FreqRequestVO> searchFreqRequestByCodeAJAX(String typeRequestCode) {

		return adminService.getFreqRequestList(typeRequestCode);
		
	}
	
	// 자주 묻는 문의 사항 글 등록
	@PostMapping("/regFreReq")
	public String regFreReq(FreqRequestVO freqRequestVO) {

		String freqReqCode = boardService.getNextByFreqReqCode();
		String memCode = adminService.getMemCode(freqRequestVO.getMemberVO().getMemId());

		freqRequestVO.setFreqRequestCode(freqReqCode);
		freqRequestVO.getMemberVO().setMemCode(memCode);

		adminService.insertBoardForFreReq(freqRequestVO);
		
		return "redirect:/admin/frequncyRequestMng";

	}
	
	@ResponseBody
	@PostMapping("/updateQnaAJAX")
	public void updateQnaAJAX(FreqRequestVO freqRequestVO) {
		
		System.out.println("@@@@@@@@@@@@@@@@@@@@@@@@@@" + freqRequestVO);
		adminService.updateFreqReq(freqRequestVO);
		
	}
	
	@ResponseBody
	@PostMapping("/delFreqReqAJAX")
	public void delFreqReqAJAX(@RequestBody String freqRequestStr, FreqRequestVO freqRequestVO) {
		
		ObjectMapper mapper = new ObjectMapper();
		List<String> freqRequestList  = null;
		
		try {
			String[] freqRequestArr = mapper.readValue(freqRequestStr, String[].class);
			
			freqRequestList = Arrays.asList(freqRequestArr);
		
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
		
		freqRequestVO.setFreqRequestList(freqRequestList);
		adminService.delFreqReq(freqRequestVO);
		
	}


	//-----------------페이지 설정---------------//

	//메인 페이지 설정페이지 로딩
	@GetMapping("/setMainPage")
	public String setMainPage(Model model){
		//메인페이지 이미지 목록
		model.addAttribute("mainSlideImg", adminService.getMainSlideImg());
		//추천아이템 목록 조회
		model.addAttribute("recomItem", adminService.getRecomItem());
		//전체 아이템 목록에서 추천아이템에 등록되어 있는 상품을 제외한 목록 조회
		model.addAttribute("itemList", adminService.getItemList());
		return "content/admin/page/set_main_page";
	}

	//페키지 페이지 설정
	@GetMapping("/setPackagePage")
	public String setPackagePage(Model model){
		model.addAttribute("recomImgList", adminService.getRecomImgListForPKG());
		model.addAttribute("itemList", adminService.getItemListAll());

		return "content/admin/page/set_package_page";
	}

	//페키지 페이지 추천 아이템 등록
	@PostMapping("/addRecomImgForPKGAJAX")
	@ResponseBody
	public void addRecomImgForPKMenu(@RequestParam(value = "itemCode[]") List<String> itemCodes , @RequestParam(value = "sortIndex[]") List<String> sortIndex){

		List<Map<String, String>> list = new ArrayList<>();
		for(int i = 0; i < itemCodes.size(); i++){
			Map<String, String> map = new HashMap<>();
			map.put("itemCode", itemCodes.get(i));
			map.put("sortIndex", sortIndex.get(i));
			list.add(map);
		}

		adminService.addRecomImgForPKG(list);
	}

	//메인페이지 슬라이드 이미지 업로드
	@PostMapping("/uploadMainSlideImg")
	public String uploadMainSlideImg(MultipartFile slideImg){
		//파일 업로드 및 가강된 파일명 가져오기
		ImgVO attachedImgVO = UploadUtil.uploadFile(slideImg, UploadPath.MAIN_IMG_UPLOAD_PATH);

		Map<String, String> uploadImg = new HashMap<>();

		//DB에 insert할 데이터 세팅
		uploadImg.put("origin", attachedImgVO.getItemImgOriginName());
		uploadImg.put("attached", attachedImgVO.getItemImgAttachedName());
		//db에 입력
		adminService.uploadMainSlideImg(uploadImg);

		return "redirect:/admin/setMainPage";
	}

	//메인 페이지 추천 아이템 등록
	@PostMapping("/setRecomItemListAJAX")
	@ResponseBody
	public void setRecomItemList(@RequestParam(value = "itemCode[]") List<String> itemCode, @RequestParam(value = "comment[]") List<String> comment){

		List<Map<String,String>> list = new ArrayList<>();

		//데이터 insert 를위한 데이터 가공
		for(int i = 0; i < itemCode.size(); i++){
			Map<String,String> map = new HashMap<>();
			map.put("itemCode", itemCode.get(i));
			map.put("comment", comment.get(i));
			list.add(map);
		}
		//추천 아이템 등록
		adminService.setRecomItemList(list);

	}
	//메인 페이지 슬라이드 이미지 삭제
	@GetMapping("/deleteMainSlideImg")
	public String deleteMainSlideImg(String imgCode){

		adminService.deleteMainSlideImg(imgCode);
		return "redirect:/admin/setMainPage";
	}


}
