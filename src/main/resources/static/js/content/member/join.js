



//회원가입
function join(){
		
    // 유효성 검사 진행
    const idValid = idValidate();
    const pwValid = pwValidate();
    const pwCheckValid = pwCheckValidate();
    const nameValid = nameValidate();
    const emailValid = emailValidate();
    const memDTellValid = memDTellValidate();
    const memDAddrValid = memDAddrValidate();
    const memDAddr2Valid = memDAddr2Validate();
	    if (!idValid || !pwValid || !pwCheckValid || !nameValid || !emailValid || !memDTellValid || !memDAddrValid || !memDAddr2Valid) {
    	alert('모든 입력사항들과 인증이 올바르게 처리되어 있는지 확인해주세요!');
    	return ;
    }
    
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
			//기존 오류 메시지 제거 
			const memDAddrError = document.querySelector('#memDAddrError');
			if (memDAddrError) {
				memDAddrError.remove();
			}
			
			$('#memDAddr').css('border-color', 'green'); 
        	$('#memDAddr').css('border-width', '2px');
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
	   url: '/member/isDuplicateMemIdAJAX', 
	   type: 'post',
	   async: false, 
	   data: {'memId' : memId}, 
	   success: function(result) {
			if(result == 1){ //id가 중복일 경우 
				alert('사용할 수 없는 아이디입니다.\n아이디를 다시 입력해주세요.');
				$('#memId').css('border-color', '#dc3545'); // 테두리 색상 변경
        		$('#memId').css('border-width', '2px'); // 테두리 두께 변경
				return false;
			}
			else{
				alert('사용 가능한 아이디입니다.');
				
			}
	   },
	   error: function() {
	      alert('실패');
	   }
	});
	//ajax end
		
}


//회원가입 버튼 비활성화 (아이디 태그에 중복확인 후 키보드 입력하면 다시 회원가입 버튼 비활성화되도록 설정)
//function setDisabled(){
//	document.querySelector('.joinBtn').disabled = true;
//}



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
	
	const memIdTag = document.querySelector('#memIdDiv');
	
	// validation 처리
	const memId = document.querySelector('#memId').value;
	//const getIdCheck = RegExp(/^[a-zA-Z0-9]{4,14}$/);
	const idRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?!\s)[a-zA-Z\d]{6,14}$/;
	
	if(memId == ''){
		str_memId = '아이디는 필수 입력사항입니다.';
		result_memId = false;
	}
	else if(memId.match(idRegex) == null){
		str_memId = '아이디는 영문과 숫자를 포함한 6~14자리의 글자로 입력해주세요.<br>공백은 불가합니다.';
		result_memId = false;
	}
	
	//유효성 검사 실패 시 오류 메세지 출력
	if(!result_memId){
		const errorHTML = `<div id="memIdError" style="font-size: 0.8rem; color: #dc3545; margin-top: 0.3rem;margin-left:0.5rem;">${str_memId}</div>`;
		memIdTag.insertAdjacentHTML('afterend', errorHTML);
	    $('#memId').css('border-color', '#dc3545'); // 테두리 색상 변경
        $('#memId').css('border-width', '2px'); // 테두리 두께 변경
	}
	else {
        $('#memId').css('border-color', 'green'); 
        $('#memId').css('border-width', '2px');
        document.querySelector('#checkId').disabled = false;
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
	
	const memPwTag = document.querySelector('#memPwDiv');
	
	// validation 처리
	const memPw = document.querySelector('#memPw').value;
	//const pwRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])(?!\s)[A-Za-z\d@$!%*?&]{8,20}$/;
	const pwRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&!@#$%^&*()]{8,20}$/;
		
	if(memPw == ''){
		str_memPw = '비밀번호는 필수 입력사항입니다.';
		result_memPw = false;
	}
	else if(memPw.match(pwRegex) == null){
		str_memPw = '비밀번호는 영문 대소문자, 숫자, 특수문자를 1개 이상 포함한 8~20자리의 글자로 입력해주세요.<br>공백은 불가합니다.';
		result_memPw = false;
	}
	
	//유효성 검사 실패 시 오류 메세지 출력
	if(!result_memPw){
		const errorHTML = `<div id="memPwError" style="font-size: 0.8rem; color: #dc3545; margin-top: 0.3rem;margin-left:0.5rem;">${str_memPw}</div>`;
		memPwTag.insertAdjacentHTML('afterend', errorHTML);
		$('#memPw').css('border-color', '#dc3545'); // 테두리 색상 변경
        $('#memPw').css('border-width', '2px'); // 테두리 두께 변경
	}
	else {
        $('#memPw').css('border-color', 'green'); 
        $('#memPw').css('border-width', '2px');
    }
	
	return result_memPw;
}


