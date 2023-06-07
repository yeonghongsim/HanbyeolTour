init()

function updateMyRequest(hbtBoardRequestNum, memId){
	const req_info = document.querySelector('.req_info');
	
	//ajax start
	$.ajax({
		url: '/myPage/chkMyRequestAJAX', //요청경로
		type: 'post',
		async: true, // 동기방식(Ajax사용), false == 비동기방식
		//contentType: 'application/json; charset=UTF-8',
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		//필요한 데이터
		// 위의 데이터를 자바가 인식 가능한 json 문자열로 변환
		data: {'hbtBoardRequestNum' : hbtBoardRequestNum},
		success: function(result) {
			
			if(result == 'Y'){
				alert('이미 답변된 내용입니다.\n 새로운 문의글을 작성하러 가시겠습니까?')
				location.href="/myPage/regRequestForm?memId="+memId;
			} else {
				alert('수정 가능')
				
				req_info.replaceChildren();
				
				
				
				
			}
			
			
		},
		error: function() {
			alert('실패');
		}
	});
	//ajax end
  		
	
}


function delMyRequest(hbtBoardRequestNum){
	
	const ask = confirm('정말로 문의 내역을 삭제하시겠습니까');
	
	if(ask){
		//ajax start
		$.ajax({
			url: '/myPage/delMyRequestAJAX', //요청경로
			type: 'post',
			async: true, // 동기방식(Ajax사용), false == 비동기방식
			//contentType: 'application/json; charset=UTF-8',
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			//필요한 데이터
			// 위의 데이터를 자바가 인식 가능한 json 문자열로 변환
			data: {'hbtBoardRequestNum' : hbtBoardRequestNum},
			success: function(result) {
				location.href="/myPage/checkMyRequest";
			},
			error: function() {
				alert('실패');
			}
		});
  		//ajax end
		
	}
	
	
}


function init(){
	
}