

//비밀번호 찾기 모달창(태그) 선택
const findPwModal = document.querySelector('#findPwModal');


//비밀번호 찾기 결과 모달창이 닫힐 때마다 실행되는 이벤트 
findPwModal.addEventListener('hidden.bs.modal', function(e){
	//모달창 안의 모든 input태그 초기화 
	const findPwModalDiv = document.querySelector('#findPwModalDiv');
	findPwModalDiv.innerHTML = '';
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
	
	const memIdTag = document.querySelector('#findPwMemIdDiv');
	
	// validation 처리
	const memId = document.querySelector('#findPwMemId').value;
	//const getIdCheck = RegExp(/^[a-zA-Z0-9]{4,14}$/);
	const idRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?!\s)[a-zA-Z\d]{6,14}$/;
	
	if(memId == ''){
		str_memId = '아이디는 필수 입력사항입니다.';
		result_memId = false;
	}
	else if(memId.match(idRegex) == null){
		str_memId = '올바르지 않은 아이디 형식입니다. 다시 입력해주세요.';
		result_memId = false;
	}
	
	//유효성 검사 실패 시 오류 메세지 출력
	if(!result_memId){
		const errorHTML = `<div id="memIdError" style="font-size: 0.8rem; color: #dc3545; margin-top: 0.3rem;margin-left:0.5rem;">${str_memId}</div>`;
		memIdTag.insertAdjacentHTML('afterend', errorHTML);
	    $('#findPwMemId').css('border-color', '#dc3545'); // 테두리 색상 변경
        $('#findPwMemId').css('border-width', '2px'); // 테두리 두께 변경
        document.querySelector('#check_id').disabled = true;
	}
	else {
        $('#findPwMemId').css('border-color', 'green'); 
        $('#findPwMemId').css('border-width', '2px');
        document.querySelector('#check_id').disabled = false;
    }
	
	
	return result_memId;
}



//이름 유효성 검사 
function nameValidate(){
	//기존 오류 메시지 제거 
	const memNameError = document.querySelector('#memNameError');
	if (memNameError) {
		memNameError.remove();
	}
	
	let result_memName = true;
	
	let str_memName =``;
	
	const memNameTag = document.querySelector('#findPwMemNameDiv');
	
	// validation 처리
	const memName = document.querySelector('#findPwMemName').value;
	const nameRegex = /^(?=.*[가-힣])(?!\s)[가-힣]{2,6}$/;
	
	if(memName == ''){
		str_memName = '이름은 필수 입력사항입니다.';
		result_memName = false;
	}
	else if(memName.match(nameRegex) == null){
		str_memName = '이름은 한글 6글자 이하로만 입력해주세요.';
		result_memName = false;
	}
	
	//유효성 검사 실패 시 오류 메세지 출력
	if(!result_memName){
		const errorHTML = `<div id="memNameError" style="font-size: 0.8rem; color: #dc3545; margin-top: 0.3rem; margin-left:0.5rem;">${str_memName}</div>`;
		memNameTag.insertAdjacentHTML('afterend', errorHTML);
		$('#findPwMemName').css('border-color', '#dc3545'); // 테두리 색상 변경
        $('#findPwMemName').css('border-width', '2px'); // 테두리 두께 변경
	}
	else {
        $('#findPwMemName').css('border-color', 'green'); 
        $('#findPwMemName').css('border-width', '2px');
    }
	
	return result_memName;
	
}


// 휴대폰번호 인풋태그 데이터 유효성 검사 
function memDTellValidate(){
	
	//기존 오류 메시지 제거 
	const memDTellError = document.querySelector('#memDTellError');
	if (memDTellError) {
		memDTellError.remove();
	}
	
	//함수 리턴 결과 저장할 함수 
	let result_memDTell= true;
	
	//오류 메세지 저장 
	let str_memDTell =``;
	
	const memDTellTag = document.querySelector('#findPwMemDTellDiv');
	
	// validation 처리
	const memDTell = document.querySelector('#findPwMemDTell').value;
	
	const phoneRegex = /^(010|011|016|019)\d{7,8}$/;
	
	if(memDTell == ''){
		str_memDTell = '휴대폰 번호는 필수 입력사항입니다.';
		result_memDTell = false;
	}
	else if(memDTell.match(phoneRegex) == null){
		str_memDTell = '올바르지 않은 휴대폰 번호입니다.';
		result_memDTell = false;
	}
	
	//유효성 검사 실패 시 오류 메세지 출력
	if(!result_memDTell){
		const errorHTML = `<div class="my-invalid" id="memDTellError" style="font-size: 0.8rem; color: #dc3545; margin-top: 0.3rem;margin-left:0.5rem;">${str_memDTell}</div>`;
		memDTellTag.insertAdjacentHTML('afterend', errorHTML);
	    $('#findPwMemDTell').css('border-color', '#dc3545'); // 테두리 색상 변경
        $('#findPwMemDTell').css('border-width', '2px'); // 테두리 두께 변경
	}
	else {
       $('#findPwMemDTell').css('border-color', 'green'); 
        $('#findPwMemDTell').css('border-width', '2px');
    }
	
	
	return result_memDTell;
}





