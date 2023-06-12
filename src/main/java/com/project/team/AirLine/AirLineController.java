package com.project.team.AirLine;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.project.team.AirLine.vo.SearchAirLineVO;

@Controller
@RequestMapping("/airLine")
public class AirLineController {
	
	@ResponseBody
	@PostMapping("/searchAirLineAJAX")
	public void searchAirLineAJAX(SearchAirLineVO searchAirLineVO) {
		
		System.out.println("searchAirLineAJAX run~" + searchAirLineVO);
		
		
	}

}
