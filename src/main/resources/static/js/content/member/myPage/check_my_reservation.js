


// 예약 내역 조회 - 날짜 데이터 선택 제약사항 
const fromDateInput = document.querySelector('#fromDate');
const toDateInput = document.querySelector('#toDate');

toDateInput.addEventListener('change', function() {
    const fromDateValue = new Date(fromDateInput.value);
    const toDateValue = new Date(toDateInput.value);

    if (toDateValue < fromDateValue) {
        alert('종료일자는 시작일자보다 크게 선택하여 주세요!');
        toDateInput.value = ''; // Clear the invalid value
    }
});


// 기간별 검색 버튼 클릭시 실행 
function get_buy_list(month) {
  // 특정 태그 선택 
  const monthForm = document.querySelector('#month-form');
  const fromDateInput = document.querySelector('#fromDate');

  monthForm.querySelector('input').value = month;
  
  // 검색조건 날짜 - 이전 날짜 
  const previousDate = calculatePreviousDate(month);
  const formattedDate = formatDate(previousDate);

  fromDateInput.value = formattedDate;
  console.log("변환된 날짜 : " + formattedDate);
  
  //검색 조건 상태 코드 가져오기
  const searchStatusCode = document.querySelector('#searchStatusCode').value;
  
  
	//ajax start
	$.ajax({
	   url: '/myPage/getUpdatedTableDataAJAX', //요청경로
	   type: 'post',
	   async: true, // 비동기 , 동기 설정
	   contentType: 'application/x-www-form-urlencoded; charset=UTF-8', // default
	   data: {
			'month':month,
			'searchStatusCode':searchStatusCode
			}, //필요한 데이터
	   success: function(responseMap) {
	     	//기존 테이블 그림 삭제 
			const table = document.querySelector('.table-reservation')
			const tableBody = table.querySelector('tbody');
			if (tableBody) {
			  tableBody.replaceChildren();
			}
						
			const buyList = responseMap.buyList; // Retrieve buyList from responseData
	        const buyStatusCodeCountList = responseMap.buyStatusCodeCountList; // Retrieve buyStatusCodeCountList from responseData
					 
			let str = ``;
			
			str = `<colgroup>
						<col width="10%">
						<col width="10%">
						<col width="*">
						<col width="5%">
						<col width="15%">
						<col width="15%">
						<col width="10%">
						<col width="10%">
					</colgroup>
					<thead class="text-center">
						<tr>
							<td>결제일자</td>
							<td>여행국가</td>
							<td>상품</td>
							<td>인원</td>
							<td>출발일자</td>
							<td>도착일자</td>
							<td>결제금액</td>
							<td>상태</td>
						</tr>
					</thead>`;
			
		    if (buyList.length == 0) {
		    str += `<tr class="text-center">
		                <td colspan="8">
		                    <br><br><br>
		                    <div style="font-size: 4rem; color: #bbb;">
		                        <i class="bi bi-exclamation-circle"></i>
		                    </div>
		                    <div>
		                        기간내 예약내역이 없습니다.
		                    </div>
		                    <br><br><br>
		                </td>
		            </tr>`;
		    } 
		    else {
		        buyList.forEach(function (buy) {
				const buyDetail = buy.buyDetailVO;
	            str += `<tr>
	                       <td class="text-center">
	                            <div style="color: #131518; font-weight:bolder;">${buy.buyDate}</div>
					            <div style="color: #ffd000;">${buy.buyCode}</div>
					            <div>
					            	<a href="/myPage/reservationDetail?buyCode=${buy.buyCode}"><span style="font-size: 0.9rem; text-decoration:underline;">상세보기</span></a>
					            </div>
	                        </td>
	                        <td class="text-center" style="font-weight: 700; font-weight: bolder;">${buyDetail.itemVO.tourAreaVO.areaKorName}</td>
	                        <td>
	                            <img src="/img/item/itemImg/${buyDetail.itemVO.imgList[0].itemImgAttachedName}" style="width: 85px; height: 85px;">
	                            <span style="color: #333; word-spacing: -1px;">${buyDetail.itemVO.itemTitle}</span>
	                        </td>
	                        <td>${buyDetail.reservedPeopleNum}</td>
	                        <td>${buyDetail.departDate}</td>
	                        <td>${buyDetail.arriveDate}</td>
	                        <td style="color: #f27370;">
	                            ${buyDetail.buyDPrice.toLocaleString()} 원
	                        </td>
	                        <td>
	                            <div>
	                                <span id="statusCode" style="font-weight: bolder;">${buy.buyStateVO.buyStatusName}</span>
	                            </div>
	                            <div id="reviewBtn">
	                                <button class="btn btn-outline-secondary btn-sm mt-2 reviewBtn" ${buy.buyStateVO.buyStatusCode == 1 ? '' : 'style="display:none;"'} onclick="cancel_reservation('${buy.buyCode}')">예약취소</button>
	                            </div>
	                            <div id="cancelBtn">
	                                <button class="btn btn-outline-secondary btn-sm mt-2 cancelBtn" ${buy.buyStateVO.buyStatusCode == 2 ? '' : 'style="display:none;"'}>리뷰작성</button>
	                            </div>
	                        </td>
	                    </tr>`;
	        });
	    }
	
	    table.innerHTML = str;
	    
	    // 상단바 선택해서 글씨 내용 지워주고, 다시 내용 채워 넣어주기.
	    
	    const countBox = document.querySelector('.content-box');	    
	    //countBox.querySelector('a').replaceChildren();
	    const countLink = countBox.querySelector('ul');
		if (countLink) {
		  countLink.replaceChildren();
		}
	    
	    let str_second = ``;
	    
	    str_second += `<ul class="my-page-step">`;
	    buyStatusCodeCountList.forEach(function (buyStatus) {
	    str_second += `<li>
	            <em class="num">${buyStatus.buyStatusCount}</em>
	            <span>${buyStatus.buyStatusName}</span>
	          </li>`;
		});
		str_second += `</ul>`;

		countBox.innerHTML = str_second;
	     		     	
	   },
	   error: function() {
	      alert('실패');
	   }
	});
	//ajax end
  
}




