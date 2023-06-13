package com.project.team.member.service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import com.project.team.member.vo.MemberSideMenuVO;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.team.board.vo.BoardRequestVO;
import com.project.team.board.vo.ReqReplyVO;
import com.project.team.buy.vo.BuyStateVO;
import com.project.team.buy.vo.BuyVO;
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
	
	
	// 회원 탈퇴 신청 회원 - 상태코드 변경 
	@Override
	public void updateMemStatusCodeTo2(String memId) {
		sqlSession.update("memberMapper.updateMemStatusCodeTo2", memId);
	}
	
	// 비밀번호 조회 
	@Override
	public String getMemPw(String memId) {
		return sqlSession.selectOne("memberMapper.getMemPw", memId);
	}
		
	// 비밀번호 조회 
	@Override
	public MemberVO getMemInfo(String memId) {
		return sqlSession.selectOne("memberMapper.getMemInfo", memId);
	}
	// 휴대폰 번호 중복 확인 
	@Override
	public boolean isDuplicateMemDTell(String memDTell) {
		int result = sqlSession.selectOne("memberMapper.isDuplicateMemDTell", memDTell);
		return result != 0 ? true : false;
	}
	
	// 회원 정보 수정  
	@Override
	@Transactional(rollbackFor = Exception.class)
	public void updateMyInfo(MemberVO memberVO, MemberDetailVO memberDetailVO) {
		sqlSession.update("memberMapper.updateMyInfo", memberDetailVO);
		sqlSession.update("memberMapper.updateMyInfoName", memberVO);
	}
	
	// 주문 상태 코드 갯수 조회
	@Override
	public List<BuyStateVO> getBuyStatusInOneMonth(String memCode) {
		return sqlSession.selectList("memberMapper.getBuyStatusInOneMonth", memCode);
	}

	// 구매 내역 조회 
	@Override
	public List<BuyVO> getBuyList(BuyVO buyVO) {
		return sqlSession.selectList("memberMapper.getBuyList", buyVO);
	}
	
	// 특정 기간 별 주문 상태 코드 갯수 조회 
	@Override
	public List<BuyStateVO> getBuyStatusCount(BuyVO buyVO) {
		return sqlSession.selectList("memberMapper.getBuyStatusCount", buyVO);
	}
	
	// 구매내역 갯수 조회 
	@Override
	public int getBuyListCount(BuyVO buyVO) {
		return sqlSession.selectOne("memberMapper.getBuyListCnt", buyVO);
	}
	
	// 예약 취소 
	@Override
	public void cancelReservation(String buyCode) {
		sqlSession.update("memberMapper.cancelReservation", buyCode);
	}
	
	// 예약 상세 조회 
	@Override
	public BuyVO getBuyDetail(BuyVO buyVO) {
		return sqlSession.selectOne("memberMapper.getBuyDetail", buyVO);
	}
	
	// 문의 내역 조회 
	@Override
	public List<BoardRequestVO> getQnaList(String memCode) {
		return sqlSession.selectList("memberMapper.getQnaList", memCode);
	}
	@Override
	public List<ReqReplyVO> getQnaReplyList(String memCode) {
		return sqlSession.selectList("memberMapper.getQnaReplyList", memCode);
	}
	
	
	
	
	
	
	//-------------------------------------------------------------------
	
		
	// 회원 사이드 메뉴 목록 조회
	@Override
	public List<MemberSideMenuVO> getMsMenuList() {
		return sqlSession.selectList("memberMapper.getMsMenuList");
	}

	

	

	
	
	
	

	
	
	
	
	
	
	
	
	
	
	
	
	@Override
	public String getMemCode(String memid) {
		return sqlSession.selectOne("adminMapper.getMemCode", memid);
	}

	

	

	

	

	



	

	
	

	

}
