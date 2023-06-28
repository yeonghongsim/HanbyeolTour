init()

function showBtn(imgTag, authorize){
	
	if(authorize == 'anonymousUser'){
		const ask = confirm('로그인 후 이용가능합니다.\n로그인하시겠습니까?');
		
		if(ask){
			location.href='/member/login';
		}
		
		return ;
	}
	
	const chk_row_div = imgTag.closest('.row').nextElementSibling;
	
	if(chk_row_div.classList.contains('hide')){
		chk_row_div.classList.remove('hide');
	}
	
}

function cancelChkPw(cancelBtn){
	const row_div = cancelBtn.closest('.row');
	
	row_div.classList.add('hide');
}

function chkReqPw(hbtBoardRequestNum, chkBtn){
	
	const chkPwVal = chkBtn.closest('.row').children[0].children[0];
	
	if(chkPwVal.value == ''){
		chkPwVal.placeholder = '비밀번호를 입력하세요.';
		
		return ;
	}
	
	//ajax start
	$.ajax({
		url: '/board/chkReqPwAJAX', //요청경로
		type: 'post',
		async: true, // 동기방식(Ajax사용), false == 비동기방식
		//contentType: 'application/json; charset=UTF-8',
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		//필요한 데이터
		// 위의 데이터를 자바가 인식 가능한 json 문자열로 변환
		data: {'hbtBoardRequestNum' : hbtBoardRequestNum
				, 'chkPwVal' : chkPwVal.value},
		success: function(result) {
			
			console.log(result);
			
			if(!result){
				alert('올바르지 않은 비밀번호 입니다.');
				chkPwVal.value = '';
				chkPwVal.placeholder = '비밀번호를 다시 입력하세요.';
				
			} else {
				location.href='/board/RequestDetail?hbtBoardRequestNum=' + hbtBoardRequestNum;
			}
			
			
			
			
		},
		error: function() {
			alert('실패');
		}
	});
   //ajax end
	
}



function init(){
	
}