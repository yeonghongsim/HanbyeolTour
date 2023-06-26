package com.project.team.member.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class CartVO {
    private String cartCode;
    private String memCode;
    private String regDate;
    private String itemCode;
    private int numOfPeople;
    private int cartTotalPrice;
    private String arriveDate;
	private String departDate;
}
