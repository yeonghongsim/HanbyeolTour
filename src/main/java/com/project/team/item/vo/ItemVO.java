package com.project.team.item.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ItemVO {
	
	private String itemCode;
	private String itemTitle;
	private String itemPrice;
	private String areaCode;
	private String sellingStart;
	private String sellingEnd;
	private String isExtraCharge;
	private String isPeak;
	private String isBombSale;
	private String itemIntro;
	private String statusCode;

}
