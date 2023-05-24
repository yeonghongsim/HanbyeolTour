package com.project.team.member.service;

import java.util.List;

import com.project.team.member.vo.MemberSideMenuVO;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.team.member.vo.MemberDetailVO;
import com.project.team.member.vo.MemberVO;


@Service("memberService")
public class MemberServiceImpl implements MemberService{
	@Autowired
	private SqlSessionTemplate sqlSession;

	
	// 아이디 중복확인 
	@Override
	public boolean isDuplicateMemId(String memId) {
		int result = sqlSession.selectOne("memberMapper.isDuplicateMemId", memId);
		return result != 0 ? true : false;
	}

	@Override
	public boolean isDuplicateMemEmail(String memEmail) {
		return false;
	}

	// 회원가입 
	@Override
	@Transactional(rollbackFor = Exception.class)
	public void join(MemberVO memberVO, MemberDetailVO memberDetailVO) {
		sqlSession.insert("memberMapper.join", memberVO);
		sqlSession.insert("memberMapper.joinDetail", memberDetailVO);
	}
	
	//	로그인 정보 가져오기 
	@Override
	public MemberVO getUserInfoForLogin(String memId) {
		return sqlSession.selectOne("memberMapper.getUserInfoForLogin", memId);
	}

	// 아이디 찾기 	
	@Override
	public String findId(MemberVO memberVO) {
		return sqlSession.selectOne("memberMapper.findId", memberVO);
	}
	
	//비밀번호 찾기 
	@Override
	public String getMemEmailForFindPw(MemberVO memberVO) {
		return sqlSession.selectOne("memberMapper.getMemEmailForFindPw", memberVO);
	}

	@Override
	public void updateMemPw(MemberVO memberVO) {

	}
	
	// 임시 비밀번호 발급 여부 수정 
	@Override
	public void updateIsTemporaryPw(String memId) {
		sqlSession.update("memberMapper.updateIsTemporaryPw", memId);
	}
	
	// 임시 비밀번호 발급 여부 확인 
	@Override
	public String getIsTemporaryPw(String memId) {
		return sqlSession.selectOne("memberMapper.getIsTemporaryPw", memId);
	}
	
	//임시 비밀번호 발급 고객 - 비밀번호 수정 완료 후 상태 변경
	@Override
	public void updateIsTemporaryPwToN(String memId) {
		sqlSession.update("memberMapper.updateIsTemporaryPwToN", memId);
	}

	
		
	// 회원 사이드 메뉴 목록 조회
	@Override
	public List<MemberSideMenuVO> getMsMenuList() {
		return sqlSession.selectList("memberMapper.getMsMenuList");
	}

	
	
	
	

	
	
	
	
	
	
	
	
	
	
	
	
	

}
