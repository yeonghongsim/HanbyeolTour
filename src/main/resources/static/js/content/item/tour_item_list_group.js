
init();

function clicktoday(index){
	const calTableTags = document.querySelectorAll('.calTableTag');
	const dateTds = calTableTags[index].querySelectorAll('.dateTd');
	date = new Date();
	const nowDate = date.getDate();

	dateTds.forEach(td => {

		td.textContent == nowDate ? td.click() : null
	});
}



//일자별상품조회 달력
function getSearchByGroupTable(idx, e){
	//년 월 정보가 세팅될 태그
	const yearSpanTag = document.querySelectorAll('.yearSpan');
	const monthSpanTag = document.querySelectorAll('.monthSpan');
	//테이블 그릴 위치
	const calTableTag = document.querySelectorAll('.calTableTag');
	const dateDivTag = document.querySelectorAll('.dateDiv');
	const dateDivTags = document.querySelectorAll('.dateDiv > div');
	const selectYear = document.querySelectorAll('.dateDiv');

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
	for(const year of selectYear[idx].querySelectorAll('.yearSpan')){
		year.textContent = nowYear + '년';
	}

	let i = 0;
	for(const month of selectYear[idx].querySelectorAll('.monthSpan')){
		month.textContent = (parseInt(nowMonth) + i) + '월';
		i++;
	}

	//년도 월이 있는 span태그로 조회시 달력 변경
	if(e != null){
		let monthData = e.querySelector('.monthSpan').textContent;
		nowMonth = monthData.replace('월', '');
	}
	//이번달 마지막 날짜 조회
	const getDate = new Date(nowYear, nowMonth, 0);
	const lastDate = getDate.getDate();
	let drawCalTable ='';

	//요일 설정
	let getDays = [];
	
	for(let i = 0; i < lastDate;i++){
		
		getDays.push(new Date(nowYear, nowMonth-1, i+1).getDay());
	}
	
	//요일 테이블
	drawCalTable += `<tr>`
	for(let i = 0; i < lastDate; i++){
		
		if(parseInt(getDays[i]) == 0){
			drawCalTable += `<td class="px-0 py-0 rounded-5" style='background-color: #FB9079; width: 25px;'>${dayName[getDays[i]]}</td>`
		}
		else if(parseInt(getDays[i]) == 6){
			drawCalTable += `<td class="px-0 py-0 rounded-5" style='background-color: #79B6FB; width: 25px;'>${dayName[getDays[i]]}</td>`
		}
		else{
			drawCalTable += `<td class="px-0 py-0" style="width: 25px;">${dayName[getDays[i]]}</td>`
		}
	}
	drawCalTable += `</tr>`	
	
	//날짜테이블
	drawCalTable += `<tr>`
	
	for(let i = 0; i < lastDate; i++){
		drawCalTable += `<td style="cursor: pointer; width: 21px;" class="px-0 py-0 dateTd rounded-5" onclick="getSearchByGroupAJAX(${nowYear}, ${nowMonth} , ${i+1}, this);">${i+1}</td>`
	}
	drawCalTable += `</tr>`
	
	//테이블 html에 넣기
	calTableTag[idx].insertAdjacentHTML('afterbegin', drawCalTable);

	if(e != undefined){
		//선택한 div 색칠하기
		dateDivTags.forEach(date => {
			date.classList.remove('gr-bc');
		});
		e.classList.add('gr-bc');
	}
}

//달력의 날짜 클릭시 검색결과
function getSearchByGroupAJAX(year, month, date, e){

	//현재지역 가져오기
	//const area_name = document.querySelector('#areaName').value;
	//아이템코드 가져오기
	const item_code = e.parentNode.parentNode.parentNode.parentNode.querySelector('input').value;
	//결과표가 그려질 자리
	const resultTbodyTag = e.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.querySelector('.resultTbodyTag');
	//검색할 년 월 정보 가져오기
	const search_date = new Date(year + '-' +  month + '-' + date);

	let dateTds = document.querySelectorAll('.dateTd');
	dateTds.forEach((td, index) => {
		td.style.backgroundColor = '#ffffff';
	});
	e.style.backgroundColor = '#ffd000';

	$.ajax({
		url: '/item/tourItemListGroupAJAX', //요청경로
		type: 'post',
		//contentType : 'application/json; charset=UTF-8',
		//contentType : "application/x-www-form-urlencoded; charset=UTF-8",
		//async : true,
		data: {'searchDate': search_date ,'itemCode': item_code},
		success: function(result) {
			//json 타입에서 array로 변환
			let resultArray = JSON.parse(result);
			//결과테이블 수정
			resultTbodyTag.replaceChildren();
			//테이블 그리기 시작
			let str = '';
			for(const i of resultArray){
				str += `<tr>`;
				str += `<td>${i['DEP_DATE']}</td>`;
				str += `<td>${i['ARR_DATE']}</td>`;
				str += `<td>${i['TRAVER_PERIOD']}</td>`;
				str += `<td style="cursor: pointer;" onclick="location.href='/item/tourItemListDetail?departDate=${i.DEP_DATE}&arriveDate=${i.ARR_DATE}&itemCode=${i.ITEM_CODE}'">상세정보보기</td>`;
				str += `</tr>`;
			}

			// <a href="/item/tourItemListDetail?departDate=${i["DEP_DATE"]}&arriveDate=${i["ARR_DATE"]}&itemCode=${i["ITEM_CODE"]}">

			resultTbodyTag.insertAdjacentHTML('beforeend',str);
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


//국가선택시 색상강조
function init(){

	document.querySelector('.areaCate').classList.add("ye-S-fc");

	const areaNameDivs  = document.querySelectorAll('.areaNameDiv');
	const areaName = document.querySelector('#areaName').value;

	areaNameDivs.forEach(div => {

		if(div.innerText == areaName){
			div.classList.add('ye-S-bc');
		}
	});
}