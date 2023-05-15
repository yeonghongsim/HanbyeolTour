package com.project.team.board.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class BoardQuestVO {
	private String hbtBoardRequestNum;
	private String hbtBoardRequestTitle;
	private String hbtBoardRequestContent;
	private String hbtBoardRequestRegDate;
	private String isAnswered;
}
