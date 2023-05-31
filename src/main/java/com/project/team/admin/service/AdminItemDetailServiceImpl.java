package com.project.team.admin.service;

import com.project.team.admin.vo.AirlineVO;
import com.project.team.admin.vo.TourItemVO;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Service("adminItemDetailService")
public class AdminItemDetailServiceImpl implements AdminItemDetailService {
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
}
