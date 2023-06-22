package com.project.team.buy.vo;

import java.util.List;

import com.project.team.member.vo.MemberVO;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString

public class BuyVO extends BuySearchVO{
	private String buyCode;
	private String memCode;
	private int buyStatusCode;
	private int buyTotalPrice;
	private String buyDate;
	private BuyDetailVO buyDetailVO;
	private BuyStateVO buyStateVO;
	private MemberVO memberVO;
	
}
