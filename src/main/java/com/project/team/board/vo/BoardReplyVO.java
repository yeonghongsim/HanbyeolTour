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
	private String hbtBoardNum;
	private int replyDepth;
	private String hbtBoardReplyNumFk;
	private String reReplyCnt;
	private MemberVO memberVO;
}
