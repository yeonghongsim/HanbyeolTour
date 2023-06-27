package com.project.team.buy.controller;

import com.project.team.buy.service.BuyService;
import com.project.team.buy.vo.BuyDetailVO;
import com.project.team.buy.vo.BuyVO;
import com.project.team.member.vo.CartVO;
import com.project.team.member.vo.MemberVO;

import jakarta.annotation.Resource;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;


@Controller
@RequestMapping("/buy")
public class BuyController {
    @Resource(name = "buyService")
    private BuyService buyService;
    //구매
    @PostMapping("/buyItem")
    public String buyItem(BuyVO buyVO, BuyDetailVO buyDetailVO, Authentication authentication) {

        //아이템코드
        String buyCode = buyService.getNextBuyCode();
        //로그인정보
        User user = (User) authentication.getPrincipal();

        //시큐리티로그인아이디로 쿼리에서 memcode조회
        buyVO.setMemCode(user.getUsername());
        buyVO.setBuyTotalPrice(getBuyTotalPrice(buyDetailVO.getReservedPeopleNum()
                                                , buyDetailVO.getBuyDPrice()));

        //buyDetailVO 세팅
        buyDetailVO.setBuyCode(buyCode);

        System.out.println("!@#!@#!@#!@#!@#!@#"+buyVO);
        buyService.setBuy(buyVO,buyDetailVO);

        return "redirect:/main";
    }

    //장바구니등록
    @PostMapping("/addCartAJAX")
    @ResponseBody
    public void addCartAJAX(CartVO cartVO, Authentication authentication){
        //로그인정보
        User user = (User) authentication.getPrincipal();
        cartVO.setMemCode(user.getUsername());

        buyService.addCartAJAX(cartVO);

    }


    public int getBuyTotalPrice(int num, int price){
        return num * price;
    }
	
	
}
