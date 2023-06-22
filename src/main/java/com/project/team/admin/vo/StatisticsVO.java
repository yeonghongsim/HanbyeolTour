package com.project.team.admin.vo;

import java.util.ArrayList;
import java.util.List;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class StatisticsVO {
		
	private int month_01;
	private int month_02;
	private int month_03;
	private int month_04;
	private int month_05;
	private int month_06;
	private int month_07;
	private int month_08;
	private int month_09;
	private int month_10;
	private int month_11;
	private int month_12;
	
	//객체가 가진 데이터를 리스트로 리턴
	public List<Integer> getDataToList() {
		List<Integer> list = new ArrayList<>();
		
		list.add(getMonth_01()); //1월이 가진 데이터를 list에 추가
		list.add(getMonth_02());
		list.add(getMonth_03()); 
		list.add(getMonth_04()); 
		list.add(getMonth_05()); 
		list.add(getMonth_06()); 
		list.add(getMonth_07()); 
		list.add(getMonth_08()); 
		list.add(getMonth_09()); 
		list.add(getMonth_10()); 
		list.add(getMonth_11());
		list.add(getMonth_12());
		
		return list;
	}
	
}
