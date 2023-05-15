package com.project.team.board.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class BoardReplyVO {
	private String hbtBoardRelpyNum;
	private String hbtBoardReplyContent;
	private String hbtBoardReplyRegDate;
	private BoardVO boardVO;
}
