getCateChartDataAJAX();

//차트 데이터 받아오는 ajax
function getCateChartDataAJAX(){
	
	const year = document.querySelector('#yearSelect').value;
	
	//ajax start
	$.ajax({
		url: '/admin/getCateChartDataAJAX', //요청경로
		type: 'post',
		data: {'year' : year}, //필요한 데이터
		async : true, //default 
		contentType: "application/x-www-form-urlencoded; charset=UTF-8", //default 방식
		success: function(result) {
			console.log(result);//배열로 받아옴.
			
			//차트 그리기
			drawChart(result[0]);
			drawKindChart(result[1]);
			
		},
		error: function() {
			alert('실패');
		}
	});
//ajax end

}

function drawChart(data){
	
	const cate_name_arr = [];
	const sum_buy_cnt_arr = [];
	
	for(let i = 0; i < data.length ; i++){
		cate_name_arr[i] = data[i]['AREA_KOR_NAME'];
		sum_buy_cnt_arr[i] = data[i]['SUM_BUY_CNT'];
	}
	
	const ctx = document.getElementById('cateChart');
	
	new Chart(ctx, {
		type: 'doughnut',
		data: {
			labels: cate_name_arr, //카테고리명 
			datasets: [
				{
					label: '판매 수', //차트 범례
					data: sum_buy_cnt_arr,  //카테고리별(여행국가별) 판매 수
					backgroundColor: [
						"rgba(153, 206, 206, 0.5)",
						"rgba(255, 201, 14, 0.5)",
						"rgba(255, 177, 193, 0.5)",
						"rgba(154, 208, 245, 0.5)",
		    		],
				}
			]
			
		},
		options: {
			responsive: true,
			plugins: {
				legend: {
					position: 'right',
				},
				title: {
					display: true,
					text: '여행국가별 판매 수'
				}
			}
		},
	});
}

function drawKindChart(data){
	
	const kind_arr = [];
	const buy_cnt_arr = [];
	
	for(let i = 0; i < data.length ; i++){
		kind_arr[i] = data[i]['CATE'];
		buy_cnt_arr[i] = data[i]['BUY_CNT'];
	}
	
	const ctx = document.getElementById('cateChart1');
	
	new Chart(ctx, {
		type: 'doughnut',
		data: {
			labels: kind_arr, //카테고리명 
			datasets: [
				{
					label: '판매 수', //차트 범례
					data: buy_cnt_arr,  //예약 종류별 판매 수
					backgroundColor: [
						"rgba(153, 206, 206, 0.5)",
						"rgba(255, 201, 14, 0.5)",
						"rgba(255, 177, 193, 0.5)",
						"rgba(154, 208, 245, 0.5)",
		    		],
				}
			]
			
		},
		options: {
			responsive: true,
			plugins: {
				legend: {
					position: 'right',
				},
				title: {
					display: true,
					text: '예약 종류별 판매 수'
				}
			}
		},
	});
}



//select 박스 년도 변경 시 차트 다시 그리기
function getChart(){
	
	const year = document.querySelector('#yearSelect').value;
	location.href = `/admin/salesStatisticsByCategory?year=${year}`;
}
