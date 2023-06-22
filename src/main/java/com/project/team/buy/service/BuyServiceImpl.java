package com.project.team.buy.service;

import com.project.team.buy.vo.BuyDetailVO;
import com.project.team.buy.vo.BuyVO;
import com.project.team.member.vo.CartVO;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service("buyService")
public class BuyServiceImpl implements BuyService{
	@Autowired
	private SqlSessionTemplate sqlSession;


	@Override
	public String getNextBuyCode() {
		return sqlSession.selectOne("buyMapper.getNextItemCode");
	}

	@Override
	@Transactional(rollbackFor = Exception.class)
	public void setBuy(BuyVO buyVO, BuyDetailVO buyDetailVO) {
		sqlSession.insert("buyMapper.setBuy", buyVO);
		sqlSession.insert("buyMapper.setBuyDetail", buyDetailVO);
	}

	@Override
	public void addCartAJAX(CartVO cartVO) {
		sqlSession.insert("buyMapper.addCartAJAX", cartVO);
	}

	@Override
	public List<BuyVO> getBuyList(String memCode) {
		return sqlSession.selectList("buyMapper.getBuyList", memCode);
	}

	@Override
	public BuyVO getBuyDetail(String buyCode) {
		return sqlSession.selectOne("buyMapper.getBuyDetail", buyCode);
	}

	@Override
	public List<CartVO> getCartList(String memCode) {
		return sqlSession.selectList("buyMapper.getCartList", memCode);
	}
}
