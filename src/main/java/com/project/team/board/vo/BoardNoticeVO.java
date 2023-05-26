package com.project.team.board.vo;

import com.project.team.member.vo.MemberVO;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class BoardNoticeVO {
	private String hbtBoardNoticeNum;
	private String hbtBoardNoticeTitle;
	private String hbtBoardNoticeContent;
	private String hbtBoardNoticeRegDate;
	private String hbtBoardNoticeCnt;
	private MemberVO memberVO;
}
