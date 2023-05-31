package com.project.team.buy.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString

public class BuyDetailVO {
	private String buyDCode;
	private String itemCode;
	private String buyCode;
	private String areaCode;
	private String departDate;
	private String arriveDate;
	private int reservedPeopleNum;
	private int buyDPrice;
}
