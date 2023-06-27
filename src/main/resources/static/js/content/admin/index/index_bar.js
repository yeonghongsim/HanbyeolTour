
init()





function init(){
	getReviewData();
	getChartStatisticsAJAX();
}

function goReserv(){
	
	location.href='/admin/reservationInquiry?buyStatusCode=1'
	
}

function goDiyReserv(){
	
	location.href='/admin/diyReservation?buyStatusCode=1'
	
}

function goCancle(){
	
	location.href='/admin/reservationInquiry?buyStatusCode=3'
}


function goDiyCancle(){
	
	location.href='/admin/diyReservation?buyStatusCode=3'
}	

function getReviewData(){

	$.ajax({
		url: '/adminIndex/getReviewData', //요청경로
		type: 'post',
		//contentType : 'application/json; charset=UTF-8',
		contentType : "application/x-www-form-urlencoded; charset=UTF-8",
		async : true,
		data: {},
		success: function(result) {

			drawTable(JSON.parse(result));
			console.log(result);
		},
		error: function() {
			alert('실패');
		}
	});

}

function drawTable(reviewData){
	//긍부정테이블
	const posTable = document.querySelector('.posTable > tbody');
	const nagTable = document.querySelector('.nagTable > tbody');
	const dataTable = document.querySelector('.dataTable > tbody');

	let str = '';
	str = `
			<tr>
				<td>등록된 리뷰 수 </td>
				<td>${reviewData['TOTAL_REVIEW_CNT']} 건</td>
			</tr>
			<tr>
				<td>리뷰 평균 길이 </td>
				<td>${reviewData['AVG_LENGHT'].toString().slice(0, 3)} 글자</td>
			</tr>
			<tr>
				<td>리뷰 최대 길이 </td>
				<td>${reviewData['MAX_LENGHT']} 글자</td>
			</tr>
			<tr>
				<td>마지막 업데이트</td>
				<td>${reviewData['REG_DATE']}</td>
			</tr>
	`;
	posTable.insertAdjacentHTML('afterbegin', reviewRanking(reviewData['POS_WORD']));
	nagTable.insertAdjacentHTML('afterbegin', reviewRanking(reviewData['NEG_WORD']));
	dataTable.insertAdjacentHTML('afterbegin', str);
	//챠트그리기
	drawReviewChart(reviewData['POS_PERCENT'].slice(0, 3), reviewData['NEG_PERCENT'].slice(0, 3));
}

function drawReviewChart(posPercent, nagPercent){

	let dataset = {
		label: "",
		backgroundColor: ['rgba(154, 208, 245, 0.5)', 'rgba(255, 177, 193, 0.5)'],//라벨별 컬러설정
		data: [posPercent, nagPercent]
	}

	let labels=['긍정리뷰','부정리뷰'];

	let datasets={ datasets:[dataset], labels:labels }

	let config = {
		type: 'pie',
		data: datasets, //데이터 셋
		options: {
			responsive: true,
			maintainAspectRatio: false, //true 하게 되면 캔버스 width,height에 따라 리사이징된다.
			legend: {
				position: 'top',
				fontColor: 'black',
				align: 'center',
				display: true,
				fullWidth: true,
				reverse: true,
				labels: {
					fontColor: 'rgb(0, 0, 0)'
				},
			},
			plugins: {
				labels: {//두번째 script태그를 설정하면 각 항목에다가 원하는 데이터 라벨링을 할 수 있다.
					render: 'value',
					fontColor: 'black',
					fontSize: 12,
					precision: 2
				}

			},
		}
	}
	const ctx = document.getElementById('reviewChart');
	let pieChart = new Chart(ctx,config);

}


//긍부정 단어 데이터가공
function reviewRanking(words){

	let splitResult = [];
	words.split(',').forEach(word =>{
		splitResult.push(word.split('='));
	});
	console.log(splitResult);
	let resultStr = '';
	splitResult.forEach((data, index) => {

		resultStr += `
			<tr>
				<td>${index+1}</td>
				<td>${data[0]}</td>
				<td>${data[1]}</td>
			</tr>
		`;
	});
	return resultStr;
}




//리뷰분석데이터 업데이트
function updateReviewData(){

	if(!confirm('파이썬 서버가 실행되고 있는지 확인하세요')){
		return;
	}

	$.ajax({
		url: '/review/reviewAJAX', //요청경로
		type: 'post',
		//contentType : 'application/json; charset=UTF-8',
		contentType : "application/x-www-form-urlencoded; charset=UTF-8",
		async : true,
		data: {},
		success: function(result) {
			alert("업데이트 성공");

		},
		error: function() {
			alert('실패');
		}
	});

	location.reload();

}


