package com.project.team.board.vo;

import com.project.team.member.vo.MemberVO;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class ReqReplyVO {
	private String reqReplyNum;
	private String reqReplyContent;
	private String reqReplyAnswerDate;
	private int replyDepth;
	private MemberVO memberVO;
	private String hbtBoardRequestNum;
}
