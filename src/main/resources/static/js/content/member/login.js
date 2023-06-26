



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
		str_memId = '아이디를 입력해주세요.';
		result_memId = false;
	}
	else if(memId.match(idRegex) == null){
		str_memId = '잘못된 형식의 아이디 입니다. 다시 확인해주세요.';
		result_memId = false;
	}
	
	//유효성 검사 실패 시 오류 메세지 출력
	if(!result_memId){
		const errorHTML = `<div id="memIdError" style="font-size: 0.8rem; color: #f27370; margin-top: 0.1rem;margin-left:0.5rem;">${str_memId}</div>`;
		loginIdTag.insertAdjacentHTML('afterend', errorHTML);
	    $('#memId').css('border-color', '#f27370'); // 테두리 색상 변경
        $('#memId').css('border-width', '1.5px'); // 테두리 두께 변경
	}
	else {
        $('#memId').css('border-color', '#c6df5f'); 
        $('#memId').css('border-width', '1.5px');
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
	//const pwRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])(?!\s)[A-Za-z\d@$!%*?&]{8,20}$/;
	const pwRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&!@#$%^&*()]{8,20}$/;

	if(memPw == ''){
		str_memPw = '비밀번호를 입력해주세요.';
		result_memPw = false;
	}
	else if(memPw.match(pwRegex) == null){
		str_memPw = '잘못된 형식의 비밀번호 입니다. 다시 확인해주세요.';
		result_memPw = false;
	}
	
	//유효성 검사 실패 시 오류 메세지 출력
	if(!result_memPw){
		const errorHTML = `<div id="memPwError" style="font-size: 0.8rem; color: #f27370; margin-top: 0.1rem;margin-left:0.5rem;">${str_memPw}</div>`;
		loginPwTag.insertAdjacentHTML('afterend', errorHTML);
		$('#memPw').css('border-color', '#f27370'); // 테두리 색상 변경
        $('#memPw').css('border-width', '1.5px'); // 테두리 두께 변경
	}
	else {
        $('#memPw').css('border-color', '#c6df5f'); 
        $('#memPw').css('border-width', '1.5px');
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
	    		
	    		//ajax start
				$.ajax({
				   url: '/member/isTemporaryPwAJAX', //요청경로
				   type: 'post',
				   async: true, 
				   contentType: 'application/x-www-form-urlencoded; charset=UTF-8', // default
				   data: {'memId': memId}, //필요한 데이터
				   success: function(result) {
					
						if(result == 'Y'){
						
							// IS_TEMPORARY_PW = 'Y' 인 경우 (임시 비밀번호 발급받은 회원)
						    let str =``;
						   
						    str += `<div class="col-12 text-center">`;
							str += `<span>`;
							str += `<br>`;
							str += `<i class="bi bi-person-circle" style="font-size:3rem; color:#ffd000;"></i><br>`;
							str += `<strong style="font-size:1.2rem;">${memId}</strong> 회원님!<br>`;
							str += `지금은 임시 비밀번호가 발급된 상태입니다.<br>`;
							str += `<strong style="font-weight:bolder; color:red;">꼭! 비밀번호 변경 후</strong> 사이트를 이용해주세요!`;
							str += `<br>`;
							str += `</span>`;
							str += `</div>`;
						
						    // 데이터 태그에 넣어주기
						    document.querySelector('#loginModalDiv').insertAdjacentHTML('afterbegin', str);
						    document.querySelector('#btn-home-2').style.display = 'block';
							document.querySelector('#btn-updatePw').style.display = 'block';
							
						}
						else{
							//일반회원 - 그냥 로그인 성공한 경우 
							let str =``;
							// div 를 선택할수 있도록하기 위해서 아이디 부여 ( 다시 창이 뜰 때 삭제할수 있도록 )
							
							str += `<div class="col-12 text-center">`;
							str += `<span>`;
							str += `<i class="bi bi-person-circle" style="font-size:3rem; color:#ffd000;"></i><br>`;
							str += `<strong style="font-size:1.2rem;">${memId}</strong> 회원님 환영합니다!`;
							str += `</span>`;
							str += `</div>`;
							
							//데이터 태그에 넣어주기 
							document.querySelector('#loginModalDiv').insertAdjacentHTML('afterbegin', str);
							document.querySelector('#btn-home').style.display = 'block';
							
						}
										
				   },
				   error: function() {
				      alert('실패');
				   }
				});
				//ajax end
							
			}  
			else {
				// 로그인 실패한 경우
				let str =``;
			
				str += `<div class="col-12 text-center">`;
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

// 임시비밀번호 발급 회원 - 로그인 후 홈으로 이동 누를시에 뜨는 팝업 
function beforeGoMain(){
	if(confirm('비밀번호 변경없이 홈으로 이동하시겠어요?\n비밀번호 변경은 언제든 가능합니다!\n잊지말고 꼭 변경해주세요~🙂')){
		location.href = '/';
	}
}









// 회원가입 글씨 옆 popover 적용 
const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))


