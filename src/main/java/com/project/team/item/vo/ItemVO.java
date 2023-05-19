package com.project.team.item.vo;

import java.util.List;

import com.project.team.admin.vo.ImgVO;
import com.project.team.admin.vo.TourAreaVO;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;


@Getter
@Setter
@ToString
public class ItemVO {
	
	private String itemCode;
	private String itemTitle;
	private int itemPrice;
	private String areaCode;
	private String sellingStart;
	private String sellingEnd;
	private String isExtraCharge;
	private String isPeak;
	private String isBombSale;
	private String itemIntro;
	private int statusCode;
	private String traverPeriod;
	private List<ImgVO> imgList;
	private TourAreaVO tourAreaVO;
	private List<String> itemCodeList;
}
