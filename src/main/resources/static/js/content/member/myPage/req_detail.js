init()

function updateMyRequest(hbtBoardRequestNum, memId, memCode, itemCode){
	const req_table_row = document.querySelector('.req_table_row');
	const btns = document.querySelector('#btns');
	const content = document.querySelector('.contentSpan').innerText;
	const titleSpan = document.querySelector('.titleSpan').innerText;
	const typeRequestCode = document.querySelector('.typeRequestCode').value;
	const typeRequestName = document.querySelector('.typeRequestName').value;
	
	//ajax start
	$.ajax({
		url: '/myPage/chkMyRequestAJAX', //요청경로
		type: 'post',
		async: true, // 동기방식(Ajax사용), false == 비동기방식
		//contentType: 'application/json; charset=UTF-8',
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		//필요한 데이터
		// 위의 데이터를 자바가 인식 가능한 json 문자열로 변환
		data: {'hbtBoardRequestNum' : hbtBoardRequestNum},
		success: function(result) {
			
			if(result == 'Y'){
				alert('이미 답변된 내용입니다.\n 새로운 문의글을 작성하러 가시겠습니까?')
				location.href="/myPage/regRequestForm?memId="+memId;
			} else {
				
				btns.replaceChildren();
				req_table_row.replaceChildren();
				
				let str = '';
				
				str += `<div class="col">`
				str += `	<div class="row">`
				str += `		<div class="col">`
				str += `<table class="table text-center req-table">`;
				str += `<colgroup>`;
				str += `	<col width="25%">`;
				str += `	<col width="25%">`;
				str += `	<col width="25%">`;
				str += `	<col width="25%">`;
				str += `</colgroup>`;
				str += `<tbody>`;
				str += `	<tr>`;
				str += `		<td>문의 유형</td>`;
				str += `		<td>`;
				str += `		<span>${typeRequestName}</span>`;
				str += `		</td>`;
				str += `		<td>상품 선택 시 상품코드</td>`;
				if(itemCode != null){
				str += `		<td>`;
				str += `			<input type="text" name="ItemVO.itemCode" id="showItemCode" class="form-control" value="${itemCode}" disabled>`;
				str += `		</td>`;
				} else {
				str += `		<td>`;
				str += `			<input type="text" name="ItemVO.itemCode" id="showItemCode" class="form-control" value="" disabled>`;
				str += `		</td>`;
				}
				str += `	</tr>`;
				str += `	<tr class="img_tr hide">`;
				str += `		<td>`;
				str += `			상품 목록`;
				str += `		</td>`;
				str += `		<td colspan="3">`;
				str += `			<div class="row row-cols-4">`;
				str += `				<div class="item_img_div col">`;
				str += `					<input type="hidden" name="selecteditemCode" value="">`;
				str += `					<img>`;
				str += `					<p>itemImg.itemTitle</p>`;
				str += `				</div>`;
				str += `			</div>`;
				str += `		</td>`;
				str += `	</tr>`;
				str += `	<tr>`;
				str += `		<td>제목</td>`;
				str += `		<td colspan="3">`;
				str += `			<input type="text" name="hbtBoardRequestTitle" id="hbtBoardRequestTitle" class="form-control" value="${titleSpan}">`;
				str += `		</td>`;
				str += `	</tr>`;
				str += `	<tr>`;
				str += `		<td>내용</td>`;
				str += `		<td colspan="3">`;
				str += `			<textarea rows="5" name="hbtBoardRequestContent" id="hbtBoardRequestContent" class="form-control">${content}</textarea>`;
				str += `		</td>`;
				str += `	</tr>`;
				str += `</tbody>`;
				str += `</table>`;
				str += `		</div>`
				str += `	</div>`
				str += `	<div class="row justify-content-center">`
				str += `		<div class="col-2">`
				str += `			<input onclick="cancelUpdate('${hbtBoardRequestNum}', '${itemCode}');" type="button" class="btn btn-secondary w-100" value="뒤로 가기">`;
				str += `		</div>`
				str += `		<div class="col-2">`
				str += `			<input type="button" onclick="updateReq('${hbtBoardRequestNum}', '${itemCode}', '${typeRequestCode}', '${memCode}');" class="btn btn-primary w-100" value="수정 하기">`;
				str += `		</div>`
				str += `	</div>`
				str += `</div>`
				
				
				
				req_table_row.insertAdjacentHTML('afterbegin', str);
				
			}
			
			
		},
		error: function() {
			alert('실패');
		}
	});
	//ajax end
  		
	
}

function cancelUpdate(hbtBoardRequestNum, itemCode){
	
	if(itemCode != 'null'){
		location.href='/myPage/reqDetail?hbtBoardRequestNum='+hbtBoardRequestNum+'&itemCode='+itemCode;
	} else {
		location.href='/myPage/reqDetail?hbtBoardRequestNum='+hbtBoardRequestNum;
	}
	
}

function updateReq(hbtBoardRequestNum, itemCode, typeRequestCode, memCode){
	const hbtBoardRequestTitle = document.querySelector('#hbtBoardRequestTitle');
	const hbtBoardRequestContent = document.querySelector('#hbtBoardRequestContent');
	
	if(hbtBoardRequestTitle.value == '' || hbtBoardRequestContent.value == ''){
		
		if(hbtBoardRequestTitle.value == ''){
			hbtBoardRequestTitle.placeholder = '제목을 입력하세요.';
		}

		if(hbtBoardRequestContent.value == ''){
			hbtBoardRequestContent.placeholder = '내용을 입력하세요.';
		}
		
		
		return ;
	}
	
	const ask = confirm('수정 하시겠습니까?');
	if(ask){
		
		//ajax start
		$.ajax({
			url: '/myPage/updateMyReqAJAX', //요청경로
			type: 'post',
			async: true, // 동기방식(Ajax사용), false == 비동기방식
			//contentType: 'application/json; charset=UTF-8',
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			//필요한 데이터
			// 위의 데이터를 자바가 인식 가능한 json 문자열로 변환
			data: {'hbtBoardRequestTitle' : hbtBoardRequestTitle.value,
					'hbtBoardRequestContent' : hbtBoardRequestContent.value,
					'hbtBoardRequestNum' : hbtBoardRequestNum,
					'itemVO.itemCode' : itemCode,
					'typeRequestVO.typeRequestCode' : typeRequestCode,
					'isAnswer' : 'N',
					'memberVO.memCode' : memCode
					},
			success: function(result) {
				
				if(itemCode != 'null'){
					location.href='/myPage/reqDetail?hbtBoardRequestNum='+hbtBoardRequestNum+'&itemCode='+itemCode;
				} else {
					location.href='/myPage/reqDetail?hbtBoardRequestNum='+hbtBoardRequestNum;
				}
			},
			error: function() {
				alert('실패');
			}
		});
  		//ajax end
		
		
		
	}
	
	
}



function delMyRequest(hbtBoardRequestNum){
	
	const ask = confirm('정말로 문의 내역을 삭제하시겠습니까');
	
	if(ask){
		//ajax start
		$.ajax({
			url: '/myPage/delMyRequestAJAX', //요청경로
			type: 'post',
			async: true, // 동기방식(Ajax사용), false == 비동기방식
			//contentType: 'application/json; charset=UTF-8',
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			//필요한 데이터
			// 위의 데이터를 자바가 인식 가능한 json 문자열로 변환
			data: {'hbtBoardRequestNum' : hbtBoardRequestNum},
			success: function(result) {
				location.href="/myPage/checkMyRequest";
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