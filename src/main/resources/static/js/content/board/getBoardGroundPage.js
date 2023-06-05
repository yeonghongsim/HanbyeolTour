function searchBoard() {
	const searchForm = document.querySelector('#searchForm');
	const searchVal = document.querySelector('#searchVal');
	
	if(searchVal.value == ''){
		searchVal.placeholder = "검색어를 입력해주세요.";
		
		return ;
	}
	
	searchForm.submit();
	
}

function getOrderListPaging(pageNum){
	document.querySelector('#nowPage').value = pageNum;
	const searchForm = document.querySelector('#searchForm');
	
	searchForm.submit();
}


function getBoardDetail(isPrivate, hbtBoardNum, aTag){
	
	if(isPrivate == 'Y'){
		const imgTag = aTag.nextElementSibling;
		const chkDiv = aTag.parentElement.nextElementSibling;
		
		if(imgTag != null){
			imgTag.remove();
		}
		
		chkDiv.replaceChildren();
		
		let str = '';
		
		str += `	<div class="col-8">`;
		str += `		<input class="chkVal form-control w-100" type="password">`;
		str += `	</div>`;
		str += `	<div class="col-4">`;
		str += `		<input onclick="chkPw('${hbtBoardNum}', this);" class="chkBtn btn btn-secondary w-100" type="button" value="확인">`;
		str += `	</div>`;
		
		
		chkDiv.insertAdjacentHTML('afterbegin', str);
		
		
	} else {
		location.href=`/board/boardGroundDetail?hbtBoardNum=${hbtBoardNum}`;
	}
	
}

function chkPw(hbtBoardNum, chkInp){
	const chkPw = chkInp.parentElement.previousElementSibling.children[0];
	
	if(chkPw.value == null){
		chkPw.placeholder = '비밀번호를 입력하세요.';
		
		return ;
	}
	
	//ajax start
    $.ajax({
    	url: '/board/chkPrivatePwAJAX', //요청경로
    	type: 'post',
    	async: true, // 동기방식(Ajax사용), false == 비동기방식
    	//contentType: 'application/json; charset=UTF-8',
    	contentType: "application/x-www-form-urlencoded; charset=UTF-8",
    	//필요한 데이터
    	// 위의 데이터를 자바가 인식 가능한 json 문자열로 변환
    	data: {'hbtBoardNum' : hbtBoardNum},
    	success: function(result) {
        	
        	if(result == chkPw.value){
				location.href=`/board/boardGroundDetail?hbtBoardNum=${hbtBoardNum}`;
			} else {
				alert('잘못된 비밀번호입니다.');
			}
			
        	
        	
    	},
     	error: function() {
        	alert('실패');
    	}
    });
	//ajax end
	
	
}

function regBoardForm(memId){
	
	const wholeViewDiv = document.querySelector('#wholeViewDiv');
	
	wholeViewDiv.replaceChildren();
	
	let str = '';
	
	str += `<form action="/board/regBoard" method="post" id="regBoardForm">`
	str += `<input type="hidden" name="MemberVO.memId" value="${memId}">`;
	str += `<input type="hidden" name="isNotice" value="N">`;
	str += `<div class="row">`
	str += `	<div class="col">`
	str += `<table class="table text-center regTable">`;
	str += `	<colgroup>`;
	str += `		<col width="25%"/>`;
	str += `		<col width="25%"/>`;
	str += `		<col width="25%"/>`;
	str += `		<col width="25%"/>`;
	str += `	</colgroup>`;
	str += `	<tbody>`;
	str += `		<tr>`;
	str += `			<td>작성자</td>`;
	str += `			<td>`;
	str += `				<span>${memId}<span>`;
	str += `			</td>`;
	str += `			<td>`;
	str += `				<span>비밀글 여부</span>`;
	str += `				<div class="row">`;
	str += `					<div class="offset-3 col-3">`;
	str += `						<input onclick="set_private(this);" class="form-check-input" type="radio" name="isPrivate" id="isPrivate_Y" value="Y">`;
	str += `						<label class="form-check-label" for="isPrivate_Y">Y</label>`;
	str += `					</div>`;
	str += `					<div class="col-3">`;
	str += `						<input onclick="set_private(this);" class="form-check-input" type="radio" name="isPrivate" id="isPrivate_N" value="N" checked>`;
	str += `						<label class="form-check-label" for="isPrivate_N">N</label>`;
	str += `					</div>`;
	str += `				</div>`;
	str += `			</td>`;
	str += `			<td>`;
	str += `				<input class="form-control hide private_pw" type="text" name="privatePw">`;
	str += `			</td>`;
	str += `		</tr>`;
	str += `		<tr>`;
	str += `			<td>제목</td>`;
	str += `			<td colspan="3">`;
	str += `				<input class="form-control" type="text" name="hbtBoardTitle" id="hbtBoardTitle">`;
	str += `			</td>`;
	str += `		</tr>`;
	str += `		<tr>`;
	str += `			<td>내용</td>`;
	str += `			<td colspan="3">`;
	str += `				<textarea class="form-control" rows="5" name="hbtBoardContent" id="hbtBoardContent"></textarea>`;
	str += `			</td>`;
	str += `		</tr>`;
	str += `	</tbody>`;
	str += `</table>`;
	str += `	</div>`;
	str += `</div>`;
	str += `<div class="row text-center">`;
	str += `	<div class="col">`;
	str += `		<input onclick="location.href='/board/getBoardGroundPage'" type="button" class="btn btn-secondary" value="뒤로 가기">`;
	str += `		<input type="button" onclick="regBoard();" class="btn btn-primary" value="등록">`;
	str += `	</div>`;
	str += `</div>`;
	str += `</form>`;
	
	
	wholeViewDiv.insertAdjacentHTML('afterbegin', str);
	
	
	
	
	
}

function set_private(choose){
	const private_pw = document.querySelector('.private_pw');
	
	if(choose.value == 'Y'){
		private_pw.classList.remove('hide');
	} else {
		private_pw.classList.add('hide');
	}
	
}

function regBoard(){
	const hbtBoardTitle = document.querySelector('#hbtBoardTitle');
	const hbtBoardContent = document.querySelector('#hbtBoardContent');
	const regBoardForm = document.querySelector('#regBoardForm');
	
	if(hbtBoardTitle.value == '' || hbtBoardContent.value == ''){

		if(hbtBoardTitle.value == ''){
			hbtBoardTitle.placeholder = '제목을 입력하세요.'
		}

		if(hbtBoardContent.value == ''){
			hbtBoardContent.placeholder = '내용을 입력하세요.'

		}
		
		return ;
	}
	
	regBoardForm.submit();
	
}

