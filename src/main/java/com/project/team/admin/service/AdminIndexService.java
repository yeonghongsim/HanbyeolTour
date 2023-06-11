package com.project.team.admin.service;

import java.util.List;
import java.util.Map;

import com.project.team.admin.vo.index.SearchStatisticsVO;

public interface AdminIndexService {
	
	Map<String, Object> getPieByIndexStatistics(SearchStatisticsVO searchStatisticsVO);
	
	
}
