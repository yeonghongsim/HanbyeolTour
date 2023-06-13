package com.project.team.board.vo;

import com.project.team.item.vo.ItemVO;
import com.project.team.member.vo.MemberVO;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class RequestSearchVO {
	private String searchFromDate;
	private String searchToDate;
	private ItemVO itemVO;
	private MemberVO memberVO;
	private TypeRequestVO typeRequestVO;
	private String hbtBoardRequestTitle;
}
