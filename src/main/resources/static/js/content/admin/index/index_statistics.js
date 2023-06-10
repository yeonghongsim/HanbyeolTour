init();

getChartDataAJAX();

function chkMainSelect(mainSlcVal){
	const sub_select = document.querySelector('.sub_select');
	sub_select.replaceChildren();
	let options = '';
	
	
	if(mainSlcVal.value == 'member'){
		
		options += `<option value="M/F">전체 이용자 중 남/여 비율</option>`;
		options += `<option value="insited">전체 이용자 중 이용률 ( 이용, 휴면, 탈퇴 )</option>`;
		
		sub_select.insertAdjacentHTML('afterbegin', options);
		
	} else if(mainSlcVal.value == 'item'){

		options += `<option value="sellingItems">카테고리별 판매 중 인 상품 비율</option>`;
		
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

function getChartDataAJAX(){
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
			
			drawChart(data, sub_key);
			drawTable(data, totalAmount);
			
		},
		error: function() {
			alert('실패');
		}
	});
   //ajax end
	
}

function drawChart(data, sub_key){
	
	const chart_area = document.querySelector('.chart_area');
	let chart_div = '';
	chart_area.replaceChildren();
	
	chart_div += `<div>`;
	chart_div += `	<canvas id="pieChart"></canvas>`;
	chart_div += `</div>`;
	
	chart_area.insertAdjacentHTML('afterbegin', chart_div);
	
	
	const ctx = document.querySelector('#pieChart');
	new Chart(ctx, {
		type: 'pie',
		data: {
			labels: data.keyList,
			datasets: [
				{
					label: 'Dataset 1',
					data: data.valueList,
					//backgroundColor: Object.values(Utils.CHART_COLORS),
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

function drawTable(data, totalAmount){
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




function init(){

}