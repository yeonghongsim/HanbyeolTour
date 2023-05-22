package com.project.team.board.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.project.team.board.service.BoardService;
import com.project.team.board.vo.FreqRequestVO;

import jakarta.annotation.Resource;

@Controller
@RequestMapping("/board")
public class BoardController {
	@Resource(name = "boardService")
	private BoardService boardService;
	
	@GetMapping("/boardMain")
	public String boardMain(Model model) {
		
		model.addAttribute("boardSideMenuList", boardService.getBoardSideMenuList());
		
		
		return "content/board/board_main";
	}
	
	@GetMapping("/getPublicBoardPage")
	public String getPublicBoardPage(Model model) {
		
		model.addAttribute("boardSideMenuList", boardService.getBoardSideMenuList());
		
		
		return "content/board/getPublicBoardPage";
	}

	@GetMapping("/getBoardGroundPage")
	public String getBoardGroundPage(Model model) {
		
		model.addAttribute("boardSideMenuList", boardService.getBoardSideMenuList());
		
		
		return "content/board/getBoardGroundPage";
	}
	
	@GetMapping("/frequentlyRequestPage")
	public String frequentlyRequestPage(Model model) {
		
		model.addAttribute("boardSideMenuList", boardService.getBoardSideMenuList());
		
		model.addAttribute("typeRequestList", boardService.getTypeRequestList());
		
		return "content/board/frequentlyRequestPage";
	}
	
	
	@ResponseBody
	@PostMapping("/searchFreqRequestByInputAjax")
	public void searchFreqRequestByInputAjax(String searchInputValue) {
		
		System.out.println("searchFreqRequestByInputAjax run~");
		System.out.println("@@@@@@@" + searchInputValue);
		
	}
	
	@ResponseBody
	@PostMapping("/searchFreqRequestByCodeAjax")
	public void searchFreqRequestByCodeAjax(String typeRequestCode) {
		
		System.out.println("searchFreqRequestByCodeAjax run~");
		System.out.println("@@@@@@@" + typeRequestCode);
		
	}
	
	
	
	@GetMapping("/regRequestPage")
	public String regRequestPage(Model model) {
		
		model.addAttribute("boardSideMenuList", boardService.getBoardSideMenuList());
		
		
		return "content/board/regRequestPage";
	}
	
	
	
	
	
}
