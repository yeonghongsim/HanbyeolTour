

//일자별상품조회 달력
function getSearchByDateTable(idx, month){
	
	console.log(idx);
	console.log(month);
	//년 월 정보가 세팅될 태그
	const yearSpanTag = document.querySelectorAll('.yearSpan');
	const monthSpanTag = document.querySelectorAll('.monthSpan');
	//테이블 그릴 위치
	const calTableTag = document.querySelectorAll('.calTableTag');
	
	//
	const dateDivTag = document.querySelectorAll('.dateDiv');
	
	//테이블 지우기
	calTableTag[idx].replaceChildren();
	
	//오늘 년월일정보 
	date = new Date();

	//오늘 날짜 요일정보 세팅
	let nowYear = date.getFullYear();
	let nowMonth = date.getMonth() + 1;
	const nowDate = date.getDate() + 1;
	const nowDay = date.getDay();
	const dayName = ['일', '월', '화', '수', '목','금','토'];
	let monthSpanTagVal = nowMonth;
	
	//span 태그에 년 월정보 세팅 (3개월이후까지만)
	for(const year of yearSpanTag){
		year.textContent = nowYear + '년';
	}
	//idx 가 0일때 spantag 0,1,2,3 번에 글자넣기
	//idx 가 1일때          4,5,6,7
	//출발이 idx*4      i < idx * 4  + 4
	let j = 0;
	for(let i = idx * 0 ; i < (idx * 0) + 4; i++){
		monthSpanTag[i].textContent =(parseInt(nowMonth) + j) + '월';
		j++;
	}
	
	//이번달 다음달 조회
	/*
	if (month != null && !month == '') {
		month = -1;
		nowYear = parseInt(yearSpanTag.textContent);
	}
	else if (month != null && month == 'next') {
		month = 1;
		nowYear = parseInt(yearSpanTag.textContent);
	}
	*/
	
	if(monthSpanTag.textContent != null && !monthSpanTag.textContent == ''){
		nowMonth = parseInt(monthSpanTag.textContent) + month;
	}
	else{
		monthSpanTag.textContent = monthSpanTagVal;
	}
	
	//이번달 마지막 날짜 조회
	const getDate = new Date(nowYear, nowMonth, 0);
	const lastDate = getDate.getDate();
	let drawCalTable ='';
	
	//html에 년도 월 정보 출력
	
	if(nowMonth > 12){
		nowYear = nowYear + 1;
		nowMonth = 1;
	}
	else if(nowMonth < 1){
		nowYear = nowYear - 1;
		nowMonth = 12;
		
	}
	
	yearSpanTag.textContent = nowYear;
	monthSpanTag.textContent = nowMonth;
	
	//요일 설정
	let getDays = [];
	
	for(let i = 0; i < lastDate;i++){
		
		getDays.push(new Date(nowYear, nowMonth-1, i+1).getDay());
	}
	
	//요일 테이블
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
	
	//날짜테이블
	drawCalTable += `<tr>`
	
	for(let i = 0; i < lastDate; i++){
		drawCalTable += `<td onclick="getSearchByDateAJAX(${i+1});">${i+1}</td>`
	}
	drawCalTable += `</tr>`
	
	//테이블 html에 넣기
	calTableTag[idx].insertAdjacentHTML('afterbegin', drawCalTable);
	 
}

//달력의 날짜 클릭시 검색결과
function getSearchByDateAJAX(getDate){
	//현재지역 가져오기
	const areaName = document.querySelector('#areaName').value;
	
	//검색할 년 월 정보 가져오기
	const getYear = document.querySelector('#yearSpan').textContent;
	const getMonth = document.querySelector('#monthSpan').textContent;
	
	let a = new Date(getYear + '-' +  getMonth + '-' + getDate);
	
	$.ajax({
		url: '/item/tourItemListDateAJAX', //요청경로
		type: 'post',
		//contentType : 'application/json; charset=UTF-8',
		//contentType : "application/x-www-form-urlencoded; charset=UTF-8",
		//async : true,
		data: {'areaName': areaName,'searchDate': a}, 
		success: function(result) {
			//json 타입에서 array로 변환
			let resultArray = JSON.parse(result);
			
			//결과테이블 수정
			const resultTbodyTag = document.querySelector('.resultTbodyTag');
				resultTbodyTag.replaceChildren();
			
			//테이블 그리기 시작			
			str = '';
			for(const i of resultArray){
				str += `<tr>`;
				str += `<td><img src="/img/item/itemImg/${i.ITEM_IMG_ATTACHED_NAME}"></td>`
				str += `<td>`;
				str += `<div>${i.DEP_DATE}</div>`;
				str += `<div>${i.ARR_DATE}</div>`;
				str += `</td>`;
				str += `<td>${i.TRAVER_PERIOD}</td>`;
				str += `<td>${i.ITEM_TITLE}</td>`;
				str += `<td>${i.ITEM_PRICE}</td>`;
				str += `<td>${i.STATUS_NAME}</td>`;
				str += `</tr>`;
			}
			document.querySelector('.resultTbodyTag').insertAdjacentHTML('afterbegin',str);
			
		},
		error: function() {
			alert('실패');
		}
	});
}




//날짜형식변환 함수
function getDate123(dateString){
	const year = dateString.substr(0, 4);
	const month = dateString.substr(4, 2) - 1;
	const day = dateString.substr(6, 2);
	
	const date = new Date(year, month, day);
	const formattedDate = date.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\./g, '-');
	return formattedDate;
}
