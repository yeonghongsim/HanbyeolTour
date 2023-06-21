package com.project.team.AirLine.service;

import java.util.List;
import java.util.Map;

public interface AirlineService {
    //지역정보조회
    List<String> getArea();
    //국가조회
    List<Map<String, Object>> getNationalNames(String areaName);
    //공항정보 조회
}
