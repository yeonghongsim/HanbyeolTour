package com.project.team.admin.controller;

import java.util.List;

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
import com.project.team.board.vo.BoardAdminVO;
import com.project.team.util.DateUtil;
import com.project.team.item.vo.ItemVO;
import com.project.team.util.UploadUtil;

import jakarta.annotation.Resource;

@Controller
@RequestMapping("/admin")
public class AdminController {
	
	@Resource(name = "boardService")
	private BoardService boardService;
	@Resource(name = "adminService")
	private AdminService adminService;

	
	//상품 등록 페이지(관리자 페이지 첫 화면)
	@GetMapping("/regItem")
	public String regItem(Model model) {
		
		//여행지 카테고리 조회
		model.addAttribute("areaCateList", adminService.getAreaCateList());
		
		return "content/admin/reg_item";
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
	@GetMapping("/deleteAreaCate")
	public String deleteAreaCate(String areaCode) {
		adminService.deleteAreaCate(areaCode);
		
		return "redirect:/admin/cateManage";
	}
	
	//상품 등록
	@PostMapping("/regItemProcess")
	public String regItem(ItemVO itemVO, MultipartFile mainImg, MultipartFile[] subImg) {
		
		//메인 이미지 세팅
		ImgVO attachecdImgVO = UploadUtil.uploadFile(mainImg);
		//imgVO에 첨부 이미지 정보 저장되어있음. 쿼리 빈값 채울 용도
		
		//서브 이미지 세팅
		List<ImgVO> attachedImgList = UploadUtil.multiFileUpload(subImg);
		
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
	
	//등록된 상품 목록 조회
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	// ------------------ 심영홍 ------------- //
	
	// 1대1문의 관리 페이지
	@GetMapping("/requestManage")
	public String requestManage(Model model) {
		
		model.addAttribute("typeRequestList", boardService.getTypeRequestList());
		
		return "content/admin/board/request_manage";
		
	}
	
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
	public String regNotice(BoardAdminVO boardAdminVO) {
		
		String noticeCode = adminService.getBoardNoticeCode();
		
		boardAdminVO.setHbtBoardAdminNum(noticeCode);
		System.out.println("@@@@@@@@" + boardAdminVO);
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
	
	@GetMapping("/updateNotice")
	public String updateNotice() {
		
		return "redirect:/admin/updateNoticeForm";
	}
	
	
	// 공지글 삭제 쿼리
	@GetMapping("/deleteNotice")
	public String deleteNotice(String hbtBoardAdminNum) {
		System.out.println("@@@@@@" + hbtBoardAdminNum);
		
		return "redirect:/admin/noticeManage";
		
	}

}
