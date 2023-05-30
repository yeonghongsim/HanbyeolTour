package com.project.team.board.controller;

import java.util.List;

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
	public String getPublicBoardPage(Model model, BoardVO boardVO) {
		
		model.addAttribute("boardSideMenuList", boardService.getBoardSideMenuList());
		
		boardVO.setIsNotice("Y");
		model.addAttribute("noticeList", boardService.getBoardList(boardVO));
		
		return "content/board/getPublicBoardPage";
	}

	@GetMapping("/getBoardGroundPage")
	public String getBoardGroundPage(Model model,BoardVO boardVO) {
		
		model.addAttribute("boardSideMenuList", boardService.getBoardSideMenuList());
		boardVO.setIsNotice("N");
		
		model.addAttribute("boardList", boardService.getBoardList(boardVO));
		
		return "content/board/getBoardGroundPage";
	}
	
	@ResponseBody
	@PostMapping("/getBoardGroundBySearchAJAX")
	public List<BoardVO> getBoardGroundBySearchAJAX(BoardVO boardVO) {
		boardVO.setIsNotice("N");
		
		return boardService.getBoardList(boardVO);
		
		
	}
	
	@PostMapping("/regBoard")
	public String regBoard(BoardVO boardVO) {
		
		String htbBoardNum = boardService.getNextByBoardNum();
		String memCode = memberService.getMemCode(boardVO.getMemberVO().getMemId());
		
		boardVO.setHbtBoardNum(htbBoardNum);
		boardVO.getMemberVO().setMemCode(memCode);
		
		boardService.regBoard(boardVO);
		
		
		return "redirect:/board/getBoardGroundPage";
		
	}
	
	@GetMapping("/boardGroundDetail")
	public String boardGroundDetail(Model model, String hbtBoardNum) {
		System.out.println("@@@@@@@@@@" + hbtBoardNum);
		
		model.addAttribute("boardSideMenuList", boardService.getBoardSideMenuList());
		
		model.addAttribute("boardDetail", hbtBoardNum);
		
		return "content/board/board_gound_detail";
		
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
