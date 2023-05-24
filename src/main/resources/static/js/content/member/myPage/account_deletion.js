
//회원 탈퇴 기능  
function account_deletion(memId){
	
	// Confirmation
	const result = confirm(`${memId}님, 정말 회원탈퇴를 하시겠어요?`);
	
	if(result){
		//ajax start
		$.ajax({
		   url: '/myPage/accountDeletion', //요청경로
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


















