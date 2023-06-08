function regReply(writer, memId, hbtBoardNum, inpTag, userRole){
	const hbtBoardReplyContent = inpTag.parentElement.previousElementSibling.children[0];
	if(userRole == 'AD' || userRole == 'USR'){
		userRole = userRole;
	} else {
		userRole = userRole[0]['authority'].substr(5);
	}
	
	if(memId == 'anonymousUser'){
		const must_login = confirm('회원 이용 서비스 입니다. 로그인하시겠습니까?');
		
		if(must_login){
			location.href='/member/login';
		}
		return ;
	}
	
	if(writer == memId){
		alert('본인의 게시글에 직접 댓글 달 수 없습니다.');
		
		return ;
	}
	
	if(hbtBoardReplyContent.value == ''){
		hbtBoardReplyContent.placeholder = "내용을 입력하세요.";
		
		return ;
	}
	
	//ajax start
	$.ajax({
		url: '/board/regReplyAJAX', //요청경로
		type: 'post',
		async: true, // 동기방식(Ajax사용), false == 비동기방식
		//contentType: 'application/json; charset=UTF-8',
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		//필요한 데이터
		// 위의 데이터를 자바가 인식 가능한 json 문자열로 변환
		data: {
			'hbtBoardReplyContent': hbtBoardReplyContent.value
			, 'MemberVO.memId': memId
			, 'hbtBoardNum': hbtBoardNum
		},
		success: function(result) {
			hbtBoardReplyContent.value = "";
			
			getReplyList(hbtBoardNum, memId, userRole);

		},
		error: function() {
			alert('실패');
		}
	});
    //ajax end
}

function regReReply(inputBtn, hbtBoardReplyNum, memId, hbtBoardNum, writerId, userRole){
	if(userRole == 'AD' || userRole == 'USR'){
		userRole = userRole;
	} else {
		userRole = userRole[0]['authority'].substr(5);
	}
	
	const input_btn_div = inputBtn.parentElement;
	const cancel_re_reply_input = document.querySelector('.cancel_re_reply_input');
	
	if(inputBtn.value == '대댓글'){
		
		inputBtn.value = '등록';
		
		let re_reply_input = '';
		
		re_reply_input += `<div class="col cancel_re_reply_input">`;
		re_reply_input += `	<input type="text" class="form-control">`;
		re_reply_input += `</div>`;
		
		input_btn_div.insertAdjacentHTML('afterend', re_reply_input);
		
		let cancel_reReply = '';

		cancel_reReply += `<div class="col-1 me-2 cancel_re_reply_btn">`;
		cancel_reReply += `	<input onclick="returnRegReReply(this)" type="button" class="btn btn-secondary" value="취소">`;
		cancel_reReply += `</div>`;
	
		input_btn_div.insertAdjacentHTML('afterend', cancel_reReply);
		
	} else {
		
		if(cancel_re_reply_input.children[0].value == ''){
			cancel_re_reply_input.children[0].placeholder = '내용을 입력해주세요.';
			
			return ;
		}
		
		//ajax start
		$.ajax({
			url: '/board/regReReplyAJAX', //요청경로
			type: 'post',
			async: true, // 동기방식(Ajax사용), false == 비동기방식
			//contentType: 'application/json; charset=UTF-8',
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			//필요한 데이터
			// 위의 데이터를 자바가 인식 가능한 json 문자열로 변환
			data: {'hbtBoardReplyNumFk' : hbtBoardReplyNum
					, 'hbtBoardReplyContent' : cancel_re_reply_input.children[0].value
					, 'memberVO.memId' : memId
					, 'replyDepth' : 2
					, 'hbtBoardNum' : hbtBoardNum},
			success: function(result) {
				inputBtn.value = '대댓글';
				
				getReplyList(hbtBoardNum, memId, userRole)
				
			},
			error: function() {
				alert('실패');
			}
		});
  		 //ajax end
		
		
	}
	

}

function returnRegReReply(cancelBtn){
	const standard_div = cancelBtn.parentElement.previousElementSibling;
	const ask = confirm('대댓글 작성을 취소하시겠습니까?');

	if(ask){
		standard_div.children[0].value = '대댓글';
		standard_div.nextElementSibling.remove();
		standard_div.nextElementSibling.remove();
	}	
}

function delReply(hbtBoardReplyNum, memId, hbtBoardNum, userRole){
	if(userRole == 'AD' || userRole == 'USR'){
		userRole = userRole;
	} else {
		userRole = userRole[0]['authority'].substr(5);
	}
	
	const ask = confirm('정말로 해당 댓글을 삭제하시겠습니까?');
	
	if(ask){
		//ajax start
		$.ajax({
			url: '/board/delReplyAJAX', //요청경로
			type: 'post',
			async: true, // 동기방식(Ajax사용), false == 비동기방식
			//contentType: 'application/json; charset=UTF-8',
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			//필요한 데이터
			// 위의 데이터를 자바가 인식 가능한 json 문자열로 변환
			data: {'hbtBoardReplyNum' : hbtBoardReplyNum
					,'hbtBoardNum' : hbtBoardNum},
			success: function(result) {
				
				getReplyList(hbtBoardNum, memId, userRole);
				
			},
			error: function() {
				alert('실패');
			}
		});
		//ajax end
	}
}

