
function check_pw() {
    // 입력한 비밀번호 가져오기 
    const checkPw = document.querySelector('#checkPw').value;
       
	$.ajax({
	   url: '/myPage/checkPwAjax', //요청경로
	   type: 'post',
	   async: true, // 비동기 , 동기 설정
	   contentType: 'application/x-www-form-urlencoded; charset=UTF-8', // default
	   data: {'checkPw':checkPw}, //필요한 데이터
	   success: function(result) {
			if(result){
				alert('비밀번호 확인에 성공하였습니다.');
				location.href = `/myPage/changeMyPwForm`
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
 
 
