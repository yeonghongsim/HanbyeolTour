


//아이디 찾기 모달창(태그) 선택
const findIdModal = document.querySelector('#findIdModal');

//아이디찾기 결과 모달창이 닫힐 때마다 실행되는 이벤트 
findIdModal.addEventListener('hidden.bs.modal', function(e){
	//모달창 안의 모든 input태그 초기화 
	const findIdModalDiv = document.querySelector('#findIdModalDiv');
	findIdModalDiv.innerHTML = '';
});


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
		str_memName = '이름은 한글 6글자 이하로만 입력해주세요.';
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
    }
	
	
	return result_memDTell;
}



//아이디 찾기 ajax 사용 -> modal창 결과 띄우기  
function find_id(){
	
	// 이름, 휴대폰 번호 입력값 가져오기 
	const memName = document.querySelector('#memName').value;
	const memDTell = document.querySelector('#memDTell').value;
	
		
	//ajax start
	$.ajax({
	   url: '/member/findIdAjax', //요청경로
	   type: 'post',
	   async: true, // 비동기 , 동기 설정
	   contentType: 'application/x-www-form-urlencoded; charset=UTF-8', // default
	   data: {'memName':memName, 'memDTell':memDTell}, //필요한 데이터
	   success: function(result) {
	      
	      if(result.memId != null && result.memName != null){
			
			let str =``;
			// div 를 선택할수 있도록하기 위해서 아이디 부여 ( 다시 창이 뜰 때 삭제할수 있도록 )
			
			str += `<div class="col-12 text-center" id="findId">`;
			str += `<span>`;
			str += `<br>`;
			str += `<i class="bi bi-person-circle" style="font-size:3rem; color:#ffd000;"></i><br>`;
			str += `<strong style="font-size:1.2rem;">${result.memName}</strong> 님의 아이디는 <strong style="font-size:1.3rem; color:#ffd000;">${result.memId}</strong> 입니다.`;
			str += `<br>`;
			str += `<br>`;
			str += `</span>`;
			str += `</div>`;
			
			//데이터 태그에 넣어주기 
			document.querySelector('#findIdModalDiv').insertAdjacentHTML('afterbegin', str);
						
		  }
	      else{
		
		
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
			document.querySelector('#findIdModalDiv').insertAdjacentHTML('afterbegin', str);
		  }
	      
	      
	   },
	   error: function() {
	      alert('실패');
	   }
	});
	//ajax end
		
	
}






