function delReReply(hbtBoardReplyNum, hbtBoardNum, memId, hbtBoardReplyNumFk, userRole){
	if(userRole == 'AD' || userRole == 'USR'){
		userRole = userRole;
	} else {
		userRole = userRole[0]['authority'].substr(5);
	}
	
	const ask = confirm('해당 댓글을 삭제하시겠습니까');
	
	if(ask){
		//ajax start
		$.ajax({
			url: '/board/delReplyAJAX', //요청경로
			type: 'post',
			async: true, // 동기방식(Ajax사용), false == 비동기방식
			//contentType: 'application/json; charset=UTF-8',
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			//필요한 데이터
			// 위의 데이터를 자바가 인식 가능한 json 문자열로 변환
			data: {'hbtBoardReplyNum' : hbtBoardReplyNum
					,'hbtBoardNum' : hbtBoardNum
					, 'hbtBoardReplyNumFk' : hbtBoardReplyNumFk},
			success: function(result) {
				
				getReplyList(hbtBoardNum, memId, userRole);
				
			},
			error: function() {
				alert('실패');
			}
		});
	   //ajax end
		
	}
	
}

function updateFormReply(btn, hbtBoardReplyNum){
	const inputTag = btn.parentElement.parentElement.previousElementSibling.children[0];
	const cancel_div = btn.parentElement;
	const content = inputTag.innerText;
	
	if(btn.value == '수정'){
		btn.classList.remove('btn-secondary');
		btn.classList.add('btn-primary');
		inputTag.replaceChildren();
	
		let update_input = '';
		
		update_input += `<input class="form-control mt-2" type="text" value="${content}">`;
			
		inputTag.insertAdjacentHTML('afterbegin', update_input);
		
		btn.value = '완료';
		
		let cancel_btn = '';
		
		cancel_btn += `<div class="col-1 me-3">`;
		cancel_btn += `		<input onclick="cancelUpdateReply(this, '${content}')" class="btn btn-secondary" type="button" value="취소">`;
		cancel_btn += `</div>`;
		
		cancel_div.insertAdjacentHTML('beforebegin', cancel_btn)
		
	} else if(btn.value == '완료') {
		btn.classList.add('btn-secondary');
		btn.classList.remove('btn-primary');
		const hbtBoardReplyContent = inputTag.children[0].value;
		
		const ask = confirm('해당 댓글을 수정하시겠습니까?');
		
		if(ask){
			//ajax start
			$.ajax({
				url: '/board/updateReplyAJAX', //요청경로
				type: 'post',
				async: true, // 동기방식(Ajax사용), false == 비동기방식
				//contentType: 'application/json; charset=UTF-8',
				contentType: "application/x-www-form-urlencoded; charset=UTF-8",
				//필요한 데이터
				// 위의 데이터를 자바가 인식 가능한 json 문자열로 변환
				data: {'hbtBoardReplyContent' : hbtBoardReplyContent
						,'hbtBoardReplyNum' : hbtBoardReplyNum},
				success: function(result) {
					btn.classList.add('btn-secondary');
					btn.classList.remove('btn-primary');
					cancel_div.previousElementSibling.remove();
					
					inputTag.replaceChildren();
					
					let content = '';
	
					content += `${result}`;
						
					inputTag.insertAdjacentHTML('afterbegin', content);
					
					btn.value = '수정';
					
				},
				error: function() {
					alert('실패');
				}
			});
   			//ajax end
		}
		
	}
	
}

function cancelUpdateReply(cancelBtn, contentVal){
	const cancelDiv = cancelBtn.parentElement;
	const inputTag = cancelBtn.parentElement.parentElement.parentElement.children[1].children[0];
	const updateBtn = cancelDiv.nextElementSibling.children[0];
	
	const ask = confirm('내용 변경을 취소하시겠습니까?');
	
	if(ask){
		
		inputTag.replaceChildren();
					
		let content = '';

		content += `${contentVal}`;
			
		inputTag.insertAdjacentHTML('afterbegin', content);

		cancelDiv.remove();
		
		updateBtn.value = '수정';
		updateBtn.classList.add('btn-secondary');
		updateBtn.classList.remove('btn-primary');
		
	}
}