// 중단 이후 한눈에 확인하기 영역
// 메인 셀렉트 박스에 따라 서브 셀렉트 박스 값 변경
function chkMainSelect(mainSlcVal){
	const sub_select = document.querySelector('.sub_select');
	sub_select.replaceChildren();
	let options = '';
	
	
	if(mainSlcVal.value == 'member'){
		
		options += `<option value="M/F">전체 이용자 중 남/여 비율</option>`;
		options += `<option value="insited">전체 이용자 중 이용률 ( 이용, 휴면, 탈퇴 )</option>`;
		
		sub_select.insertAdjacentHTML('afterbegin', options);
		
	} else if(mainSlcVal.value == 'board'){

		options += `<option value="boardType">분포도 (공지글, 비밀글, 문의글)</option>`;
		options += `<option value="boardCnt">조회수</option>`;
		
		sub_select.insertAdjacentHTML('afterbegin', options);
	} else if(mainSlcVal.value == 'request'){

		options += `<option value="requestType">카테고리별 문의 비율</option>`;
		options += `<option value="isAnswer">문의별 답변 여부 비율</option>`;
		
		sub_select.insertAdjacentHTML('afterbegin', options);
	}
	
}
// 통계 데이터 시각화
function getChartStatisticsAJAX(){
	const main_key = document.querySelector('.main_select').value;
	const sub_select = document.querySelector('.sub_select');
	const sub_key = sub_select.options[sub_select.selectedIndex].text;
	const search_value = sub_select.options[sub_select.selectedIndex].value;
	
	console.log(search_value);
	
	//ajax start
	$.ajax({
		url: '/adminIndex/getChartDataAJAX', //요청경로
		type: 'post',
		async: true, // 동기방식(Ajax사용), false == 비동기방식
		//contentType: 'application/json; charset=UTF-8',
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		//필요한 데이터
		// 위의 데이터를 자바가 인식 가능한 json 문자열로 변환
		data: {'mainKey' : main_key
				, 'subKey' : sub_key
				, 'searchValue' : search_value},
		success: function(result) {
			
			keyList = Object.keys(result);
			valueList = Object.values(result);
			
			let totalAmount = 0;
			valueList.forEach(function(value){
				totalAmount += value;
			});
			
			data = {
				'keyList' : keyList
				, 'valueList' : valueList 
			}
			
			drawChart_statistics(data, sub_key);
			drawTable_statistics(data, totalAmount);
			
		},
		error: function() {
			alert('실패');
		}
	});
   //ajax end
	
}
// 데이터 시각화 - 차트 영역
function drawChart_statistics(data, sub_key){
	
	const chart_area = document.querySelector('.chart_area');
	let chart_div = '';
	chart_area.replaceChildren();
	
	chart_div += `<div>`;
	chart_div += `	<canvas id="pieChart_statistics"></canvas>`;
	chart_div += `</div>`;
	
	chart_area.insertAdjacentHTML('afterbegin', chart_div);
	
	
	const ctx = document.querySelector('#pieChart_statistics');
	new Chart(ctx, {
		type: 'pie',
		data: {
			labels: data.keyList,
			datasets: [
				{
					label: 'Dataset 1',
					data: data.valueList,
					backgroundColor: ['rgba(215, 176, 229, 0.5)', 'rgba(251, 231, 135, 0.5)'
										, 'rgba(218, 224, 207, 0.5)', 'rgba(191, 223, 216, 0.5)'
										, 'rgba(218, 229, 235, 0.5)', 'rgba(243, 174, 144, 0.5)'],//라벨별 컬러설정
				}
			]
		},
		options: {
			responsive: true,
			plugins: {
				legend: {
					position: 'top',
				},
				title: {
					display: true,
					text: sub_key
				}
			}
		}
	});	
	
}
// 데이터 시각화 - 테이블 영역
function drawTable_statistics(data, totalAmount){
	const data_area = document.querySelector('.data_area');
	
	// 데이터 뿌리기
	data_area.replaceChildren();
	
	let data_table = '';
	
	data_table += `<table class="table text-center statistics_table">`;
	data_table += `	<colgroup>`;
	data_table += `		<col width="35%">`;
	data_table += `		<col width="65%">`;
	data_table += `	</colgroup>`;
	data_table += `	<tbody>`;
	data.keyList.forEach(function(value, idx){
	data_table += `		<tr>`;
	data_table += `			<td>${value}</td>`;
	data_table += `			<td>${data.valueList[idx]} / ${(data.valueList[idx] / totalAmount * 100).toFixed(2)}%</td>`;
	data_table += `		</tr>`;
	});
	data_table += `		<tr>`;
	data_table += `			<td>Total</td>`;
	data_table += `			<td>${totalAmount}</td>`;
	data_table += `		</tr>`;
	data_table += `	</tbody>`;
	data_table += `</table>`;
	
	data_area.insertAdjacentHTML('afterbegin', data_table);
}



