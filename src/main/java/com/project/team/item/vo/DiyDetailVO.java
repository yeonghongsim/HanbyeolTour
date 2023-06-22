package com.project.team.item.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;
import java.util.Map;

import com.project.team.admin.vo.HotelVO;
import com.project.team.admin.vo.TourItemVO;

@Getter
@Setter
@ToString
public class DiyDetailVO {
    private String hbtDiyDetailCode;
    private String hbtDiyDay;
    private String hbtDiyCode;
    private String hbtTourItemCode;
    private String hbtHotelCode;
    private List<TourItemVO> tourItemList;
    private List<HotelVO> hotelList;

}
