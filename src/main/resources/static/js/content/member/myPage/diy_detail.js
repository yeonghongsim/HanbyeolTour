

//예약 상세에서 예약 취소 

function detail_cancel(hbtDiyCode){
	// Confirmation
	const result = confirm(`정말 예약을 취소하시겠어요?`);
	if(result){
		location.href = `/myPage/cancelDiyReservation?hbtDiyCode=${hbtDiyCode}`
	}
	else{
		return;		
	}
}