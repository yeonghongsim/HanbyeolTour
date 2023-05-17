package com.project.team.board.vo;

import com.project.team.member.vo.MemberVO;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class BoardAdminVO {
	private String hbtBoardAdminNum;
	private String hbtBoardAdminTitle;
	private String hbtBoardAdminContent;
	private int hbtBoardAdminCnt;
	private String hbtBoardAdminRegDate;
	private int hbtBoardAdminLike;
	private MemberVO memberVO;
}