//비밀번호 확인 
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
	checkPwTag = document.querySelector('#checkPw');
	checkPw = document.querySelector('#checkPw').value;
	
	if(checkPw == ''){
		str_pwCheck = `비밀번호 확인을 입력해주세요.`;
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
	
	 
	
	//if(originPw != null){
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
	//}
	
	return result_pwCheck;	
	
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
	
	const memNameTag = document.querySelector('#memNameDiv');
	
	// validation 처리
	const memName = document.querySelector('#memName').value;
	const nameRegex = /^(?=.*[가-힣])(?!\s)[가-힣]{2,6}$/;
	
	if(memName == ''){
		str_memName = '이름은 필수 입력사항입니다.';
		result_memName = false;
	}
	else if(memName.match(nameRegex) == null){
		str_memName = '이름은 한글 6글자 이하로만 입력해주세요.<br>공백은 불가합니다.';
		result_memName = false;
	}
	
	//유효성 검사 실패 시 오류 메세지 출력
	if(!result_memName){
		const errorHTML = `<div id="memNameError" style="font-size: 0.8rem; color: #dc3545; margin-top: 0.3rem; margin-left:0.5rem;">${str_memName}</div>`;
		memNameTag.insertAdjacentHTML('afterend', errorHTML);
		$('#memName').css('border-color', '#dc3545'); // 테두리 색상 변경
        $('#memName').css('border-width', '2px'); // 테두리 두께 변경
	}
	else {
        $('#memName').css('border-color', 'green'); 
        $('#memName').css('border-width', '2px');
    }
	
	return result_memName;
	
}


// 이메일 인풋태그 데이터 유효성 검사 
function emailValidate(){
	
	//기존 오류 메시지 제거 
	const memEmailError = document.querySelector('#memEmailError');
	if (memEmailError) {
		memEmailError.remove();
	}
	
	//함수 리턴 결과 저장할 함수 
	let result_memEmail= true;
	
	//오류 메세지 저장 
	let str_memEmail =``;
	
	const memEmailTag = document.querySelector('#memEmailDiv');
	
	// validation 처리
	const memEmail = document.querySelector('#memEmail').value;
	//const getIdCheck = RegExp(/^[a-zA-Z0-9]{4,14}$/);
	const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	
	if(memEmail == ''){
		str_memEmail = '이메일 주소는 필수 입력사항입니다.';
		result_memEmail = false;
	}
	else if(memEmail.match(emailRegex) == null){
		str_memEmail = '올바르지 않은 이메일 주소 형식입니다.<br>공백은 불가합니다.';
		result_memEmail = false;
	}
	
	//유효성 검사 실패 시 오류 메세지 출력
	if(!result_memEmail){
		const errorHTML = `<div id="memEmailError" style="font-size: 0.8rem; color: #dc3545; margin-top: 0.3rem;margin-left:0.5rem;">${str_memEmail}</div>`;
		memEmailTag.insertAdjacentHTML('afterend', errorHTML);
	    $('#memEmail').css('border-color', '#dc3545'); // 테두리 색상 변경
        $('#memEmail').css('border-width', '2px'); // 테두리 두께 변경
	}
	else {
        $('#memEmail').css('border-color', 'green'); 
        $('#memEmail').css('border-width', '2px');
        document.querySelector('#checkEmail').disabled = false;
    }
	
	
	return result_memEmail;
}



//email 중복확인 버튼 클릭시 실행 
function isDuplicateMemEmail(){
	//회원 id를 입력하는 태그
	const memEmailTag = document.querySelector('#memEmail');
	const memEmail = memEmailTag.value;
	
	
	if(memEmail == ''){
		alert('이메일 주소는 필수 입력사항입니다.');
		return;
	}
	
	//ajax start
	$.ajax({
	   url: '/member/isDuplicateMemEmailAJAX', 
	   type: 'post',
	   async: false, 
	   data: {'memEmail' : memEmail}, 
	   success: function(result) {
			if(result == 1){ //id가 중복일 경우 
				alert('사용할 수 없는 이메일 주소입니다.\n다시 입력해주세요.');
				$('#memEmail').css('border-color', '#dc3545'); // 테두리 색상 변경
        		$('#memEmail').css('border-width', '2px'); // 테두리 두께 변경
				return false;
			}
			else{
				alert('사용 가능한 이메일 주소입니다.');
				authBtn = document.querySelector('#sendAuthCode');
				authBtn.disabled = false;
			}
	   },
	   error: function() {
	      alert('실패');
	   }
	});
	//ajax end
}



