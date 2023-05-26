package com.project.team.admin.vo;

import com.project.team.util.PageVO;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class MemListSearchVO extends PageVO{
	
	private String searchKeyword; //셀렉트 박스 데이터
	private String searchValue; //셀렉트 박스 옆 입력 데이터

}
