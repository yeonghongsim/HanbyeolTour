package com.project.team.item.controller;

import java.text.DateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.project.team.admin.service.AdminService;
import com.project.team.buy.vo.BuyDetailVO;
import com.project.team.util.DateUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.team.item.service.ItemService;

import jakarta.annotation.Resource;

@Controller
@RequestMapping("/item")
public class ItemController {
	@Resource(name = "itemService")
	private ItemService itemService;
	@Resource(name = "adminService")
	private AdminService adminService;
	@Autowired
	private DateFormat dateFormat;
	@Autowired
	private ObjectMapper mapper;



	//그룹별 아이템 보기 페이지 이동
	@GetMapping("/tourItemListGroup")
	public String tourItemList(String areaName, Model model) {

		Map<String, String> searchKeyword = new HashMap<>();
		searchKeyword.put("areaName", areaName);

		model.addAttribute("tourItemList", itemService.getItemListByAreaName(searchKeyword));
		model.addAttribute("areaName", areaName);
		
		return "content/item/tour_item_list_group";
	}
	
	//일자별 아이템 보기 페이지 이동
	@GetMapping("/tourItemListDate")
	public String tourItemListDate(String areaName, Model model) {
		//초기페이지 진입시 검색일자 데이터가 오늘 날짜로 세팅
		Date searchDate = new Date();

		Map<String, String> searchKeyword = new HashMap<>();
		searchKeyword.put("areaName", areaName);
		searchKeyword.put("date", DateUtil.getNowDateToString());
		//일자별 상세조회

		model.addAttribute("areaName", areaName);
		model.addAttribute("tourItemList", addArrDate(itemService.getItemListByAreaName(searchKeyword), searchDate));
		
		return "content/item/tour_item_list_date";
	}
	
	//일자별 목록조회 날짜클릭
	@PostMapping("/tourItemListDateAJAX")
	@ResponseBody
	public String tourItemListDateAJAX(String areaName, Date searchDate ,Model model) throws JsonProcessingException {
		
		Map<String, String> searchKeyword = new HashMap<>();
		searchKeyword.put("areaName", areaName);
		searchKeyword.put("date", dateFormat.format(searchDate));
		
		return mapper.writeValueAsString(addArrDate(itemService.getItemListByAreaName(searchKeyword),searchDate));
	}

	//그룹별 상품보기 AJAX
	@PostMapping("/tourItemListGroupAJAX")
	@ResponseBody
	public String tourItemListGroupAJAX(Date searchDate, String itemCode) throws JsonProcessingException {

		//데이터검색을위한 세팅
		Map<String, String> searchKeyword = new HashMap<>();
		searchKeyword.put("itemCode", itemCode);
		searchKeyword.put("searchDate", DateUtil.getNowDateToString());

		return mapper.writeValueAsString(addArrDate(itemService.getTourItemListGroupAJAX(searchKeyword),searchDate));
	}

	//상품상세정보조회
	@GetMapping("/tourItemListDetail")
	public String tourItemListDetail(Model model, BuyDetailVO buyDetailVO) {
		//상품상세정보
		model.addAttribute("itemDetail", itemService.getItemDetail("ITEM_021"));
		//상품이미지

		//호텔이미지

		//투어 이미지


		return "content/item/tour_item_list_detail";
	}


	//패키지상품 메인페이지
	@GetMapping("/tourItemListMain")
	public String tourItemListMain(Model model) {
		//추천상품 등록이미지 목록
		model.addAttribute("recomImgList", adminService.getRecomImgListForPKG());
		return "content/item/tour_item_list_main";
	}
	//패키지상품 상세페이지
	//호텔페이지 이동
	@GetMapping("/hotelPage")
	public String goHotelPage(){
		return "content/hotels/searchHotels";
	}
	





	/* 
		도착날짜 추가 (출발날짜데이터가있는 리스트<맵> , js에서 전달받은 Date형식의 날짜)
		첫 번째 매개변수로 받은 리스트에 출도착 날짜 데이터를 추가해서 리턴
	 */
	public List<HashMap<String, Object>> addArrDate(List<HashMap<String, Object>> list, Date searchDate){

		for(HashMap<String, Object> map : list) {
			//출발일추가
			map.put("DEP_DATE", dateFormat.format(searchDate));
			//출발일자에 여행기간만큼더하기
			int splitDate = Integer.parseInt(map.get("TRAVER_PERIOD").toString().split("박")[1].split("일")[0]);
			//날짜초기화
			Calendar setArrDate = Calendar.getInstance();
			setArrDate.setTime(searchDate);
			setArrDate.add(Calendar.DATE, splitDate);
			//도착일추가
			map.put("ARR_DATE", dateFormat.format(setArrDate.getTime()));
		}
		return list;
	}




}
