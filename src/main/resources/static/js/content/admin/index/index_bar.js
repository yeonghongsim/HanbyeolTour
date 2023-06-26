
init()





function init(){
	getReviewData();
	
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
				<td>등록된 리뷰 수 :</td>
				<td>${reviewData['TOTAL_REVIEW_CNT']} 건</td>
			</tr>
			<tr>
				<td>리뷰 평균 길이 :</td>
				<td>${reviewData['AVG_LENGHT'].toString().slice(0, 3)} 글자</td>
			</tr>
			<tr>
				<td>리뷰 최대 길이 :</td>
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
		backgroundColor: ['#ffd950', '#02bc77'],//라벨별 컬러설정
		borderColor: '#22252B',
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