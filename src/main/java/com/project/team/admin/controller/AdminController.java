package com.project.team.admin.controller;

import java.io.File;
import java.util.*;

import com.project.team.util.ConstVarialbe;
import com.project.team.util.UploadPath;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.project.team.admin.service.AdminService;
import com.project.team.admin.vo.ImgVO;
import com.project.team.admin.vo.TourAreaVO;

import jakarta.annotation.Resource;

import com.project.team.board.service.BoardService;
import com.project.team.board.vo.BoardNoticeVO;
import com.project.team.board.vo.FreqRequestVO;
import com.project.team.board.vo.RequestSearchVO;
import com.project.team.util.DateUtil;
import com.project.team.util.ImgPath;
import com.project.team.item.vo.ItemVO;
import com.project.team.member.vo.MemberVO;
import com.project.team.util.UploadUtil;

import jakarta.annotation.Resource;

@Controller
@RequestMapping("/admin")
public class AdminController {
	
	@Resource(name = "boardService")
	private BoardService boardService;
	@Resource(name = "adminService")
	private AdminService adminService;

	
	//상품 관리 페이지(관리자 페이지 첫 화면)
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
	@PostMapping("/regAreaAjax")
	public void regArea(@RequestBody TourAreaVO tourAreaVO) {
		//카테고리 등록
		adminService.regArea(tourAreaVO);
	}
	
	
	//여행지 카테고리 사용여부 변경 (정현 추가)
	@ResponseBody
	@PostMapping("/changeAreaIsUseAjax")
	public int changeAreaIsUse(String areaCode) {
		return adminService.changeAreaIsUse(areaCode);
	}
	
	//여행지 카테고리 삭제
	@PostMapping("/deleteAreaCate")
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
	
	//등록 판매 상품 목록 조회()
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
	@RequestMapping("/getItemDetailForAdminAjax")
	public ItemVO getItemDetailForAdminAjax(Model model, String itemCode) {
		
		return adminService.getItemDetailForAdmin(itemCode);
		
	}
	
	//판매 상품 수정
	@ResponseBody
	@PostMapping("/updateItemAjax")
	public void updateItem(ItemVO itemVO) {
		
		adminService.updateItem(itemVO);
	}
	
	
	
	
	
	
	
	
	
	
	
	
	// ------------------ 심영홍 ------------- //
	
	
	
	// 공지사항
	@GetMapping("/noticeManage")
	public String noticeManage(Model model) {
		
		model.addAttribute("boardNoticeList", adminService.getBoardNoticeList());
		
		return "content/admin/board/notice_manage";
		
	}
	
	// 공지글 등록 양식 페이지 이동
	@GetMapping("/regNoticeForm")
	public String regNoticeForm(Model model) {
		
		model.addAttribute("nowDate", DateUtil.getNowDateToString());
		
		return "content/admin/board/reg_notice_form";
		
	}
	
	// 공지글 등록 쿼리 실행
	@PostMapping("/regNotice")
	public String regNotice(BoardNoticeVO boardNoticeVO) {
		
		String noticeCode = adminService.getBoardNoticeCode();
		boardNoticeVO.setHbtBoardNoticeNum(noticeCode);
		
		System.out.println("@@@@@@@@@" + boardNoticeVO);
		
		return "redirect:/admin/noticeManage";
		
	}
	
	// 공지사항 상세 조회
	@GetMapping("/noticeDetail")
	public String noticeDetail() {
		
		
		return "content/admin/board/notice_detail";
		
	}
	
	// 공지글 정보 수정
	@GetMapping("/updateNoticeForm")
	public String updateNoticeForm() {
		
		return "content/admin/board/update_notice_form";
		
	}
	
	@PostMapping("/updateNotice")
	public String updateNotice(BoardNoticeVO boardNoticeVO) {
		
		System.out.println("@@@@@@@" + boardNoticeVO);
		
		
		
		return "redirect:/admin/noticeDetail";
	}
	
	
	// 공지글 삭제 쿼리
	@GetMapping("/deleteNotice")
	public String deleteNotice(String hbtBoardAdminNum) {
		System.out.println("@@@@@@" + hbtBoardAdminNum);
		
		return "redirect:/admin/noticeManage";
		
	}
	
