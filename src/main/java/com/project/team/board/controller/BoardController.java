package com.project.team.board.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.project.team.board.service.BoardService;
import com.project.team.board.vo.BoardVO;
import com.project.team.board.vo.FreqRequestVO;
import com.project.team.member.service.MemberService;

import jakarta.annotation.Resource;

@Controller
@RequestMapping("/board")
public class BoardController {
	@Resource(name = "boardService")
	private BoardService boardService;
	@Resource(name = "memberService")
	private MemberService memberService;
	
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
		
		System.out.println(boardService.getBoardList());
		
		return "content/board/getBoardGroundPage";
	}
	
	@PostMapping("/regBoard")
	public String regBoard(BoardVO boardVO) {
		
		String htbBoardNum = boardService.getNextByBoardNum();
		String memCode = memberService.getMemCode(boardVO.getMemberVO().getMemId());
		
		boardVO.setHbtBoardNum(htbBoardNum);
		boardVO.getMemberVO().setMemCode(memCode);
		
		System.out.println("@@@@@@@@@@@" + boardVO);
		//boardService.regBoard(boardVO);
		
		
		return "redirect:/board/getBoardGroundPage";
		
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
	
	
	
	
	
	@GetMapping("/regRequestPage")
	public String regRequestPage(Model model) {
		
		model.addAttribute("boardSideMenuList", boardService.getBoardSideMenuList());
		
		
		return "content/board/regRequestPage";
	}
	
	
	
	
	
}
