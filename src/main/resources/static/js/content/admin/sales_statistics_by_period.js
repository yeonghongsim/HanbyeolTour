getChartDataAJAX();

//차트 그릴 데이터 가져오는 ajax
function getChartDataAJAX(){
	
	const year = document.querySelector('#yearSelect').value;
	
	//ajax start
	$.ajax({
		url: '/admin/getChartDataAJAX', //요청경로
		type: 'post',
		data: {'year' : year}, //필요한 데이터
		async : true, //default 
		contentType: "application/x-www-form-urlencoded; charset=UTF-8", //default 방식
		success: function(result) {
			
			console.log(result);
			
			//데이터 받아온 후 차트 그려주기.
			//차트 그리는 함수
			drawContrastChart(result); //받아온 데이터 매개변수로 사용
			drawthisYearChart(result);
			drawQuarterSaleChart(result);
			
		},
		error: function() {
			alert('실패');
		}
	});
//ajax end

}

//차트 그리기
function drawContrastChart(data) {
	
const ctx = document.getElementById('myChart');

	//차트 데이터
	new Chart(ctx, { 
		
		type: 'line',
		data: {
			labels: ['1월', '2월', '3월', '4월', '5월', '6월',
		      		'7월', '8월', '9월', '10월', '11월', '12월'],
			datasets: [
				{
					label: '당해년도 매출',
					data: data['thisYearSaleList'],
					fill: true,
					tension: 0.6,
					borderColor: "rgba(255, 201, 14, 1)",
	           		backgroundColor: "rgba(255, 201, 14, 0.5)",
				},
				{
					label: '작년 매출',
					data: data['lastYearSaleList'],
					fill: true,
					tension: 0.6,
					
					
				}
			]	
		},
		options: {
			plugins: {
				filler: {
					propagate: false,
				},
				title: {
					display: true,
					text: (ctx) => '당해년도 / 작년 매출 비교 그래프'
				},
				legend: {
					position: 'top',
				},
			},
			interaction: {
				intersect: false,
			}
		},
	});
}

//당해년도 차트 그리기
function drawthisYearChart(data){
	
	const ctx = document.getElementById('myChart1');
	
	//차트 데이터
	new Chart(ctx, {
	    type: 'bar',
	    data: {
	      labels: ['1월', '2월', '3월', '4월', '5월', '6월',
	      			'7월', '8월', '9월', '10월', '11월', '12월'],  //차트의 x축
	      datasets: [ //[ ]로 감싸면 여러개의 차트 표현 가능. { }하나 = 차트 하나.
	      	{	
		        label: '판매 건수',
		        data: data['thisYearCntList'], //월별 판매건수
		        borderWidth: 2,
		        yAxisID: 'y', //차트와 연결되는 y축
		        borderColor: "rgba(255, 176, 100, 1)",
		        backgroundColor: "rgba(255, 207, 159, 0.5)",
	      	}
	      ]
	    },
	    options: {
			plugins: {
				title: {
					display: true,
					text: (ctx) => '당해년도 월별 판매량'
				},
				legend: {
					position: 'bottom',
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

//분기별 매출 차트 그리기
function drawQuarterSaleChart(data){
	
	const ctx = document.getElementById('myChart2');

	//차트
	new Chart(ctx, {
		type: 'polarArea',
		data: {
			labels: ['1분기', '2분기', '3분기', '4분기'],
			datasets: [
				{
					data: data['quarterSaleList'],
					backgroundColor: [
						"rgba(255, 201, 14, 0.5)",
						"rgba(255, 177, 193, 0.5)",
						"rgba(154, 208, 245, 0.5)",
						"rgba(153, 206, 206, 0.5)",
					]
				}
			]

		},
		options: {
			responsive: true,
			scales: {
				r: {
					pointLabels: {
						display: true,
						centerPointLabels: true,
						font: {
							size: 12
						}
					}
				}
			},
			plugins: {
				legend: {
					position: 'bottom',
				},
				title: {
					display: true,
					text: '분기별 매출 현황'
				}
			}
		},
		
	})
	
}

//select 박스 년도 변경 시 차트 다시 그리기
function getChart(){
	
	const year = document.querySelector('#yearSelect').value;
	location.href = `/admin/salesStatisticsByPeriod?year=${year}`;
}
