package com.project.team.admin.service;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.team.admin.vo.BuyListSearchVO;
import com.project.team.admin.vo.ImgVO;
import com.project.team.admin.vo.MemListSearchVO;
import com.project.team.admin.vo.TourAreaVO;
import com.project.team.item.vo.ItemVO;
import com.project.team.member.vo.MemberVO;
import com.project.team.board.vo.BoardRequestVO;
import com.project.team.board.vo.FreqRequestVO;
import com.project.team.buy.vo.BuyStateVO;
import com.project.team.buy.vo.BuyVO;

@Service("adminService")
public class AdminServiceImpl implements AdminService{

	@Autowired
	private SqlSessionTemplate sqlSession;
	
	//여행국가 카테고리 등록
	@Override
	public void regArea(TourAreaVO tourAreaVO) {
		sqlSession.insert("adminMapper.regArea", tourAreaVO);
		
	}
	
	//여행국가 카테고리 중복 확인
	@Override
	public int checkAreaName(TourAreaVO tourAreaVO) {
		return sqlSession.selectOne("adminMapper.checkAreaName", tourAreaVO);
	}
	
	//여행국가 카테고리 조회
	@Override
	public List<TourAreaVO> getAreaCateList() {
		
		return sqlSession.selectList("adminMapper.getAreaCateList");
	}
	
	//여행국가 카테고리 사용여부 변경 (정현 추가) 
	@Override
	public int changeAreaIsUse(String areaCode) {
		return sqlSession.update("adminMapper.changeAreaIsUse", areaCode);
	}
	
	//여행국가 카테고리 메인 노출 여부
	@Override
	public int changeIsExposeMain(String areaCode) {
		
		return sqlSession.update("adminMapper.changeIsExposeMain", areaCode);
	}
	
	//여행국가 카테고리 삭제
	@Override
	public void deleteAreaCate(String areaCode) {
		sqlSession.delete("adminMapper.deleteAreaCate", areaCode);
		
	}

	
	//다음 상품 코드 조회
	@Override
	public String getNextItemCode() {
		
		return sqlSession.selectOne("adminMapper.getNextItemCode");
	}
	
	
	//상품 등록
	@Override
	@Transactional(rollbackFor = Exception.class)
	public void regItem(ItemVO itemVO) {
		sqlSession.insert("adminMapper.regItem", itemVO);
		//상품 이미지 등록
		sqlSession.insert("adminMapper.regImgs", itemVO);
	}
	
	//판매 상품 리스트 조회
	@Override
	public List<ItemVO> saleListForAdmin() {
		
		return sqlSession.selectList("adminMapper.saleListForAdmin");
	}
	
	//판매 상품 삭제
	@Override
	public void deleteItem(String itemCode) {
		sqlSession.delete("adminMapper.deleteItem", itemCode);
		
	}
	
	//판매 상품 선택 삭제
	@Override
	public void deleteCheckItems(ItemVO itemVO) {
		sqlSession.delete("adminMapper.deleteCheckItems", itemVO);
		
	}
	
	//판매 상품 상세 정보 
	@Override
	public ItemVO getItemDetailForAdmin(String itemCode) {
		return sqlSession.selectOne("adminMapper.getItemDetailForAdmin", itemCode);
	}
	
	//판매 상품 수정
	@Override
	public void updateItem(ItemVO itemVO) {
		sqlSession.update("adminMapper.updateItem", itemVO);
	}
	
	//상품 이미지 수정
	@Override
	public void regImgsForItemDetail(ItemVO itemVO) {
		sqlSession.insert("adminMapper.regImgsForItemDetail", itemVO);
		
	}
	
	//상품 상세 정보 X 클릭 시 이미지 삭제
	@Override
	public void deleteItemImg(ImgVO imgVO) {
		sqlSession.delete("adminMapper.deleteItemImg", imgVO);
		
	}
	
	//첨부 파일명 조회
	@Override
	public String getAttachedFileName(String itemImgCode) {
		
		return sqlSession.selectOne("adminMapper.getAttachedFileName", itemImgCode);
	}
	
	//회원 리스트 조회
	@Override
	public List<MemberVO> getMemList(MemListSearchVO memListSearchVO) {
		
		return sqlSession.selectList("adminMapper.getMemList", memListSearchVO);
	}
	
	//검색 조건에 맞는 멤버 수
	@Override
	public int getMemListCnt(MemListSearchVO memListSearchVO) {
		return sqlSession.selectOne("adminMapper.getMemListCnt", memListSearchVO);
	}

	//회원 상세 정보 조회
	@Override
	public MemberVO getMemDetailInfo(String memId) {
		
		return sqlSession.selectOne("adminMapper.getMemDetailInfo", memId);
	}
	
