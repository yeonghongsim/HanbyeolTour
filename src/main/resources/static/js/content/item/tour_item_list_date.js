getSearchByDateTable();


function getSearchByDateTable(){
	
	
	
	//년 월 정보가 세팅될 태그
	const yearSpanTag = document.querySelector('#yearSpan');
	const monthSpanTag = document.querySelector('#monthSpan');
	//테이블 그릴 위치
	const searchByDateCal = document.querySelector('.searchByDateCal tbody');
	
	
	//테이블 지우기
	searchByDateCal.replaceChildren();
	
	
	
	//오늘 년월일정보 
	date = new Date();

	//오늘 날짜 요일정보 세팅
	const nowYear = date.getFullYear();
	let nowMonth = date.getMonth() + 1;
	const nowDate = date.getDate() + 1;
	const nowDay = date.getDay();
	const dayName = ['일', '월', '화', '수', '목','금','토'];
	
	
	//다음달으로 넘기기
	
	
	
	
	//
	if(monthSpanTag.textContent == null || monthSpanTag.textContent == ''){
		monthSpanTag.textContent = nowMonth;
	}
	else{
		
		monthSpanTag.textContent = parseInt(monthSpanTag.textContent) + 1;
		nowMonth = parseInt(monthSpanTag.textContent);
		console.log(nowMonth);
		
	}
	
	//이번달 마지막 날짜 조회
	
	const getLastDate = new Date(nowYear, nowMonth, 0);
	const lastDate = getLastDate.getDate();
	let drawCalTable ='';
	
	//html에 년도 월 정보 출력
	yearSpanTag.textContent = nowYear + '\.';
	console.log(monthSpanTag.textContent);
	
	//요일 설정
	let getDays = [];
	
	for(let i = 0; i < lastDate;i++){
		
		getDays.push(new Date(nowYear, nowMonth-1, i+1).getDay());
	}
	
	
	//요일	
	drawCalTable += `<tr>`
	for(let i = 0; i < lastDate; i++){
		
		if(parseInt(getDays[i]) == 0){
			drawCalTable += `<td style='background-color: red;'>${dayName[getDays[i]]}</td>`
		}
		else if(parseInt(getDays[i]) == 6){
			drawCalTable += `<td style='background-color: blue;'>${dayName[getDays[i]]}</td>`
		}
		else{
			drawCalTable += `<td>${dayName[getDays[i]]}</td>`
		}
		
	}
	drawCalTable += `</tr>`	
	
	
	//날짜
	drawCalTable += `<tr>`
	
	for(let i = 0; i < lastDate; i++){
		drawCalTable += `<td>${i+1}</td>`
	}
	drawCalTable += `</tr>`
	
	//테이블 html에 넣기
	searchByDateCal.insertAdjacentHTML('afterbegin', drawCalTable);
	 
}

