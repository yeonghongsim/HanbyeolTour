


function find_pw(findPwBtn){
	
	//버튼을 누르면 못 누르는 버튼으로 바꿔준다. 
	findPwBtn.disabled = true;
	
	// 버튼의 글자도 바꿔줘야 한다. 
	findPwBtn.querySelector('span').textContent = '임시 비밀번호 메일 발송중';
	
	//버튼을 클릭하면 spinner를 첫번째 자식으로 붙인다. 
	const spinner = `<span class="spinner-border spinner-border-sm text-light" role="status" aria-hidden="true"></span>`
	findPwBtn.insertAdjacentHTML('afterbegin', spinner );

	
	//ajax start
	$.ajax({
	   url: '/member/findPwAjax', //요청경로
	   type: 'post',
	   async: true, // 비동기 , 동기 설정
	   contentType: 'application/x-www-form-urlencoded; charset=UTF-8', // default
	   data: $('#findPwForm').serialize(), // 폼태그에 있는 인풋태그 데이터 다 가져오기
	   success: function(result) {
	    	if(result){
				alert('이메일로 임시 비밀번호를 발급해드렸습니다.\n반드시 비밀번호 변경 후 사용하세요.');	
					
				}
			else {//데이터 못찾은 경우 


				let str =``;
				
				// div 를 선택할수 있도록하기 위해서 아이디 부여 ( 다시 창이 뜰 때 삭제할수 있도록 )
				str += `<div class="col-12 error-findPw" style="font-size: 1.1rem; color: red;text-align: center; margin-top: 0.5rem;">`;
				str += `<span>`;
				str += `일치하는 회원정보가 없습니다. 입력한 회원정보를 다시 확인해주세요.`;
				str += `</span>`;
				str += `</div>`;
				
				//데이터 태그에 넣어주기 
				document.querySelector('#findPwErrorDiv').insertAdjacentHTML('afterend', str);
				
				
			}
			
				// 둘 다의 경우에 실행됨 
				// 버튼의 disabled 속성 바꿔주기 
				btn.disabled = false;
				// spinner 지워주기 
				btn.querySelector('span:first-child').remove();
				// 버튼의 문구 변경 
				btn.querySelector('span').textContent = '비밀번호 찾기';
		
		   
	      
	   
	      
	    
	      
	   },
	   error: function() {
	      alert('실패');
	   }
	});
	//ajax end
		
	
	
}



	
	
	


















