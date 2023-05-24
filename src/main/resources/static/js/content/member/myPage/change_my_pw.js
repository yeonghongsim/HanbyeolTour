

//비밀번호 변경 쿼리 
function change_my_pw(memId){
	//유효성 검사 실행 결과 
	const pwValid = pwValidate();
	const pwCheckValid = pwCheckValidate();
	
	if(!pwValid || !pwCheckValid){
		alert('입력한 비밀번호를 다시 확인해주세요.');
	}
	else{
			// 새 비밀번호 입력값 
		const memPw = document.querySelector('#memPw').value;
		console.log(memId);
		
		if(memPw != null){
			$.ajax({
		   url: '/myPage/changeMyPwFormAjax', //요청경로
		   type: 'post',
		   async: true, // 비동기 , 동기 설정
		   contentType: 'application/x-www-form-urlencoded; charset=UTF-8', // default
		   data: {'memId':memId, 'memPw':memPw}, //필요한 데이터
		   success: function(result) {
				if(result == 'success'){
					alert('비밀번호가 성공적으로 변경되었습니다.');
					location.href = `/member/login`
				}
				else{
					alert('비밀번호 변경에 실패했습니다.');
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
			alert('비밀번호 입력을 다시 확인해주세요.');
		}
	
		
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
}





// 유효성 검사 
// 비밀번호 인풋태그 데이터 유효성 검사 
function pwValidate(){
	//기존 오류 메시지 제거 
	const memPwError = document.querySelector('#memPwError');
	if (memPwError) {
		memPwError.remove();
	}
	
	//함수 리턴 결과 저장할 함수 
	let result_memPw = true;
	
	//오류 메세지 저장 
	let str_memPw =``;
	
	const newPwTag = document.querySelector('#newPwDiv');
	
	// validation 처리
	const memPw = document.querySelector('#memPw').value;
	//const pwRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])(?!\s)[A-Za-z\d@$!%*?&]{8,20}$/;
	const pwRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&!@#$%^&*()]{8,20}$/;

	if(memPw == ''){
		str_memPw = '비밀번호를 입력해주세요.';
		result_memPw = false;
	}
	else if(memPw.match(pwRegex) == null){
		str_memPw = '대소문자 영문자 각 1개, 숫자, 특수문자를 모두 포함하여 8-20글자로 작성해주세요.';
		result_memPw = false;
	}
	
	//유효성 검사 실패 시 오류 메세지 출력
	if(!result_memPw){
		const errorHTML = `<div id="memPwError" style="font-size: 0.8rem; color: #dc3545; margin-top: 0.3rem;margin-left:0.5rem;">${str_memPw}</div>`;
		newPwTag.insertAdjacentHTML('afterend', errorHTML);
		$('#memPw').css('border-color', '#dc3545'); // 테두리 색상 변경
        $('#memPw').css('border-width', '2px'); // 테두리 두께 변경
	}
	else {
        $('#memPw').css('border-color', 'green'); 
        $('#memPw').css('border-width', '2px');
    }
	
	return result_memPw;
}


//비밀번호 확인 유효성 검사 
function pwCheckValidate(){
	//기존 오류 메시지 제거 
	const pwCheckError = document.querySelector('#pwCheckError');
	if (pwCheckError) {
		pwCheckError.remove();
	}
	
	//함수 리턴 결과 저장할 함수 
	let result_pwCheck = true;
	
	//오류 메세지 저장 
	let str_pwCheck ='';
	
	originPw = document.querySelector('#memPw').value;
	checkPwTag = document.querySelector('#newPwCheckDiv');
	checkPw = document.querySelector('#checkPw').value;
	
	if(checkPw == ''){
		str_pwCheck = `위에서 입력한 비밀번호를 한번 더 입력해주세요.`;
		result_pwCheck = false;
	}
	else{
		
		if(originPw != null && originPw != checkPw){
		str_pwCheck = '입력한 비밀번호와 일치하지 않습니다.';
		result_pwCheck = false;
		}
		
		if(originPw != null && originPw == checkPw){
			str_pwCheck = '비밀번호 확인이 완료 되었습니다.';
		}
	}
	
	 
	
	if(!result_pwCheck){
	const errorHTML = `<div id="pwCheckError" style="font-size: 0.8rem; color: #dc3545; margin-top: 0.3rem;margin-left:0.5rem;">${str_pwCheck}</div>`;
	checkPwTag.insertAdjacentHTML('afterend', errorHTML);
	$('#checkPw').css('border-color', '#dc3545'); // 테두리 색상 변경
    $('#checkPw').css('border-width', '2px'); // 테두리 두께 변경
	}
	else {
        $('#checkPw').css('border-color', 'green'); 
        $('#checkPw').css('border-width', '2px');
    }
	
	return result_pwCheck;	
	
}












 
 
 
 
 
 
 
 
 
 