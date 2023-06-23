package com.project.team.admin.vo;

import java.util.List;

import com.project.team.util.PageVO;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class SaleListSearchVO extends PageVO{

	private String searchKeyword; //검색 기능 select 박스 선택 데이터
	private String searchValue; //검색 기능 select 박스 옆 입력하는 데이터
	private String searchFromPrice;
	private String searchToPrice;
	
}
