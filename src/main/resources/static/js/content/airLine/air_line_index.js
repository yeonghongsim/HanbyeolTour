init()

function chkWay(selectTag, areaList){
	const oneWay_div = document.querySelector('.oneWay-div');
	const round_div = oneWay_div.nextElementSibling;
	const onewayGoCountry = document.querySelector('#onewayGoCountry');
	const onewayComeCountry = document.querySelector('#onewayComeCountry');
	
	let draw_round_cols = '';
	
	if(selectTag.value == 'oneWay'){
		round_div.replaceChildren();
		
	} else {
		
		draw_round_cols += `	<div class="col-3">`;
		draw_round_cols += `		<input type="text" class="form-control" id="roundGoCountry" name="roundGoCountry" disabled>`;
		draw_round_cols += `	</div>`;
		draw_round_cols += `	<div class="col-3">`;
		draw_round_cols += `		<input type="text" class="form-control" id="roundComeCountry" name="roundComeCountry" disabled>`;
		draw_round_cols += `	</div>`;
		draw_round_cols += `	<div class="col-3">`;
		draw_round_cols += `		<input type="date" class="form-control" id="roundGoDate" name="roundGoDate">`;
		draw_round_cols += `	</div>`;
		draw_round_cols += `	<div class="col-3">`;
		draw_round_cols += `		<input type="date" class="form-control" id="roundComeDate" name="roundComeDate">`;
		draw_round_cols += `	</div>`;
		
		round_div.insertAdjacentHTML('afterbegin', draw_round_cols);
		
		arrival(onewayGoCountry, areaList);
		departure(onewayComeCountry, areaList);
		
	}
	
}




function arrival(tag, areaList){
	const roundComeCountry = document.querySelector('#roundComeCountry');
	
	if(tag.value == '선택'){
		if(roundComeCountry != null){
			roundComeCountry.value = '선택';
		}
	} else {
		if(roundComeCountry != null){
			areaList.forEach(function(areaInfo){
				if(tag.value == areaInfo.areaCode){
					roundComeCountry.value = areaInfo.areaKorName;
					return ;
				} 
			});
		
		}
	}
	
	
}
function departure(tag, areaList){
	const roundGoCountry = document.querySelector('#roundGoCountry');
	
	if(tag.value == '선택') {
		if(roundGoCountry != null){
			roundGoCountry.value = '선택';
		}
	} else {
		if(roundGoCountry != null){
			areaList.forEach(function(areaInfo){
				if(tag.value == areaInfo.areaCode){
					roundGoCountry.value = areaInfo.areaKorName;
				} 
			});
		}
	}
}


function getTicketList(){
	const oneWay_div = document.querySelector('.oneWay-div');
	const round_div_chk = oneWay_div.nextElementSibling.children[0];
	// 모든 인풋/셀렉트의 벨류값
	const onewayGoCountry = document.querySelector('#onewayGoCountry').value;
	const onewayGoDateStr = document.querySelector('#onewayGoDate').value;
	const onewayComeCountry = document.querySelector('#onewayComeCountry').value;
	const onewayComeDateStr = document.querySelector('#onewayComeDate').value;
	// 출발 날짜 형식 변경
	let onewayGoDate = '';
	onewayGoDateStr.split('-').forEach(function(word){
		onewayGoDate += word;
	})
	let onewayComeDate = '';
	onewayComeDateStr.split('-').forEach(function(word){
		onewayComeDate += word;
	})
	
	let roundGoCountry = '';
	let roundGoDateStr = '';
	let roundComeCountry = '';
	let roundComeDateStr = '';
	let roundGoDate = '';
	let roundComeDate = '';

	if(round_div_chk != null){
	roundGoCountry = document.querySelector('#roundGoCountry').value;
	roundGoDateStr = document.querySelector('#roundGoDate').value;
	roundComeCountry = document.querySelector('#roundComeCountry').value;
	roundComeDateStr = document.querySelector('#roundComeDate').value;
	
	
	// 도착 날짜 형식 변경
	roundGoDateStr.split('-').forEach(function(word){
		roundGoDate += word;
	})
	roundComeDateStr.split('-').forEach(function(word){
		roundComeDate += word;
	})
	
	}	
	
	// 잘못된 검색 결과의 내용을 보여줄 div
	const err_div = oneWay_div.parentElement.nextElementSibling;
	let err_text = '';
	
	
	
	
	
	
	console.log(onewayGoCountry + " / " + onewayGoDate+ " / " + onewayComeCountry+ " / "+ onewayComeDate);
	console.log(roundGoCountry + " / " + roundGoDate+ " / " + roundComeCountry+ " / "+ roundComeDate);
	
	// 잘못된 검색 결과의 내용
	if(onewayGoCountry == '선택' || onewayComeCountry == '선택'){
		err_div.replaceChildren();
		err_text += `<div>`;
		err_text += `<span>출발/도착 국가를 확인해주세요.</span>`;
		err_text += `</div>`;
		
		err_div.insertAdjacentHTML('afterbegin', err_text);
		
	} else if(onewayGoCountry == onewayComeCountry){
		err_div.replaceChildren();
		err_text += `<div>`;
		err_text += `<span>출발/도착 국가를 확인해주세요111.</span>`;
		err_text += `</div>`;
		
		err_div.insertAdjacentHTML('afterbegin', err_text);
	}
	
	if(onewayGoDate == '' && onewayComeDate == '') {
		err_div.replaceChildren();
		err_text += `<div>`;
		err_text += `<span>출발일 혹은 도착일을 선택해주세요.</span>`;
		err_text += `</div>`;
		
		err_div.insertAdjacentHTML('afterbegin', err_text);
		return ;
	}
	
	
	//ajax start
	$.ajax({
		url: '/airLine/searchAirLineAJAX', //요청경로
		type: 'post',
		async: true, // 동기방식(Ajax사용), false == 비동기방식
		//contentType: 'application/json; charset=UTF-8',
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		//필요한 데이터
		// 위의 데이터를 자바가 인식 가능한 json 문자열로 변환
		data: {
			'onewayGoCountry' : onewayGoCountry
			, 'onewayGoDate' : onewayGoDate
			, 'onewayComeCountry' : onewayComeCountry
			, 'onewayComeDate' : onewayComeDate
			, 'roundGoCountry' : roundGoCountry
			, 'roundGoDate' : roundGoDate
			, 'roundComeCountry' : roundComeCountry
			, 'roundComeDate' : roundComeDate
		},
		success: function(result) {
			//alert('ajax 통신 성공');
		},
		error: function() {
			alert('실패');
		}
	});
   //ajax end
	
	
}

function init(){
	
}