//회원 상세 정보 조회
function getMemDetail(memId){
	
	//ajax start
	$.ajax({
		url: '/admin/getMemDetailAjax', //요청경로
		type: 'post',
		data: {'memId' : memId}, //필요한 데이터
		success: function(result) {
			alert('ajax 통신 성공');
			
			const memDetailDiv = document.querySelector('.memDetailDiv');
			memDetailDiv.replaceChildren();
			
			let str = '';
			                                        
			str += `<table class="table">             `;
			str += `	<colgroup>                    `;
			str += `		<col width="16.6%">       `;
			str += `		<col width="16.6%">       `;
			str += `		<col width="16.6%">       `;
			str += `		<col width="16.6%">       `;
			str += `		<col width="16.6%">       `;
			str += `		<col width="16.6%">		`;						
			str += `	</colgroup>                   `;
			str += `	<thead>                       `;
			str += `		<tr>                      `;
			str += `			<td>아이디</td>       `;
			str += `			<td>${result.memId}</td>             `;
			str += `			<td>이름</td>         `;
			str += `			<td>${result.memName}</td>             `;
			str += `			<td>성별</td>         `;
			str += `			<td>${result.memberDetailVO.memDGen}</td>             `;
			str += `		</tr>                     `;
			str += `		<tr>                      `;
			str += `			<td>연락처</td>       `;
			str += `			<td>${result.memberDetailVO.memDTell}</td>             `;
			str += `			<td>생일</td>         `;
			str += `			<td>${result.memberDetailVO.memDBir}</td>             `;
			str += `			<td>이메일</td>       `;
			str += `			<td>${result.memberDetailVO.memEmail}</td>             `;
			str += `		</tr>                     `;
			str += `		<tr>                      `;
			str += `			<td>주소</td>         `;
			str += `			<td>${result.memberDetailVO.memDAddr}</td>             `;
			str += `			<td>상세주소</td>     `;
			str += `			<td>${result.memberDetailVO.memDAddr2}</td>             `;
			str += `			<td colspan="2"></td> `;
			str += `			<td></td>             `;
			str += `		</tr>                     `;
			str += `		<tr>                      `;
			str += `			<td>활동상태</td>     `;
			str += `			<td>${result.memStatusVO.memStatusName}</td>             `;
			str += `			<td>가입일</td>       `;
			str += `			<td>${result.memberDetailVO.memDJoindate}</td>             `;
			str += `			<td colspan="2"></td> `;
			str += `			<td></td>             `;
			str += `		</tr>                     `;
			str += `	</thead>                      `;
			str += `</table>                          `;
			
			memDetailDiv.insertAdjacentHTML('afterbegin', str);
			
		},
		error: function() {
			alert('실패');
		}
	});
//ajax end
}