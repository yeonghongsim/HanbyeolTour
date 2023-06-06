package com.project.team.board.service;

import java.util.List;

import com.project.team.board.vo.BoardReplyVO;
import com.project.team.board.vo.BoardRequestVO;
import com.project.team.board.vo.BoardSideMenuVO;
import com.project.team.board.vo.BoardVO;
import com.project.team.board.vo.FreqRequestVO;
import com.project.team.board.vo.GroundSearchVO;
import com.project.team.board.vo.ReqReplyVO;
import com.project.team.board.vo.TypeRequestVO;

public interface BoardService {
	// 문의 유형 목록 조회
	List<TypeRequestVO> getTypeRequestList();
	
	// 보드 사이드 메뉴 목록 조회
	List<BoardSideMenuVO> getBoardSideMenuList();
	
	// 자주 문의 코드 조회
	String getNextByFreqReqCode();
	
	// board freq-req list
	List<FreqRequestVO> getFreqRequestList(String typeRequestCode);
	
	// reg-board
	void regBoard(BoardVO boardVO);
	
	// select board-notice-list
	List<BoardVO> getBoardList(BoardVO boardVO);
	
	// get board-num
	String getNextByBoardNum();
	
	// get reply-num
	String getNextByReplyNum();
	
	// select board-notice-detail
	BoardVO getBoardDetail(String hbtBoardNum);
	
	// delete board-notice
	void delNotice(String hbtBoardNoticeNum);
	
	// update board-notice
	void updateBoardNotice(BoardVO boardVO);
	
	// select board-privatePw
	String getBoardPrivatePw(String hbtBoardNum);
	
	// insert reply
	void regBoardReply(BoardReplyVO boardReplyVO);
	
	// select reply-list
	List<BoardReplyVO> getReplyList(String hbtBoardNum);
	
	// delete board-reply
	void delReply(BoardReplyVO boardReplyVO);
	
	// update board-reply content
	void updateReplyContent(BoardReplyVO boardReplyVO);
	
	// get board list cnt
	int getBoardListCnt(GroundSearchVO groundSearchVO);
	
	// get b-req-num
	String getNextByBoardRequestNum();
	
	// insert b-req
	void regRequest(BoardRequestVO boardRequestVO);
	
	// select b-req-list
	List<BoardRequestVO> getBoardReqList(BoardRequestVO boardRequestVO);
	
	// chk reqPw
	String chkReqPw(String hbtBoardRequestNum);
	
	// select req detail
	BoardRequestVO getRequestDetail(String hbtBoardRequestNum);
	
	// select req-rpl-num
	String getNextByReqReplyNum();
	
	// insert req-rpl
	void insertReqReply(ReqReplyVO reqReplyVO);
	
	// select req-reply list
	List<ReqReplyVO> getReqReplyList(String hbtBoardRequestNum);
}
