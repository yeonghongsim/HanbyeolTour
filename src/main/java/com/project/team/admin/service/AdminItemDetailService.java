package com.project.team.admin.service;

import com.project.team.admin.vo.AirlineVO;
import com.project.team.admin.vo.HotelVO;
import com.project.team.admin.vo.TourItemVO;
import com.project.team.item.vo.ItemVO;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

public interface AdminItemDetailService {
    //항공사 정보 등록
    void addAirline(AirlineVO airlineVO);
    //항공사 목록 조회
    List<AirlineVO> getAirline();
    //항공사 목록 삭제
    void delAirline(String hbtAirlineCode);
    //항공사 사용여부 변경
    void  updateAirlineIsUseAJAX(AirlineVO airlineVO);
    //다음 투어상품코드 조회
    String getNextTourItemCode();
    //투어상품 등록
    void addTourItem(TourItemVO tourItemVO);
    //투어상품 목록
    List<Map<String,String>> getTourItemList();
    //투어상품 삭제
    void deleteTourItem(String hbtTourItemCode, String hbtTourItemImgCode);
    //투어상품 사용여부변경
    void updateTourItemIsUseAJAX(TourItemVO tourItemVO);
    //호텔코드 조회
    String getNextHotelCode();
    //호텔 상품 등록
    void addHotel(HotelVO hotelVO);
    //호텔상품삭제
    void deleteHotel(String hbtHotelCode, String hbtHotelImgCode);
    //호텔상품 사용여부 업데이트
    void updateHotelIsUseAJAX(HotelVO hotelVO);
    //호텔목록 전체 조회
    List<Map<String, String>> getHotelList();
    //상세일정이 없는 아이템 조회
    List<ItemVO> getItemCodeListNotDetail();
    //아이템 상세정보
    Map<String, String> getItemInfoByItemCode(String itemCode);
    //상품코드의 지역에 해당하는 호텔상품정보조회
    List<Map<String, String>> getHotelListByItemCode(String itemCode);
    //상품코드의 지역에 해당하는 투어상품정보조회
    List<Map<String, String>> getTourListByItemCode(String itemCode);
}
