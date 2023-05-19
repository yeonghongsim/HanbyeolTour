package com.project.team.board.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.project.team.board.service.BoardService;

import jakarta.annotation.Resource;

@Controller
@RequestMapping("/board")
public class BoardController {
	@Resource(name = "boardService")
	private BoardService boardService;
	
	@GetMapping("/boardMain")
	public String boardMain() {
		return "content/board/board_main";
	}
	
	@GetMapping("/page1")
	public String page1() {
		return "content/board/page1";
	}

	@GetMapping("/page2")
	public String page2() {
		return "content/board/page2";
	}
	
	@GetMapping("/page3")
	public String page3() {
		return "content/board/page3";
	}
	
	
	
	
	
	
}
