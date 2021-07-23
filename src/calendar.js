const week = ["日", "月", "火", "水", "木", "金", "土"];
const today = new Date();

// 月末だとずれる可能性があるため、1日固定で取得
const showDate = new Date(today.getFullYear(), today.getMonth(), 1);

// 初期表示
window.onload = function () {
    showCalendar(today);
};

// 前の月を表示
function previous() {
    showDate.setMonth(showDate.getMonth() - 1);
    showCalendar(showDate);
}

// 次の月を表示
function next() {
    showDate.setMonth(showDate.getMonth() + 1);
    showCalendar(showDate);
}

// カレンダーを表示
function showCalendar(date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    document.querySelector("#header").innerHTML = `${year}年${(month + 1)}月`;

    createCalendar(year, month);

    // ボタンイベント
    document.querySelector("#previous").addEventListener('click', previous);
    document.querySelector("#next").addEventListener('click', next);
}

// 曜日を設定
function createHeader() {
    let header = "<tr>"
    for (let i = 0; i < week.length; i++) {
        header += "<th>" + week[i] + "</th>";
    }
    header += "</tr>";
    document.getElementById("thead-month").innerHTML = header;
}

// カレンダーを作成する
function createCalendar(year, month) {
    createHeader();

    // 当月の1日の曜日
    const startDayOfWeek = new Date(year, month, 1).getDay();
    const endDate = new Date(year, month + 1, 0).getDate();
    const lastMonthEndDate = new Date(year, month, 0).getDate();
    const rowCount = Math.ceil((startDayOfWeek + endDate) / week.length);

    let body = document.getElementById("calendar-body");
    body.innerHTML = "";
    let count = 0;
    for (let i = 0; i < rowCount; i++) {
        const row = document.createElement("tr");
        for (let j = 0; j < week.length; j++) {
            const cell = document.createElement("td");
            if (i == 0 && j < startDayOfWeek) {
                // 1行目で1日まで先月の日付を設定
                cell.innerHTML = lastMonthEndDate - startDayOfWeek + j + 1;
                cell.className = "disabled";
            } else if (count >= endDate) {
                // 最終行で最終日以降、翌月の日付を設定
                count++;
                cell.innerHTML = count - endDate;
                cell.className = "disabled";
            } else {
                count++;
                cell.innerHTML = count;
                if (
                    year == today.getFullYear()
                    && month == today.getMonth()
                    && count == today.getDate()
                ) {
                    cell.className = "today";
                }
            }
            row.appendChild(cell);
        }
        body.appendChild(row);
    }
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
        document.querySelector("#next").click()
    } else if (event.key === 'ArrowLeft') {
        document.querySelector("#previous").click();
    }
});