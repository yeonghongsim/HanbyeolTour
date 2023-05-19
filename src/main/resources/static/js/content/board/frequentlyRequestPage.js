init();

/* 함수들 */

// 검색 버튼을 이용한 검색 기능 
function searchByInput(){
	searchInputValue = document.querySelector('#searchInput').value;
	
	alert(searchInputValue);
	
	//ajax start
	$.ajax({
		url: '/board/searchFreqRequestByInputAjax', //요청경로
		type: 'post',
		async: true, // 동기방식(Ajax사용), false == 비동기방식
		//contentType: 'application/json; charset=UTF-8',
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		//필요한 데이터
		// 위의 데이터를 자바가 인식 가능한 json 문자열로 변환
		data: {'searchInputValue' : searchInputValue},
		success: function(result) {
			
			const freq_request_tbody = document.querySelector('#freq-request-tbody');
			
			freq_request_tbody.replaceChildren();
			
			let str = '';
			
			str += `<tr>`;
			str += `	<td>typeRequestName1</td>`;
			str += `	<td>`;
			str += `		<span class="pointer" onclick="toggleAnswer(this)">title1</span>`;
			str += `	</td>`;
			str += `	<td class="bi bi-chevron-up"></td>`;
			str += `</tr>`;
			str += `<tr class="answerTr hide">`;
			str += `	<td>A.</td>`;
			str += `	<td colspan="2">answer1</td>`;
			str += `</tr>`;
			
			freq_request_tbody.insertAdjacentHTML('afterbegin', str);
			
			
		},
		error: function() {
			alert('실패');
		}
	});
   //ajax end
	
	
	
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
			
			const freq_request_tbody = document.querySelector('#freq-request-tbody');
			
			freq_request_tbody.replaceChildren();
			
			let str = '';
			
			str += `<tr>`;
			str += `	<td>typeRequestName1</td>`;
			str += `	<td>`;
			str += `		<span class="pointer" onclick="toggleAnswer(this)">title1</span>`;
			str += `	</td>`;
			str += `	<td class="bi bi-chevron-up"></td>`;
			str += `</tr>`;
			str += `<tr class="answerTr hide">`;
			str += `	<td>A.</td>`;
			str += `	<td colspan="2">answer1</td>`;
			str += `</tr>`;
			str += `<tr>`;
			str += `	<td>typeRequestName2</td>`;
			str += `	<td>`;
			str += `		<span class="pointer" onclick="toggleAnswer(this)">title2</span>`;
			str += `	</td>`;
			str += `	<td class="bi bi-chevron-up"></td>`;
			str += `</tr>`;
			str += `<tr class="answerTr hide">`;
			str += `	<td>A.</td>`;
			str += `	<td colspan="2">answer2</td>`;
			str += `</tr>`;
			str += `<tr>`;
			str += `	<td>typeRequestName3</td>`;
			str += `	<td>`;
			str += `		<span class="pointer" onclick="toggleAnswer(this)">title3</span>`;
			str += `	</td>`;
			str += `	<td class="bi bi-chevron-up"></td>`;
			str += `</tr>`;
			str += `<tr class="answerTr hide">`;
			str += `	<td>A.</td>`;
			str += `	<td colspan="2">answer3</td>`;
			str += `</tr>`;
			
			freq_request_tbody.insertAdjacentHTML('afterbegin', str);
			
			
		},
		error: function() {
			alert('실패');
		}
	});
   //ajax end
	
	
	
	
}

// 해당 질문의 제목 클릭 시 질문의 답 토글 기능
function toggleAnswer(selectedTitle){
	const answerTr = selectedTitle.closest('tr').nextElementSibling;
	const chevronClass = selectedTitle.parentElement.nextElementSibling;
	
	if(answerTr.classList.contains('hide')){
		answerTr.classList.remove('hide');
		chevronClass.classList.remove('bi-chevron-up');
		chevronClass.classList.add('bi-chevron-down');
	} else {
		answerTr.classList.add('hide');
		chevronClass.classList.add('bi-chevron-up');
		chevronClass.classList.remove('bi-chevron-down');
	}
}




// 이벤트 리스너 




/* 바로 실행되는 함수 */
function init(){
	
	
	
}




