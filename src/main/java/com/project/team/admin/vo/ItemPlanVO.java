package com.project.team.admin.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
public class ItemPlanVO {
    private String hbtPlanCode;
    private String hbtPlanPeriod;
    private String hbtPlanDay;
    private String hbtPlanTime;
    private String hbtPlanIntro;
    private String itemCode;
    private String hbtHotelCode;
    private String hbtTourItemCode;
    private String hbtAirlineCode;
    List<ItemPlanVO> itemPlanVOList;
}
