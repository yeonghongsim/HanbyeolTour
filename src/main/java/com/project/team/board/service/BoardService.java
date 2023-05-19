package com.project.team.board.service;

import java.util.List;

import com.project.team.board.vo.BoardSideMenuVO;
import com.project.team.board.vo.TypeRequestVO;

public interface BoardService {
	// 문의 유형 목록 조회
	List<TypeRequestVO> getTypeRequestList();
	
	// 보드 사이드 메뉴 목록 조회
	List<BoardSideMenuVO> getBoardSideMenuList();
	
	
}
