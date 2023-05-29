
//리스트 선택시 이미지 미리보기
function showItemImg(itemInfo){
    const itemCode = itemInfo.value.split(',')[0];
    const imgName = itemInfo.value.split(',')[1];
    const itemTitle = itemInfo.text;

    const previeDiv = document.querySelector('.previewDiv');


    let imgTag = `
                  <div class="col-4 offset-4 imgArea mb-3">
                    <img class="imgArea d-block w-100 h-100 rounded" data-item="${itemCode}" src="/img/item/itemImg/${imgName}" draggable="true">
                  </div>
    `;
    previeDiv.replaceChildren();
    previeDiv.insertAdjacentHTML('afterbegin', imgTag);

}

//되돌리기 버튼시 현재창 리로드
function reLoad(){
    location.reload();
}

//추천 상품 저장
function addRecomImgForPKMenu(){

    const imgTag = document.querySelectorAll('.resultDiv img');


    let itemCode = [];
    let sortIndex = [];

    imgTag.forEach((img, index) => {
        itemCode.push(img.dataset.item);
        sortIndex.push(index);
    });

    if(isDuplicate(itemCode)){
        alert('중복상품등록불가');
        reLoad();
        return;
    }

    $.ajax({
        url: '/admin/addRecomImgForPKGAJAX', //요청경로
        type: 'post',
        //contentType : 'application/json; charset=UTF-8',
        contentType : "application/x-www-form-urlencoded; charset=UTF-8",
        async : true,
        data: {'itemCode': itemCode, 'sortIndex': sortIndex },
        success: function() {
            alert('추천 아이템 변경 성공');
            location.reload();
        },
        error: function() {
            alert('실패');
        }
    });
}


//배열중복검사함수
function isDuplicate(arr)  {
    const isDup = arr.some(function(e) {
        return arr.indexOf(e) !== arr.lastIndexOf(e);
    });

    return isDup;
}



//-------------------------드래그앤 드랍 --------------------------//
/* 드래그 가능한 대상에서 발생하는 이벤트 */
let dragged;
document.addEventListener("dragstart", event => {
    // 드래그한 요소에 대한 참조 저장
    dragged = event.target;
    // 반투명하게 만들기
    event.target.classList.add("dragging");
});

document.addEventListener("dragend", event => {
    // 투명도 초기화
    event.target.classList.remove("dragging");
});

/* 드롭 대상에서 발생하는 이벤트 */
document.addEventListener("dragover", event => {
    // 드롭을 허용하기 위해 기본 동작 취소
    event.preventDefault();
}, false);

document.addEventListener("dragenter", event => {
    // 드래그 가능한 요소가 대상 위로 오면 강조
    if (event.target.classList.contains("imgArea")) {
        event.target.classList.add("dragover");
    }
});

document.addEventListener("dragleave", event => {
    // 드래그 가능한 요소가 대상 밖으로 나가면 강조 제거
    if (event.target.classList.contains("imgArea")) {
        event.target.classList.remove("dragover");
    }
});

document.addEventListener("drop", event => {
    // 일부 요소의 링크 열기와 같은 기본 동작 취소
    event.preventDefault();
    // 드래그한 요소를 선택한 드롭 대상으로 이동
    if (event.target.classList.contains("imgArea")) {

        event.target.classList.remove("dragover");
        dragged.draggable = false;
        dragged.classList.remove("preview")
        event.target.parentNode.appendChild(dragged);
        event.target.parentNode.firstElementChild.remove();
    }
});
