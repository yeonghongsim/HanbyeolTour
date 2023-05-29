package com.project.team.board.service;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
	public List<FreqRequestVO> getFreqRequestList() {
		return sqlSession.selectList("boardMapper.getFreqRequestList");
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

	@Override
	public BoardVO getBoardNoticeDetail(String hbtBoardNum) {
		return sqlSession.selectOne("boardMapper.getBoardNoticeDetail", hbtBoardNum);
	}

	@Override
	public void delNotice(String hbtBoardNoticeNum) {
		sqlSession.delete("boardMapper.delNotice", hbtBoardNoticeNum);
	}

	@Override
	public void updateBoardNotice(BoardVO boardVO) {
		sqlSession.update("boardMapper.updateBoardNotice", boardVO);
	}


	
	
	
	
	
	
	
	
}
