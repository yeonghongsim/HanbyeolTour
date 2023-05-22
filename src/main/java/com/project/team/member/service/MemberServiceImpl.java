package com.project.team.member.service;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.team.member.vo.MemberDetailVO;
import com.project.team.member.vo.MemberSideMenuVO;
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
	
	// 이메일 중복확인 
	@Override
	public boolean isDuplicateMemEmail(String memEmail) {
		int result = sqlSession.selectOne("memberMapper.isDuplicateMemEmail", memEmail);
		return result != 0 ? true : false;
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
	
	//비밀번호 수정 
	@Override
	public void updateMemPw(MemberVO memberVO) {
		sqlSession.update("memberMapper.updateMemPw", memberVO);
	}

	// 회원 사이드 메뉴 목록 조회
	@Override
	public List<MemberSideMenuVO> getMsMenuList() {
		return sqlSession.selectList("memberMapper.getMsMenuList");
	}

	
	
	
	
	
	
	
	
	
	
	
	
	
}
