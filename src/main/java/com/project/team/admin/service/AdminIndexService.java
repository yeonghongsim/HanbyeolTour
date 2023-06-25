package com.project.team.admin.service;

import java.util.List;
import java.util.Map;

import com.project.team.admin.vo.index.SearchStatisticsVO;
import com.project.team.review.vo.ReveiwVO;

public interface AdminIndexService {
	
	Map<String, Object> getPieByIndexStatistics(SearchStatisticsVO searchStatisticsVO);
	//리뷰분석결과
	Map<String, Object> getReveiwResult();
	
	
}
