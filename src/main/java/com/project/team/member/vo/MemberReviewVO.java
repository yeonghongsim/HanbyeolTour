package com.project.team.member.vo;

import com.project.team.buy.vo.BuyVO;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class MemberReviewVO {
	private String hbtMemReviewNum;
	private String hbtMemReviewContent;
	private int stars;
	private String isReviewed;
	private MemberVO memberVO;
	private BuyVO buyVO;
}
