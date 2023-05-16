package com.project.team.member.vo;

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
	private MemberDetailVO memberDetailVO;
}
