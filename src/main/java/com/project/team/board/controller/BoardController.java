package com.project.team.board.controller;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.project.team.admin.service.AdminService;
import com.project.team.board.service.BoardService;
import com.project.team.board.vo.BoardReplyVO;
import com.project.team.board.vo.BoardRequestVO;
import com.project.team.board.vo.BoardVO;
import com.project.team.board.vo.FreqRequestVO;
import com.project.team.board.vo.GroundSearchVO;
import com.project.team.member.service.MemberService;
import com.project.team.member.vo.MemberVO;

import jakarta.annotation.Resource;

@Controller
@RequestMapping("/board")
public class BoardController {
	@Resource(name = "boardService")
	private BoardService boardService;
	@Resource(name = "memberService")
	private MemberService memberService;
	@Resource(name = "adminService")
	private AdminService adminService;
	
	@GetMapping("/boardMain")
	public String boardMain(Model model) {
		
		model.addAttribute("boardSideMenuList", boardService.getBoardSideMenuList());
		
		
		return "content/board/board_main";
	}
	
	@GetMapping("/getPublicBoardPage")
	public String getPublicBoardPage(Model model, BoardVO boardVO) {
		if(boardVO.getGroundSearchVO() == null) {
			boardVO.setGroundSearchVO(new GroundSearchVO());
		}
		
		model.addAttribute("boardSideMenuList", boardService.getBoardSideMenuList());
		
		boardVO.setIsNotice("Y");
		model.addAttribute("noticeList", boardService.getBoardList(boardVO));
		
		return "content/board/getPublicBoardPage";
	}
	
	@GetMapping("/getPublicDetail")
	public String getPublicDetail(Model model, String hbtBoardNum) {
		
		model.addAttribute("boardSideMenuList", boardService.getBoardSideMenuList());
		
		model.addAttribute("publicDetail", boardService.getBoardDetail(hbtBoardNum));
		
		
		return "content/board/get_public_detail";
	}
	

	@RequestMapping("/getBoardGroundPage")
	public String getBoardGroundPage(Model model,BoardVO boardVO) {
		if(boardVO.getGroundSearchVO() == null) {
			boardVO.setGroundSearchVO(new GroundSearchVO());
		}
		int totalDataCnt = boardService.getBoardListCnt(boardVO.getGroundSearchVO());

		boardVO.getGroundSearchVO().setTotalDataCnt(totalDataCnt);
		boardVO.getGroundSearchVO().setPageInfo();
		
		
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

	@ResponseBody
	@PostMapping("/chkPrivatePwAJAX")
	public String chkPrivatePwAJAX(String hbtBoardNum) {
		
		return boardService.getBoardPrivatePw(hbtBoardNum); 
		
	}
	
	@ResponseBody
	@PostMapping("/regReplyAJAX")
	public void regReplyAJAX(BoardReplyVO boardReplyVO) {
		
		String memCode = memberService.getMemCode(boardReplyVO.getMemberVO().getMemId());
		boardReplyVO.getMemberVO().setMemCode(memCode);
		
		String hbtBoardReplyCode = boardService.getNextByReplyNum();
		boardReplyVO.setHbtBoardReplyNum(hbtBoardReplyCode);
		
		System.out.println("@@@@@@@@@@@@@" + boardReplyVO);
		
		boardService.regBoardReply(boardReplyVO);
		
	}
	
	@ResponseBody
	@PostMapping("/delReplyAJAX")
	public List<BoardReplyVO> delReplyAJAX(BoardReplyVO boardReplyVO) {
		
		boardService.delReply(boardReplyVO);
		
		return boardService.getReplyList(boardReplyVO.getHbtBoardNum());
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
		
		model.addAttribute("boardDetail", boardService.getBoardDetail(hbtBoardNum));
		
		model.addAttribute("replyList", boardService.getReplyList(hbtBoardNum));
		
		return "content/board/board_gound_detail";
		
	}
	
	@ResponseBody
	@PostMapping("/getReplyListAJAX")
	public List<BoardReplyVO> getReplyListAJAX(String hbtBoardNum) {
		
		return boardService.getReplyList(hbtBoardNum);
	}
	
	@ResponseBody
	@PostMapping("/updateReplyAJAX")
	public String updateReplyAJAX(BoardReplyVO boardReplyVO) {
		
		boardService.updateReplyContent(boardReplyVO);
		
		return boardReplyVO.getHbtBoardReplyContent();
		
	}
	
	@ResponseBody
	@PostMapping("/regReReplyAJAX")
	public void regReReplyAJAX(BoardReplyVO boardReplyVO) {
		String hbtBoardReplyNum = boardService.getNextByReplyNum();
		String memCode = memberService.getMemCode(boardReplyVO.getMemberVO().getMemId());

		boardReplyVO.setHbtBoardReplyNum(hbtBoardReplyNum);
		boardReplyVO.getMemberVO().setMemCode(memCode);
		
		System.out.println(boardReplyVO);
		
		boardService.regBoardReply(boardReplyVO);
		
		
	}
	
	
	@GetMapping("/frequentlyRequestPage")
	public String frequentlyRequestPage(Model model, String typeRequestCode) {
		
		model.addAttribute("boardSideMenuList", boardService.getBoardSideMenuList());
		
		model.addAttribute("typeRequestList", boardService.getTypeRequestList());
		
		model.addAttribute("freqReqList", boardService.getFreqRequestList(typeRequestCode));
		
		return "content/board/frequentlyRequestPage";
	}
	
	@ResponseBody
	@PostMapping("/searchFreqRequestByCodeAJAX")
	public List<FreqRequestVO> searchFreqRequestByCodeAJAX(String typeRequestCode) {
		
		System.out.println("searchFreqRequestByCodeAJAX run~");
		System.out.println("@@@@@@@" + typeRequestCode);
		System.out.println(boardService.getFreqRequestList(typeRequestCode));
		
		return boardService.getFreqRequestList(typeRequestCode);
		
	}
	
	
	
	
	
	@GetMapping("/regRequestPage")
	public String regRequestPage(Model model, BoardRequestVO boardRequestVO) {
		boardRequestVO.setIsAnswer("");
		
		
		model.addAttribute("boardSideMenuList", boardService.getBoardSideMenuList());
		model.addAttribute("requestList", boardService.getBoardReqList(boardRequestVO));
		
		return "content/board/regRequestPage";
	}
	
	@ResponseBody
	@PostMapping("/chkReqPwAJAX")
	public boolean chkReqPwAJAX(String hbtBoardRequestNum, String chkPwVal) {
		
		boolean result = boardService.chkReqPw(hbtBoardRequestNum).equals(chkPwVal);
		
		return result;
		
	}
	
	@GetMapping("/RequestDetail")
	public String RequestDetail(Model model, String hbtBoardRequestNum) {
		
		model.addAttribute("boardSideMenuList", boardService.getBoardSideMenuList());
		model.addAttribute("reqDetail", boardService.getRequestDetail(hbtBoardRequestNum));
		
		return "content/board/request_detail";
	}
	
	
	
}
