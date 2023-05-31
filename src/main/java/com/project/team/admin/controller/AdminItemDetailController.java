package com.project.team.admin.controller;

import com.project.team.admin.service.AdminItemDetailService;
import com.project.team.admin.service.AdminService;
import com.project.team.admin.vo.AirlineVO;
import com.project.team.admin.vo.HotelVO;
import com.project.team.admin.vo.ImgVO;
import com.project.team.admin.vo.TourItemVO;
import com.project.team.util.UploadPath;
import com.project.team.util.UploadUtil;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Controller
@RequestMapping("/admin/itemDetail")
public class AdminItemDetailController {
    @Resource(name = "adminService")
    private AdminService adminService;
    @Resource(name = "adminItemDetailService")
    private AdminItemDetailService adminItemDetailService;



    //-----------------------상품 상세 설정---------------------------//

    //호텔 목록 관리
    @GetMapping("hotelManage")
    public String hotelManage(Model model){

        model.addAttribute("areaList", adminService.getAreaCateList());
        return "/content/admin/item/hotel_manage";
    }



    //항공사 목록 관리
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


    












    //투어상품 상세 일정 관리
    @GetMapping("itemDailyManage")
    public String itemDailyManage(){

        return "/content/admin/item/item_daily_manage";
    }


}
