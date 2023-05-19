package com.project.team.item.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("itemService")
public class ItemServiceImpl implements ItemService{
	@Autowired
	private SqlSessionTemplate sqlSession;
	
	
	//국가명으로 여행상품 검색
	public List<HashMap<String, Object>> getItemListByAreaName(Map<String, String> searchKeyword) {
		return sqlSession.selectList("itemMapper.getItemListByAreaName", searchKeyword);
	}
	
	
}
