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
			const review_area = document.querySelector('.review_area');

			review_area.replaceChildren();

			let str = '';
			
			if(result == ''){
				str += `<div class="row mb-2">`;
				str += `	<div class="col-8">`;
				str += `		<input type="text" name="" id="hbtMemReviewContent" class="form-control" placeholder="후기를 작성해주세요.">`;
				str += `	</div>`;
				str += `	<div class="col-2 rating">`;
				str += `		<input type="radio" id="star5" class="stars" name="stars" value="5">`;
				str += `		<label for="star5" title="text"></label>`;
				str += `		  <input type="radio" id="star4" class="stars" name="stars" value="4"> `;
				str += `		  <label for="star4" title="text"></label>`;
				str += `		  <input checked type="radio" id="star3" class="stars" name="stars" value="3">`;
				str += `		  <label for="star3" title="text"></label>`;
				str += `		  <input type="radio" id="star2" class="stars" name="stars" value="2">`;
				str += `		  <label for="star2" title="text"></label>`;
				str += `		  <input type="radio" id="star1" class="stars" name="stars" value="1">`;
				str += `		  <label for="star1" title="text"></label>`;
				str += `	</div>`;
				str += `	<div class="col-2">`;
				str += `		<input onclick="regMyReview('${buyCode}', '${memCode}');" type="button" name="" id="" class="btn btn-primary w-100" value="작성">`;
				str += `	</div>`;
				str += `</div>`;
			} else {
				str += `<div class="row">`;
				str += `	<div class="col">`;
				str += `		<div class="row mb-2">`;
				str += `			<div class="col">`;
				str += `				<span style="font-size: 20px;">내 후기</span>`;
				str += `			</div>`;
				str += `			<div class="col-1">`;
				str += `				<input onclick="delMyReview('${result.hbtMemReviewNum}', '${result.buyVO.buyCode}');" type="button" class="btn btn-danger" value="삭제">`;
				str += `			</div>`;
				str += `		</div>`;
				str += `		<div class="row">`;
				str += `			<div class="col">`;
				str += `				<table class="review_table">`;
				str += `				<colgroup>`;
				str += `					<col width="70%">`;
				str += `					<col width="18%">`;
				str += `					<col width="12%">`;
				str += `				</colgroup>`;
				str += `				<tbody class="review_tbody">`;
				str += `					<tr>`;
				str += `						<td>${result.hbtMemReviewContent}</td>`;
				str += `						<td>${result.stars}</td>`;
				str += `					<td>`;
				str += `						<input onclick="changeReivew('${result.hbtMemReviewContent}', ${result.stars}, '${buyCode}', '${memCode}', '${result.hbtMemReviewNum}');" type="button" class="btn btn-primary w-100" value="수정하기">`;
				str += `					</td>`;
				str += `					</tr>`;
				str += `				</tbody>`;
				str += `				</table>`;
				str += `			</div>`;
				str += `		</div>`;
				str += `	</div>`;
				str += `</div>`;
				
			}
			
			review_area.insertAdjacentHTML('afterbegin', str);

		},
		error: function() {
			alert('실패');
		}
	});
   //ajax end
}

function delMyReview(hbtMemReviewNum, buyCode){
	
	const ask = confirm('해당 후기글을 정말로 삭제하시겠습니까?');
	
	if(ask){
		//ajax start
		$.ajax({
			url: '/myPage/delMyReviewAJAX', //요청경로
			type: 'post',
			async: true, // 동기방식(Ajax사용), false == 비동기방식
			//contentType: 'application/json; charset=UTF-8',
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			//필요한 데이터
			// 위의 데이터를 자바가 인식 가능한 json 문자열로 변환
			data: {'hbtMemReviewNum' : hbtMemReviewNum},
			success: function(result) {
				location.href='/myPage/getMyReview?buyCode='+buyCode;
			},
			error: function() {
				alert('실패');
			}
		});
	   //ajax end
	}
	
	
	
}

function regMyReview(buyCode, memCode, hbtMemReviewNum){
	const hbtMemReviewContent = document.querySelector('#hbtMemReviewContent');
	
	// 후기 별점 세팅
	const starsAll = document.querySelectorAll('.stars');
	let stars = 0;
	starsAll.forEach(function(star){
		if(star.checked){
			stars = star.value;
		}
	});
	
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
				, 'memberVO.memCode' : memCode
				, 'stars' : stars
				, 'hbtMemReviewNum' : hbtMemReviewNum},
		success: function(result) {
			
			location.href='/myPage/getMyReview?buyCode='+buyCode;
		},
		error: function() {
			alert('실패');
		}
	});
   //ajax end
   
}

function changeReivew(hbtMemReviewContent, stars, buyCode, memCode, hbtMemReviewNum){
	
	const review_tbody = document.querySelector('.review_tbody');
	review_tbody.replaceChildren();
	let str = '';
	
	str += `<tr>`;
	str += `	<td>`;
	str += `		<input type="text" value="${hbtMemReviewContent}" id="hbtMemReviewContent" class="form-control">`;
	str += `	</td>`;
	str += `	<td>`;
	str += `		<div class="row">`;
	str += `			<div class="col mb-1 rating">`;
	for(let i =5; i > 0; i--){
		if(stars == i){
	str += `	  			<input type="radio" checked id="star${i}" class="stars" name="stars" value="${i}">`;
	str += `	  			<label for="star${i}" title="text"></label>`;		
		} else {
	str += `	  			<input type="radio" id="star${i}" class="stars" name="stars" value="${i}">`;
	str += `	  			<label for="star${i}" title="text"></label>`;		
		}
	}
	str += `			</div>`;
	str += `		</div>`;
	str += `	</td>`;
	str += `	<td>`;
	str += `		<input onclick="askToChange('${buyCode}', '${memCode}', '${hbtMemReviewNum}');" type="button" class="btn btn-primary w-100" value="변경하기">`;
	str += `	</td>`;
	str += `</tr>`;
	
	review_tbody.insertAdjacentHTML('afterbegin', str);
	
}

function askToChange(buyCode, memCode, hbtMemReviewNum){
	
	const ask = confirm('후기를 수정하시겠습니까?');
	
	if(ask){
		regMyReview(buyCode, memCode, hbtMemReviewNum);
	}
}

function init(){
	const memCode = document.querySelector('#hideMemCode').value;
	const buyCode = document.querySelector('#hideBuyCode').value;
	
	isReviewed(memCode, buyCode);
	
}