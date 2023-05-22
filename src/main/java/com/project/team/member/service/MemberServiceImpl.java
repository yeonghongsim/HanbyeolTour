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

	@Override
	public List<MemberSideMenuVO> getMsMenuList() {
		return null;
	}


}
