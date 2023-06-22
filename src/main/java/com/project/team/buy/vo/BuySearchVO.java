package com.project.team.buy.vo;

import com.project.team.util.PageVO;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString

public class BuySearchVO extends PageVO{
	private int month;
	private String fromDate;
	private String toDate;
	private int searchStatusCode;
}
