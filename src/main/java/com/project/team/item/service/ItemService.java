package com.project.team.item.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
}
