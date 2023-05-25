package com.project.team.board.vo;

import java.util.List;

import com.project.team.member.vo.MemberVO;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class FreqRequestVO {
	private String freqRequestCode;
	private String freqRequestTitle;
	private String freqRequestContent;
	private MemberVO memberVO;
	private TypeRequestVO typeRequestVO;
	private List<String> freqRequestList;
}
