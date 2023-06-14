init()

function getMyReview(buyCode){
	location.href='/myPage/getMyReview?buyCode=' + buyCode;
}

function getNeedReview(){
	alert('getNeedReview btn');
}

function getAllReview(memId){
	const get_result_area = document.querySelector('.get_result_area');
	
	//ajax start
	$.ajax({
		url: '/myPage/getAllReviewAJAX', //요청경로
		type: 'post',
		async: true, // 동기방식(Ajax사용), false == 비동기방식
		//contentType: 'application/json; charset=UTF-8',
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		//필요한 데이터
		// 위의 데이터를 자바가 인식 가능한 json 문자열로 변환
		data: {'memId' : memId},
		success: function(result) {
			console.log(result);
				let str = '';
				
				str += `<table class="table text-center">`;
				str += `	<colgroup>`;
				str += `		<col width="15%">`;
				str += `		<col width="30%">`;
				str += `		<col width="*">`;
				str += `		<col width="15%">`;
				str += `	</colgroup>`;
				str += `	<thead>`;
				str += `		<tr>`;
				str += `			<td>No.</td>`;
				str += `			<td>구매코드</td>`;
				str += `			<td>후기 내용</td>`;
				str += `			<td>별점</td>`;
				str += `		</tr>`;
				str += `	</thead>`;
			
			if(result.size == null){
				get_result_area.replaceChildren();
				
				str += `	<tbody>`;
				str += `		<tr>`;
				str += `			<td colspan="4">후기를 작성해 주세요.</td>`;
				str += `		</tr>`;
				str += `	</tbody>`;
				str += `</table>`;
				
				get_result_area.insertAdjacentHTML('afterbegin', str);
				
				
				
			} else{
				alert(1);
			}
			
		},
		error: function() {
			alert('실패');
		}
	});
   //ajax end
   
}
/*
function drawReviewDiv(buyCode){
	
	//ajax start
	$.ajax({
		url: '/myPage/getBuyDetailAJAX', //요청경로
		type: 'post',
		async: true, // 동기방식(Ajax사용), false == 비동기방식
		//contentType: 'application/json; charset=UTF-8',
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		//필요한 데이터
		// 위의 데이터를 자바가 인식 가능한 json 문자열로 변환
		data: {'buyCode' : buyCode},
		success: function(result) {
			
			const show_buy_detail = document.querySelector('.show_buy_detail');
			
			show_buy_detail.replaceChildren();
			
			let str = '';
			
			str += `<div class="row">`;
			str += `	<div class="col">`;
			str += `		<div class="row mb-3">`;
			str += `			<div class="col-7 main_img">`;
			result.buyDetailVO.itemVO.imgList.forEach(function(img){
				if(img.isMain == 'Y'){
			str += `				<img src="/img/item/itemImg/${img.itemImgAttachedName}">`;
				}
			});
			str += `			</div>`;
			str += `			<div class="col-5">`;
			str += `				<div class="row mb-1">`;
			str += `					<div class="col">`;
			str += `						<span>${result.buyDetailVO.itemVO.traverPeriod}</span>`;
			str += `					</div>`;
			str += `				</div>`;
			str += `				<div class="row mb-1">`;
			str += `					<div class="col">`;
			str += `						<span>${result.buyDetailVO.itemVO.itemTitle}</span>`;
			str += `					</div>`;
			str += `				</div>`;
			str += `				<div class="row mb-1">`;
			str += `					<div class="col">`;
			str += `						<span>${result.buyDetailVO.itemVO.itemIntro}</span>`;
			str += `					</div>`;
			str += `				</div>`;
			str += `			</div>`;
			str += `		</div>`;
			str += `		<div class="row">`;
			str += `			<div class="col review_area">`;
								isReviewed(result.buyCode, result.memberVO.memCode)
			str += `			</div>`;
			str += `		</div>`;
			str += `	</div>`;
			str += `</div>`;
			
			show_buy_detail.insertAdjacentHTML('afterbegin', str);
			
		},
		error: function() {
			alert('실패');
		}
	});
   //ajax end
   
}

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
*/
function init(){
}