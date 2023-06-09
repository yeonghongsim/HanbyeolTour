package com.project.team.item.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.project.team.item.vo.DiyDetailVO;
import com.project.team.item.vo.DiyTourVO;
import org.apache.ibatis.session.SqlSession;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import com.project.team.item.vo.ItemVO;
import org.springframework.transaction.annotation.Transactional;

@Service("itemService")
public class ItemServiceImpl implements ItemService{
	private final SqlSessionTemplate sqlSession;

	public ItemServiceImpl(SqlSessionTemplate sqlSession) {
		this.sqlSession = sqlSession;
	}


	//국가명으로 여행상품 검색
	public List<HashMap<String, Object>> getItemListByAreaName(Map<String, String> searchKeyword) {
		return sqlSession.selectList("itemMapper.getItemListByAreaName", searchKeyword);
	}

	//그룹별상품보기에서 일자별 검색결과
	public List<HashMap<String, Object>> getTourItemListGroupAJAX(Map<String, String> searchKeyword){
		return sqlSession.selectList("itemMapper.getTourItemListGroupAJAX", searchKeyword);
	}

	@Override
	public List<HashMap<String, Object>> getItemDetail(String itemCode) {
		return sqlSession.selectList("itemMapper.getItemDetail", itemCode);
	}

	@Override
	public List<ItemVO> getItemMainImg() {
		return sqlSession.selectList("itemMapper.getItemMainImg");
	}

	@Override
	public List<Map<String, Object>> getItemDetailImg(String itemCode) {
		return sqlSession.selectList("itemMapper.getItemDetailImg", itemCode);
	}

	@Override
	public List<Map<String, Object>> getHotelImg(String hbtHotelCode) {
		return sqlSession.selectList("itemMapper.getHotelImg", hbtHotelCode);
	}

	@Override
	public List<Map<String, Object>> getTourImg(String hbtTourItemCode) {
		return sqlSession.selectList("itemMapper.getTourImg", hbtTourItemCode);
	}

	@Override
	public List<HashMap<String, Object>> getFavoriteArea() {
		return sqlSession.selectList("itemMapper.getFavoriteArea");
	}

	@Override
	public List<HashMap<String, Object>> getLocationImg() {
		return sqlSession.selectList("itemMapper.getLocationImg");
	}

	@Override
	public List<HashMap<String, Object>> getAirlineIcon() {
		return sqlSession.selectList("itemMapper.getAirlineIcon");
	}

	@Override
	public List<HashMap<String, Object>> getHotelAJAX(String areaKorName) {
		return sqlSession.selectList("itemMapper.getHotelAJAX", areaKorName);
	}

	@Override
	public List<HashMap<String, Object>> getTourAJAX(String areaKorName) {
		return sqlSession.selectList("itemMapper.getTourAJAX", areaKorName);
	}

	@Override
	public List<HashMap<String, Object>> getHotelDetailAJAX(String hbtHotelCode) {
		return sqlSession.selectList("itemMapper.getHotelDetailAJAX", hbtHotelCode);
	}

	@Override
	public List<HashMap<String, Object>> getTourDetailAJAX(String hbtTourCode) {
		return sqlSession.selectList("itemMapper.getTourDetailAJAX", hbtTourCode);
	}

	@Override
	public String getNextDiyCode() {
		return sqlSession.selectOne("itemMapper.getNextDiyCode");
	}

	@Override
	@Transactional(rollbackFor = Exception.class)
	public void setDiyTour(DiyTourVO diyTourVO, List<DiyDetailVO> detailList) {
		sqlSession.insert("itemMapper.setDiyTour", diyTourVO);
		sqlSession.insert("itemMapper.setDiyTourDetail", detailList);
	}

	@Cacheable("hotelList")
	@Override
	public List<HashMap<String, Object>> getHotelList() {
		return sqlSession.selectList("itemMapper.getHotelList");
	}

	@Override
	public List<DiyTourVO> getDiyTourList(String memCode) {
		return sqlSession.selectList("itemMapper.getDiyTourList", memCode);
	}
	@Override
	public List<DiyTourVO> testGetDiyTourList(String memCode) {
		return sqlSession.selectList("itemMapper.testGetDiyTourList", memCode);
	}
	@Override
	public List<HashMap<String, Object>> getItemReview(String itemCode) {
		return sqlSession.selectList("itemMapper.getItemReview", itemCode);
	}

	@Override
	public List<DiyDetailVO> getDiyDetailCodeList(String hbtDiyCode) {
		return sqlSession.selectList("itemMapper.getDiyDetailCodeList", hbtDiyCode);
	}

	@Transactional
	@Override
	public void delDiyTour(DiyTourVO diyTourVO) {
		sqlSession.delete("itemMapper.delDiyTourDetail", diyTourVO);
		sqlSession.delete("itemMapper.delDiyTour", diyTourVO);
	}

	@Override
	public void setDiyTourIsPaidToY(String hbtDiyCode) {
		sqlSession.update("itemMapper.setDiyTourIsPaidToY", hbtDiyCode);
	}


	

	


}
