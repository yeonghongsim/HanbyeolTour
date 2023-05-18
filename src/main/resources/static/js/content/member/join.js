



//회원가입
function join(){
	
	/*
	//유효성 검사 진행 
	const idValid = idValidate();
	const pwValid = pwValidate();
		
	if(!idValid || !pwValid){
		return ;
	}
	*/
	
	//회원가입 진행 
	document.querySelector('#joinForm').submit();
}


//우편번호 검색 api 사용
function searchAddr(){
	    new daum.Postcode({
        oncomplete: function(data) {
			// 도로명 주소 변수
			const roadAddr = data.roadAddress; 
			//도로명 주소 세팅 
			document.querySelector('#memDAddr').value = roadAddr;
        }
    }).open();
}



//id 중복확인 버튼 클릭시 실행 
function isDuplicateMemId(){
	//회원 id를 입력하는 태그
	const memIdTag = document.querySelector('#memId');
	const memId = memIdTag.value;
	
	
	if(memId == ''){
		alert('아이디가 입력되어 있는지 확인해주세요.');
		return;
	}
	
	//ajax start
	$.ajax({
	   url: '/member/isDuplicateMemId', 
	   type: 'post',
	   async: false, 
	   data: {'memId' : memId}, 
	   success: function(result) {
			if(result == 1){ //id가 중복일 경우 
				alert('사용할 수 없는 아이디입니다.\n아이디를 다시 입력해주세요.');
				return false;
			}
			else{
				alert('사용 가능한 아이디입니다.');
				
				//JOIN 버튼의 disabled 속성 제거 
				document.querySelector('.joinBtn').disabled = false;
				
				//아이디 입력 태그 테두리 변화 
				
			}
	   },
	   error: function() {
	      alert('실패');
	   }
	});
	//ajax end
		
}


//회원가입 버튼 비활성화 (아이디 태그에 중복확인 후 키보드 입력하면 다시 회원가입 버튼 비활성화되도록 설정)
function setDisabled(){
	document.querySelector('.joinBtn').disabled = true;
}

//오류 메시지 div 전체 제거 
function deleteErrorDiv(){
	//기존의 오류메시지 전부 삭제 
	const errorDivs = document.querySelectorAll('div[class="my-invalid"]');
	const successDivs = document.querySelectorAll('div[class="my-valid"]');
	
	for(const errorDiv of errorDivs){
		errorDiv.remove();
	}
	for(const successDiv of successDivs){
		successDiv.remove();
	}
	
}

// 아이디 인풋태그 데이터 유효성 검사 
function idValidate(){
	
	deleteErrorDiv()
	
	//함수 리턴 결과 저장할 함수 
	let result_memId = true;
	
	//오류 메세지 저장 
	let str_memId ='';
	
	//회원가입 form 태그의 자식 div들 전체 선택 
	const divs = document.querySelectorAll('#joinForm > div');
	
	// validation 처리
	const memId = document.querySelector('#memId').value;
	//const getIdCheck = RegExp(/^[a-zA-Z0-9]{4,14}$/);
	const idRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,14}$/;
	
	if(memId == ''){
		str_memId = '아이디는 필수 입력사항입니다.';
		result_memId = false;
	}
	else if(memId.match(idRegex) == null){
		str_memId = '아이디는 영문과 숫자를 포함한 6~14자리의 글자로 입력해주세요.';
		result_memId = false;
	}
	
	//유효성 검사 실패 시 오류 메세지 출력
	if(!result_memId){
		const errorHTML = `<div class="my-invalid">${str_memId}</div>`;
		divs[1].insertAdjacentHTML('afterend', errorHTML);
	    $('#memId').css('border-color', 'red'); // 테두리 색상 변경
        $('#memId').css('border-width', '2px'); // 테두리 두께 변경
	}
	else {
        $('#memId').css('border-color', 'green'); 
        $('#memId').css('border-width', '2px');
    }
	
	
	return result_memId;
}


// 비밀번호 인풋태그 데이터 유효성 검사 
function pwValidate(){
	
	deleteErrorDiv()
	
	//함수 리턴 결과 저장할 함수 
	let result_memPw = true;
	
	//오류 메세지 저장 
	let str_memPw ='';
	
	//회원가입 form 태그의 자식 div들 전체 선택 
	const divs = document.querySelectorAll('#joinForm > div');
	
	// validation 처리
	const memPw = document.querySelector('#memPw').value;
	//const getIdCheck = RegExp(/^[a-zA-Z0-9]{4,14}$/);
	const pwRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{9,20}$/;
	
	if(memPw == ''){
		str_memPw = '비밀번호는 필수입력입니다.';
		result_memPw = false;
	}
	else if(memPw.match(pwRegex) == null){
		str_memPw = '비밀번호는 영문 대소문자와 특수문자를 포함한 9~20자리의 글자로 입력해주세요.';
		result_memPw = false;
	}
	
	//유효성 검사 실패 시 오류 메세지 출력
	if(!result_memPw){
		const errorHTML = `<div class="my-invalid">${str_memPw}</div>`;
		divs[2].insertAdjacentHTML('afterend', errorHTML);
		$('#memPw').css('border-color', 'red'); // 테두리 색상 변경
        $('#memPw').css('border-width', '2px'); // 테두리 두께 변경
	}
	else {
        $('#memPw').css('border-color', 'green'); // 오류가 없으면 테두리 색상 초기화
        $('#memPw').css('border-width', '2px');
    }
	
	return result_memPw;
}


//비밀번호 확인 
function pwCheck(){
	
	deleteErrorDiv()
	
	//함수 리턴 결과 저장할 함수 
	let result_pwCheck = true;
	
	//오류 메세지 저장 
	let str_pwCheck ='';
	
	
	originPw = document.querySelector('#memPw').value;
	checkPwTag = document.querySelector('#check_pw');
	checkPw = document.querySelector('#check_pw').value;
	
	if(originPw != checkPw){
		str_pwCheck = '입력한 비밀번호와 일치하지 않습니다.';
		result_pwCheck = false;
	}
	else{
		str_pwCheck = '비밀번호 확인이 완료 되었습니다.';
	}
	
	if(!result_pwCheck){
		const errorHTML = `<div class="my-invalid">${str_pwCheck}</div>`;
		checkPwTag.insertAdjacentHTML('afterend', errorHTML);
		$('#check_pw').css('border-color', 'red'); // 테두리 색상 변경
        $('#check_pw').css('border-width', '2px'); // 테두리 두께 변경
	}
	else {
        $('#check_pw').css('border-color', 'green'); // 오류가 없으면 테두리 색상 초기화
        $('#check_pw').css('border-width', '2px');
    }
		
	
}

