// 이전 날짜 계산 
function calculatePreviousDate(monthsToSubtract) {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // 오늘 날짜의 시간을 00:00:00으로 설정
  
  const previousDate = new Date();
  previousDate.setHours(0, 0, 0, 0); // 이전 날짜의 시간을 00:00:00으로 설정
  
  previousDate.setMonth(previousDate.getMonth() + monthsToSubtract);
  
  return previousDate;
}

// 날짜 형식 변환 
function formatDate(date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
}



//페이징 버튼을 눌렀을때 페이지 이동 가능 
function get_buy_list_paging(pageNum){
	//히든타입의 nowPage 데이터 넘기는 태그의 value에 받은 pageNum데이터를 넣어줌 
	document.querySelector('#nowPage').value = pageNum;
	

}


// 예약 취소 버튼 
function cancel_reservation(buyCode){
	// Confirmation
	const result = confirm(`정말 예약을 취소하시겠어요?`);
	
	if(result){
		// 상태코드 
		const searchStatusCode = document.querySelector('#searchStatusCode').value;
		// 검색 조건 날짜 
		const fromDate = document.querySelector('#fromDate').value;
		const toDate = document.querySelector('#toDate').value;
				
		//ajax start
		$.ajax({
		   url: '/myPage/cancelReservationAJAX', //요청경로
		   type: 'post',
		   async: true, // 비동기 , 동기 설정
		   contentType: 'application/json; charset=UTF-8', //json쓸거라는 거다 (복잡한 데이터 넘길 때 사용)
		   contentType: 'application/x-www-form-urlencoded; charset=UTF-8', // default
		   data:{ 
				'buyCode': buyCode,
        		'searchStatusCode': searchStatusCode,
        		'fromDate': fromDate,
        		'toDate': toDate
        	},
		   success: function(responseMap) {
	        //기존 테이블 그림 삭제 
			const table = document.querySelector('.table-reservation')
			const tableBody = table.querySelector('tbody');
			if (tableBody) {
			  tableBody.replaceChildren();
			}
			
			const buyList = responseMap.buyList; // Retrieve buyList from responseData
	        const buyStatusCodeCountList = responseMap.buyStatusCodeCountList; // Retrieve buyStatusCodeCountList from responseData
					 
			let str = ``;
			
			str = `<colgroup>
						<col width="10%">
						<col width="10%">
						<col width="*">
						<col width="5%">
						<col width="15%">
						<col width="15%">
						<col width="10%">
						<col width="10%">
					</colgroup>
					<thead class="text-center">
						<tr>
							<td>결제일자</td>
							<td>여행국가</td>
							<td>상품</td>
							<td>인원</td>
							<td>출발일자</td>
							<td>도착일자</td>
							<td>결제금액</td>
							<td>상태</td>
						</tr>
					</thead>`;
			
		    if (buyList.length == 0) {
		    str += `<tr class="text-center">
		                <td colspan="8">
		                    <br><br><br>
		                    <div style="font-size: 4rem; color: #bbb;">
		                        <i class="bi bi-exclamation-circle"></i>
		                    </div>
		                    <div>
		                        기간내 예약내역이 없습니다.
		                    </div>
		                    <br><br><br>
		                </td>
		            </tr>`;
		    } 
		    else {
		        buyList.forEach(function (buy) {
				const buyDetail = buy.buyDetailVO;
		            str += `<tr>
		                        <td class="text-center">
		                            <div style="color: #131518; font-weight:bolder;">${buy.buyDate}</div>
						            <div style="color: #ffd000;">${buy.buyCode}</div>
						            <div>
						            	<a href="/myPage/reservationDetail?buyCode=${buy.buyCode}"><span style="font-size: 0.9rem; text-decoration:underline;">상세보기</span></a>
						            </div>
		                        </td>
		                        <td class="text-center" style="font-weight: 700; font-weight: bolder;">${buyDetail.itemVO.tourAreaVO.areaKorName}</td>
		                        <td>
		                            <img src="/img/item/itemImg/${buyDetail.itemVO.imgList[0].itemImgAttachedName}" style="width: 85px; height: 85px;">
		                            <span style="color: #333; word-spacing: -1px;">${buyDetail.itemVO.itemTitle}</span>
		                        </td>
		                        <td>${buyDetail.reservedPeopleNum}</td>
		                        <td>${buyDetail.departDate}</td>
		                        <td>${buyDetail.arriveDate}</td>
		                        <td style="color: #f27370;">
		                          ${buyDetail.buyDPrice.toLocaleString()} 원
		                        </td>
		                        <td>
		                            <div>
		                                <span id="statusCode" style="font-weight: bolder;">${buy.buyStateVO.buyStatusName}</span>
		                            </div>
		                            <div id="reviewBtn">
		                                <button class="btn btn-outline-secondary btn-sm mt-2 reviewBtn" ${buy.buyStateVO.buyStatusCode == 1 ? '' : 'style="display:none;"'} onclick="cancel_reservation('${buy.buyCode}')">예약취소</button>
		                            </div>
		                            <div id="cancelBtn">
		                                <button class="btn btn-outline-secondary btn-sm mt-2 cancelBtn" ${buy.buyStateVO.buyStatusCode == 2 ? '' : 'style="display:none;"'}>리뷰작성</button>
		                            </div>
		                        </td>
		                    </tr>`;
		            });
		    }
		
		    table.innerHTML = str;
		    
		    // 상단바 선택해서 글씨 내용 지워주고, 다시 내용 채워 넣어주기.
		    
		    const countBox = document.querySelector('.content-box');	    
		    //countBox.querySelector('a').replaceChildren();
		    const countLink = countBox.querySelector('ul');
			if (countLink) {
			  countLink.replaceChildren();
			}
		    
		    let str_second = ``;
		    
		    str_second += `<ul class="my-page-step">`;
		    buyStatusCodeCountList.forEach(function (buyStatus) {
		    str_second += `<li>
		            <em class="num">${buyStatus.buyStatusCount}</em>
		            <span>${buyStatus.buyStatusName}</span>
		          </li>`;
			});
			str_second += `</ul>`;

			countBox.innerHTML = str_second;
		      
		   },
		   error: function() {
		      alert('실패');
		   }
		});
		//ajax end
	}
	else{
		return;		
	}
	
}






