function find_pw(findPwBtn){
	
	//버튼을 누르면 못 누르는 버튼으로 바꿔준다. 
	findPwBtn.disabled = true;
	
	// 버튼의 글자도 바꿔줘야 한다. 
	findPwBtn.querySelector('span').textContent = '임시 비밀번호 메일 발송중';
	
	//버튼을 클릭하면 spinner를 첫번째 자식으로 붙인다. 
	const spinner = `<span class="spinner-border spinner-border-sm text-light" role="status" aria-hidden="true"></span>`
	findPwBtn.insertAdjacentHTML('afterbegin', spinner );
	
	const spinnerBig = `<span class="spinner-border text-warning" style="width: 3rem; height: 3rem;" role="status" aria-hidden="true"></span>`

	let str =``;
		str += `<div class="col-12 text-center" id="findPw">`;
		str += `<span>`;
		str += `<br>`;
		str += `<br>`;
		str += `<span id="loadingSpinner"></span>`;
		str += `<br>`;
		str += `<br>`;
		str += `</span>`;
		str += `</div>`;

	//데이터 태그에 넣어주기 
	document.querySelector('#findPwModalDiv').insertAdjacentHTML('afterbegin', str);
	document.querySelector('#loadingSpinner').insertAdjacentHTML('afterbegin', spinnerBig);
				
	
	//ajax start
	$.ajax({
	   url: '/member/findPwAjax', //요청경로
	   type: 'post',
	   async: true, // 비동기 , 동기 설정
	   contentType: 'application/x-www-form-urlencoded; charset=UTF-8', // default
	   data: $('#findPwForm').serialize(), // 폼태그에 있는 인풋태그 데이터 다 가져오기
	   success: function(result) {
	    	if(result){
				//모달창 안의 모든 input태그 초기화 
				const findPwModalDiv = document.querySelector('#findPwModalDiv');
				findPwModalDiv.innerHTML = '';
				
								
				let str =``;
				str += `<div class="col-12 text-center" id="findPw">`;
				str += `<span>`;
				str += `<br>`;
				str += `<i class="bi bi-envelope-check" style="font-size:3rem; color:#ffd000;"></i><br>`;
				str += `가입시 입력한 이메일 주소로<br>`;
				str += `<strong>임시 비밀번호</strong>를 발급해드렸습니다.<br>`;
				str += `반드시 로그인 후 비밀번호를 변경하여 주세요!`;
				str += `<br>`;
				str += `<br>`;
				str += `</span>`;
				str += `</div>`;
				
				//데이터 태그에 넣어주기 
				document.querySelector('#findPwModalDiv').insertAdjacentHTML('afterbegin', str);
				
				// 둘 다의 경우에 실행됨 
				// 버튼의 disabled 속성 바꿔주기 
				findPwBtn.disabled = false;
				// spinner 지워주기 
				findPwBtn.querySelector('span:first-child').remove();
				// 버튼의 문구 변경 
				findPwBtn.querySelector('span').textContent = '임시 비밀번호 전송 완료';
					
				}
			else {//데이터 못찾은 경우 
			
				//모달창 안의 모든 input태그 초기화 
				const findPwModalDiv = document.querySelector('#findPwModalDiv');
				findPwModalDiv.innerHTML = '';
				
				let str =``;
				
				str += `<div class="col-12 text-center" id="findPw">`;
				str += `<span>`;
				str += `<br>`;
				str += `<i class="bi bi-exclamation-circle" style="font-size:3rem; color:#dc3545;"></i><br>`;
				str += `일치하는 회원정보가 없습니다.<br>`;
				str += `입력한 회원정보를 다시 확인해주세요.`;
				str += `<br>`;
				str += `<br>`;
				str += `</span>`;
				str += `</div>`;
				
				//데이터 태그에 넣어주기 
				document.querySelector('#findPwModalDiv').insertAdjacentHTML('afterbegin', str);
				
				// 둘 다의 경우에 실행됨 
				// 버튼의 disabled 속성 바꿔주기 
				findPwBtn.disabled = false;
				// spinner 지워주기 
				findPwBtn.querySelector('span:first-child').remove();
				// 버튼의 문구 변경 
				findPwBtn.querySelector('span').textContent = '임시 비밀번호 발급하기';
			}
	      
	   },
	   error: function() {
	      alert('실패');
	   }
	});
	//ajax end
		
	
	
}



	
	
	


















