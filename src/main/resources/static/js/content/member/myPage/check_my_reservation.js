


//month 에는 0, -1, -3, -6, -12 들어있다. 
function get_buy_list(month){
	
	const month_form = document.querySelector('#month-form');
	
	month_form.querySelector('input').value = month;
	// 변경된 내용 저장한 상태로 목록 조회 
	month_form.submit();	
	
}


//페이징 버튼을 눌렀을때 검색기능이 실행이 되면서 페이지 이동이 가능하게 하는 함수 
function get_buy_list_paging(pageNum){
	//히든타입의 nowPage 데이터 넘기는 태그의 value에 받은 pageNum데이터를 넣어줌 
	document.querySelector('#nowPage').value = pageNum;
	

}






































