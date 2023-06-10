package com.project.team.admin.service;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.team.admin.vo.index.SearchStatisticsVO;

@Service("adminIndexService")
public class AdminIndexServiceImp implements AdminIndexService{
	@Autowired
	private SqlSessionTemplate sqlSession;

	@Override
	public Map<String, Object> getPieByIndexStatistics(SearchStatisticsVO searchStatisticsVO) {
		System.out.println(searchStatisticsVO);
		return sqlSession.selectOne("adminMapper.getPieByIndexStatistics", searchStatisticsVO);
	}

	
	
	
	
	
}
