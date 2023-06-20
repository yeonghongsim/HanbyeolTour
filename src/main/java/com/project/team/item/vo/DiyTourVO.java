package com.project.team.item.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;
import java.util.List;

import com.project.team.admin.vo.AirlineVO;
import com.project.team.admin.vo.TourAreaVO;
import com.project.team.buy.vo.BuyStateVO;
import com.project.team.member.vo.MemberVO;

@Getter
@Setter
@ToString
public class DiyTourVO {
    private String hbtDiyCode;
    private String memCode;
    private String airlineCode;
    private String areaCode;
    private String departDate;
    private String arriveDate;
    private String totalPrice;
    private String traverPeriod;
    private String isPaid;
    private String diyTourBuyDate;
    private MemberVO memberVO;
    private AirlineVO airlineVO;
    private BuyStateVO buyStateVO;
    private TourAreaVO tourAreaVO;
    private List<DiyDetailVO> diyDetailList;
    
   
}
