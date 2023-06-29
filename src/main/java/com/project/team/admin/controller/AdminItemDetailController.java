package com.project.team.admin.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.project.team.admin.service.AdminItemDetailService;
import com.project.team.admin.service.AdminService;
import com.project.team.admin.vo.*;
import com.project.team.util.UploadPath;
import com.project.team.util.UploadUtil;
import groovyjarjarasm.asm.TypeReference;
import jakarta.annotation.Resource;
import lombok.ToString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.xml.transform.Source;
import java.lang.reflect.Type;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/admin/itemDetail")
public class AdminItemDetailController {
    @Resource(name = "adminService")
    private AdminService adminService;
    @Resource(name = "adminItemDetailService")
    private AdminItemDetailService adminItemDetailService;
    @Autowired
    private ObjectMapper mapper;
    @Autowired
    private DateFormat dateFormat;



    //-----------------------상품 상세 설정---------------------------//

    //호텔 목록 관리 페이지 이동
    @GetMapping("hotelManage")
    public String hotelManage(Model model){
        model.addAttribute("hotelList", adminItemDetailService.getHotelList());
        model.addAttribute("areaList", adminService.getAreaCateList());
        return "/content/admin/item/hotel_manage";
    }



    //항공사 목록 관리 페이지 이동
    @GetMapping("airlineManage")
    public String airlineManage(Model model){

        model.addAttribute("areaList", adminService.getAreaCateList());
        model.addAttribute("airlineList", adminItemDetailService.getAirline());

        return "/content/admin/item/airline_manage";
    }
    //항공사 목록 추가
    @PostMapping("addAirline")
    public String addAirline(AirlineVO airlineVO, MultipartFile airlineIcon){

        ImgVO img = UploadUtil.uploadFile(airlineIcon, UploadPath.AIRLINE_ICON_UPLOAD_PATH);
        airlineVO.setHbtAirlineIcon(img.getItemImgAttachedName());
        adminItemDetailService.addAirline(airlineVO);
        return "redirect:/admin/itemDetail/airlineManage";
    }

    //항공사 목록 삭제
    @PostMapping("delAirline")
    public String delAirline(String hbtAirlineCode){

        adminItemDetailService.delAirline(hbtAirlineCode);
        return "redirect:/admin/itemDetail/airlineManage";
    }
    //항공사 목록 사용여부 변경
    @PostMapping("updateAirlineIsUseAJAX")
    @ResponseBody
    public void updateAirline(AirlineVO airlineVO){
        adminItemDetailService.updateAirlineIsUseAJAX(airlineVO);
    }


    //투어 아이템 목록 관리
    @GetMapping("tourManage")
    public String tourManage(Model model){


        model.addAttribute("areaList", adminService.getAreaCateList());
        model.addAttribute("tourItemList", adminItemDetailService.getTourItemList());
        return "/content/admin/item/tour_manage";
    }

    //투어 아이템 등록
    @PostMapping("addTourItem")
    public String addTourItem(TourItemVO tourItemVO, MultipartFile mainImg, MultipartFile[] subImg){
        //투어이아템코드조회
        String hbtTourItemCode = adminItemDetailService.getNextTourItemCode();
        //메인이미지파일처리
        ImgVO mainImgInfo = UploadUtil.uploadFile(mainImg, UploadPath.TOUR_IMG_UPLOAD_PATH);
        //서브이미지파일처리
        List<ImgVO> subImgInfo = UploadUtil.multiFileUpload(subImg, UploadPath.TOUR_IMG_UPLOAD_PATH);

        //투터아이템테이블 기본 데이터 + 메인이미지데이터 세팅
        tourItemVO.setHbtTourItemCode(hbtTourItemCode);
        mainImgInfo.setItemCode(hbtTourItemCode);

        subImgInfo.forEach(subImgVO -> {
            subImgVO.setItemCode(hbtTourItemCode);
        });
        //touritemVO 에 모든 이미지 정보 추가
        subImgInfo.add(mainImgInfo);
        tourItemVO.setImgVOList(subImgInfo);

        adminItemDetailService.addTourItem(tourItemVO);

        return "redirect:/admin/itemDetail/tourManage";
    }
    //투어상품삭제
    @PostMapping("deleteTourItem")
    public String deleteTourItem(String hbtTourItemCode, String hbtTourItemImgCode){
        adminItemDetailService.deleteTourItem(hbtTourItemCode, hbtTourItemImgCode);
        return "redirect:/admin/itemDetail/tourManage";
    }

