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
	str += `				<col width="15%">`;
	str += `				<col width="*">`;
	str += `				<col width="15%">`;
	str += `				<col width="15%">`;
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
	str += `				<td colspan="3"><input class="form-control" type="text" name="freqRequestTitle" required placeholder="제목을 입력하세요."></td>`;
	str += `			</tr>`;
	str += `			<tr>`;
	str += `				<td class="align-middle"><span>A.</span></td>`;
	str += `				<td colspan="3"><input class="form-control" type="text" name="freqRequestContent" required placeholder="내용을 입력하세요."></td>`;
	str += `			</tr>`;
	str += `		</table>`;
	str += `		</form>`;
	str += `	</div>`;
	str += `</div>`;
	str += `<div class="row">`;
	str += `	<div class="offset-8 col-2">`;
	str += `		<input onclick="location.href='/admin/frequncyRequestMng';" class="btn btn-secondary w-100" type="button" value="이전으로">`;
	str += `	</div>`;
	str += `	<div class="col-2">`;
	str += `		<input onclick="regFreRequest();" class="btn btn-success w-100" type="button" value="글 등록">`;
	str += `	</div>`;
	str += `</div>`;
	
	fre_table_div.insertAdjacentHTML('afterbegin', str);
	
}

// 글 등록하기
function regFreRequest(){
	
	document.querySelector('#regFreReqForm').submit();

}

// 글 수정하러 가기
function updateQnAjs(reqCode, selected_input) {
	
	const content_area = selected_input.closest('tr').children[2];
	const title_area = selected_input.closest('tr').previousElementSibling.children[2];
	const update_btn = selected_input.parentElement;
	
	const content_text = content_area.innerText;
	const title_text = title_area.innerText;
	
	title_area.replaceChildren();
	content_area.replaceChildren();
	update_btn.replaceChildren();
	
	let str_title = '';
	let str_content = '';
	let str_btn = '';
	
	str_title += `<input type="text" id="freqRequestTitle" name="freqRequestTitle" value="${title_text}" class="form-control">`;
	str_title += `<input type="hidden" id="typeRequestCode" name="typeRequestCode" value="${reqCode}">`;
	str_content += `<input type="text" id="freqRequestContent" name="freqRequestContent" value="${content_text}" class="form-control">`;
	str_btn += `<input onclick="update_QnA();" type="button" class="btn btn-secondary w-100" value="수정 확인">`;
	
	title_area.insertAdjacentHTML('afterbegin', str_title);
	content_area.insertAdjacentHTML('afterbegin', str_content);
	update_btn.insertAdjacentHTML('afterbegin', str_btn);
	
}

// 글 수정완료
function update_QnA(){
	alert(11);
}


// 검색 버튼 밑의 버튼을 이용한 검색 기능
function searchTypeRequest(typeRequestCode){
	
	//ajax start
	$.ajax({
		url: '/admin/searchFreqRequestByCodeAjax', //요청경로
		type: 'post',
		async: true, // 동기방식(Ajax사용), false == 비동기방식
		//contentType: 'application/json; charset=UTF-8',
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		//필요한 데이터
		// 위의 데이터를 자바가 인식 가능한 json 문자열로 변환
		data: {'typeRequestCode' : typeRequestCode},
		success: function(result) {
			
			const fre_table_div = document.querySelector('#fre_table_div');
	
			fre_table_div.replaceChildren();
			
			let str = '';
			
			str += `<table class="table table-striped">`;
			str += `	<input type="hidden" class="table_typeReqCode" value="">`;
			str += `	<colgroup>`;
			str += `		<col width="10%">`;
			str += `		<col width="15%">`;
			str += `		<col width="*">`;
			str += `		<col width="15%">`;
			str += `	</colgroup>`;
			str += `	<thead>`;
			str += `		<tr class="align-middle">`;
			str += `			<td>`;
			str += `				<input type="checkbox" class="chkAll">`;
			str += `			</td>`;
			str += `			<td><span>No.</span></td>`;
			str += `			<td><span>title</span></td>`;
			str += `			<td>`;
			str += `				<input class="btn btn-danger w-100" type="button" value="선택 삭제">`;
			str += `			</td>`;
			str += `		</tr>`;
			str += `	</thead>`;
			str += `	<tbody id="req-table-tbody">`;
			str += `		<tbody>`;
			str += `	</tbody>`;
		for(const freqRequest of result){
			str += `	<tr class="align-middle">`;
			str += `		<td>`;
			str += `			<input type="checkbox" class="chk">`;
			str += `		</td>`;
			str += `		<td>${freqRequest.typeRequestVO.typeRequestName}</td>`;
			str += `		<td>${freqRequest.freqRequestTitle}</td>`;
			str += `		<td>`;
			str += `			<input class="btn btn-danger w-100" type="button" value="삭제 하기" onclick="delFreqReq('${freqRequest.freqRequestCode}', ${freqRequest.typeRequestVO.typeRequestCode})">`;
			str += `		</td>`;
			str += `	</tr>`;
			str += `	<tr class="align-middle">`;
			str += `		<td></td>`;
			str += `		<td><span>A.</span></td>`;
			str += `		<td>${freqRequest.freqRequestContent}</td>`;
			str += `		<td>`;
			str += `			<input onclick="updateQnAjs(${freqRequest.typeRequestVO.typeRequestCode}, this);" type="button" class="btn btn-secondary w-100" value="수정 하기">`;
			str += `		</td>`;
			str += `	</tr>`;
		}
			str += `</table>`;
			
			fre_table_div.insertAdjacentHTML('afterbegin', str);
			
		},
		error: function() {
			alert('실패');
		}
	});
	//ajax end
	
}

function delFreqReq(freqRequestCode, typeRequestCode){
	const ask = confirm('해당 글을 삭제하시겠습니까?');
	
	if(ask){
		//ajax start
		$.ajax({
			url: '/admin/delFreqReqAjax', //요청경로
			type: 'post',
			async: true, // 동기방식(Ajax사용), false == 비동기방식
	 		//contentType: 'application/json; charset=UTF-8',
	        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
	        //필요한 데이터
	        // 위의 데이터를 자바가 인식 가능한 json 문자열로 변환
	        data: {'freqRequestCode' : freqRequestCode
	        , 'typeRequestVO.typeRequestCode' : typeRequestCode},
	        success: function(result) {
				alert(document.querySelector('.table_typeReqCode').value);
				
				searchTypeRequest();
				
					           
	        },
	        error: function() {
	           alert('실패');
	   		}
	   });
	   //ajax end
	}
	
	
}





function init(){
	
	
	
	
}