package com.project.team.item.controller;

import org.jsoup.Jsoup;
import java.io.IOException;
import java.sql.SQLOutput;
import java.text.DateFormat;
import java.util.*;

import com.fasterxml.jackson.core.type.TypeReference;
import com.project.team.admin.service.AdminService;
import com.project.team.buy.vo.BuyDetailVO;
import com.project.team.item.Exchange;
import com.project.team.item.vo.DiyDetailVO;
import com.project.team.item.vo.DiyTourVO;
import com.project.team.member.service.MemberService;
import com.project.team.util.DateUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
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
	@Resource(name = "memberService")
	private MemberService memberService;

	private final DateFormat dateFormat;
	private final ObjectMapper mapper;

	public ItemController(DateFormat dateFormat, ObjectMapper mapper) {
		this.dateFormat = dateFormat;
		this.mapper = mapper;
	}


	//그룹별 아이템 보기 페이지 이동
	@GetMapping("/tourItemListGroup")
	public String tourItemList(String areaName, Model model) {

		Map<String, String> searchKeyword = new HashMap<>();
		searchKeyword.put("areaName", areaName);
		model.addAttribute("locMenuList", adminService.getAreaCateList());
		model.addAttribute("tourItemList", itemService.getItemListByAreaName(searchKeyword));
		model.addAttribute("areaName", areaName);
		
		return "content/item/tour_item_list_group";
	}
	
	//일자별 아이템 보기 페이지 이동
	@GetMapping("/tourItemListDate")
	public String tourItemListDate(Model model) {
		//초기페이지 진입시 검색일자 데이터가 오늘 날짜로 세팅
		Date searchDate = new Date();

		Map<String, String> searchKeyword = new HashMap<>();
		//searchKeyword.put("areaName", areaName);
		searchKeyword.put("date", DateUtil.getNowDateToString());
		//일자별 상세조회

		//model.addAttribute("areaName", areaName);
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
		//리뷰데이터
		model.addAttribute("reviews", itemService.getItemReview(itemCode));


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
		model.addAttribute("favoriteArea", groupedMap);

		return "content/item/tour_item_list_main";
	}
	//호텔페이지 이동
	@GetMapping("/hotelPage")
	public String goHotelPage(Model model){
		model.addAttribute("hotelList", itemService.getHotelList());

		return "content/hotels/searchHotels";
	}

	//환율정보 크롤링
	@PostMapping("getExchange")
	@ResponseBody
	public String getExchange() throws IOException {
		Exchange exchange = new Exchange();

		return mapper.writeValueAsString(exchange.getExchange());
	}
	

	//패키지만들기 페이지 이동
	@GetMapping("/diyTourItem")
	public String goDiyTourItem(Model model) {

		//크롤링테스트

		//지역정보및이미지
		model.addAttribute("location", itemService.getLocationImg());
		//항공사전체이름및아이콘
		model.addAttribute("airline", itemService.getAirlineIcon());
		return "content/item/diy_tour_item";
	}
	@PostMapping("/getHotelnTourAJAX")
	@ResponseBody
	public String getHotelnTourAJAX(String areaKorName) throws JsonProcessingException {
		Map<String, List<HashMap<String, Object>>> result = new HashMap<>();

		result.put("HOTEL", itemService.getHotelAJAX(areaKorName));
		result.put("TOUR", itemService.getTourAJAX(areaKorName));

		return mapper.writeValueAsString(result);
	}

	@PostMapping("/getHotelDetailAJAX")
	@ResponseBody
	public String getHotelDetailAJAX(String hbtHotelCode) throws JsonProcessingException {

		return mapper.writeValueAsString(itemService.getHotelDetailAJAX(hbtHotelCode));
	}

	@PostMapping("/getTourDetailAJAX")
	@ResponseBody
	public String getTourDetailAJAX(String hbttourCode) throws JsonProcessingException {

		return mapper.writeValueAsString(itemService.getTourDetailAJAX(hbttourCode));
	}

	@PostMapping("/buyNcartAJAX")
	@ResponseBody
	private String buyNcart(String diyTour,String diyTourDetail,
							Authentication authentication) throws JsonProcessingException {

		//시큐리티세션에서 로그인한 회원정보받아오기
		User user  = (User)authentication.getPrincipal();
		//회원코드
		String memCode = memberService.getMemCode(user.getUsername());
		//diyCode
		String hbtDiyCode = itemService.getNextDiyCode();
		Map<String, Object> diyTourMap = mapper.readValue(diyTour, new TypeReference<Map<String, Object>>() {});
		Map<String, List<Object>> diyTourDetailMap = mapper.readValue(diyTourDetail, new TypeReference<Map<String, List<Object>>>() {});

		//diytourvo 세팅
		DiyTourVO diyTourVO = new DiyTourVO();
		diyTourVO.setHbtDiyCode(hbtDiyCode);
		diyTourVO.setMemCode(memCode);
		diyTourVO.setAirlineCode(diyTourMap.get("airlineCode").toString());
		diyTourVO.setAreaCode(diyTourMap.get("areaCode").toString());
		diyTourVO.setDepartDate(diyTourMap.get("departDate").toString());
		diyTourVO.setArriveDate(diyTourMap.get("arriveDate").toString());
		diyTourVO.setTotalPrice(diyTourMap.get("totalPrice").toString());
		diyTourVO.setTraverPeriod(diyTourMap.get("traverPeriod").toString());
		diyTourVO.setIsPaid(diyTourMap.get("isPaid").toString());
		//디테일 세팅
		List<DiyDetailVO> detailList = new ArrayList<>();
		//map의 키를 배열로변환
		String [] keys = diyTourDetailMap.keySet().toArray(new String[0]);

		for (String key: keys) {

			DiyDetailVO diyDetailVO = new DiyDetailVO();
			diyDetailVO.setHbtDiyDay(key);
			diyDetailVO.setHbtDiyCode(hbtDiyCode);
			if(diyTourDetailMap.get(key).get(0) != null){
				diyDetailVO.setHbtHotelCode(diyTourDetailMap.get(key).get(0).toString());
			}
			if(diyTourDetailMap.get(key).get(1) != null) {
				diyDetailVO.setHbtTourItemCode(diyTourDetailMap.get(key).get(1).toString());
			}

			detailList.add(diyDetailVO);
		}

		itemService.setDiyTour(diyTourVO, detailList);

		return "redirect:/item/diyTourItem";
	}



	/* 
		도착날짜 추가 (출발날짜데이터가있는 리스트<맵> , js에서 전달받은 Date형식의 날짜)
		첫 번째 매개변수로 받은 리스트에 출도착 날짜 데이터를 추가해서 리턴
	 */
	public List<HashMap<String, Object>> addArrDate(List<HashMap<String, Object>> list, Date searchDate){

		for(HashMap<String, Object> map : list) {
			//출발일추가
			map.put("DEP_DATE", dateFormat.format(searchDate));
			//도착일추가
			map.put("ARR_DATE", getArrDate(searchDate, getSpliteNum(map.get("TRAVER_PERIOD").toString())));
		}
		return list;
	}

	//X박N일의 데이터를 가져와 N의 숫자를 반환
	public int getSpliteNum(String traverPeriod){

		return Integer.parseInt(traverPeriod.split("박")[1].split("일")[0]);
	}


	//첫번째 파라미터의 날짜에 두번째 매개변수로 입력받은 숫자만큼의 날짜만큼을 더한 날짜를 리턴
	public String getArrDate(Date searchDate, int spliteNum){

		Calendar setArrDate = Calendar.getInstance();
		setArrDate.setTime(searchDate);
		setArrDate.add(Calendar.DATE, spliteNum);

		return dateFormat.format(setArrDate.getTime());
	}

}
