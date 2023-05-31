package com.project.team.admin.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
public class TourItemVO {
    private String hbtTourItemCode;
    private String hbtTourItemName;
    private String hbtTourItemRunTime;
    private String isUse;
    private String hbtTourItemPrice;
    private String hbtTourItemIntro;
    private String areaCode;
    private List<ImgVO> imgVOList;
}
