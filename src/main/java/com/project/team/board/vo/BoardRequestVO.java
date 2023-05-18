package com.project.team.board.vo;

import com.project.team.member.vo.MemberVO;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class BoardRequestVO {
	private String hbtBoardRequestNum;
	private String hbtBoardRequestTitle;
	private String hbtBoardRequestContent;
	private String hbtBoardRequestRegDate;
	private MemberVO memberVO;
	private TypeRequestVO typeRequestVO;
}