// 휴대폰 번호 인풋태그 데이터 유효성 검사 
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
	
	const memDTellTag = document.querySelector('#memDTellDiv');
	
	// validation 처리
	const memDTell = document.querySelector('#memDTell').value;
	
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
	    $('#memDTell').css('border-color', '#dc3545'); // 테두리 색상 변경
        $('#memDTell').css('border-width', '2px'); // 테두리 두께 변경
	}
	else {
        $('#memDTell').css('border-color', 'green'); 
        $('#memDTell').css('border-width', '2px');
         document.querySelector('#checkMemDTell').disabled = false;
    }
	
	
	return result_memDTell;
}


//우편번호 유효성검사 
function memDAddrValidate(){
	
	//기존 오류 메시지 제거 
	const memDAddrError = document.querySelector('#memDAddrError');
	if (memDAddrError) {
		memDAddrError.remove();
	}
	
	//함수 리턴 결과 저장할 함수 
	let result_memDAddr= true;
	
	//오류 메세지 저장 
	let str_memDAddr =``;
	
	const memDAddrTag = document.querySelector('#memDAddrDiv');
	
	// validation 처리
	const memDAddr = document.querySelector('#memDAddr').value;
	
	if(memDAddr == ''){
		str_memDAddr = `주소는 필수 입력사항입니다. 주소 검색을 통해 입력해주세요.`;
		result_memDAddr = false;
	}
	
	//유효성 검사 실패 시 오류 메세지 출력
	if(!result_memDAddr){
		const errorHTML = `<div class="my-invalid" id="memDAddrError" style="font-size: 0.8rem; color: #dc3545; margin-top: 0.3rem;margin-left:0.5rem;">${str_memDAddr}</div>`;
		memDAddrTag.insertAdjacentHTML('afterend', errorHTML);
	    $('#memDAddr').css('border-color', '#dc3545'); // 테두리 색상 변경
        $('#memDAddr').css('border-width', '2px'); // 테두리 두께 변경
	}
	else {
       $('#memDAddr').css('border-color', 'green'); 
        $('#memDAddr').css('border-width', '2px');
    }
	
	
	return result_memDAddr;
}


