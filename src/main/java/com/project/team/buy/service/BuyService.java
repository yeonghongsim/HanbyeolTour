package com.project.team.buy.service;

import java.util.List;

import com.project.team.buy.vo.BuyDetailVO;
import com.project.team.buy.vo.BuyVO;
import com.project.team.member.vo.CartVO;

public interface BuyService {

    //buycode조회
    String getNextBuyCode();
    //구매
    void setBuy(BuyVO buyVO, BuyDetailVO buyDetailVO);
    //장바구니등록
    void addCartAJAX(CartVO cartVO);
    //구매 목록
    List<BuyVO> getBuyList(String memCode);
    //구매 상세 
    BuyVO getBuyDetail(String buyCode);
    // 장바구니 목록
    List<CartVO> getCartList(String memCode);
}
