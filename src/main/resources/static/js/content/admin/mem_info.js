//회원 상세 정보 조회
function getMemDetail(memId){
	
	//ajax start
	$.ajax({
		url: '/admin/getMemDetailAJAX', //요청경로
		type: 'post',
		data: {'memId' : memId}, //필요한 데이터
		success: function(result) {
			alert('ajax 통신 성공');
			
			const memDetailDiv = document.querySelector('.memDetailDiv');
			memDetailDiv.replaceChildren();
			console.log(result)
			
			let str = '';
			
			str += `<h5 style="font-style: italic; margin-top:50px; margin-bottom:30px;">${result.memName}님의 상세 정보</h5>`                                        
			str += `<table class="table">             `;
			str += `	<colgroup>                    `;
			str += `		<col width="10%">       `;
			str += `		<col width="23.3%">       `;
			str += `		<col width="10%">       `;
			str += `		<col width="23.3%">       `;
			str += `		<col width="10%">       `;
			str += `		<col width="23.3%">		`;						
			str += `	</colgroup>                   `;
			str += `	<thead class="tableColums">                       `;
			str += `		<tr>                      `;
			str += `			<td>아이디</td>       `;
			str += `			<td>${result.memId}</td>             `;
			str += `			<td>이름</td>         `;
			str += `			<td>${result.memName}</td>             `;
			str += `			<td>성별</td>         `;
			str += `			<td colspan="2">${result.memberDetailVO.memDGen}</td>             `;
			str += `		</tr>                     `;
			str += `		<tr>                      `;
			str += `			<td>연락처</td>       `;
			str += `			<td>${result.memberDetailVO.memDTell}</td>             `;
			str += `			<td>생일</td>         `;
			str += `			<td>${result.memberDetailVO.memDBir}</td>             `;
			str += `			<td>이메일</td>       `;
			str += `			<td colspan="2">${result.memberDetailVO.memEmail}</td>             `;
			str += `		</tr>                     `;
			str += `		<tr>                      `;
			str += `			<td>주소</td>         `;
			str += `			<td colspan="6">${result.memberDetailVO.memDAddr} ${result.memberDetailVO.memDAddr2}</td>             `;
			//str += `			<td>상세주소</td>     `;
			//str += `			<td>${result.memberDetailVO.memDAddr2}</td>             `;
			//str += `			<td></td> `;
			//str += `			<td></td>             `;
			str += `		</tr>                     `;
			str += `		<tr class="align-middle">                      `;
			str += `			<td>활동상태</td>     `;
			str += `			<td>${result.memStatusVO.memStatusName}</td>             `;
			str += `			<td>가입일</td>       `;
			str += `			<td>${result.memberDetailVO.memDJoindate}</td>             `;
			str += `			<td>권한</td> `;
			str += `			<td> `;
			str += `				<select id="memRoleSelectbox" class="form-select" style="width:80%;">`;
										if(result.memRole == 'USR'){
			str += `						<option value="USR" selected>USR</option>`;
			str += `						<option value="MNG">MNG</option>`;
			str += `						<option value="AD">AD</option>`;
										}
										else if(result.memRole == 'MNG'){
			str += `						<option value="USR">USR</option>`;
			str += `						<option value="MNG" selected>MNG</option>`;
			str += `						<option value="AD">AD</option>`;
											
										}else{
			str += `						<option value="USR">USR</option>`;
			str += `						<option value="MNG">MNG</option>`;
			str += `						<option value="AD" selected>AD</option>`;
										}
			str += `				</select>`;
			str += `			</td>             `;
			str += `			<td>             `;
			str += `				<input type=button value="권한 변경" class="btn btn-primary" onclick="updateMemRole('${result.memId}');">`;
			str += `			</td>             `;
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



//회원 조회 페이징 처리
function getMemListPaging(pageNum){
	document.querySelector('#nowPage').value = pageNum;
	const searchForm = document.querySelector('#searchForm');
	
	searchForm.submit();

}

//회원 권한 변경
function updateMemRole(memId){
	alert('권한이 변경되었습니다.');
	const memRole = document.querySelector('#memRoleSelectbox').value
	
	location.href=`/admin/updateMemRole?memRole=${memRole}&memId=${memId}`;
}


//검색어 없을 시 검색 막기
 function validateForm(event) {
    
    const input = document.querySelector('.searchInput');
      
      if (input.value.trim() === '') {
        // 입력 제출 막기
        event.preventDefault();
        alert('검색 조건이 입력되지 않았습니다.');
        return;
      }
    
  }
  
 // 폼 제출(submit) 이벤트 리스너 등록
 const form = document.getElementById('searchForm');
 form.addEventListener('submit', validateForm);