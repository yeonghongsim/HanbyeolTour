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
			drawKindSalesChart(result[2]);
			
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
			maintainAspectRatio: false,
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
						"rgba(252, 189, 134, 0.5)",
						"rgba(206, 190, 251, 0.5)",
						"rgba(238, 251, 190, 0.5)",
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


function drawKindSalesChart(data){
	
	const basic_arr = [];
	const diy_arr = [];

	//일반 매출
	const basic_sales = data[0];
	for (const key in basic_sales) {

		const value = basic_sales[key];
		basic_arr.push(value);

	}   
	//div 매출
	const diy_sales = data[1];
	for (const key in diy_sales) {

		const value = diy_sales[key];
		diy_arr.push(value);

	}   


	console.log(basic_arr)
	console.log(diy_arr)
	
	
	const ctx = document.getElementById('kindSalesChart');
	
	//차트 데이터
	new Chart(ctx, {
		type: 'bar',
		data: {
			labels: ['1월', '2월', '3월', '4월', '5월', '6월',
				'7월', '8월', '9월', '10월', '11월', '12월'],  //차트의 x축
			datasets: [
				{
					label: '일반 예약',
					data: basic_arr,
					borderWidth: 2,
					borderColor: "rgba(54, 158, 235, 0.8)",
					backgroundColor: "rgba(154, 208, 245, 0.5)",
				},
				{
					label: 'Diy 예약',
					data: diy_arr,
					borderWidth: 2,
					borderColor: "rgba(83, 172, 172, 0.8)",
					backgroundColor: "rgba(153, 206, 206, 0.5)",
				}
			],
			},
			options: {
				plugins: {
				title: {
					display: true,
					text: (ctx) => '예약 종류별 월 매출액'
				},
				legend: {
					position: 'right',
				},
			},
	      scales: {
	        y: { 
	          beginAtZero: true,
	          type: 'linear',
	          display: true,
	          position: 'left' //y축의 왼쪽
	        }
	      }
	    }
	  });
	
	
	
}


//select 박스 년도 변경 시 차트 다시 그리기
function getChart(){
	
	const year = document.querySelector('#yearSelect').value;
	location.href = `/admin/salesStatisticsByCategory?year=${year}`;
}
