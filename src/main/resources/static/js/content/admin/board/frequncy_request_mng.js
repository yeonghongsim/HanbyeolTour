init();


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