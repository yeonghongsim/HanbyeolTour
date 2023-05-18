


//로그인 함수 
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
				location.href = '/';
			}
			else{//로그인 실패 시 
				
				// 로그인 실패 시 추가되는 div 태그 삭제 
				const error_div = document.querySelector('#errorDiv');
				//alert으로 확인해보기 -> null
				alert(error_div);
				
				if(error_div != null){
					error_div.remove();
				}
				
				let str = ``;
				str += `<div id="errorDiv" style="color: red; font-size: 0.9rem; margin-top:1rem;">`;
				str += `올바르지 않은 회원정보입니다. 다시 한번 확인해 주세요.`;
				str += `</div>`;
				
				//로그인 실패시 추가되는 div 태그 삭제 
				const login_error_div = document.querySelector('#loginErrorDiv');
				login_error_div.insertAdjacentHTML('beforeend', str);
				

				
				//id, pw input 태그 초기화
				document.querySelectorAll('#loginForm input:not([type="button"])').forEach(function(input, index){
					input.value = '';
				});
				
			}
	   },
	   error: function() {
	      alert('실패');
	   }
	});
	//ajax end
	
	
}