function getReplyList(hbtBoardNum, memId, userRole){
	
	//ajax start
	$.ajax({
		url: '/board/getReplyListAJAX', //요청경로
		type: 'post',
		async: true, // 동기방식(Ajax사용), false == 비동기방식
		//contentType: 'application/json; charset=UTF-8',
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		//필요한 데이터
		// 위의 데이터를 자바가 인식 가능한 json 문자열로 변환
		data: {'hbtBoardNum' : hbtBoardNum},
		success: function(result) {
			
			const reply_con = document.querySelector('.reply_con');
			reply_con.replaceChildren();
		
			let str = '';
			
	for(const reply of result){
		if(reply.replyDepth == 1){
					
					str += `	<div class="row">`;
					str += `		<div class="col offset-1 col reply_div">`;
					str += `			<div class="row mt-3 mb-3">`;
					str += `				<div class="col">`;
					str += `					<div class="row">`;
					str += `						<div class="col">`;
					str += `							<span>${reply.memberVO.memId}</span>`;
					str += `							<span style="color: grey; font-size: 0.8rem;">/ ${reply.hbtBoardReplyRegDate}</span>`;
					str += `						</div>`;
					str += `					</div>`;
					str += `					<div class="row mb-3">`;
					str += `						<div class="col">`;
					str += `							${reply.hbtBoardReplyContent}`;
					str += `						</div>`;
					str += `					</div>`;
					str += `					<div class="row">`;
						if(memId != 'anonymousUser' && reply.memberVO.memId != memId){
					str += `						<div class="col-1 me-3">`;
					str += `							<input onclick="regReReply(this, '${reply.hbtBoardReplyNum}', '${memId}', '${reply.hbtBoardNum}', '${reply.memberVO.memId}', '${userRole}');" class="btn btn-primary" type="button" value="대댓글">`;
					str += `						</div>`;
						}
						if(reply.memberVO.memId == memId){
					str += `						<div class="col-1 me-3">`;
					str += `							<input onclick="updateFormReply(this, '${reply.hbtBoardReplyNum}')" class="btn btn-secondary" type="button" value="수정">`;
					str += `						</div>`;
						}
						if(userRole == 'USR' && reply.memberVO.memId == memId){
					str += `						<div class="col-1 me-3">`;
					str += `							<input onclick="delReply('${reply.hbtBoardReplyNum}', '${memId}', '${reply.hbtBoardNum}', '${userRole}')" class="btn btn-danger" type="button" value="삭제4">`;
					str += `						</div>`;
						}
						if(userRole == 'AD' && reply.memberVO.memId != memId){
					str += `						<div class="col-1 me-3">`;
					str += `							<input onclick="delReply('${reply.hbtBoardReplyNum}', '${memId}', '${reply.hbtBoardNum}', '${userRole}')" class="btn btn-danger" type="button" value="삭제5">`;
					str += `						</div>`;
						}
						if(userRole == 'AD' && reply.memberVO.memId == memId){
					str += `						<div class="col-1 me-3">`;
					str += `							<input onclick="delReply('${reply.hbtBoardReplyNum}', '${memId}', '${reply.hbtBoardNum}', '${userRole}')" class="btn btn-danger" type="button" value="삭제6">`;
					str += `						</div>`;
							}
					str += `					</div>`

					str += `				</div>`;
					str += `			</div>`;
			for(const reReply of result){
				if(reReply.replyDepth == 2 && reply.hbtBoardReplyNum == reReply.hbtBoardReplyNumFk){
					str += `			<div class="row mb-2 re_reply_con">`;
					str += `				<div class="offset-1 col re_reply_div">`;
					str += `					<div>`;
					str += `						<span style="font-size: 0.9rem;">${reReply.memberVO.memId}</span>`;
					str += `						<span style="font-size: 0.8rem; color: grey;">/ ${reReply.hbtBoardReplyRegDate}</span>`;
					str += `					</div>`;
					str += `					<div>`;
					str += `						<span>${reReply.hbtBoardReplyContent}</span>`;
					str += `					</div>`;
					str += `				</div>`;
						if(userRole == 'USR' && reReply.memberVO.memId == memId){
					str += `				<div class="col-1">`;
					str += `					<input onclick="delReReply('${reReply.hbtBoardReplyNum}', '${reReply.hbtBoardNum}', '${memId}', '${reReply.hbtBoardReplyNumFk}', '${userRole}');" type="button" class="btn btn-danger" value="삭제1">`;
					str += `				</div>`;
						}
						if(userRole == 'AD' && reReply.memberVO.memId == memId){
					str += `				<div class="col-1">`;
					str += `					<input onclick="delReReply('${reReply.hbtBoardReplyNum}', '${reReply.hbtBoardNum}', '${memId}', '${reReply.hbtBoardReplyNumFk}', '${userRole}');" type="button" class="btn btn-danger" value="삭제2">`;
					str += `				</div>`;
						}
						if(userRole == 'AD' && reReply.memberVO.memId != memId){
					str += `				<div class="col-1">`;
					str += `					<input onclick="delReReply('${reReply.hbtBoardReplyNum}', '${reReply.hbtBoardNum}', '${memId}', '${reReply.hbtBoardReplyNumFk}', '${userRole}');" type="button" class="btn btn-danger" value="삭제3">`;
					str += `				</div>`;
						}
					str += `			</div>`;	
				}
			}
					str += `		</div>`;
					str += `	</div>`;
		}
	}
		
			reply_con.insertAdjacentHTML('afterbegin', str);
			
		},
		error: function() {
			alert('실패');
		}
	});
   //ajax end
	
}
