package com.project.team.member.vo;

import com.project.team.buy.vo.BuyVO;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class MemberVO {
	private String memCode;
	private String memRole;
	private String memId;
	private String memName;
	private String memPw;
	private int memStatusCode;
	private String isTemporaryPw;
	private MemberDetailVO memberDetailVO;
	private MemStatusVO memStatusVO;
	private SearchMemVO searchMemVO;
	private BuyVO buyVO;

}
