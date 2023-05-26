package com.project.team.board.service;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.team.board.vo.BoardNoticeVO;
import com.project.team.board.vo.BoardSideMenuVO;
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
	public List<FreqRequestVO> getFreqRequestList() {
		return sqlSession.selectList("boardMapper.getFreqRequestList");
	}

	@Override
	public void regBoardNotice(BoardNoticeVO boardNoticeVO) {
		sqlSession.insert("boardMapper.regBoardNotice", boardNoticeVO);
	}

	@Override
	public List<BoardNoticeVO> getBoardNoticeList() {
		return sqlSession.selectList("boardMapper.getBoardNoticeList");
	}

	@Override
	public String getBoardNoticeCode() {
		return sqlSession.selectOne("boardMapper.getBoardNoticeCode");
	}

	@Override
	public BoardNoticeVO getBoardNoticeDetail(String hbtBoardNoticeNum) {
		return sqlSession.selectOne("boardMapper.getBoardNoticeDetail", hbtBoardNoticeNum);
	}

	@Override
	public void delNotice(String hbtBoardNoticeNum) {
		sqlSession.delete("boardMapper.delNotice", hbtBoardNoticeNum);
	}

	@Override
	public void updateBoardNotice(BoardNoticeVO boardNoticeVO) {
		sqlSession.update("boardMapper.updateBoardNotice", boardNoticeVO);
	}

	
	
	
	
	
	
	
	
}
