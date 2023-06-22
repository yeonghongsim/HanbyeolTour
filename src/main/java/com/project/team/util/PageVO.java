package com.project.team.util;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class PageVO {
	private int nowPage; 		// 현재 선택된 페이지 번호
	private int totalDataCnt; 	// 전체 데이터 수
	private int beginPage; 		// 화면에 보이는 천번째 페이지 번호
	private int endPage; 		// 화면에 보이는 마지막 페이지 번호
	private int displayCnt; 	// 한 페이지에 보여지는 게시글 수
	private int displayPageCnt; // 한 페이지에 한번에 보여지는 페이지 수
	private boolean prev; 		// '이전' 버튼의 유무
	private boolean next; 		// '다음' 버튼의 유무
	private int offsetCnt;		// 건너뛸 개수
	
	public PageVO() {
		nowPage = 1;
		displayCnt = 5;
		displayPageCnt = 3;
	}
	
	// 메소드 실행 시 페이지 처리를 위한 모든 변수 값 세팅
	public void setPageInfo() {
		// Math.ceil(실수) : 실수의 올림 함수 - 실수 타입 : 원한다면 형변환 필요
		// 마지막에 보이는 페이지 번호
		endPage = displayPageCnt * (int)Math.ceil(nowPage / (double)displayPageCnt);
		
		// 처음에 보이는 페이지 번호
		beginPage = endPage - displayPageCnt + 1;
	
		// 전체 페이지 수
		int totalPageCnt = (int)Math.ceil(totalDataCnt / (double)displayCnt);
		
		// next 버튼 유무
		if(endPage < totalPageCnt){
			next = true;
		} else {
			next = false;
			endPage = totalPageCnt;
		}
		
		// prev 버튼 유무
		prev = beginPage == 1? false : true;
		
		// 검색 시작과 마지막 row_num
		offsetCnt = (nowPage - 1) * displayCnt;
		
		// 조회된 데이터가 0인경우
		if(totalPageCnt == 0) {
			endPage = 1;
		}
	}

	public int getNowPage() {
		return nowPage;
	}

	public void setNowPage(int nowPage) {
		this.nowPage = nowPage;
	}

	public int getBeginPage() {
		return beginPage;
	}

	public void setBeginPage(int beginPage) {
		this.beginPage = beginPage;
	}

	public int getEndPage() {
		return endPage;
	}

	public void setEndPage(int endPage) {
		this.endPage = endPage;
	}

	public int getDisplayCnt() {
		return displayCnt;
	}

	public void setDisplayCnt(int displayCnt) {
		this.displayCnt = displayCnt;
	}

	public int getDisplayPageCnt() {
		return displayPageCnt;
	}

	public void setDisplayPageCnt(int displayPageCnt) {
		this.displayPageCnt = displayPageCnt;
	}

	public boolean isPrev() {
		return prev;
	}

	public void setPrev(boolean prev) {
		this.prev = prev;
	}

	public boolean isNext() {
		return next;
	}

	public void setNext(boolean next) {
		this.next = next;
	}

	public int getTotalDataCnt() {
		return totalDataCnt;
	}

	public void setTotalDataCnt(int totalDataCnt) {
		this.totalDataCnt = totalDataCnt;
	}
	
	public int getOffsetCnt() {
		return offsetCnt;
	}
	public void setOffsetCnt(int offsetCnt) {
		this.offsetCnt = offsetCnt;
	}
	
}
