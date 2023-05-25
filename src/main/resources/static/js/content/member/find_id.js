






//-----------------------아이디 찾기 기능 --------------------------------//

//아이디 찾기 모달창(태그) 선택
const findIdModal = document.querySelector('#findIdModal');

//아이디찾기 결과 모달창이 닫힐 때마다 실행되는 이벤트 
findIdModal.addEventListener('hidden.bs.modal', function(e){
	//모달창 안의 모든 input태그 초기화 
	const findIdModalDiv = document.querySelector('#findIdModalDiv');
	findIdModalDiv.innerHTML = '';
});




//아이디 찾기 ajax 사용 -> modal창 결과 띄우기  
function find_id(){
	
	// 이름, 휴대폰 번호 입력값 가져오기 
	const memName = document.querySelector('#memName').value;
	const memDTell = document.querySelector('#memDTell').value;
	
		
	//ajax start
	$.ajax({
	   url: '/member/findIdAJAX', //요청경로
	   type: 'post',
	   async: true, // 비동기 , 동기 설정
	   contentType: 'application/x-www-form-urlencoded; charset=UTF-8', // default
	   data: {'memName':memName, 'memDTell':memDTell}, //필요한 데이터
	   success: function(result) {
	      console.log(result.memId);
	      console.log(result.memName);
	      
	    // 이전에 추가된 데이터 삭제
		  //const findIdDiv = document.querySelector('#findIdDiv');
		 //document.querySelector('#findIdDiv').reset();
	      
	      
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
			str += `<i class="bi bi-person-circle" style="font-size:3rem; color:#6df5f;"></i><br>`;
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






















