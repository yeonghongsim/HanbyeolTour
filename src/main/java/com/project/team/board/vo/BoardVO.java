package com.project.team.board.vo;

import com.project.team.member.vo.MemberVO;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class BoardVO {
	private String hbtBoardNum;
	private String hbtBoardTitle;
	private String hbtBoardContent;
	private String isPrivate;
	private String privatePw;
	private String hbtBoardRegDate;
	private int hbtBoardCnt;
	private String isNotice;
	private int replyCnt;
	private MemberVO memberVO;
	private GroundSearchVO groundSearchVO;
}
