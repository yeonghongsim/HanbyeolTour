package com.project.team.buy.vo;

import java.util.List;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString

public class BuyVO extends SearchVO{
	private String buyCode;
	private String memCode;
	private int buyStatusCode;
	private int buyTotalPrice;
	private String buyDate;
	private List<BuyDetailVO> buyDetailList;
	private BuyStateVO buyStateVO;
	
}
