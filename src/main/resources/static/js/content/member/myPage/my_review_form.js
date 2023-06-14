init()


function isReviewed(buyCode, memCode){
	//ajax start
	$.ajax({
		url: '/myPage/chkMyReviewAJAX', //요청경로
		type: 'post',
		async: true, // 동기방식(Ajax사용), false == 비동기방식
		//contentType: 'application/json; charset=UTF-8',
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		//필요한 데이터
		// 위의 데이터를 자바가 인식 가능한 json 문자열로 변환
		data: {'buyCode' : buyCode},
		success: function(result) {
			console.log(result);
			const review_area = document.querySelector('.review_area');

			review_area.replaceChildren();

			let str = '';
			
			if(result == ''){
				str += `<div class="row">`;
				str += `	<div class="col mb-1">`;
				str += `		별점 넣을곳`;
				str += `	</div>`;
				str += `</div>`;
				str += `<div class="row">`;
				str += `	<div class="col-10">`;
				str += `		<input type="text" name="" id="hbtMemReviewContent" class="form-control" placeholder="후기를 작성해주세요.">`;
				str += `	</div>`;
				str += `	<div class="col-2">`;
				str += `		<input onclick="regMyReview('${buyCode}', '${memCode}');" type="button" name="" id="" class="btn btn-primary w-100" value="작성">`;
				str += `	</div>`;
				str += `</div>`;
			} else {
				str += `2222`;
			}
			
			review_area.insertAdjacentHTML('afterbegin', str);

		},
		error: function() {
			alert('실패');
		}
	});
   //ajax end
}

function regMyReview(buyCode, memCode){
	let hbtMemReviewContent = document.querySelector('#hbtMemReviewContent');
	
	if(hbtMemReviewContent.value == ''){
		hbtMemReviewContent.placeholder = '후기 내용을 입력해주세요.';
		return ;
	}
	
	//ajax start
	$.ajax({
		url: '/myPage/regMyReviewAJAX', //요청경로
		type: 'post',
		async: true, // 동기방식(Ajax사용), false == 비동기방식
		//contentType: 'application/json; charset=UTF-8',
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		//필요한 데이터
		// 위의 데이터를 자바가 인식 가능한 json 문자열로 변환
		data: {'hbtMemReviewContent' : hbtMemReviewContent.value
				, 'buyVO.buyCode' : buyCode
				, 'memberVO.memCode' : memCode},
		success: function(result) {
			alert('ajax 통신 성공');
		},
		error: function() {
			alert('실패');
		}
	});
   //ajax end
	
	
}

function init(){
	const memCode = document.querySelector('#hideMemCode').value;
	const buyCode = document.querySelector('#hideBuyCode').value;
	
	isReviewed(memCode, buyCode);
	
}