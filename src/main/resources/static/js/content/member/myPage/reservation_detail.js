
//예약 상세에서 예약 취소 

function detail_cancel(buyCode){
	alert(111);
	console.log(buyCode);
	// Confirmation
	const result = confirm(`정말 예약을 취소하시겠어요?`);
	if(result){
		location.href = `/myPage/cancelReservation?buyCode=${buyCode}`
	}
	else{
		return;		
	}
}