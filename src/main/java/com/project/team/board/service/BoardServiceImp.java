package com.project.team.board.service;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.team.board.vo.BoardReplyVO;
import com.project.team.board.vo.BoardRequestVO;
import com.project.team.board.vo.BoardSideMenuVO;
import com.project.team.board.vo.BoardVO;
import com.project.team.board.vo.FreqRequestVO;
import com.project.team.board.vo.GroundSearchVO;
import com.project.team.board.vo.ReqReplyVO;
import com.project.team.board.vo.RequestSearchVO;
import com.project.team.board.vo.TypeRequestVO;


@Service("boardService")
public class BoardServiceImp implements BoardService{
	@Autowired
	private SqlSessionTemplate sqlSession;

	@Override
	public List<TypeRequestVO> getTypeRequestList() {
		return sqlSession.selectList("boardMapper.getTypeRequestList");
	}

	@Override
	public List<BoardSideMenuVO> getBoardSideMenuList() {
		return sqlSession.selectList("boardMapper.getBoardSideMenuList");
	}

	@Override
	public String getNextByFreqReqCode() {
		return sqlSession.selectOne("boardMapper.getNextByFreqReqCode");
	}

	@Override
	public List<FreqRequestVO> getFreqRequestList(String typeRequestCode) {
		return sqlSession.selectList("boardMapper.getFreqRequestList", typeRequestCode);
	}

	@Override
	public void regBoard(BoardVO boardVO) {
		sqlSession.insert("boardMapper.regBoard", boardVO);
	}

	@Override
	public List<BoardVO> getBoardList(BoardVO boardVO) {
		return sqlSession.selectList("boardMapper.getBoardList", boardVO);
	}

	@Override
	public String getNextByBoardNum() {
		return sqlSession.selectOne("boardMapper.getNextByBoardNum");
	}

	@Transactional
	@Override
	public BoardVO getBoardDetail(String hbtBoardNum) {
		sqlSession.update("boardMapper.addBoardCnt", hbtBoardNum);
		
		return sqlSession.selectOne("boardMapper.getBoardDetail", hbtBoardNum);
	}

	@Override
	public void delNotice(String hbtBoardNoticeNum) {
		sqlSession.delete("boardMapper.delNotice", hbtBoardNoticeNum);
	}

	@Override
	public void updateBoardNotice(BoardVO boardVO) {
		sqlSession.update("boardMapper.updateBoardNotice", boardVO);
	}

	@Override
	public String getBoardPrivatePw(String hbtBoardNum) {
		return sqlSession.selectOne("boardMapper.getBoardPrivatePw", hbtBoardNum);
	}

	@Override
	public String getNextByReplyNum() {
		return sqlSession.selectOne("boardMapper.getNextByReplyNum");
	}

	@Transactional
	@Override
	public void regBoardReply(BoardReplyVO boardReplyVO) {
		sqlSession.insert("boardMapper.regBoardReply", boardReplyVO);
		sqlSession.update("boardMapper.addReplyCnt", boardReplyVO);
	}

	@Override
	public List<BoardReplyVO> getReplyList(String hbtBoardNum) {
		return sqlSession.selectList("boardMapper.getReplyList", hbtBoardNum);
	}

	@Transactional
	@Override
	public void delReply(BoardReplyVO boardReplyVO) {
		sqlSession.delete("boardMapper.delReply", boardReplyVO);
		sqlSession.update("boardMapper.reduceReplyCnt", boardReplyVO);
	}

	@Override
	public void updateReplyContent(BoardReplyVO boardReplyVO) {
		sqlSession.update("boardMapper.updateReplyContent", boardReplyVO);
	}

	@Override
	public int getBoardListCnt(GroundSearchVO groundSearchVO) {
		return sqlSession.selectOne("boardMapper.getBoardListCnt", groundSearchVO);
	}

	@Override
	public String getNextByBoardRequestNum() {
		return sqlSession.selectOne("boardMapper.getNextByBoardRequestNum");
	}

	@Override
	public void regRequest(BoardRequestVO boardRequestVO) {
		sqlSession.insert("boardMapper.regRequest", boardRequestVO);
	}

	@Override
	public List<BoardRequestVO> getBoardReqList(BoardRequestVO boardRequestVO) {
		return sqlSession.selectList("boardMapper.getBoardReqList", boardRequestVO);
	}

	@Override
	public String chkReqPw(String hbtBoardRequestNum) {
		return sqlSession.selectOne("boardMapper.chkReqPw", hbtBoardRequestNum);
	}

	@Override
	public BoardRequestVO getRequestDetail(String hbtBoardRequestNum) {
		return sqlSession.selectOne("boardMapper.getRequestDetail", hbtBoardRequestNum);
	}

	@Override
	public String getNextByReqReplyNum() {
		return sqlSession.selectOne("boardMapper.getNextByReqReplyNum");
	}
	
	@Transactional
	@Override
	public void insertReqReply(ReqReplyVO reqReplyVO) {
		sqlSession.insert("boardMapper.insertReqReply", reqReplyVO);
		sqlSession.update("boardMapper.updateBoardRequestIsAnswer", reqReplyVO.getHbtBoardRequestNum());
	}

	@Override
	public List<ReqReplyVO> getReqReplyList(String hbtBoardRequestNum) {
		return sqlSession.selectList("boardMapper.getReqReplyList", hbtBoardRequestNum);
	}

	@Transactional
	@Override
	public void delMyRequest(String hbtBoardRequestNum) {
		sqlSession.delete("boardMapper.delMyRequestReply", hbtBoardRequestNum);
		sqlSession.delete("boardMapper.delMyRequest", hbtBoardRequestNum);
	}

	@Override
	public String chkMyRequest(String hbtBoardRequestNum) {
		return sqlSession.selectOne("boardMapper.chkMyRequest", hbtBoardRequestNum);
	}

	@Transactional
	@Override
	public void delPrivateReqReply(ReqReplyVO reqReplyVO) {
		sqlSession.delete("boardMapper.delPrivateReqReply", reqReplyVO);
		sqlSession.update("boardMapper.chageIsAnswerAfterDelReqRpl", reqReplyVO);
	}

	@Override
	public List<BoardRequestVO> getBoardReqListBySearch(RequestSearchVO requestSearchVO) {
		return sqlSession.selectList("boardMapper.getBoardReqListBySearch", requestSearchVO);
	}

	

	


	
	
	
	
	
	
	
	
}
