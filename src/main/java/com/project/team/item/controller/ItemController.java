package com.project.team.item.controller;

import java.sql.SQLOutput;
import java.text.DateFormat;
import java.util.*;

import com.project.team.admin.service.AdminService;
import com.project.team.buy.vo.BuyDetailVO;
import com.project.team.util.DateUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

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
		//임시 아이템코드세팅
		String itemCode = buyDetailVO.getItemCode();


		//상품상세정보
		List<HashMap<String, Object>> list = itemService.getItemDetail(itemCode);
		model.addAttribute("itemDetail", list);
		//일자별 상품상세정보 데이터가공
		Map<String, List<HashMap<String, Object>>> result = new HashMap<>();

		for(int i = 0; i < Integer.parseInt(list.get(1).get("HBT_PLAN_PERIOD").toString()); i++){
		}

		List<HashMap<String, Object>> originalList = list; // 원본 리스트
		String targetColumn = "HBT_PLAN_DAY"; // 기준이 될 컬럼 이름

		TreeMap<Object, List<HashMap<String, Object>>> groupedMap = new TreeMap<>();
		for (HashMap<String, Object> data : originalList) {
			Object columnValue = data.get(targetColumn);
			List<HashMap<String, Object>> groupedList = groupedMap.getOrDefault(columnValue, new ArrayList<>());
			groupedList.add(data);
			groupedMap.put(columnValue, groupedList);
		}

		List<List<HashMap<String, Object>>> groupedLists = new ArrayList<>(groupedMap.values());

		model.addAttribute("itemDetail", groupedLists);
		//상품이미지
		model.addAttribute("itemImg", itemService.getItemDetailImg(itemCode));
		//호텔이미지
		model.addAttribute("day", list.get(0).get("HBT_PLAN_PERIOD"));
		//투어 이미지

		return "content/item/tour_item_list_detail";
	}

	//상세페이지 이미지 조회
	@PostMapping("/getImgsAJAX")
	@ResponseBody
	public String getImgs(String hbtHotelCode, @RequestParam(value = "hbtTourItemCode[]") List<String> hbtTourItemCode) throws JsonProcessingException {
		List<List<Map<String, Object>>> resultList = new ArrayList<>();
		//호텔이미지들
		resultList.add(itemService.getHotelImg(hbtHotelCode));

		//투어상품이미지
		hbtTourItemCode.forEach(i ->{
			resultList.add(itemService.getTourImg(i));
		});

		return mapper.writeValueAsString(resultList);
	}


	//패키지상품 메인페이지
	@GetMapping("/tourItemListMain")
	public String tourItemListMain(Model model) {
		//추천상품 등록이미지 목록
		model.addAttribute("recomImgList", adminService.getRecomImgListForPKG());
		//많이가는 여행지

		List<HashMap<String, Object>> originalList = itemService.getFavoriteArea(); // 원본 리스트
		String targetColumn = "AREA_KOR_NAME"; // 기준이 될 컬럼 이름

		TreeMap<Object, List<HashMap<String, Object>>> groupedMap = new TreeMap<>();
		for (HashMap<String, Object> data : originalList) {
			Object columnValue = data.get(targetColumn);
			List<HashMap<String, Object>> groupedList = groupedMap.getOrDefault(columnValue, new ArrayList<>());
			groupedList.add(data);
			groupedMap.put(columnValue, groupedList);
		}
		System.out.println(groupedMap);
		model.addAttribute("favoriteArea", groupedMap);

		return "content/item/tour_item_list_main";
	}
	//호텔페이지 이동
	@GetMapping("/hotelPage")
	public String goHotelPage(){
		return "content/hotels/searchHotels";
	}
	//패키지만들기 페이지 이동
	@GetMapping("/diyTourItem")
	public String goDiyTourItem(){

		return "content/item/diy_tour_item";
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
