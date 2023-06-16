package com.project.team.AirLine.service;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("airlineService")
public class AirlineServiceImpl implements AirlineService{
    @Autowired
    private SqlSessionTemplate sqlSession;

    @Override
    public List<String> getArea() {
        return sqlSession.selectList("airlineMapper.getArea");
    }

    @Override
    public List<String> getNationalNames(String areaName) {
        return sqlSession.selectList("airlineMapper.getNationalNames", areaName);
    }
}
