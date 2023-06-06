


//month 에는 0, -1, -3, -6, -12 들어있다. 
function get_buy_list(month){
	
	const month_form = document.querySelector('#month-form');
	
	month_form.querySelector('input').value = month;
	// 변경된 내용 저장한 상태로 목록 조회 
	month_form.submit();	
	
}















































