



//아이디 찾기 모달창(태그) 선택
const loginModal = document.querySelector('#loginModal');

//아이디찾기 결과 모달창이 닫힐 때마다 실행되는 이벤트 
loginModal.addEventListener('hidden.bs.modal', function(e){
	//모달창 안의 모든 input태그 초기화 
	const loginModalDiv = document.querySelector('#loginModalDiv');
	loginModalDiv.innerHTML = '';
});



// 아이디 인풋태그 데이터 유효성 검사 
function idValidate(){
	//기존 오류 메시지 제거 
	const memIdError = document.querySelector('#memIdError');
	if (memIdError) {
		memIdError.remove();
	}
	
	//함수 리턴 결과 저장할 함수 
	let result_memId = true;
	
	//오류 메세지 저장 
	let str_memId =``;
	
	const loginIdTag = document.querySelector('#loginIdDiv');
	
	// validation 처리
	const memId = document.querySelector('#memId').value;
	const idRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?!\s)[a-zA-Z\d]{6,14}$/;
	
	if(memId == ''){
		str_memId = '입력된 아이디가 없습니다.';
		result_memId = false;
	}
	else if(memId.match(idRegex) == null){
		str_memId = '잘못된 형식의 아이디 입니다. 다시 확인해주세요.';
		result_memId = false;
	}
	
	//유효성 검사 실패 시 오류 메세지 출력
	if(!result_memId){
		const errorHTML = `<div id="memIdError" style="font-size: 0.8rem; color: #dc3545; margin-top: 0.3rem;margin-left:0.5rem;">${str_memId}</div>`;
		loginIdTag.insertAdjacentHTML('afterend', errorHTML);
	    $('#memId').css('border-color', '#dc3545'); // 테두리 색상 변경
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
	//기존 오류 메시지 제거 
	const memPwError = document.querySelector('#memPwError');
	if (memPwError) {
		memPwError.remove();
	}
	
	//함수 리턴 결과 저장할 함수 
	let result_memPw = true;
	
	//오류 메세지 저장 
	let str_memPw =``;
	
	const loginPwTag = document.querySelector('#loginPwDiv');
	
	// validation 처리
	const memPw = document.querySelector('#memPw').value;
	const pwRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])(?!\s)[A-Za-z\d@$!%*?&]{9,20}$/;
	
	if(memPw == ''){
		str_memPw = '입력된 비밀번호가 없습니다.';
		result_memPw = false;
	}
	else if(memPw.match(pwRegex) == null){
		str_memPw = '잘못된 형식의 비밀번호 입니다. 다시 확인해주세요.';
		result_memPw = false;
	}
	
	//유효성 검사 실패 시 오류 메세지 출력
	if(!result_memPw){
		const errorHTML = `<div id="memPwError" style="font-size: 0.8rem; color: #dc3545; margin-top: 0.3rem;margin-left:0.5rem;">${str_memPw}</div>`;
		loginPwTag.insertAdjacentHTML('afterend', errorHTML);
		$('#memPw').css('border-color', '#dc3545'); // 테두리 색상 변경
        $('#memPw').css('border-width', '2px'); // 테두리 두께 변경
	}
	else {
        $('#memPw').css('border-color', 'green'); 
        $('#memPw').css('border-width', '2px');
    }
	
	return result_memPw;
}




//로그인 함수 -> 로그인 결과에 따른 modal 창 띄우기 
function login(){
	const memId = document.querySelector('#loginForm #memId').value;
	const memPw = document.querySelector('#loginForm #memPw').value;

	//ajax start
	$.ajax({
	   url: '/member/login', //요청경로
	   type: 'post',
	   data: {'memId':memId, 'memPw':memPw}, //필요한 데이터
	   success: function(result) {
			
			if(result == 'success'){ //로그인 성공 시
				
				let str =``;
				// div 를 선택할수 있도록하기 위해서 아이디 부여 ( 다시 창이 뜰 때 삭제할수 있도록 )
				
				str += `<div class="col-12 text-center" id="findId">`;
				str += `<span>`;
				str += `<i class="bi bi-person-circle" style="font-size:3rem; color:#ffd000;"></i><br>`;
				str += `<strong style="font-size:1.2rem;">${memId}</strong> 회원님 환영합니다!`;
				str += `</span>`;
				str += `</div>`;
				
				//데이터 태그에 넣어주기 
				document.querySelector('#loginModalDiv').insertAdjacentHTML('afterbegin', str);
				 document.querySelector('#btn-row').style.display = 'block';
				
				
			}
			else{//로그인 실패 시 
			
							
				let str =``;
			
				str += `<div class="col-12 text-center" id="findId">`;
				str += `<span>`;
				str += `<br>`;
				str += `<i class="bi bi-exclamation-circle" style="font-size:3rem; color:#dc3545;"></i><br>`;
				str += `일치하는 정보의 회원이 없습니다.<br>
						입력한 정보를 다시 확인해주세요.`;
				str += `<br>`;
				str += `<br>`;
				str += `</span>`;
				str += `</div>`;
				
				//데이터 태그에 넣어주기 
				document.querySelector('#loginModalDiv').insertAdjacentHTML('afterbegin', str);
				
				//버튼 안보이게 하기 
				document.querySelector('#btn-row').style.display = 'none';
				
				//pw input 태그만 초기화
				const inputs = document.querySelectorAll('#loginForm input:not([type="button"])');
				
				if (inputs.length >= 2) {
				  const secondInput = inputs[1];
				  secondInput.value = '';
				}
							
				
			}
	   },
	   error: function() {
	      alert('실패');
	   }
	});
	//ajax end
	
	
}












// 회원가입 글씨 옆 popover 적용 
const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))


