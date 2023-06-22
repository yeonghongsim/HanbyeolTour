package com.project.team.cart.vo;

import com.project.team.item.vo.ItemVO;
import com.project.team.member.vo.MemberVO;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class CartVO {
	private String cartCode;
	private String regDate;
	private int numOfPeople;
	private int cartTotalPrice;
	private MemberVO memberVO;
	private ItemVO itemVO;
}
