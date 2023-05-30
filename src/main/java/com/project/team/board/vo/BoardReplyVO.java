package com.project.team.board.vo;

import com.project.team.member.vo.MemberVO;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class BoardReplyVO {
	private String hbtBoardReplyNum;
	private String hbtBoardReplyContent;
	private String hbtBoardReplyRegDate;
	private BoardVO boardVO;
	private MemberVO memberVO;
}
