package com.project.team.board.service;

import java.util.List;

import com.project.team.board.vo.BoardNoticeVO;
import com.project.team.board.vo.BoardSideMenuVO;
import com.project.team.board.vo.FreqRequestVO;
import com.project.team.board.vo.TypeRequestVO;

public interface BoardService {
	// 문의 유형 목록 조회
	List<TypeRequestVO> getTypeRequestList();
	
	// 보드 사이드 메뉴 목록 조회
	List<BoardSideMenuVO> getBoardSideMenuList();
	
	// 자주 문의 코드 조회
	String getNextByFreqReqCode();
	
	// board freq-req list
	List<FreqRequestVO> getFreqRequestList();
	
	// reg-board-notice
	void regBoardNotice(BoardNoticeVO boardNoticeVO);
	
	// select board-notice-list
	List<BoardNoticeVO> getBoardNoticeList();
	
	// get board-notice-num
	String getBoardNoticeCode();
	
	// select board-notice-detail
	BoardNoticeVO getBoardNoticeDetail(String hbtBoardNoticeNum);
	
	// delete board-notice
	void delNotice(String hbtBoardNoticeNum);
	
	// update board-notice
	void updateBoardNotice(BoardNoticeVO boardNoticeVO);
	
}