	// 1대1문의 관리 페이지
	@RequestMapping("/requestManage")
	public String requestManage(Model model, RequestSearchVO requestSearchVO) {
		
		model.addAttribute("typeRequestList", boardService.getTypeRequestList());
		model.addAttribute("nowDate", DateUtil.getNowDateToString());
		
		System.out.println("@@@@@@@@@" +requestSearchVO);
		
		return "content/admin/board/request_manage";
		
	}
	
	@ResponseBody
	@PostMapping("/searchRequestAjax")
	public void searchRequestAjax() {
		System.out.println("@@@@@@@@@ 문의 사항 검색 ajax");
	}
	
	// 자주 묻는 문의 사항 관리 페이지
	@GetMapping("/frequncyRequestMng")
	public String frequncyRequestMng(Model model) {

		model.addAttribute("getFreqRequestList", boardService.getFreqRequestList());

		model.addAttribute("typeRequestList", boardService.getTypeRequestList());

		return "content/admin/board/frequncy_request_mng";


	}
	
	@ResponseBody
	@PostMapping("/searchFreqRequestByCodeAjax")
	public List<FreqRequestVO> searchFreqRequestByCodeAjax(String typeRequestCode) {
		
		return adminService.getFreqRequestList(typeRequestCode);
		
	}
	
	// 자주 묻는 문의 사항 글 등록
	@PostMapping("/regFreReq")
	public String regFreReq(FreqRequestVO freqRequestVO) {

		String freqReqCode = boardService.getNextByFreqReqCode();
		String memCode = adminService.getMemCode(freqRequestVO.getMemberVO().getMemId());

		freqRequestVO.setFreqRequestCode(freqReqCode);
		freqRequestVO.getMemberVO().setMemCode(memCode);
		System.out.println("@@@@@@@@" + freqRequestVO);

		adminService.insertBoardForFreReq(freqRequestVO);
		
		return "redirect:/admin/frequncyRequestMng";

	}

	
	@ResponseBody
	@PostMapping("/delFreqReqAjax")
	public void delFreqReqAjax(FreqRequestVO freqRequestVO) {
		
		System.out.println("@@@@@@@@@" + freqRequestVO);

		//adminService.delFreqReq(freqRequestVO);
		
	}


	//-----------------페이지 설정---------------//

	//메인 페이지 설정
	@GetMapping("/setMainPage")
	public String setMainPage(Model model){
		//메인페이지 이미지 목록
		model.addAttribute("mainSlideImg", adminService.getMainSlideImg());
		model.addAttribute("recomItem", adminService.getRecomItem());
		model.addAttribute("itemList", adminService.getItemList());
		return "content/admin/page/set_main_page";
	}

	//페키지 페이지 설정
	@GetMapping("/setPackagePage")
	public String setPackagePage(){

		return "content/admin/page/set_package_page";
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
		System.out.println("@@@@@@@@@@@@@@@@@@@@@@@@"+ uploadImg);

		adminService.uploadMainSlideImg(uploadImg);

		return "redirect:/admin/setMainPage";
	}

	//추천 아이템 등록
	@PostMapping("/setRecomItemListAJAX")
	@ResponseBody
	public void setRecomItemList(@RequestParam(value = "itemCode[]") List<String> itemCode, @RequestParam(value = "comment[]") List<String> comment){

		List<Map<String,String>> list = new ArrayList<>();

		System.out.println(itemCode.size());

		for(int i = 0; i < itemCode.size(); i++){
			Map<String,String> map = new HashMap<>();
			map.put("itemCode", itemCode.get(i));
			map.put("comment", comment.get(i));

			list.add(map);
			System.out.println("for문" + i + "번째");
		}

		System.out.println(list);

		adminService.setRecomItemList(list);

	}


}
