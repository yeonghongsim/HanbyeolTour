package com.project.team.board.vo;

import com.project.team.util.PageVO;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class GroundSearchVO extends PageVO{
	private String searchKey;
	private String searchVal;
}
