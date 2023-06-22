package com.project.team.buy.vo;

import com.project.team.util.PageVO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class BuySearchVO extends PageVO{
	private int month;
	private String fromDate;
	private String toDate;
	private int searchStatusCode;
	private String memCode;
	
	@Override
	public String toString() {
		return "BuySearchVO [month=" + month + ", fromDate=" + fromDate + ", toDate=" + toDate + ", searchStatusCode="
				+ searchStatusCode + ", memCode=" + memCode + ", toString()=" + super.toString() + "]";
	}
}