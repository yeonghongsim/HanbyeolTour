


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



function update_my_info(){

	//회원정보 수정 진행 
	document.querySelector('#infoUpdateForm').submit();
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
				$('#memDTell').css('border-color', '#dc3545'); 
        		$('#memDTell').css('border-width', '2px'); 
				return false;
			}
			else{
				alert('사용 가능한 휴대폰 번호 입니다.');
				$('#memDTell').removeAttr('style');
			}
	   },
	   error: function() {
	      alert('실패');
	   }
	});
	//ajax end
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
				alert('새롭게 등록이 불가능한 이메일 주소입니다.\n다시 입력해주세요.');
				$('#memEmail').css('border-color', '#dc3545'); 
        		$('#memEmail').css('border-width', '2px'); 
				return false;
			}
			else{
				alert('사용 가능한 이메일 주소입니다.');
				$('#memEmail').removeAttr('style');
			}
	   },
	   error: function() {
	      alert('실패');
	   }
	});
	//ajax end
}























