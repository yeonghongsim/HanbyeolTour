//상세정보 변경할 상품 선택시 페이지 이동
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


//상세일정등록을위한 데이터 가공
function setDailyPlanData(){



    let itemDailyPlan = [];
    //공통으로 들어갈데이터 itemCode, 항공정보, 총일정
    const itemCode = document.querySelector('#itemCode').value;
    const hbtPlanPeriod = document.querySelector('#hbtPlanPeriod').value;
    const airlineSelectTag = document.querySelectorAll('.airlineSelect > option');
    let airlineCode = '';
    airlineSelectTag.forEach((option) => {
        if(option.selected){
            airlineCode =  option.value;
        }
    });

    console.log(itemCode, hbtPlanPeriod, airlineCode);

    //개별로 들어갈데이터 몇일차 오전오후종일, 선택한투어코드, 선택한 호텔코드, 상세일정설채
    const dailyPlanDivs = document.querySelectorAll('.dailyPlanDiv');

    //일차정보
    dailyPlanDivs.forEach((dailyPlan, index) => {
        let map = {};
        //공통데이터 입력
        map["itemCode"] = itemCode;
        map["hbtPlanPeriod"] = hbtPlanPeriod;
        map["airlineCode"] = airlineCode;
        //일차정보
        map["planDay"] =  dailyPlan.querySelector('h5').dataset.day;
        //오전일정
        map["planTime"] = "AM";
        map["tourCode"] = dailyPlan.querySelector('.tourSelect').value;
        //호텔
        map["hotelCode"] = dailyPlan.querySelector('.hotelSelect').value;
        //상세일정 설명
        map["planIntro"] = dailyPlan.querySelector('textarea').value;

        itemDailyPlan.push(map);
        //오후일정이 존재할 경우
        if(!dailyPlan.querySelector('.pmTour select').disabled){
            let map = {};
            //공통데이터 입력
            map["itemCode"] = itemCode;
            map["hbtPlanPeriod"] = hbtPlanPeriod;
            map["airlineCode"] = airlineCode;
            //일차정보
            map["planDay"] =  dailyPlan.querySelector('h5').dataset.day;
            //오후일정
            map["planTime"] = "PM";
            map["tourCode"] = dailyPlan.querySelector('.pmTour select').value;
            //호텔
            map["hotelCode"] = dailyPlan.querySelector('.hotelSelect').value;
            //상세일정 설명
            map["planIntro"] = dailyPlan.querySelector('textarea').value;

            itemDailyPlan.push(map);
        }

    });

    setItemDailyPlan(itemDailyPlan);

}



function setItemDailyPlan(itemDailyPlan) {

    console.log(JSON.stringify(itemDailyPlan));

    $.ajax({
        url: '/admin/itemDetail/setItemDailyPlanAJAX', //요청경로
        type: 'post',
        //contentType : 'application/json; charset=UTF-8',
        contentType : "application/x-www-form-urlencoded; charset=UTF-8",
        async : true,
        data: {'itemDailyPlan': JSON.stringify(itemDailyPlan)},
        success: function(result) {
            alert('상세 일정 등록 완료');
        },
        error: function() {
            alert('실패');
        }
    });

}


//일정선택 이벤트리스너 (람다는 어려움...)
const tourSelectTag = document.querySelectorAll('.tourSelect');
const pmTour = document.querySelectorAll('.pmTour');
tourSelectTag.forEach((opt,index) => {
    opt.addEventListener("change", (event) => {
        const optionTags = event.target.querySelectorAll('option');
        optionTags.forEach(option => {
            if (option.selected) {
                //const runTime = option.dataset.runt;
                pmTour[index].querySelector('select').disabled = option.dataset.runt == 'Day' ? true : false;
            }
        });
    });
});

