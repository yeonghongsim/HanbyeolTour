package com.project.team.AirLine.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class SearchAirLineVO {
	private String onewayGoCountry;
	private String onewayGoDate;
	private String onewayComeCountry;
	private String roundGoCountry;
	private String roundGoDate;
	private String roundComeCountry;
}
