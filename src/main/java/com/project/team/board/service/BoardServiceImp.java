package com.project.team.board.service;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.team.board.vo.BoardReplyVO;
import com.project.team.board.vo.BoardSideMenuVO;
import com.project.team.board.vo.BoardVO;
import com.project.team.board.vo.FreqRequestVO;
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
		sqlSession.update("boardMapper.addReplyCnt", boardReplyVO.getBoardVO().getHbtBoardNum());
	}

	@Override
	public List<BoardReplyVO> getReplyList(String hbtBoardNum) {
		return sqlSession.selectList("boardMapper.getReplyList", hbtBoardNum);
	}


	
	
	
	
	
	
	
	
}
