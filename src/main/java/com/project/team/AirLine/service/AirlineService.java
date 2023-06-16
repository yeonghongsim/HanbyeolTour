package com.project.team.AirLine.service;

import java.util.List;

public interface AirlineService {
    //지역정보조회
    List<String> getArea();
    List<String> getNationalNames(String areaName);
}
