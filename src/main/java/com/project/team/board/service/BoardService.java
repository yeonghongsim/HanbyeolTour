package com.project.team.board.service;

import java.util.List;

import com.project.team.board.vo.TypeRequestVO;

public interface BoardService {
	
	List<TypeRequestVO> getTypeRequestList();
	
}
