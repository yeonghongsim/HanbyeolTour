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
function updateQnAjs(reqCode, selected_btn, typeRequestCode) {
	
	const content_area = selected_btn.closest('tr').children[2];
	const title_area = selected_btn.closest('tr').previousElementSibling.children[2];
	const update_btn = selected_btn.parentElement;
	
	const content_text = content_area.innerText;
	const title_text = title_area.innerText;
	
	title_area.replaceChildren();
	content_area.replaceChildren();
	update_btn.replaceChildren();
	
	let str_title = '';
	let str_content = '';
	let str_btn = '';
	
	str_title += `	<input type="text" value="${title_text}" class="form-control">`;
	str_content += `<input type="text" value="${content_text}" class="form-control">`;
	str_btn += `	<input onclick="update_QnA('${reqCode}', this, this, ${typeRequestCode});" type="button" class="btn btn-secondary w-100" value="수정 확인">`;
	
	title_area.insertAdjacentHTML('afterbegin', str_title);
	content_area.insertAdjacentHTML('afterbegin', str_content);
	update_btn.insertAdjacentHTML('afterbegin', str_btn);
	
}

// 글 수정완료
function update_QnA(freqRequestCode, title, content, typeRequestCode){
	
	const freqRequestTitle = title.closest('tr').previousElementSibling.children[2].children[0];
	const freqRequestContent = content.closest('td').previousElementSibling.children[0];
	
	if(freqRequestTitle.value.length == 0 || freqRequestContent.value.length == 0) {
		const warn_title = document.querySelector('.warn_title');
		const warn_content = document.querySelector('.warn_content');

		if(freqRequestTitle.value.length == 0){
			
			if(warn_title != null){
			warn_title.remove();
			}
			
			let warn_T = '';
			
			warn_T += `<div class="warn_title">`;
			warn_T += `	<span style="color:red; font-size:0.8rem;">제목을 입력하세요.</span>`;
			warn_T += `</div>`;
			
			freqRequestTitle.closest('td').insertAdjacentHTML('beforeend', warn_T);
		} else {
			warn_title.remove();
		}

		if(freqRequestContent.value.length == 0){
		
			if(warn_content != null){
				warn_content.remove();
			}
			
			let warn_C = '';
			
			warn_C += `<div class="warn_content">`;
			warn_C += `	<span style="color:red; font-size:0.8rem;">내용을 입력하세요.</span>`;
			warn_C += `</div>`;
			
			freqRequestContent.closest('td').insertAdjacentHTML('beforeend', warn_C);
		} else {
			warn_content.remove();
		}
		
		return ;
	}
	
	const ask = confirm('해당 글의 내용을 수정하시겠습니까?');
	if(ask){
		//ajax start
		$.ajax({
			url: '/admin/updateQnaAjax', //요청경로
			type: 'post',
			async: true, // 동기방식(Ajax사용), false == 비동기방식
			//contentType: 'application/json; charset=UTF-8',
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			//필요한 데이터
			// 위의 데이터를 자바가 인식 가능한 json 문자열로 변환
			data: {'freqRequestCode' : freqRequestCode
					, 'freqRequestTitle' : freqRequestTitle.value
					, 'freqRequestContent' : freqRequestContent.value},
			success: function(result) {
				
				searchTypeRequest(typeRequestCode);
				
			},
			error: function() {
				alert('실패');
			}
		});
		//ajax end
	}
		
		
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
			
			str += `<table class="table table-hover">`;
			str += `	<input type="hidden" class="table_typeReqCode" value="${typeRequestCode}">`;
			str += `	<colgroup>`;
			str += `		<col width="7%">`;
			str += `		<col width="15%">`;
			str += `		<col width="*">`;
			str += `		<col width="15%">`;
			str += `	</colgroup>`;
			str += `	<thead>`;
			str += `		<tr class="align-middle">`;
			str += `			<td>`;
			str += `				<input type="checkbox" class="chkAll form-check-input" onclick="chkAll();">`;
			str += `			</td>`;
			str += `			<td><span>No.</span></td>`;
			str += `			<td><span>title</span></td>`;
			str += `			<td>`;
			str += `				<input class="btn btn-danger w-100" type="button" value="선택 삭제" onclick="delFreqReq('', ${typeRequestCode})">`;
			str += `			</td>`;
			str += `		</tr>`;
			str += `	</thead>`;
			str += `	<tbody id="req-table-tbody">`;
			str += `		<tbody>`;
			str += `	</tbody>`;
		for(const freqRequest of result){
			str += `	<tr class="align-middle">`;
			str += `		<td>`;
			str += `			<input type="checkbox" class="chk form-check-input" onclick="chks()" value="${freqRequest.freqRequestCode}">`;
			str += `		</td>`;
			str += `		<td><span class="showAnswer" style="cursor: pointer;" onclick="showAnswer(this);">${freqRequest.typeRequestVO.typeRequestName}</span></td>`;
			str += `		<td>${freqRequest.freqRequestTitle}</td>`;
			str += `		<td>`;
			str += `			<input class="btn btn-danger w-100" type="button" value="삭제 하기" onclick="delFreqReq('${freqRequest.freqRequestCode}', ${typeRequestCode})">`;
			str += `		</td>`;
			str += `	</tr>`;
			str += `	<tr class="align-middle hide">`;
			str += `		<td></td>`;
			str += `		<td><span>A.</span></td>`;
			str += `		<td>${freqRequest.freqRequestContent}</td>`;
			str += `		<td>`;
			str += `			<input onclick="updateQnAjs('${freqRequest.freqRequestCode}', this, ${typeRequestCode});" type="button" class="btn btn-secondary w-100" value="수정 하기">`;
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
	//삭제 진행 여부 판단을 위한 변
	let ask = false; 
	
	//삭제할 code를 저장할 변
	let freqRequestList = [];
	
	//선택 삭제 클릭 
	if(freqRequestCode == ''){
		const chked_val = document.querySelectorAll('.chk:checked');
		
		//선택 삭제 시 체크된 체크박스의 개수만큼 코드를 가져 감.
		for(const chk_val of chked_val){
			freqRequestList.push(chk_val.value);
		}
		
		if(freqRequestList.length == 0){
			alert('문의글을 선택해 주세요.');
			return ;
		}
		ask = confirm('선택된 문의글을 정말로 삭제하시겠습니까?');
	}
	
	//삭제하기 버튼 클릭 
	else{
		ask = confirm('선택된 문의글을 정말로 삭제하시겠습니까?');
		//해당 함수의 첫번째 매개변수의 값만 넘김.
		freqRequestList.push(freqRequestCode);
	}
	
	
	if(ask){
		//ajax start
		$.ajax({
			url: '/admin/delFreqReqAjax', //요청경로
			type: 'post',
			async: true, // 동기방식(Ajax사용), false == 비동기방식
	 		contentType: 'application/json; charset=UTF-8',
	        //필요한 데이터
	        // 위의 데이터를 자바가 인식 가능한 json 문자열로 변환
	        data: JSON.stringify(freqRequestList),
	        success: function(result) {
				alert('게시글이 삭제되었습니다.')
				
				searchTypeRequest(typeRequestCode);
					           
	        },
	        error: function() {
	           alert('실패');
	   		}
	   });
	   //ajax end
	}
	
	
}

function chkAll(){
	const chkAll = document.querySelector('.chkAll');
	const chks = document.querySelectorAll('.chk');
	
	if(chkAll.checked){
		for(const chk of chks){
			chk.checked = true;
		}
	} else {
		for(const chk of chks){
			chk.checked = false;
		}
	}
	
}

function chks(){
	const chkAll = document.querySelector('.chkAll');
	const total_len = document.querySelectorAll('.chk').length;
	const chked_len = document.querySelectorAll('.chk:checked').length;
	
	if(total_len == chked_len){
		chkAll.checked = true;
	} else {
		chkAll.checked = false;
	}
}

function showAnswer(QnA_title){
	const QnA_content = QnA_title.closest('tr').nextElementSibling;
	
	if(QnA_content.classList.contains('hide')){
		QnA_content.classList.remove('hide');
	} else {
		QnA_content.classList.add('hide');
	}
}







function init(){
		
	
}