package com.project.team.admin.service;

import com.project.team.admin.vo.AirlineVO;
import com.project.team.admin.vo.TourItemVO;
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
}
