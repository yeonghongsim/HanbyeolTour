package com.project.team.admin.service;

import com.project.team.admin.vo.AirlineVO;
import com.project.team.admin.vo.HotelVO;
import com.project.team.admin.vo.TourItemVO;
import com.project.team.item.vo.ItemVO;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Service("adminItemDetailService")
public class AdminItemDetailServiceImp implements AdminItemDetailService {
    @Autowired
    SqlSessionTemplate sqlSession;

    @Override
    public void addAirline(AirlineVO airlineVO) {
        sqlSession.insert("adminMapper.addAirline", airlineVO);
    }

    @Override
    public List<AirlineVO> getAirline() {
        return sqlSession.selectList("adminMapper.getAirline");
    }

    @Override
    public void delAirline(String hbtAirlineCode) {
        sqlSession.delete("adminMapper.delAirline", hbtAirlineCode);
    }

    @Override
    public void updateAirlineIsUseAJAX(AirlineVO airlineVO) {
        sqlSession.update("adminMapper.updateAirlineIsUseAJAX", airlineVO);
    }

    @Override
    public String getNextTourItemCode() {
        return sqlSession.selectOne("adminMapper.getNextTourItemCode");
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void addTourItem(TourItemVO tourItemVO) {
        sqlSession.insert("adminMapper.addTourItem", tourItemVO);
        sqlSession.insert("adminMapper.addTourItemImg", tourItemVO);
    }

    @Override
    public List<Map<String, String>> getTourItemList() {
        return sqlSession.selectList("adminMapper.getTourItemList");
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void deleteTourItem(String hbtTourItemCode, String hbtTourItemImgCode) {
        sqlSession.delete("adminMapper.deleteTourItem", hbtTourItemCode);
        sqlSession.delete("adminMapper.deleteTourItemImg", hbtTourItemImgCode);
    }

    @Override
    public void updateTourItemIsUseAJAX(TourItemVO tourItemVO) {
        sqlSession.update("adminMapper.updateTourItemIsUseAJAX", tourItemVO);
    }

    @Override
    public String getNextHotelCode() {
        return sqlSession.selectOne("adminMapper.getNextHotelCode");
    }

    @CacheEvict("hotelList")
    @Override
    @Transactional(rollbackFor = Exception.class)
    public void addHotel(HotelVO hotelVO) {
        sqlSession.insert("adminMapper.addHotel", hotelVO);
        sqlSession.insert("adminMapper.addHotelImg", hotelVO);
    }

    @Override
    public void deleteHotel(String hbtHotelCode, String hbtHotelImgCode) {
        sqlSession.delete("adminMapper.deleteHotel", hbtHotelCode);
        sqlSession.delete("adminMapper.deleteHotelImg", hbtHotelImgCode);
    }

    @Override
    public void updateHotelIsUseAJAX(HotelVO hotelVO) {
        sqlSession.update("adminMapper.updateHotelIsUseAJAX", hotelVO);
    }

    @Override
    public List<Map<String, String>> getHotelList() {
        return sqlSession.selectList("adminMapper.getHotelList");
    }

    @Override
    public List<ItemVO> getItemCodeListNotDetail() {
        return sqlSession.selectList("adminMapper.getItemCodeListNotDetail");
    }

    @Override
    public Map<String, String> getItemInfoByItemCode(String itemCode) {
        return sqlSession.selectOne("adminMapper.getItemInfoByItemCode", itemCode);
    }

    @Override
    public List<Map<String, String>> getHotelListByItemCode(String itemCode) {
        return sqlSession.selectList("adminMapper.getHotelListByItemCode", itemCode);
    }
    @Override
    public List<Map<String, String>> getTourListByItemCode(String itemCode) {
        return sqlSession.selectList("adminMapper.getTourListByItemCode", itemCode);
    }

    @Override
    public void setItemDailyPlan(List<Map<String, Object>> list) {
        sqlSession.insert("adminMapper.setItemDailyPlan", list);
    }

    @Override
    public void updateItemState(String itemCode) {
        sqlSession.update("adminMapper.updateItemState", itemCode);
    }


}