	//회원 권한 변경
	@Override
	public void updateMemRole(MemberVO memberVO) {
		sqlSession.update("adminMapper.updateMemRole", memberVO);
		
	}
	
	//구매(예약) 리스트 조회
	@Override
	public List<MemberVO> getBuyListForAdmin(BuyListSearchVO buyListSearchVO) {
		return sqlSession.selectList("adminMapper.getBuyListForAdmin", buyListSearchVO);
	}
	
	//검색 조건에 맞는 구매(예약) 수
	@Override
	public int getBuyListCnt(BuyListSearchVO buyListSearchVO) {
		
		return sqlSession.selectOne("adminMapper.getBuyListCnt", buyListSearchVO);
	}
	
	//구매(예약) 상태 조회
	@Override
	public List<BuyStateVO> getBuyStatus() {
		
		return sqlSession.selectList("adminMapper.getBuyStatus");
	}
	
	//구매(예약) 상태 변경
	@Override
	public void changeBuyStatus(Map<String, Object> map) {
		sqlSession.update("adminMapper.changeBuyStatus", map);
		
	}
	
	//예약 상세 정보 조회
	@Override
	public BuyVO getReservDetail(String buyCode) {
		
		return sqlSession.selectOne("adminMapper.getReservDetail", buyCode);
	}
	
	//기간별 매출 조회 
	@Override
	public List<Map<String, Integer>> getSalesStatisticsByPeriod(int year) {
		
		return sqlSession.selectList("adminMapper.getSalesStatisticsByPeriod", year);
	}
	
	//분기별 매출 조회
	@Override
	public List<Map<String, Integer>> getQuarterlySales(int year) {
		
		return sqlSession.selectList("adminMapper.getQuarterlySales", year);
	}
	
	//할 일 목록 조회
	@Override
	public Map<String, Integer> getToDoList() {
		
		return sqlSession.selectOne("adminMapper.getToDoList");
	}
	
	//여행 국가별 판매수 조회
	@Override
	public List<Map<String, Object>> getSalesStatisticsByCategory() {
		
		return sqlSession.selectList("adminMapper.getSalesStatisticsByCategory");
	}










	

	
	
	
	
	
	
	
	
	
	
	
	
	
	
	//------------------- 심영홍 ------
	

	@Override
	public String getMemCode(String memid) {
		return sqlSession.selectOne("adminMapper.getMemCode", memid);
	}

	@Override
	@Transactional(rollbackFor = Exception.class)
	public void insertBoardForFreReq(FreqRequestVO freqRequestVO) {
		sqlSession.insert("adminMapper.insertBoardForFreReq", freqRequestVO);
	}

	@Override
	public List<FreqRequestVO> getFreqRequestList(String typeRequestCode) {
		return sqlSession.selectList("adminMapper.getFreqRequestList", typeRequestCode);
	}

	@Override
	public void delFreqReq(FreqRequestVO freqRequestVO) {
		sqlSession.delete("adminMapper.delFreqReq", freqRequestVO);
	}
	
	@Override
	public void updateFreqReq(FreqRequestVO freqRequestVO) {
		sqlSession.update("adminMapper.updateFreqReq", freqRequestVO);
	}

	public void uploadMainSlideImg(Map<String, String> uploadImg) {
		sqlSession.insert("adminMapper.uploadMainSlideImg", uploadImg);
	}

	@Override
	public List<Map<String, String>> getMainSlideImg() {
		return sqlSession.selectList("adminMapper.getMainSlideImg");
	}

	
	@Override
	public List<Map<String, String>> getRecomItem() {
		return sqlSession.selectList("adminMapper.getRecomItem");
	}

	@Override
	public List<Map<String, String>> getItemList() {
		return sqlSession.selectList("adminMapper.getItemList");
	}

	@Override
	@Transactional(rollbackFor = Exception.class)
	public void setRecomItemList(List<Map<String,String>> list) {
		sqlSession.delete("adminMapper.resetRecomItemList");
		sqlSession.insert("adminMapper.setRecomItemList", list);
	}

	@Override
	public void deleteMainSlideImg(String imgCode) {
		sqlSession.delete("adminMapper.deleteMainSlideImg", imgCode);
	}

	@Override
	public List<Map<String, String>> getItemListAll() {
		return sqlSession.selectList("adminMapper.getItemListAll");
	}

	@Override
	@Transactional(rollbackFor = Exception.class)
	public void addRecomImgForPKG(List<Map<String, String>> list) {
		sqlSession.delete("adminMapper.deleteRecomImgForPKG");
		sqlSession.insert("adminMapper.addRecomImgForPKG", list);
	}

	@Override
	public List<Map<String, String>> getRecomImgListForPKG() {
		return sqlSession.selectList("adminMapper.getRecomImgListForPKG");
	}


















}
