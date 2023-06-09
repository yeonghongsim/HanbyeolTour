init();

//페이지가 로딩될때 실행될 자바스크립트
function init (){
	//달력테이블 그리기
	getSearchByDateTable();
	//setArrDepDate();
}



//일자별상품조회 달력
function getSearchByDateTable(month){
	
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
	let nowYear = date.getFullYear();
	let nowMonth = date.getMonth() + 1;
	const nowDate = date.getDate() + 1;
	const nowDay = date.getDay();
	const dayName = ['일', '월', '화', '수', '목','금','토'];
	let monthSpanTagVal = nowMonth;
	
	//이번달 다음달 조회
	if (month != null && month == 'prev') {
		month = -1;
		nowYear = parseInt(yearSpanTag.textContent);
	}
	else if (month != null && month == 'next') {
		month = 1;
		nowYear = parseInt(yearSpanTag.textContent);
	}
	
	
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
		drawCalTable += `<td class="dateTd px-0 py-0 rounded-5" onclick="getSearchByDateAJAX(${i+1});">${i+1}</td>`
	}
	drawCalTable += `</tr>`
	
	//테이블 html에 넣기
	searchByDateCal.insertAdjacentHTML('afterbegin', drawCalTable);
	 
}

//달력의 날짜 클릭시 검색결과
function getSearchByDateAJAX(getDate){

	//날짜태그 전체 가져오기
	const dateTds = document.querySelectorAll('.dateTd');
	dateTds.forEach((td, index) => {

		console.log(getDate, index+1);

		td.style.backgroundColor = '#ffffff';

		if(getDate == index+1){

			td.style.backgroundColor = '#ffd000';
		}

	});

	//현재지역 가져오기
	const areaName = document.querySelector('#areaName').value;
	
	//검색할 년 월 정보 가져오기
	const getYear = document.querySelector('#yearSpan').textContent;
	const getMonth = document.querySelector('#monthSpan').textContent;

	const formattedNumber = new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' })
	
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
			const rusultDiv = document.querySelector('.rusultDiv');
			rusultDiv.replaceChildren();
			
			//테이블 그리기 시작			
			let str = '';
			for(const i of resultArray){

			str += `
				<h3 class="text-center mt-5">${i["ITEM_TITLE"]}</h3>
				<div class="row rounded-5 mx-5 mb-5 border custom-border-3 shadow" style="cursor: pointer;"
					 onclick="location.href='/item/tourItemListDetail?departDate=${i['DEP_DATE']}&arriveDate=${i['ARR_DATE']}&itemCode=${i['ITEM_CODE']}'">
					<div class="col-6 px-0 mx-0 rounded-5">
						<img style="display: block; width: 100%;" class="rounded-start-5" src="/img/item/itemImg/${i['ITEM_IMG_ATTACHED_NAME']}">
					</div>
					<div class="col-6 d-flex align-items-center">
						<table
							class="table align-middle py-0 d-flex align-items-center justify-content-center text-center">
							<tr>
								<td>여행국가 :</td>
								<td>${i["AREA_KOR_NAME"]}</td>
							</tr>
							<tr>
								<td>여행기간 :</td>
								<td>${i["TRAVER_PERIOD"]}</td>
							</tr>
							<tr>
								<td>출발예정 :</td>
								<td>${i["DEP_DATE"]}</td>
							</tr>
							<tr>
								<td>도착예정 :</td>
								<td>${i["ARR_DATE"]}</td>
							</tr>
							<tr>
								<td>결제금액 :</td>
								<td>${formattedNumber.format(i["ITEM_PRICE"])}원</td>
							</tr>
						</table>
					</div>
				</div>
				`;
			}
			document.querySelector('.rusultDiv').insertAdjacentHTML('afterbegin',str);
			
		},
		error: function() {
			alert('실패');
		}
	});
}
//const formattedNumber = new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(number);

function setArrDepDate(){
	
	const dateTr = document.querySelectorAll('.searchResultByDate');
	let nowYear = date.getFullYear();
	let nowMonth = date.getMonth() + 1;
	let nowDate = date.getDate();
	const endDate = document.querySelector('#endDate').value;
	
	//출발일
	const depDate = '<td><div>' + nowYear + '년' + nowMonth + '월' + nowDate + '일</div>';
	
	//도착일
	let arrDate = parseInt(nowDate) + parseInt(endDate);
	
	const getDate = new Date(nowYear, nowMonth, 0);
	const lastDate = getDate.getDate();
	
	//이번달 마지막날짜를 넘을때 년 월 정보 변경
	if(arrDate > lastDate){
		arrDate = 0 + endDate;
		nowMonth += 1;
		
		if(nowMonth > 12){
			nowMonth = 1;
			nowYear = nowYear + 1;
		}
	}
	arrDate = '<div>' + nowYear + '년' + nowMonth + '월' + arrDate + '일' + '</div></td>';
	
	for(let i = 0; i < dateTr.length; i++){
		dateTr[i].insertAdjacentHTML('afterbegin', depDate + arrDate);
	}
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



document.querySelector('.dateCate').classList.add("ye-S-fc");