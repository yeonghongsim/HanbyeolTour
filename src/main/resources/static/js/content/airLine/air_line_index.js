function getNationNames(e){
    //const drawTarget = e.nextElementSibling.querySelector('ul');
    //
    const areaName = e.value;


    $.ajax({
        url: '/airline/getNationalNamesAJAX', //요청경로
        type: 'post',
        //contentType : 'application/json; charset=UTF-8',
        contentType : "application/x-www-form-urlencoded; charset=UTF-8",
        async : true,
        data: {'areaName': areaName},
        success: function(result) {
            drawInnerAccordion(result, e);
        },
        error: function() {
            alert('실패');
        }
    });
}



function drawInnerAccordion(nationalNames, e){

    const drawTarget = e.parentNode.parentNode.querySelector('.accordion-body');

    let str = '';

    nationalNames.forEach((name, index) => {

    str += `
            <div class="row" onclick="setAreaNAme('${name['KOR_AIRPORT_NAME']}', '${name['AIRPORT_CODE']}');">
                <div class="col">
                    <span>${name['KOR_AIRPORT_NAME']}</span>
                    <span>${name['AIRPORT_CODE']}</span>
                </div>
            </div>
    `;
    });

    drawTarget.replaceChildren();
    drawTarget.insertAdjacentHTML('afterbegin', str);

}


function setAreaNAme(name, code){

    const modalTitle = document.querySelector('.modal-title').textContent;
    const textTarget = document.querySelectorAll('.korName');

    if(modalTitle == '출발지선택'){
        textTarget[0].textContent = name;
        textTarget[0].nextElementSibling.textContent = code;
    }
    else {
        textTarget[1].textContent = name;
        textTarget[1].nextElementSibling.textContent = code;

    }


}

function getFlightAJAX(){

    const depAirport = document.querySelector('#depAirport').textContent;
    const arrAirport = document.querySelector('#arrAirport').textContent;
    const depDate = document.querySelector('#depDate').value;
    const arrDate = document.querySelector('#arrDate').value;


    $.ajax({
        url: '/airline/getFlightAJAX', //요청경로
        type: 'post',
        //contentType : 'application/json; charset=UTF-8',
        contentType : "application/x-www-form-urlencoded; charset=UTF-8",
        async : true,
        data: {'depAirport': depAirport, 'arrAirport': arrAirport, 'depDate': depDate, 'arrDate': arrDate},
        success: function(result) {
            console.log(JSON.parse(result));
        },
        error: function() {
            alert('실패');
        }
    });
}

function openOutterModal(e) {
    const text = e.querySelector('h5').textContent;
    const modalTitle = document.querySelector('.modal-title');

    modalTitle.textContent = text + '선택';

    const myModal = new bootstrap.Modal('#areaModal');
    const areaModal = document.querySelector('#areaModal');
    myModal.show(areaModal);

}

function test(){
    let url = 'https://www.google.com/search?q=' + '제주항공' + '&sxsrf=APwXEddZSwsC0ZR4ht4_H9_k9YdrcsMWeg%3A1687356592128&ei=sASTZMWsB4up2roPgIGbiA8&ved=0ahUKEwjFxKGSxdT_AhWLlFYBHYDABvEQ4dUDCA8&uact=5&oq=' + '제주항공' + '&gs_lcp=Cgxnd3Mtd2l6LXNlcnAQAzIHCCMQigUQJzIRCC4QgAQQsQMQgwEQxwEQ0QMyBAgAEAMyCwgAEIAEELEDEIMBMgQIABADMgsIABCABBCxAxCDATILCAAQgAQQsQMQgwEyBAgAEAMyBAgAEAMyBAgAEAMyHwguEIAEELEDEIMBEMcBENEDEJcFENwEEN4EEOAEGAE6CAgAEKIEELADOgUIABCABDoRCC4QgwEQxwEQsQMQ0QMQgAQ6CwguEIAEELEDEIMBOhAILhCABBAUEIcCELEDEIMBOh8ILhCDARDHARCxAxDRAxCABBCXBRDcBBDeBBDgBBgBOhAIABCABBAUEIcCELEDEIMBOggIABCABBCxAzoHCAAQigUQQ0oECEEYAVCeCFieEGClEWgEcAB4AYABkwGIAcMKkgEEMC4xMJgBAKABAcABAcgBAtoBBggBEAEYFA&sclient=gws-wiz-serp';

    $.ajax({
        url: url, //요청경로
        type: 'post',
        //contentType : 'application/json; charset=UTF-8',
        contentType : "application/x-www-form-urlencoded; charset=UTF-8",
        async : true,
        data: {},
        success: function(result) {
            console.log(result);
        },
        error: function() {
            alert('실패');
        }
    });

}