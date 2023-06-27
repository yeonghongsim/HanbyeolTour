init()

function searchRequest(){
	const searchFromDate = document.querySelector('#searchFromDate').value;
	const searchToDate = document.querySelector('#searchToDate').value;
	const typeRequestCode = document.querySelector('#typeRequestCode').value;
	const memId = document.querySelector('#memId').value;
	const hbtBoardRequestTitle = document.querySelector('#hbtBoardRequestTitle').value;
	const itemCode = document.querySelector('#itemCode').value;
	
	//ajax start
	$.ajax({
		url: '/admin/searchRequestAjax', //요청경로
		type: 'post',
		async: true, // 동기방식(Ajax사용), false == 비동기방식
		//contentType: 'application/json; charset=UTF-8',
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		//필요한 데이터
		// 위의 데이터를 자바가 인식 가능한 json 문자열로 변환
		data: {'searchFromDate' : searchFromDate
				, 'searchToDate' : searchToDate
				, 'typeRequestVO.typeRequestCode' : typeRequestCode
				, 'memberVO.memId' : memId
				, 'hbtBoardRequestTitle' : hbtBoardRequestTitle
				, 'itemV.itemCode' :itemCode},
		success: function(result) {
			
			const searched_tbody = document.querySelector('#searched-tbody');
	
			searched_tbody.replaceChildren();
			
			let str = '';
			
			result.forEach(function(req, idx){
				console.log(req);
				str += `<tr>`;
				str += `	<td>${result.length - idx}</td>`;
				
				if(req.itemVO != null){
				str += `	<td> 1212`;
				str += `		<span class="pointer" onclick="location.href='/admin/regReqReplyForm?hbtBoardRequestNum=${req.hbtBoardRequestNum}&itemCode=${req.itemVO.itemCode}'";>${req.hbtBoardRequestTitle}</span>`;
				str += `	</td>`;
					
				} else {
				str += `	<td>`;
				str += `		<span class="pointer" onclick="location.href='/admin/regReqReplyForm?hbtBoardRequestNum=${req.hbtBoardRequestNum}'";>${req.hbtBoardRequestTitle}</span>`;
				str += `	</td>`;
					
				}
				
				
				
				str += `	<td>${req.memberVO.memId}</td>`;
				if(req.itemVO != null){
				str += `	<td>${req.itemVO.itemCode}</td>`;
				} else{
				str += `	<td></td>`;
				}
				str += `	<td>${req.hbtBoardRequestRegDate}</td>`;
				str += `	<td>${req.isAnswer}</td>`;
				str += `</tr>`;
			});
			
			searched_tbody.insertAdjacentHTML('afterbegin', str);
			
			
		},
		error: function() {
			alert('실패');
		}
	});
   //ajax end
	
	
}

function init(){
	searchRequest()
}





