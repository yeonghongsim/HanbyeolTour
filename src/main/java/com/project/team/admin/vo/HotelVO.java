package com.project.team.admin.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
public class HotelVO {
    private String hbtHotelCode;
    private String hbtHotelName;
    private String hbtHotelGrade;
    private String isUser;
    private String hbtHotelIntro;
    private String areaCode;
    private String hbtHotelPrice;
    private List<ImgVO> imgVOList;

}