//상세 주소 유효성 검사 
function memDAddr2Validate(){
	
	//기존 오류 메시지 제거 
	const memDAddr2Error = document.querySelector('#memDAddr2Error');
	if (memDAddr2Error) {
		memDAddr2Error.remove();
	}
	
	//함수 리턴 결과 저장할 함수 
	let result_memDAddr2= true;
	
	//오류 메세지 저장 
	let str_memDAddr2 =``;
	
	const memDAddr2Tag = document.querySelector('#memDAddr2Div');
	
	// validation 처리
	const memDAddr2 = document.querySelector('#memDAddr2').value;
	
	if(memDAddr2 == ''){
		str_memDAddr2 = `상세 주소를 입력해주세요.`;
		result_memDAddr2 = false;
	}
	
	//유효성 검사 실패 시 오류 메세지 출력
	if(!result_memDAddr2){
		const errorHTML = `<div class="my-invalid" id="memDAddr2Error" style="font-size: 0.8rem; color: #dc3545; margin-top: 0.3rem;margin-left:0.5rem;">${str_memDAddr2}</div>`;
		memDAddr2Tag.insertAdjacentHTML('afterend', errorHTML);
	    $('#memDAddr2').css('border-color', '#dc3545'); // 테두리 색상 변경
        $('#memDAddr2').css('border-width', '2px'); // 테두리 두께 변경
	}
	else {
       $('#memDAddr2').css('border-color', 'green'); 
        $('#memDAddr2').css('border-width', '2px');
    }
	
	
	return result_memDAddr2;
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



//memDTell 중복확인 버튼 클릭시 실행 
function isDuplicateMemDTell(){
	//회원 id를 입력하는 태그
	const memDTellTag = document.querySelector('#memDTell');
	const memDTell = memDTellTag.value;
	
	
	if(memDTell == ''){
		alert('휴대폰 번호는 필수 입력사항입니다.');
		return;
	}
	
	//ajax start
	$.ajax({
	   url: '/member/isDuplicateMemDTellAJAX', 
	   type: 'post',
	   async: false, 
	   data: {'memDTell' : memDTell}, 
	   success: function(result) {
			if(result == 1){ //id가 중복일 경우 
				alert('사용 불가한 휴대폰 번호입니다.\n다시 입력해주세요.');
				$('#memDTell').css('border-color', '#dc3545'); 
        		$('#memDTell').css('border-width', '2px'); 
				return false;
			}
			else{
				alert('사용 가능한 휴대폰 번호 입니다.');
				$('#memDTell').css('border-color', 'green'); 
        		$('#memDTell').css('border-width', '2px');
			}
	   },
	   error: function() {
	      alert('실패');
	   }
	});
	//ajax end
}



//이메일 인증 
function emailCheck(){
	// email 주소
	const memEmail = document.querySelector('#memEmail').value;
	
	//ajax start
	$.ajax({
	   url: '/member/emailCheckAJAX', 
	   type: 'post',
	   async: false, 
	   data: {'memEmail' : memEmail}, 
	   success: function(authCode) {
			alert('입력하신 이메일로 인증코드가 발송되었습니다!');
			console.log(authCode);
			
			if(authCode == 'fail'){
				return;
			}
			else{
				verifyAuthCode(authCode);
			}
	   },
	   error: function() {
	      console.log('이메일 인증 시도 실패');
	   }
	});
	//ajax end
	
}

// 이메일 인증 코드 확인 함수 
function verifyAuthCode(authCode) {
	console.log('Received authCode:', authCode);
	 
	// 인증번호 입력칸 선택 
	const authCodeInputDiv = document.querySelector('#memEmailCheckDiv');
	const authCodeInputTag = document.querySelector('#authCodeInput');
    	
	//기존 오류 메시지 제거 
	const resultAuthCodeTag = document.querySelector('#resultAuthCodeTag');
	if (resultAuthCodeTag) {
		resultAuthCodeTag.remove();
	}
	
	//함수 리턴 결과 저장할 함수 
	let resultAuthCode= true;
	
	//오류 메세지 저장 
	let strResultAuthCode =``;
	
	// 인증번호 확인 이벤트 
    authCodeInputTag.addEventListener("keyup", function(event){
		
		console.log( "원본 " + authCode);
					
		//기존 오류 메시지 제거 
		const existingResultAuthCodeTag = document.querySelector('#resultAuthCodeTag');
		if (existingResultAuthCodeTag) {
			existingResultAuthCodeTag.remove();
		}
		
		if (event.target.value == authCode) { // 인증 성공 
			resultAuthCode = true;
			
			strResultAuthCode = `인증번호 확인에 성공하였습니다.`;
			
			const resultHTML = `<div id='resultAuthCodeTag' style="font-size: 0.8rem; color: green; margin-top: 0.3rem;margin-left:0.5rem;">${strResultAuthCode}</div>`;
			authCodeInputTag.insertAdjacentHTML('afterend', resultHTML);
			
			authCodeInputTag.style.borderColor = "green";
        	authCodeInputTag.style.borderWidth = "2px";
        	
        	document.querySelector('.joinBtn').disabled = false;
			
		} 
		else { // 인증 실패 
			resultAuthCode = false;
			strResultAuthCode = `인증번호가 잘못되었습니다`;
			
			const resultHTML = `<div id='resultAuthCodeTag' style="font-size: 0.8rem; color: #dc3545; margin-top: 0.3rem;margin-left:0.5rem;">${strResultAuthCode}</div>`;
			authCodeInputDiv.insertAdjacentHTML('afterend', resultHTML);
			authCodeInputTag.style.borderColor = "#dc3545";
        	authCodeInputTag.style.borderWidth = "2px";
		}
		
		if(resultAuthCode == true){
			const emailTag = document.querySelector('#memEmail');
        	emailTag.readOnly = true;
        	document.querySelector('#authCodeInput').readOnly = true;
		}
		
   		return resultAuthCode;
	});
 
}






