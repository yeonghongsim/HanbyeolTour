init()


function regReqReply(userId, hbtBoardRequestNum, reqReplyNum, itemCode){
	const reqReplyContent = document.querySelector('#reqReplyContent');
	
	if(reqReplyContent.value == ''){
		reqReplyContent.placeholder = '답변 내용은 필수입니다.';
		
		return ;
	}
	
	//ajax start
	$.ajax({
		url: '/admin/regReqReplyAJAX', //요청경로
		type: 'post',
		async: true, // 동기방식(Ajax사용), false == 비동기방식
		//contentType: 'application/json; charset=UTF-8',
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		//필요한 데이터
		// 위의 데이터를 자바가 인식 가능한 json 문자열로 변환
		data: {'memberVO.memId' : userId
				, 'hbtBoardRequestNum' : hbtBoardRequestNum
				, 'reqReplyContent' : reqReplyContent.value
				, 'reqReplyNum' : reqReplyNum},
		success: function(result) {
			location.href='/admin/regReqReplyForm?hbtBoardRequestNum=' +hbtBoardRequestNum + '&itemCode' + itemCode;
		},
		error: function() {
			alert('실패');
		}
	});
   //ajax end
	
}

function cancelUpdate(){
	const reqReplyContent = document.querySelector('#reqReplyContent');
	
	reqReplyContent.value = '';
}

function delFirstResponse(reqReplyNum, hbtBoardRequestNum){
	const ask = confirm('정말로 답변글을 삭제하시겠습니까?');
	
	if(ask){
		//ajax start
		$.ajax({
			url: '/admin/delReqRplAJAX', //요청경로
			type: 'post',
			async: true, // 동기방식(Ajax사용), false == 비동기방식
			//contentType: 'application/json; charset=UTF-8',
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			//필요한 데이터
			// 위의 데이터를 자바가 인식 가능한 json 문자열로 변환
			data: {
				'hbtBoardRequestNum': hbtBoardRequestNum,
				'reqReplyNum': reqReplyNum
			},
			success: function(result) {
				location.href = "/admin/regReqReplyForm?hbtBoardRequestNum=" + hbtBoardRequestNum;
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