package com.project.team.item.service;

import java.util.HashMap;
import java.util.List;

import org.springframework.stereotype.Service;


public interface ItemService {
	
	List<HashMap<String, Object>> getItemListByAreaName(String areaName);

}
