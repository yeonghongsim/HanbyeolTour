init();

// 글 동록 양식 보기
function regFreqReqJs(memId, typeRequestList){
	
	const fre_table_div = document.querySelector('#fre_table_div');
	
	fre_table_div.replaceChildren();
	
	let str = '';
	
	str += `<div class="row">`;
	str += `	<div class="col">`;
	str += `		<form action="/admin/regFreReq" id="regFreReqForm" method="post">`;
	str += `		<table class="table text-center">`;
	str += `			<colgroup>`;
	str += `				<col width="">`;
	str += `				<col width="">`;
	str += `				<col width="">`;
	str += `				<col width="">`;
	str += `			</colgroup>`;
	str += `			<tr>`;
	str += `				<td class="align-middle"><span>문의유형</span></td>`;
	str += `				<td>`;
	str += `					<select class="form-control" name="TypeRequestVO.typeRequestCode">`;
	for(const typeRequest of typeRequestList){
		str += `					<option value="${typeRequest.typeRequestCode}">${typeRequest.typeRequestName}</option>`;
		
	}
	str += `					</select>`;
	str += `				</td>`;
	str += `				<td class="align-middle"><span>등록자Id</span></td>`;
	str += `				<td class="align-middle">`;
	str += `					${memId}`;
	str += `					<input type="hidden" value="${memId}" name="MemberVO.memId">`;
	str += `				</td`;
	str += `			</tr>`;
	str += `			<tr>`;
	str += `				<td class="align-middle"><span>Q.</span></td>`;
	str += `				<td colspan="3"><input class="form-control" type="text" name="freqRequestTitle"></td>`;
	str += `			</tr>`;
	str += `			<tr>`;
	str += `				<td class="align-middle"><span>A.</span></td>`;
	str += `				<td colspan="3"><input class="form-control" type="text" name="freqRequestContent"></td>`;
	str += `			</tr>`;
	str += `		</table>`;
	str += `		</form>`;
	str += `	</div>`;
	str += `</div>`;
	str += `<div class="row">`;
	str += `	<div class="offset-10 col-2">`;
	str += `		<input onclick="regFreRequest();" class="btn btn-success w-100" type="button" value="글 등록"></td>`;
	str += `	</div>`;
	str += `</div>`;
	
	fre_table_div.insertAdjacentHTML('afterbegin', str);
	
}

// 글 등록하기
function regFreRequest(){
	document.querySelector('#regFreReqForm').submit();
	

}



// 검색 버튼 밑의 버튼을 이용한 검색 기능
function searchTypeRequest(typeRequestCode){
	
	console.log(typeRequestCode);
	
	//ajax start
	$.ajax({
		url: '/board/searchFreqRequestByCodeAjax', //요청경로
		type: 'post',
		async: true, // 동기방식(Ajax사용), false == 비동기방식
		//contentType: 'application/json; charset=UTF-8',
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		//필요한 데이터
		// 위의 데이터를 자바가 인식 가능한 json 문자열로 변환
		data: {'typeRequestCode' : typeRequestCode},
		success: function(result) {
			
			alert('Ajax success');
			
			
			
		},
		error: function() {
			alert('실패');
		}
	});
   //ajax end
	
	
	
	
}






function updateQnAjs(test) {
	
	const content_area = test.closest('tr').children[1];
	const title_area = test.closest('tr').previousElementSibling.children[1];
	const update_btn = test.parentElement;
	
	console.log(update_btn);
	
	const content_text = content_area.innerText;
	const title_text = title_area.innerText;
	
	content_area.replaceChildren();
	title_area.replaceChildren();
	update_btn.replaceChildren();
	
	let str_content = '';
	let str_title = '';
	let str_btn = '';
	
	str_content += `<input type="text" class="form-control" name="" value="${content_text}">`;
	str_title += `<input type="text" class="form-control" name="" value="${title_text}">`;
	str_btn += `<input onclick="update_QnA();" type="button" class="btn btn-secondary w-100" value="수정하기">`;
	
	content_area.insertAdjacentHTML('afterbegin', str_content);
	title_area.insertAdjacentHTML('afterbegin', str_title);
	update_btn.insertAdjacentHTML('afterbegin', str_btn);
	
	
}


function update_QnA(){
	alert(111);
}

function init(){
	
}