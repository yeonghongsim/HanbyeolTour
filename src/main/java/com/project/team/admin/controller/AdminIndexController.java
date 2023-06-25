package com.project.team.admin.controller;

import java.util.List;
import java.util.Map;
import java.util.TreeMap;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.project.team.admin.service.AdminIndexService;
import com.project.team.admin.service.AdminService;
import com.project.team.admin.vo.index.SearchStatisticsVO;
import com.project.team.board.service.BoardService;
import com.project.team.member.service.MemberService;

import groovyjarjarantlr4.v4.parse.GrammarTreeVisitor.mode_return;
import jakarta.annotation.Resource;

@Controller
@RequestMapping("/adminIndex")
public class AdminIndexController {
	@Resource(name = "boardService")
	private BoardService boardService;
	@Resource(name = "adminService")
	private AdminService adminService;
	@Resource(name = "memberService")
	private MemberService memberService;
	@Resource(name = "adminIndexService")
	private AdminIndexService adminIndexService;
	
	// 로그인 성공 후 관리자 인증 시 오는 관리자 첫 페이지 및 우측 상단의 그래프 버튼 클릭 시
	@GetMapping("/")
	public String indexBar(Model model) {
		
		System.out.println(adminService.getToDoList());
		
		Map<String, Integer> map = adminService.getToDoList();
		
		System.out.println(map.get("COMPLTE_PAYMENT"));
		
		model.addAttribute("toDo", adminService.getToDoList());

		return "content/admin/index/index_bar";
	}

	@PostMapping("/getReviewData")
	@ResponseBody
	public String reviewData() throws JsonProcessingException {
		ObjectMapper mapper = new ObjectMapper();

		return mapper.writeValueAsString(adminIndexService.getReveiwResult());
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	// 심영홍-------------------- //
	
	// 우측 상단의 통계 버튼 클릭 시
	@GetMapping("/indexStatictics")
	public String indexStatistics() {
		
		
		return "content/admin/index/index_statistics";
	}
	
	// --------------------//
	
	// 보기 버튼 클릭 시
	@ResponseBody
	@PostMapping("/getChartDataAJAX")
	public Map<String, Object> getStatisticsAJAX(SearchStatisticsVO searchStatisticsVO) {
		Map<String, Object> mapData = adminIndexService.getPieByIndexStatistics(searchStatisticsVO);
		
		TreeMap<String, Object> treeMapData = new TreeMap<>(mapData);
		
		return treeMapData;
		
	}
	
	
	
	
	
	
}
