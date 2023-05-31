




function getItemInfo(option){

    const options = option.querySelectorAll('option');
    let itemCode;

    for (const opt of options) {
        if (opt.selected) {
            itemCode = opt.value;
        }
    }

    location.href='/admin/itemDetail/itemDailyManage?itemCode=' + itemCode;
}
//상품정보화면 그리기
function drawItemInfo(result){
    const drawTarget = document.querySelector('.itemInfo');
    let itemInfoTag = '';
    itemInfoTag = `
                    <div class="row">
                        <div class="col">${result['AREA_KOR_NAME']}</div>
                        <div class="col">${result['SELLING_START']} ~ ${result['SELLING_END']}</div>
                        <div class="col">${result['TRAVER_PERIOD']}</div>
                    </div>
    `;
    drawTarget.replaceChildren();
    drawTarget.insertAdjacentHTML('afterbegin', itemInfoTag);

}

//일자별 상세 일정 태그 작성
function drawDailyPlan(){

}