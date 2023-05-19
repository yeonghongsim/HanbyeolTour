
function searchRequest(){
	
	
	//ajax start
	$.ajax({
		url: '/admin/searchRequestAjax', //요청경로
		type: 'post',
		async: true, // 동기방식(Ajax사용), false == 비동기방식
		//contentType: 'application/json; charset=UTF-8',
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		//필요한 데이터
		// 위의 데이터를 자바가 인식 가능한 json 문자열로 변환
		data: {},
		success: function(result) {
			
			const searched_tbody = document.querySelector('#searched-tbody');
	
			searched_tbody.replaceChildren();
			
			let str = '';
			
			str += `<tr>`;
			str += `	<td colspan="6"><span>검색결과에 맞는 데이터가 존재하지 않습니다.</span></td>`;
			str += `</tr>`;
			
			searched_tbody.insertAdjacentHTML('afterbegin', str);
			
			
		},
		error: function() {
			alert('실패');
		}
	});
   //ajax end
	
	
}






