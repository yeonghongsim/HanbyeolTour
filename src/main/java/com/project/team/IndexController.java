package com.project.team;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.TreeMap;

import com.project.team.item.service.ItemService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.project.team.admin.service.AdminService;

import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpServletRequest;

@Controller
public class IndexController {
	@Resource(name = "adminService")
	private AdminService adminService;
	@Resource(name = "itemService")
	private ItemService itemService;

	@GetMapping("/main")
	public String main(Model model) {System.out.println("@@@@@@@@@");

		//메인메뉴 이미지 조회
		model.addAttribute("mainSlideImg", adminService.getMainSlideImg());
		//추천 상품 목록 조회
		model.addAttribute("recomItem", adminService.getRecomItem());

		//메인페이지 열릴때 해외패키지 하위메뉴 조회
		model.addAttribute("locMenuList", adminService.getAreaCateList());

		//추천상품 등록이미지 목록
		model.addAttribute("recomImgList", adminService.getRecomImgListForPKG());
		//많이가는 여행지

		List<HashMap<String, Object>> originalList = itemService.getFavoriteArea(); // 원본 리스트
		String targetColumn = "AREA_KOR_NAME"; // 기준이 될 컬럼 이름

		TreeMap<Object, List<HashMap<String, Object>>> groupedMap = new TreeMap<>();
		for (HashMap<String, Object> data : originalList) {
			Object columnValue = data.get(targetColumn);
			List<HashMap<String, Object>> groupedList = groupedMap.getOrDefault(columnValue, new ArrayList<>());
			groupedList.add(data);
			groupedMap.put(columnValue, groupedList);
		}
		model.addAttribute("favoriteArea", groupedMap);



		return "content/main/main_page";
	}
	

	//프로젝트 시작 시 실행 -> 권한별 페이지 이동 
	// 밑에서 권한 알수있음 -> 최종 페이지는 권한 select, 그 다음에 페이지 연결  
	@GetMapping("/")
	public String indexByRole(Authentication authentication, HttpServletRequest request) {
		String prevPage = request.getHeader("Referer");
		System.out.println("!!!!!" + prevPage);
		
		String path = "";
		System.out.println("@@@@@@@@@");
		
		//not_login = null
		if(authentication == null) {
				path = "redirect:/main";
		}
			
		// login success
		else {
			// 로그인한 사람 권한 정보 받아오기
			User user = (User)authentication.getPrincipal();
	
			// 권한들 리스트로 생성 
			List<GrantedAuthority> authoList = new ArrayList<>(user.getAuthorities());
			
			// 권한리스트에서 권한 정보 하나씩 빼기
			List<String> strAuthoList = new ArrayList<>();
			
			for(GrantedAuthority autho : authoList) {
				String strAutho = autho.getAuthority();
				strAuthoList.add(strAutho);
			}
			// 권한 정보가 여러개 -> strAuthoList 안에 여러개의 권한 정보가 들어감
			
			// 권한 정보에 따른 페이지 이동
			// [ROLE_MNG] / [ROLE_AD] : 페이지 지정 필요 
			if(strAuthoList.contains("ROLE_AD")) {
				path = "redirect:/admin/";
			}
			
			else if(strAuthoList.contains("ROLE_MNG")) {
				path = "redirect:/admin/";
			}
			
			// 권한 정보 : [ROLE_USR] , [ROLE_ANONYMOUS]
			else {
				// login X && 바로 main page 접근 
				if(prevPage == null) {
					path = "redirect:/main";
				}
				// login page 이용 => login 성공시 홈으로 가기 버튼 
				else if(prevPage.contains("/login")) {
					path = "redirect:/main";
				}
				else {
					path = "redirect:/main";
					// logout 후 관리자 페이지에서 메인으로 이동하도록 하는 조건
					if(prevPage.contains("/admin")) {
						path = "redirect:/main";
					}
				}
			}
		}
		return path;
	}
	
	
	
	//미인가 시 이동할 페이지 
	@GetMapping("/accessDeny")
	public String accessDeny() {
		return "content/access_deny";
	}

	
	
}
