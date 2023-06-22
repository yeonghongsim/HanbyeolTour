
//value 값 바꾸기 -> 
// 검색 버튼 -> from Date, to Date, StatusCode 변경 필요 
// 변경 form 태그 안의 value값을 내가 원하는 값으로 변경 
// form 밖은 이름 필요없음

//검색 버튼 눌렀을떄 실행 
function click_search_btn(){
	// 버튼 눌렀을 때 화면에 보이는 데이터를 폼태그 안에 넣어줌
	document.querySelector('#fromDate').value = document.querySelector('#fromDateShow').value;
	document.querySelector('#toDate').value = document.querySelector('#toDateShow').value;
	document.querySelector('#searchStatusCode').value = document.querySelector('#searchStatusCodeShow').value;
	
	// submit
	document.querySelector('#search-form').submit();
	
}


// 기간 버튼 눌렀을때 
// 리스트를 다시 완전히 뽑기 -> 페이지는 1로 고정 , 상태코드 form 태그 값 바꿔주기
//, month -> 날짜 
function click_month_btn(month){
	// 버튼 눌렀을 때 화면에 보이는 데이터를 폼태그 안에 넣어줌
	document.querySelector('#searchStatusCode').value = document.querySelector('#searchStatusCodeShow').value;
	document.querySelector('#month').value = month;
	
	// submit
	document.querySelector('#search-form').submit();
	
}

//페이징 
function click_page_btn(nowPage){
	document.querySelector('#nowPage').value = nowPage;
	
	// submit
	document.querySelector('#search-form').submit();	
}



// DIY 여행 취소 기능 
function cancel_reservation(hbtDiyCode, btn){
	// Confirmation
	const result = confirm(`정말 예약을 취소하시겠어요?`);
	if(result){
		//ajax start
		$.ajax({
		   url: '/myPage/cancelDiyReservationAJAX', //요청경로
		   type: 'post',
		   async: true, // 비동기 , 동기 설정
		   contentType: 'application/x-www-form-urlencoded; charset=UTF-8', // default
		   data: {'hbtDiyCode':hbtDiyCode}, //필요한 데이터
		   success: function(result) {
		     	// 성공시 취소요청으로 변환 
		    	if(result == 'success'){
					const cancelBtn = btn;
					
					const tdElement = cancelBtn.closest("td");
   					 tdElement.replaceChildren();; // td 내용 지우기
					
					let str = ``;
					
					str += `<div>`;
					str += `<span id="statusCode" style="font-weight: bolder;"> 취소요청 </span>`;
					str += `</div>`;
					tdElement.insertAdjacentHTML('afterbegin', str);
					
				}
		     	else{
					return;
				}
		     
		   },
		   error: function() {
		      alert('실패');
		   }
		});
		//ajax end
	}
	else{
		return;		
	}
	
}

