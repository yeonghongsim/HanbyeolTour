// 비밀번호 확인 기능 
function check_pw() {
    // 입력한 비밀번호 가져오기 
    const checkPw = document.querySelector('#checkPw').value;
       
	$.ajax({
	   url: '/myPage/checkPwAJAX', //요청경로
	   type: 'post',
	   async: true, // 비동기 , 동기 설정
	   contentType: 'application/x-www-form-urlencoded; charset=UTF-8', // default
	   data: {'checkPw':checkPw}, //필요한 데이터
	   success: function(result) {
			if(result){
				alert('비밀번호 확인에 성공하였습니다.');
				document.querySelector('.del-btn').disabled = false;
			}
			else{
				alert('비밀번호가 회원 정보와 일치하지 않습니다.');
				return;
			}
	   },
	   error: function() {
	      alert('실패');
	   }
	});
	//ajax end
}


//회원 탈퇴 기능  
function account_deletion(memId){
	
	// Confirmation
	const result = confirm(`${memId}님, 정말 회원탈퇴를 하시겠어요?`);
	
	if(result){
		//ajax start
		$.ajax({
		   url: '/myPage/accountDeletionAJAX', //요청경로
		   type: 'post',
		   async: true, 
		   contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
		   data: {"memId":memId}, //필요한 데이터
		   success: function(response) {
		      console.log(response);
		      //회원 코드 수정 성공한 경우  
		      if(response == 'success'){
				//로그아웃 처리	
				location.href = "/member/logout";
			  }
			  else{
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
		return;		
	}
	
}



 
 
