    //투어상품 사용여부 수정
    @PostMapping("updateTourItemIsUseAJAX")
    @ResponseBody
    public void updateTourItemIsUseAJAX(TourItemVO tourItemVO){
        adminItemDetailService.updateTourItemIsUseAJAX(tourItemVO);
    }

    //호텔상품 등록
    @PostMapping("addHotel")
    public String addHotel(HotelVO hotelVO, MultipartFile mainImg, MultipartFile[] subImg){
        //호텔코드 가져오기
        String hotelCode = adminItemDetailService.getNextHotelCode();
        //메인이미지파일처리
        ImgVO mainImgInfo = UploadUtil.uploadFile(mainImg, UploadPath.HOTEL_IMG_UPLOAD_PATH);
        //서브이미지파일처리
        List<ImgVO> subImgInfo = UploadUtil.multiFileUpload(subImg, UploadPath.HOTEL_IMG_UPLOAD_PATH);

        hotelVO.setHbtHotelCode(hotelCode);
        mainImgInfo.setItemCode(hotelCode);
        subImgInfo.forEach(subImgVO -> {
            subImgVO.setItemCode(hotelCode);
        });
        subImgInfo.add(mainImgInfo);
        hotelVO.setImgVOList(subImgInfo);

        adminItemDetailService.addHotel(hotelVO);

        return "redirect:/admin/itemDetail/hotelManage";
    }
    //호텔삭제
    @PostMapping("deleteHotel")
    public String deleteHotel(String hbtHotelCode, String hbtHotelImgCode){
        adminItemDetailService.deleteHotel(hbtHotelCode, hbtHotelImgCode);

        return "redirect:/admin/itemDetail/hotelManage";
    }
    //호텔사용여부변경
    @PostMapping("updateHotelIsUseAJAX")
    @ResponseBody
    public void updateHotelIsUseAJAX(HotelVO hotelVO){
        adminItemDetailService.updateHotelIsUseAJAX(hotelVO);
    }



    //투어상품 상세 일정 관리
    @GetMapping("itemDailyManage")
    public String itemDailyManage(Model model,String itemCode){
        //상품목록
        model.addAttribute("itemList", adminItemDetailService.getItemCodeListNotDetail());
        //항공사목록
        model.addAttribute("airlineList", adminItemDetailService.getAirline());
        //아이템코드를 가지고 왔을때
        if (itemCode != null) {
            Map<String,String> map = adminItemDetailService.getItemInfoByItemCode(itemCode);
            map.put("days", map.get("TRAVER_PERIOD").toString().split("박")[1].split("일")[0]);
            //선택상품의 정보
            model.addAttribute("itemInfo", map);
            //선택상품의 해당지역 호텔, 투어목록
            model.addAttribute("hotelList", adminItemDetailService.getHotelListByItemCode(itemCode));
            model.addAttribute("tourList", adminItemDetailService.getTourListByItemCode(itemCode));
            model.addAttribute("itemCode", itemCode);

        }

        return "/content/admin/item/item_daily_manage";
    }

    @PostMapping("setItemDailyPlanAJAX")
    @ResponseBody
    public void setItemDailyPlan(@RequestParam(value = "itemDailyPlan") String itemDailyPlan){

        Gson gson = new Gson();
        Type resultType = new TypeToken<List<Map<String, Object>>>(){}.getType();
        List<Map<String, Object>> list = gson.fromJson(itemDailyPlan, resultType);

        adminItemDetailService.setItemDailyPlan(list);
        adminItemDetailService.updateItemState(list.get(0).get("itemCode").toString());
    }

    //상품기본정보 조회
//    @PostMapping("getItemInfoByItemCodeAJAX")
//    @ResponseBody
//    public String getItemInfoByItemCode(String itemCode) throws JsonProcessingException {
//
//        Map<String,String> map = adminItemDetailService.getItemInfoByItemCode(itemCode);
//        map.put("days", map.get("TRAVER_PERIOD").toString().split("박")[1].split("일")[0]);
//        map.put("SELLING_START", format.format(map.get("SELLING_START")));
//        map.put("SELLING_END", format.format(map.get("SELLING_END")));
//
//        return mapper.writeValueAsString(map);
//    }


}
