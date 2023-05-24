package com.project.team.admin.service;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.team.admin.vo.ImgVO;
import com.project.team.admin.vo.TourAreaVO;
import com.project.team.item.vo.ItemVO;
import com.project.team.member.vo.MemberVO;
import com.project.team.board.vo.BoardRequestVO;
import com.project.team.board.vo.FreqRequestVO;

@Service("adminService")
public class AdminServiceImpl implements AdminService{

	@Autowired
	private SqlSessionTemplate sqlSession;
	
	//여행국가 카테고리 등록
	@Override
	public void regArea(TourAreaVO tourAreaVO) {
		sqlSession.insert("adminMapper.regArea", tourAreaVO);
		
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
	public List<MemberVO> getMemList() {
		
		return sqlSession.selectList("adminMapper.getMemList");
	}

	//회원 상세 정보 조회
	@Override
	public MemberVO getMemDetailInfo(String memId) {
		
		return sqlSession.selectOne("adminMapper.getMemDetailInfo", memId);
	}



	

	
	
	
	
	
	
	
	
	
	
	
	
	
	
	//------------------- 심영홍 ------
	
	@Override
	public String getBoardNoticeCode() {
		return sqlSession.selectOne("adminMapper.getBoardNoticeCode");
	}

	@Override
	public List<BoardRequestVO> getBoardNoticeList() {
		return sqlSession.selectList("adminMapper.getBoardNoticeList");
	}

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

	


}
