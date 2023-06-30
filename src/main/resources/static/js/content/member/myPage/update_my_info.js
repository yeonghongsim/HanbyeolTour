

// 회원정보 수정 
function update_my_info(){
	
	// Confirmation
	const result = confirm(`정말 회원정보를 수정하시겠어요?`);
	
	if(result){
		 // 유효성 검사 진행
	    const nameValid = nameValidate();
	    const memDTellValid = memDTellValidate();
	    const memDAddr2Valid = memDAddr2Validate();
	    
		    if (!nameValid || !memDTellValid || !memDAddr2Valid) {
	    	alert('모든 입력사항들이 올바르게 입력되어 있는지 확인해주세요!');
	    	return ;
	    }
		
		// 정보 수정 진행 
		document.querySelector('#infoUpdateForm').submit();
		alert('정보가 수정되었습니다.');
	}
	else{
		return;		
	}
}










//우편번호 검색 api 사용
function searchAddr() {
    // themeObj 객체
    const themeObj = {
        bgColor: "#FFF9D4",
        postcodeTextColor: "#FFD000",
        emphTextColor: "#FFD000"
    };

    new daum.Postcode({
		theme: themeObj,
        oncomplete: function(data) {
            const roadAddr = data.roadAddress;
            document.querySelector('#memDAddr').value = roadAddr;
        }
    }).open();
}

// 이름 유효성 검사 
//이름 유효성 검사 
function nameValidate(){
	//기존 오류 메시지 제거 
	const memNameError = document.querySelector('#memNameError');
	if (memNameError) {
		memNameError.remove();
	}
	
	let result_memName = true;
	
	let str_memName =``;
	
	const memNameTag = document.querySelector('#memName');
	
	// validation 처리
	const memName = document.querySelector('#memName').value;
	const nameRegex = /^(?=.*[가-힣])(?!\s)[가-힣]{2,6}$/;
	
	if(memName == ''){
		str_memName = '이름은 필수 입력사항입니다.';
		result_memName = false;
	}
	else if(memName.match(nameRegex) == null){
		str_memName = '이름은 한글로 2~6글자로 입력해주세요.';
		result_memName = false;
	}
	
	//유효성 검사 실패 시 오류 메세지 출력
	if(!result_memName){
		const errorHTML = `<div id="memNameError" style="font-size: 0.8rem; color: #f27370; margin-top: 0.1rem; margin-left:0.5rem;">${str_memName}</div>`;
		memNameTag.insertAdjacentHTML('afterend', errorHTML);
		$('#memName').css('border-color', '#f27370'); // 테두리 색상 변경
        $('#memName').css('border-width', '1px'); // 테두리 두께 변경
	}
	else {
		$('#memName').css('border-color', '#DEE2E5'); // 테두리 색상 변경
		$('#memDTell').css('border-width', '1px'); 
    }
	
	return result_memName;
	
}

//memTell 유효성 
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
		str_memDTell = '입력한 휴대폰 번호를 다시 확인해주세요.';
		result_memDTell = false;
	}
	
	//유효성 검사 실패 시 오류 메세지 출력
	if(!result_memDTell){
		const errorHTML = `<div class="my-invalid" id="memDTellError" style="font-size: 0.8rem; color: #f27370; margin-top: 0.1rem;margin-left:0.5rem;">${str_memDTell}</div>`;
		memDTellTag.insertAdjacentHTML('afterend', errorHTML);
	    $('#memDTell').css('border-color', '#f27370'); // 테두리 색상 변경
        $('#memDTell').css('border-width', '1px'); // 테두리 두께 변경
	}
	else {
      	$('#memDTell').css('border-color', '#DEE2E5'); // 테두리 색상 변경
      	$('#memDTell').css('border-width', '1px'); 
        document.querySelector('#checkMemDTellBtn').disabled = false;
    }
	return result_memDTell;
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
				alert('새롭게 등록이 불가한 휴대폰 번호입니다.\n다시 입력해주세요.');
				$('#memDTell').css('border-color', '#f27370'); 
        		$('#memDTell').css('border-width', '1px'); 
				return false;
			}
			else{
				alert('사용 가능한 휴대폰 번호 입니다.');
				$('#memDTell').css('border-color', '#DEE2E5'); // 테두리 색상 변경
				$('#memDTell').css('border-width', '1px'); 
			}
	   },
	   error: function() {
	      alert('실패');
	   }
	});
	//ajax end
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
		const errorHTML = `<div class="my-invalid" id="memDAddr2Error" style="font-size: 0.8rem; color: #f27370; margin-top: 0.1rem;margin-left:0.5rem;">${str_memDAddr2}</div>`;
		memDAddr2Tag.insertAdjacentHTML('afterend', errorHTML);
	    $('#memDAddr2').css('border-color', '#f27370'); // 테두리 색상 변경
        $('#memDAddr2').css('border-width', '1px'); // 테두리 두께 변경
	}
	else {
        $('#memDAddr2').css('border-color', '#DEE2E5'); // 테두리 색상 변경
		$('#memDAddr2').css('border-width', '1px'); 
    }
	
	return result_memDAddr2;
}
























