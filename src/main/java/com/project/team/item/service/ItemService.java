package com.project.team.item.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.project.team.admin.vo.TourItemVO;
import com.project.team.item.vo.DiyDetailVO;
import com.project.team.item.vo.DiyTourVO;
import org.springframework.stereotype.Service;

import com.project.team.item.vo.ItemVO;


public interface ItemService {
	//국가명으로 여행상품 검색
	List<HashMap<String, Object>> getItemListByAreaName(Map<String, String> searchKeyword);
	//그룹별상품보기에서 일자별 검색결과
	List<HashMap<String, Object>> getTourItemListGroupAJAX(Map<String, String> searchKeyword);
	//상세정보조회
	List<HashMap<String, Object>> getItemDetail(String itemCode);
	//상품메인이미지조회
	List<ItemVO> getItemMainImg();
	//상품상세이미지조회
	List<Map<String, Object>> getItemDetailImg(String itemCode);
	//호텔이미지조회
	List<Map<String, Object>> getHotelImg(String hbtHotelCode);
	//투어상품이미지조회
	List<Map<String, Object>> getTourImg(String hbtTourItemCode);
	//많이가는여행지조회
	List<HashMap<String, Object>> getFavoriteArea();
	//국가명 국가대표이미지 조회
	List<HashMap<String, Object>> getLocationImg();
	//항공사전체조회
	List<HashMap<String, Object>> getAirlineIcon();
	List<HashMap<String, Object>> getHotelAJAX(String areaKorName);
	List<HashMap<String, Object>> getTourAJAX(String areaKorName);
	List<HashMap<String, Object>> getHotelDetailAJAX(String hbtHotelCode);
	List<HashMap<String, Object>> getTourDetailAJAX(String hbtTourCode);
	//다음번 diyCode조회
	String getNextDiyCode();
	void setDiyTour(DiyTourVO diyTourVO, List<DiyDetailVO> detailList);
}
