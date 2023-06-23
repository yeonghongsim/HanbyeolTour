//상품 정보 모두 입력되었는지 확인
document.getElementById("regButton").addEventListener("click", function(event) {
    const form = document.querySelector("#regForm");
    const inputs = form.querySelectorAll("input, textarea");
    const isEmpty = false;

    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].value.trim() === "") {
            isEmpty = true;
            break;
        }
    }

    if (isEmpty) {
        event.preventDefault(); // 제출을 막음
        alert("입력되지 않은 상품 정보가 있습니다.");
    }
});