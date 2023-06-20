package com.project.team.item.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;

@Getter
@Setter
@ToString
public class DiyTourVO {
    private String hbtDiyCode;
    private String diyTourBuyDate;
    private String memCode;
    private String airlineCode;
    private String areaCode;
    private String departDate;
    private String arriveDate;
    private String totalPrice;
    private String traverPeriod;
    private String buyStatusCode;
    private String isPaid;
}
