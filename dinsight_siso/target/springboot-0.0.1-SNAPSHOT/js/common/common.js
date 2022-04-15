//	jQuery.noConflict();
//-----------------------------------------------------------------------------
// 문자의 좌, 우 공백 제거
// @return : String
//-----------------------------------------------------------------------------

String.prototype.trim = function() {
    return this.replace(/(^\s*)|(\s*$)/g, "");
};

// -----------------------------------------------------------------------------
// 문자의 좌 공백 제거
// @return : String
// -----------------------------------------------------------------------------

String.prototype.ltrim = function() {
    return this.replace(/(^\s*)/, "");
};

// -----------------------------------------------------------------------------
// 문자의 우 공백 제거
// @return : String
// -----------------------------------------------------------------------------

String.prototype.rtrim = function() {
    return this.replace(/(\s*$)/, "");
};

// -----------------------------------------------------------------------------
// 주어진 문자열로 시작하는지 체크
// @return : boolean
// -----------------------------------------------------------------------------

String.prototype.startsWith = function(s) {
    return this.indexOf(s) == 0;
};

// -----------------------------------------------------------------------------
// 문자열의 byte 길이 반환
// @return : int
// -----------------------------------------------------------------------------

String.prototype.byteLength = function() {
    var cnt = 0;

    for ( var i = 0; i < this.length; i++) {
        if (this.charCodeAt(i) > 127) {
            cnt += 2;
        } else {
            cnt++;
        }
    }

    return cnt;
};

// -----------------------------------------------------------------------------
// 정수형으로 변환
// @return : String
// -----------------------------------------------------------------------------

String.prototype.int = function() {
    return parseInt(this.numDecimal());
};

// -----------------------------------------------------------------------------
// 정수형으로 변환
// @return : String
// -----------------------------------------------------------------------------

String.prototype.double = function() {
    return parseFloat(this.numDecimal());
};

// -----------------------------------------------------------------------------
// 숫자만 가져 오기
// @return : String
// -----------------------------------------------------------------------------

String.prototype.num = function() {
    return (this.trim().replace(/[^0-9]/g, ""));
};

// -----------------------------------------------------------------------------
// 숫자만 가져 오기
// @return : String
// -----------------------------------------------------------------------------

String.prototype.numDecimal = function() {
    return (this.trim().replace(/[^0-9.]/g, ""));
};

// -----------------------------------------------------------------------------
// 숫자에 3자리마다 , 를 찍어서 반환
// @return : String
// -----------------------------------------------------------------------------

String.prototype.money = function() {
    var num = this.trim();

    while ((/(-?[0-9]+)([0-9]{3})/).test(num)) {
        num = num.replace((/(-?[0-9]+)([0-9]{3})/), "$1,$2");
    }

    return num;
};

// -----------------------------------------------------------------------------
// 숫자의 자리수(cnt)에 맞도록 반환
// @return : String
// -----------------------------------------------------------------------------

String.prototype.digits = function(cnt) {
    var digit = "";

    if (this.length < cnt) {
        for ( var i = 0; i < cnt - this.length; i++) {
            digit += "0";
        }
    }

    return digit + this;
};

// -----------------------------------------------------------------------------
// " -> &#34; ' -> &#39;로 바꾸어서 반환
// @return : String
// -----------------------------------------------------------------------------

String.prototype.quota = function() {
    return this.replace(/"/g, "&#34;").replace(/'/g, "&#39;");
};

// -----------------------------------------------------------------------------
// 파일 확장자만 가져오기
// @return : String
// -----------------------------------------------------------------------------

String.prototype.ext = function() {
    return (this.indexOf(".") < 0) ? "" : this.substring(this.lastIndexOf(".") + 1, this.length);
};

// -----------------------------------------------------------------------------
// URL에서 파라메터 제거한 순수한 url 얻기
// @return : String
// -----------------------------------------------------------------------------

String.prototype.uri = function() {
    var arr = this.split("?");

    arr = arr[0].split("#");

    return arr[0];
};

// -----------------------------------------------------------------------------
// 정규식에 쓰이는 특수문자를 찾아서 이스케이프 한다.
// @return : String
// -----------------------------------------------------------------------------
String.prototype.meta = function() {
    var str = this;
    var result = "";

    for ( var i = 0; i < str.length; i++) {
        if ((/([\$\(\)\*\+\.\[\]\?\\\^\{\}\|]{1})/).test(str.charAt(i))) {
            result += str.charAt(i).replace((/([\$\(\)\*\+\.\[\]\?\\\^\{\}\|]{1})/), "\\$1");
        } else {
            result += str.charAt(i);
        }
    }

    return result;
};

// -----------------------------------------------------------------------------
// 정규식에 쓰이는 특수문자를 찾아서 이스케이프 한다.
// @return : String
// -----------------------------------------------------------------------------

String.prototype.remove = function(pattern) {
    return (pattern == null) ? this : eval("this.replace(/[" + pattern.meta() + "]/g, \"\")");
};

// -----------------------------------------------------------------------------
// 최소 최대 길이인지 검증
// str.isLength(min [,max])
// @return : boolean
// -----------------------------------------------------------------------------

String.prototype.isLength = function() {
    var min = arguments[0];
    var max = arguments[1] ? arguments[1] : null;
    var success = true;

    if (this.length < min) {
        success = false;
    }

    if (max && this.length > max) {
        success = false;
    }

    return success;
};

// -----------------------------------------------------------------------------
// 최소 최대 바이트인지 검증
// str.isByteLength(min [,max])
// @return : boolean
// -----------------------------------------------------------------------------

String.prototype.isByteLength = function() {
    var min = arguments[0];
    var max = arguments[1] ? arguments[1] : null;
    var success = true;

    if (this.byteLength() < min) {
        success = false;
    }

    if (max && this.byteLength() > max) {
        success = false;
    }

    return success;
};

// -----------------------------------------------------------------------------
// 공백이나 널인지 확인
// @return : boolean
// -----------------------------------------------------------------------------

String.prototype.isBlank = function() {
    var str = this.trim();

    for ( var i = 0; i < str.length; i++) {
        if ((str.charAt(i) != "\t") && (str.charAt(i) != "\n") && (str.charAt(i) != "\r")) {

            return false;
        }
    }

    return true;
};

// -----------------------------------------------------------------------------
// 숫자로 구성되어 있는지 학인
// arguments[0] : 허용할 문자셋
// @return : boolean
// -----------------------------------------------------------------------------

String.prototype.isNumeric = function() {
    return (/^[0-9]+$/).test(this.remove(arguments[0])) ? true : false;
};

// -----------------------------------------------------------------------------
// 영어만 허용 - arguments[0] : 추가 허용할 문자들
// @return : boolean
// -----------------------------------------------------------------------------

String.prototype.isAlpha = function() {
    return (/^[a-zA-Z]+$/).test(this.remove(arguments[0])) ? true : false;
};

// -----------------------------------------------------------------------------
// 숫자와 영어만 허용 - arguments[0] : 추가 허용할 문자들
// @return : boolean
// -----------------------------------------------------------------------------

String.prototype.isAlphaNumeric = function() {
    return (/^[0-9a-zA-Z]+$/).test(this.remove(arguments[0])) ? true : false;
};

// -----------------------------------------------------------------------------
// 아이디 체크 영어와 숫자만 체크 첫글자는 영어로 시작 - arguments[0] : 추가 허용할 문자들
// @return : boolean
// -----------------------------------------------------------------------------

String.prototype.isUserid = function() {
    return (/^[a-zA-z]{1}[0-9a-zA-Z]+$/).test(this.remove(arguments[0])) ? true : false;
};

// -----------------------------------------------------------------------------
// 한글 체크 - arguments[0] : 추가 허용할 문자들
// @return : boolean
// -----------------------------------------------------------------------------

String.prototype.isKorean = function() {
    return (/^[ㄱ-ㅎ가-힝]+$/).test(this.remove(arguments[0])) ? true : false;
};

// -----------------------------------------------------------------------------
// 주민번호 체크 - arguments[0] : 주민번호 구분자
// XXXXXX-XXXXXXX
// @return : boolean
// -----------------------------------------------------------------------------

String.prototype.isSSN = function() {
    var arg = arguments[0] ? arguments[0] : "";

    var ssn = eval("this.match(/[0-9]{2}[01]{1}[0-9]{1}[0123]{1}[0-9]{1}" + arg + "[1234]{1}[0-9]{6}$/)");

    if (ssn == null) {
        return false;
    } else {
        ssn = ssn.toString().num().toString();
    }

    // 생년월일 체크
    var birthYY = (parseInt(ssn.charAt(6)) == (1 || 2)) ? "19" : "20";

    birthYY += ssn.substr(0, 2);

    var birthMM = ssn.substr(2, 2) - 1;
    var birthDD = ssn.substr(4, 2);
    var birthDay = new Date(birthYY, birthMM, birthDD);

    if (birthDay.getFullYear() % 100 != ssn.substr(0, 2) || birthDay.getMonth() != birthMM || birthDay.getDate() != birthDD) {

        return false;
    }

    var sum = 0;
    var num = [ 2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 4, 5 ];
    var last = parseInt(ssn.charAt(12));

    for ( var i = 0; i < 12; i++) {
        sum += parseInt(ssn.charAt(i)) * num[i];
    }

    return ((11 - sum % 11) % 10 == last) ? true : false;
};

// -----------------------------------------------------------------------------
// 외국인 등록번호 체크 - arguments[0] : 등록번호 구분자
// XXXXXX-XXXXXXX
// @return : boolean
// -----------------------------------------------------------------------------

String.prototype.isForeign = function() {
    var arg = arguments[0] ? arguments[0] : "";

    var foreign = eval("this.match(/[0-9]{2}[01]{1}[0-9]{1}[0123]{1}[0-9]{1}" + arg + "[5678]{1}[0-9]{1}[02468]{1}[0-9]{2}[6789]{1}[0-9]{1}$/)");

    if (foreign == null) {
        return false;
    } else {
        foreign = foreign.toString().num().toString();
    }

    // 생년월일 체크

    var birthYY = (parseInt(foreign.charAt(6)) == (5 || 6)) ? "19" : "20";

    birthYY += foreign.substr(0, 2);

    var birthMM = foreign.substr(2, 2) - 1;
    var birthDD = foreign.substr(4, 2);
    var birthDay = new Date(birthYY, birthMM, birthDD);

    if (birthDay.getFullYear() % 100 != foreign.substr(0, 2) || birthDay.getMonth() != birthMM || birthDay.getDate() != birthDD) {

        return false;
    }

    if ((parseInt(foreign.charAt(7)) * 10 + parseInt(foreign.charAt(8))) % 2 != 0) {
        return false;
    }

    var sum = 0;
    var num = [ 2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 4, 5 ];
    var last = parseInt(foreign.charAt(12));

    for ( var i = 0; i < 12; i++) {
        sum += parseInt(foreign.charAt(i)) * num[i];
    }

    return (((11 - sum % 11) % 10) + 2 == last) ? true : false;

};

// -----------------------------------------------------------------------------
// 사업자번호 체크 - arguments[0] : 등록번호 구분자
// XX-XXX-XXXXX
// @return : boolean
// -----------------------------------------------------------------------------

String.prototype.isBizNum = function() {
    var arg = arguments[0] ? arguments[0] : "";
    var biznum = eval("this.match(/[0-9]{3}" + arg + "[0-9]{2}" + arg + "[0-9]{5}$/)");

    if (biznum == null) {
        return false;
    } else {
        biznum = biznum.toString().num().toString();
    }

    var sum = parseInt(biznum.charAt(0));
    var num = [ 0, 3, 7, 1, 3, 7, 1, 3 ];

    for ( var i = 1; i < 8; i++) {
        sum += (parseInt(biznum.charAt(i)) * num[i]) % 10;
    }

    sum += Math.floor(parseInt(parseInt(biznum.charAt(8))) * 5 / 10);
    sum += (parseInt(biznum.charAt(8)) * 5) % 10 + parseInt(biznum.charAt(9));

    return (sum % 10 == 0) ? true : false;
};

// -----------------------------------------------------------------------------
// 법인 등록번호 체크 - arguments[0] : 등록번호 구분자
// XXXXXX-XXXXXXX
// @return : boolean
// -----------------------------------------------------------------------------

String.prototype.isCorpNum = function() {
    var arg = arguments[0] ? arguments[0] : "";
    var corpnum = eval("this.match(/[0-9]{6}" + arg + "[0-9]{7}$/)");

    if (corpnum == null) {
        return false;
    } else {
        corpnum = corpnum.toString().num().toString();
    }

    var sum = 0;
    var num = [ 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2 ];
    var last = parseInt(corpnum.charAt(12));

    for ( var i = 0; i < 12; i++) {
        sum += parseInt(corpnum.charAt(i)) * num[i];
    }

    return ((10 - sum % 10) % 10 == last) ? true : false;
};

// -----------------------------------------------------------------------------
// 이메일의 유효성을 체크
// @return : boolean
// -----------------------------------------------------------------------------

String.prototype.isEmail = function() {
    return (/\w+([-+.]\w+)*@\w+([-.]\w+)*\.[a-zA-Z]{2,4}$/).test(this.trim());
};

// -----------------------------------------------------------------------------
// 전화번호 체크 - arguments[0] : 전화번호 구분자
// @return : boolean
// -----------------------------------------------------------------------------

String.prototype.isPhone = function() {
    var arg = arguments[0] ? arguments[0] : "";

    return eval("(/(02|0[3-9]{1}[0-9]{1})" + arg + "[1-9]{1}[0-9]{2,3}" + arg + "[0-9]{4}$/).test(this)");
};

// -----------------------------------------------------------------------------
// 핸드폰번호 체크 - arguments[0] : 핸드폰 구분자
// @return : boolean
// -----------------------------------------------------------------------------

String.prototype.isMobile = function() {
    var arg = arguments[0] ? arguments[0] : "";

    return eval("(/01[016789]" + arg + "[1-9]{1}[0-9]{2,3}" + arg + "[0-9]{4}$/).test(this)");
};

// -----------------------------------------------------------------------------
// 날짜형식 체크
// @return : boolean
// -----------------------------------------------------------------------------

String.prototype.isValidDate = function() {
    var date = this;

    date = date.replace(/-/g, "").replace(/\./g, "");

    var y = parseInt(date.substring(0, 4), 10);
    var m = parseInt(date.substring(4, 6), 10) - 1;
    var d = parseInt(date.substring(6, 8), 10);

    var dv = new Date(y, m, d);

    return (dv.getFullYear() == y && dv.getMonth() == m && dv.getDate() == d);
};

// -----------------------------------------------------------------------------
// 날짜형식 문자열을 날짜객체로 변환
// @return : Date
// -----------------------------------------------------------------------------

String.prototype.toDate = function(f) {
    if (!this.isValidDate()) {
        if (f) {
            return null;
        } else {
            return new Date();
        }
    }

    var date = this;

    date = date.replace(/-/g, "").replace(/\./g, "");

    var y = parseInt(date.substring(0, 4), 10);
    var m = parseInt(date.substring(4, 6), 10) - 1;
    var d = parseInt(date.substring(6, 8), 10);

    return new Date(y, m, d);
};

// -----------------------------------------------------------------------------
// 현재 문자의 문자열을 길이(len)만큼 생성
// @return : String
// -----------------------------------------------------------------------------

String.prototype.string = function(len) {
    var s = "", i = 0;

    while (i++ < len) {
        s += this;
    }

    return s;
};

// -----------------------------------------------------------------------------
// 문자열을 주어진 길이(len)만큼 zero-padding
// @return : String
// -----------------------------------------------------------------------------

String.prototype.zf = function(len) {
    return "0".string(len - this.length) + this;
};

String.prototype.format = function(mask, type) {
    if (!Mask) {
        return this;
    }

    try {
        return new Mask(mask, type).format(this);
    } catch (e) {
        return this;
    }
};

String.prototype.toShortSizeString = function() {
    var size = parseInt(this);

    if (size < 1024) {                          // bytes
        size = ("" + size).format("#,##0", "number") + "bytes";
    } else if (size < 1024 * 1024) {            // KB
        size = ("" + size / 1024.).format("0.00", "number") + "KB";
    } else if (size < 1024 * 1024 * 1024) {     // MB
        size = ("" + size / (1024. * 1024.)).format("0.00", "number") + "MB";
    } else {                                    // GB
        size = ("" + size / (1024. * 1024. * 1024.)).format("0.00", "number") + "GB";
    }

    return size;
};

// -----------------------------------------------------------------------------
// 날짜를 주어진 포멧에 맞추어 문자열로 변환
// - yyyy: 년도(4자리)
// - MM  : 월
// - dd  : 일
// - HH  : 시간(24시간)
// - mm  : 분
// - ss  : 초
// @return : String
// -----------------------------------------------------------------------------

Date.prototype.format = function(f) {
    if (!this.valueOf()) {
        return "";
    }

    var d = this;

    return f.replace(/(yyyy|MM|dd|hh|HH|mm|ss|)/gi, function($1) {
        switch ($1) {
        case "yyyy":
            return d.getFullYear();
        case "MM":
            return new String(d.getMonth() + 1).zf(2);
        case "dd":
            return new String(d.getDate()).zf(2);
        case "hh":
            return new String(((h = d.getHours() % 12) ? h : 12)).zf(2);
        case "HH":
            return new String(d.getHours()).zf(2);
        case "mm":
            return new String(d.getMinutes()).zf(2);
        case "ss":
            return new String(d.getSeconds()).zf(2);
        }

        return "";
    });
};

// -----------------------------------------------------------------------------
// 배열의 끝에 새로운 요소를 추가
// @return : Object
// -----------------------------------------------------------------------------

Array.prototype.add = function(o) {
    this.push(o);

    return o;
};

// -----------------------------------------------------------------------------
// 배열에서 특정 객체를 삭제
// @return : Object
// -----------------------------------------------------------------------------

Array.prototype.remove = function(o) {
    var i;

    for (i = 0; i < this.length; i++) {
        if (this[i] == o) {
            this.pop(i);
        }
    }

    return o;
};




/**
 * 공용함수
 */

// -----------------------------------------------------------------------------
// 특정 객체의 값이 비었는지 여부를 확인
// @return : boolean
// -----------------------------------------------------------------------------

function isEmptyOrNull(o) {
    if (o == undefined || o == null) {
        return true;
    }

    if (typeof(o) == "string") {
        return o.trim().length == 0;
    } else {
        return jQuery(o).val().trim().length == 0;
    }
}



// -----------------------------------------------------------------------------
// 날짜 형식 체크
// @return : boolean
// -----------------------------------------------------------------------------

function isValidDate(date) {
    if (!date) {
        return false;
    } else if (typeof (date) == "object") {
        if (!date.format) {
            return false;
        } else {
            date = date.format("yyyyMMdd");
        }
    }

    date = date.replace(/-/g, "").replace(/\./g, "");

    var y = parseInt(date.substring(0, 4), 10);
    var m = parseInt(date.substring(4, 6), 10) - 1;
    var d = parseInt(date.substring(6, 8), 10);

    var dv = new Date(y, m, d);

    return (dv.getFullYear() == y && dv.getMonth() == m && dv.getDate() == d);
}

// -----------------------------------------------------------------------------
// 주어진 두 날짜값을 비교
// @return : int
// -----------------------------------------------------------------------------

function compareDate(date1, date2) {
    if (!date1) {
        alert("compareDate(): The parameter \"date1\" is null.");
        return 0;
    } else if (typeof (date1) == "object") {
        if (!date1.format) {
            alert("compareDate(): The parameter \"date1\" is no date object or string.");
            return 0;
        } else {
            date1 = date1.format("yyyyMMdd");
        }
    }

    if (!date2) {
        alert("compareDate(): The parameter \"date2\" is null.");
        return 0;
    } else if (typeof (date2) == "object") {
        if (!date2.format) {
            alert("compareDate(): The parameter \"date2\" is no date object or string.");
            return 0;
        } else {
            date2 = date2.format("yyyyMMdd");
        }
    }

    date1 = date1.replace(/-/g, "").replace(/\./g, "");
    date2 = date2.replace(/-/g, "").replace(/\./g, "");

    var y1 = parseInt(date1.substring(0, 4), 10);
    var m1 = parseInt(date1.substring(4, 6), 10) - 1;
    var d1 = parseInt(date1.substring(6, 8), 10);

    var y2 = parseInt(date2.substring(0, 4), 10);
    var m2 = parseInt(date2.substring(4, 6), 10) - 1;
    var d2 = parseInt(date2.substring(6, 8), 10);

    var dt1 = new Date(y1, m1, d1);
    var dt2 = new Date(y2, m2, d2);

    return dt2.getTime() - dt1.getTime();
}

// -----------------------------------------------------------------------------
// date1 < date2 인지를 비교
// @return : boolean
// -----------------------------------------------------------------------------

function isBeforeDate(date1, date2) {
    if (!isValidDate(date1)) {
        return false;
    } else if (!isValidDate(date2)) {
        return false;
    }

    return compareDate(date1, date2) > 0;
}

// -----------------------------------------------------------------------------
// date1 > date2 인지를 비교
// @return : boolean
// -----------------------------------------------------------------------------

function isAfterDate(date1, date2) {
    if (!isValidDate(date1)) {
        return false;
    } else if (!isValidDate(date2)) {
        return false;
    }

    return compareDate(date1, date2) < 0;
}

// -----------------------------------------------------------------------------
// date1 == date2 인지를 비교
// @return : boolean
// -----------------------------------------------------------------------------

function isSameDate(date1, date2) {
    if (!isValidDate(date1)) {
        return false;
    } else if (!isValidDate(date2)) {
        return false;
    }

    return compareDate(date1, date2) == 0;
}

// -----------------------------------------------------------------------------
// 주어진 두 날짜의 차이를 구한다.
// @return : int
// -----------------------------------------------------------------------------

function getDiffDays(date1, date2) {
    if (!date1) {
        alert("getDiffDays(): The parameter \"date1\" is null.");
        return 0;
    } else if (typeof (date1) == "string") {
        date1 = date1.toDate();

        if (date1 == null) {
            alert("getDiffDays(): The parameter \"date1\" is not valid date string.");
            return 0;
        }
    } else if (typeof (date1) == "object") {
        if (!date1.format) {
            alert("getDiffDays(): The parameter \"date1\" is no date object or string");
            return 0;
        }
    }

    if (!date2) {
        alert("getDiffDays(): The parameter \"date2\" is null.");
        return 0;
    } else if (typeof (date2) == "string") {
        date2 = date2.toDate();

        if (date2 == null) {
            alert("getDiffDays(): The parameter \"date2\" is not valid date string.");
            return 0;
        }
    } else if (typeof (date2) == "object") {
        if (!date2.format) {
            alert("getDiffDays(): The parameter \"date2\" is no date object or string");
            return 0;
        }
    }

    return Math.abs((date2.getTime() - date1.getTime()) / 1000 / 60 / 60 / 24);
}



// -----------------------------------------------------------------------------
// Date 바로가기 버튼 헬퍼
// - field  : "D" - 일, "W" - 주, "M" - 월, "Y" - 년 (대소문자 구분 없음)
// - amount : DIFF 값 (절대값으로 지정, 부호는 무시됨)
// - oFrom  : 시작일자를 바인딩할 타겟ID 혹은 EL
// - oTo    : 종료일자를 바인딩할 타겟ID 혹은 EL
// - format : 날짜 포맷
// - "yyyy" - 년
// - "MM" - 월
// - "dd" - 일
// - "hh" - 시
// - "mm" - 분
// - "ss" - 초
// - isAfterFromToday : 오늘 이후로 DIFF 값을 계산할지 여부
// @return : void
// -----------------------------------------------------------------------------

function selectQuickDate(field, amount, oFrom, oTo, format, isAfterFromToday) {
    if (!(new RegExp(/^[YMWD]$/i).test(field))) {
        alert("selectQuickDate(): Invaild field mark specified.");
        return;
    }

    if (typeof (oFrom) == "string") {
        oFrom = document.getElementById(oFrom);
    }

    if (typeof (oTo) == "string") {
        oTo = document.getElementById(oTo);
    }

    if (jQuery) {
        if (oFrom instanceof jQuery) {
            oFrom = oFrom[0];
        }

        if (oTo instanceof jQuery) {
            oTo = oTo[0];
        }
    }

    if (!oFrom) {
        alert("selectQuickDate(): oFrom element is null.");
        return;
    } else if (typeof (oFrom.value) != "string") {
        alert("selectQuickDate(): Specified oFrom element has no value property.");
        return;
    }

    if (!oTo) {
        alert("selectQuickDate(): oTo element is null.");
        return;
    } else if (typeof (oTo.value) != "string") {
        alert("selectQuickDate(): Specified oTo element has no value property.");
        return;
    }

    var dtFrom;
    var dtTo;

    format = (format) ? format : "yyyy-MM-dd";

    var dateTemp;

    if (isAfterFromToday) {
        if (oFrom.value) {
            // validate
            dateTemp = oFrom.value;
            switch (format) {
            case "yyyy-MM-dd":
                dateTemp;
                break;
            case "yyyy-MM":
                dateTemp = dateTemp + "-01";
                break;
            case "yyyy":
                dateTemp = dateTemp + "-01-01";
                break;
            }
            if (!isValidDate(dateTemp)) {
                alert("날짜 입력 형식이 틀립니다.");
                oFrom.select();
                return false;
            }

            switch (format) {
            case "yyyy-MM-dd":
                dtTo = oFrom.value.toDate();
                dtFrom = oFrom.value.toDate();
                break;
            case "yyyy-MM":
                dtTo = (oFrom.value + "-01").toDate();
                dtFrom = (oFrom.value + "-01").toDate();
                break;
            case "yyyy":
                dtTo = (oFrom.value + "-01-01").toDate();
                dtFrom = (oFrom.value + "-01-01").toDate();
                break;
            }
        } else {
            dtTo = new Date();
            dtFrom = new Date();
        }
    } else {
        if (oTo.value) {
            // validate
            dateTemp = oTo.value;
            switch (format) {
            case "yyyy-MM-dd":
                dateTemp;
                break;
            case "yyyy-MM":
                dateTemp = dateTemp + "-01";
                break;
            case "yyyy":
                dateTemp = dateTemp + "-01-01";
                break;
            }
            if (!isValidDate(dateTemp)) {
                alert("날짜 입력 형식이 틀립니다.");
                oTo.select();
                return false;
            }

            switch (format) {
            case "yyyy-MM-dd":
                dtTo = oTo.value.toDate();
                dtFrom = oTo.value.toDate();
                break;
            case "yyyy-MM":
                dtTo = (oTo.value + "-01").toDate();
                dtFrom = (oTo.value + "-01").toDate();
                break;
            case "yyyy":
                dtTo = (oTo.value + "-01-01").toDate();
                dtFrom = (oTo.value + "-01-01").toDate();
                break;
            }
        } else {
            dtTo = new Date();
            dtFrom = new Date();
        }
    }

    var instrestedDate = (isAfterFromToday) ? dtTo : dtFrom;

    field = field.toUpperCase();
    amount = (isAfterFromToday) ? Math.abs(parseInt(amount)) : -Math.abs(parseInt(amount));

    switch (field) {
    case "Y":
        instrestedDate.setYear(instrestedDate.getFullYear() + amount);
        break;

    case "M":
        instrestedDate.setMonth(instrestedDate.getMonth() + amount);
        break;

    case "W":
        instrestedDate.setDate(instrestedDate.getDate() + (amount * 7));
        break;

    case "D":
        instrestedDate.setDate(instrestedDate.getDate() + amount);
        break;
    }

    oFrom.value = dtFrom.format(format);
    oTo.value = dtTo.format(format);
}

function showCalendar(target, event, x, y) {
    var callback = null;

    if (arguments.length == 5 && typeof(arguments[4]) == "function") {
        callback = arguments[4];
    }

    if (typeof(target) == "string") {
        target = document.getElementById(target);
    } else if (target instanceof jQuery) {
        target = target[0];
    }

    top._showCalendar(target, event, x, y, callback);
}

function validateLayout() {
    top._updateLayout();
}

function showCommonCodePopup(cd_tp_no, cd_nm, cd_kor_txt, autoclose) {
    if (typeof(cd_nm) == "string") {
        cd_nm = document.getElementById(cd_nm);
    } else if (cd_nm instanceof jQuery) {
        cd_nm = cd_nm[0];
    }

    if (typeof(cd_kor_txt) == "string") {
        cd_kor_txt = document.getElementById(cd_kor_txt);
    } else if (cd_kor_txt instanceof jQuery) {
        cd_kor_txt = cd_kor_txt[0];
    }


    cd_nm = jQuery(cd_nm);
    cd_kor_txt = jQuery(cd_kor_txt);

    var popup = new jQuery.popup(
                        "공통코드조회",
                        400,
                        450,
                        "/rest/IM909001/P1/"
                            + "?cd_tp_no="   + encodeURIComponent(cd_tp_no)
                            + "&cd_nm="      + encodeURIComponent(cd_nm.val())
                            + "&cd_kor_txt=" + encodeURIComponent(cd_kor_txt.val())
                            + "&auto_close=" + encodeURIComponent(autoclose));


    popup.registerCallback(function(r) {
        if (r != MB_CANCEL) {
            cd_nm.val(this.getParam("cd_nm"));
            cd_kor_txt.val(this.getParam("cd_kor_txt"));
        }
    });

    popup.showModal();
}

function showMarketFundSearchPopup(amak_fnd_no, kor_fnd_nm, autoclose) {
    if (typeof(amak_fnd_no) == "string") {
        amak_fnd_no = document.getElementById(amak_fnd_no);
    } else if (amak_fnd_no instanceof jQuery) {
        amak_fnd_no = amak_fnd_no[0];
    }

    if (typeof(kor_fnd_nm) == "string") {
        kor_fnd_nm = document.getElementById(kor_fnd_nm);
    } else if (kor_fnd_nm instanceof jQuery) {
        kor_fnd_nm = kor_fnd_nm[0];
    }

    amak_fnd_no = jQuery(amak_fnd_no);
    kor_fnd_nm  = jQuery(kor_fnd_nm);

    var popup = new jQuery.popup(
                        "시장펀드검색",
                        600,
                        490,
                        "/rest/IC020101/P2/?"
                        + "fnd_no_nm=" + encodeURIComponent(amak_fnd_no.val())
                        + "&auto_close=" + autoclose);

    popup.registerCallback(function(r) {
        if (r != MB_CANCEL) {
            amak_fnd_no.val(this.getParam("amak_fnd_no"));
            kor_fnd_nm.val(this.getParam("kor_fnd_nm"));
        }
    });

    popup.showModal();
}




function initMask() {
    jQuery("input.alt-mask").each(function() {
        var altMask = jQuery(this).attr("alt");

        if (isEmptyOrNull(altMask)) {
            return;
        }

        var tokens = altMask.split(":");

        if (tokens.length != 2) {
            return;
        }

        var mask = null;

        switch (tokens[0]) {
        case "n":
            mask = new Mask(tokens[1], "number");
            break;

        case "d":
            mask = new Mask(tokens[1], "date");
            break;

        case "s":
            mask = new Mask(tokens[1], "string");
            mask.allowPartial = true;
            break;

        default:
            return;
        }

        mask.attach(this);

        if (!isEmptyOrNull(this)) {
            this.value = mask.format(this.value);
        }

        this._mask = mask;

        jQuery(this).focus(function() {
            if (this._mask.type == "date") {
                this.value = this.value.replace(/-/g, "");
            } else {
                this.value = this._mask.strippedValue;
            }

            this._mask.detach(this);
        });

        jQuery(this).blur(function() {
            this._mask.strippedValue = this.value;
            this.value = this._mask.format(this.value);
            this._mask.attach(this);
        });
    });
}

function applyMask(o) {
    if (o == undefined) {
        o = jQuery(document);
    }

    if (!(o instanceof jQuery)) {
        alert("no jQuery object.");
        return;
    }

    jQuery("input.alt-mask", o).each(function() {
        if (this._mask == undefined) {
            return;
        }
        if (this._mask.type == "string") {
            this._mask.allowPartial = true;
        }
        this.value = this._mask.format(this.value);
    });
}

function removeMask(o) {
    if (o == undefined) {
        o = jQuery(document);
    }

    if (!(o instanceof jQuery)) {
        alert("no jQuery object.");
        return;
    }

    jQuery("input.alt-mask", o).each(function() {
        if (this._mask == undefined) {
            return;
        }

        if (this._mask.type == "date") {
            this.value = this.value.replace(/-/g, "");
        } else {
            this.value = this._mask.strippedValue;
        }
    });
}


function exportExcel(url) {
    var param = "";

    if (arguments.length == 2) {
        if (arguments[1].serialize) {
            param = "?" + arguments[1].serialize();
        }
    }

    window.location.href = url + param;
}

function proxy(url) {
    return "/proxy?url=" + url.replace(/\?/, "&");
}

//************************************************** ReportDesigner Helper
function showReport(reportFile, reportTitle, reportParams, popupWidth, popupHeight) {
    popupWidth  = (popupWidth ) ? popupWidth  : 1022;
    popupHeight = (popupHeight) ? popupHeight : 676 ;

    var x = (screen.width  / 2) - (popupWidth  / 2);
    var y = (screen.height / 2) - (popupHeight / 2);

    var features = "height=" + popupHeight + ",width=" + popupWidth
                 + "status=no,toolbar=no,menubar=no,location=no,resizable=no,scrollbars=no";

    var popup = top.window.open("about:blank", "RDViewer", features);

    var params = "";

    for (var i = 0; i < reportParams.length; i++) {
        params += "[" + reportParams[i] + "]";
    }

    var host = top.window.location.href;

    host = host.substring(0, host.indexOf("/", 8));

    var file = host + "/reports/";

    file += reportFile.substring(0, 2).toLowerCase();
    file += "/";
    file += reportFile;
    file += ".mrd";

    popup.document.write(
            "<html>"
          + "<head>"
          + "<title>" + reportTitle + "</title>"
          + "<script type=\"text/javascript\">"
          + "function viewReport() {"
          + "rdviewer.AutoAdjust = true;"
          + "rdviewer.ZoomRatio = 100;"
          + "rdviewer.FileOpen(\"" + file + "\", \"/rp " + params + "\");"
          + "}"
          + "</script>"
          + "<body style=\"margin: 0px; padding: 0px;\">"
          // NOT USED: to solve sync problem + "<script type=\"text/javascript\" src=\"/RDServer/rdviewer.js\"></script>"
          + "<object id=rdviewer name=rdviewer width=100% height=100% classid=\"clsid:ADB6D20D-80A1-4aa4-88AE-B2DC820DA076\" codebase=\"/RDServer/rdviewer50.cab#version=5,0,0,258\"></object>"
          + "<script type=\"text/javascript\">"
          + "viewReport();"
          + "</script>"
          + "</body>"
          + "</html>"
    );
}

function showXmlReport(reportFile, reportTitle, reportParams, serviceUrl, serviceParams, popupWidth, popupHeight) {
    popupWidth  = (popupWidth ) ? popupWidth  : 1022;
    popupHeight = (popupHeight) ? popupHeight : 676 ;

    var x = (screen.width  / 2) - (popupWidth  / 2);
    var y = (screen.height / 2) - (popupHeight / 2);

    var features = "height=" + popupHeight + ",width=" + popupWidth
                 + "status=no,toolbar=no,menubar=no,location=no,resizable=no,scrollbars=no";

    var popup = top.window.open("about:blank", "RDViewer", features);

    var params = "";

    for (var i = 0; i < reportParams.length; i++) {
        params += "[" + reportParams[i] + "] ";
    }

    var host = top.window.location.href;

    host = host.substring(0, host.indexOf("/", 8));

    var file = host + "/reports/";

    file += reportFile.substring(0, 2).toLowerCase();
    file += "/";
    file += reportFile;
    file += ".mrd";

    if (!serviceUrl.startsWith("http://")) {
        serviceUrl = host + ((serviceUrl.startsWith("/")) ? serviceUrl : "/" + serviceUrl);
    }

    var firstParam = true;

    for (var paramName in serviceParams) {
        serviceUrl += ((firstParam) ? "?" : "&") + paramName + "=" + encodeURIComponent(serviceParams[paramName]);
        firstParam = false;
    }

    popup.document.write(
            "<html>"
          + "<head>"
          + "<title>" + reportTitle + "</title>"
          + "<script type=\"text/javascript\">"
          + "function viewReport() {"
          + "rdviewer.AutoAdjust = true;"
          + "rdviewer.ZoomRatio = 100;"
          + "rdviewer.FileOpen(\"" + file + "\", \"/rp " + params + " /rf [" + serviceUrl + "]\");"
          + "}"
          + "</script>"
          + "<body style=\"margin: 0px; padding: 0px;\">"
          // NOT USED: to solve sync problem + "<script type=\"text/javascript\" src=\"/RDServer/rdviewer.js\"></script>"
          + "<object id=rdviewer name=rdviewer width=100% height=100% classid=\"clsid:ADB6D20D-80A1-4aa4-88AE-B2DC820DA076\" codebase=\"/RDServer/rdviewer50.cab#version=5,0,0,258\"></object>"
          + "<script type=\"text/javascript\">"
          + "viewReport();"
          + "</script>"
          + "</body>"
          + "</html>"
    );
}

//************************************************** ReportDesigner Helper




function makePagingControl(targetDiv, page, total, count, callback) {
    var html = "";

    var st = Math.floor((page - 1) / count) * count + 1;
    var ed= st + count - 1;

    if (total == 0) {
        html = "&nbsp;";
    } else {
        html += "<img id=\"btn_go_prev_page\" class=\"paging-button\" src=\"/img/common/btn_prev01.gif\" />&nbsp;";
        html += "<img id=\"btn_go_prev\"      class=\"paging-button\" src=\"/img/common/btn_prev02.gif\" />";
        html += "&nbsp;&nbsp;&nbsp;";
        html += "<span>";

        for (var i = st; i <= Math.min(ed, total); i++) {
            if (i != st) {
                html += "&nbsp;&nbsp;<img src=\"/images/community-button-paging-dot.gif\" style=\"vertical-align: middle;\" />&nbsp;&nbsp;";
            }

            html += "<a href=\"#\" id=\"btn_go_" + i + "\" style=\"" + ((i == page) ? "color:#ff7800; font-weight:bold; font-size:12px" : "color:#4d4d4d; font-size:12px") + "\">" + i + "</a>";
        }

        html += "</span>";
        html += "&nbsp;&nbsp;&nbsp;";
        html += "<img id=\"btn_go_next\"      class=\"paging-button\" src=\"/img/common/btn_next02.gif\" />&nbsp;";
        html += "<img id=\"btn_go_next_page\" class=\"paging-button\" src=\"/img/common/btn_next01.gif\" />&nbsp;&nbsp;&nbsp;";
    }

    jQuery(targetDiv).html(html);
    jQuery(targetDiv).find("*[id^='btn_go_']").click(function() {
        var pageIndicator = jQuery(this).attr("id").replace("btn_go_", "");

        st = parseInt(st);
        page = parseInt(page);
        total = parseInt(total);
        ed = parseInt(ed);

        switch (pageIndicator) {
            case "first":
                pageIndicator = 1;
                break;

            case "prev_page":
                pageIndicator = (st > 1) ? st - 1 : 1;
                break;

            case "prev":
                pageIndicator = (page > 1) ? page - 1 : 1;
                break;

            case "next":
                pageIndicator = (page < total) ? page + 1 : page;
                break;

            case "next_page":
                pageIndicator = (ed < total) ? ed + 1 : Math.min(ed, total);
                break;

            case "last":
                pageIndicator = total;
                break;
        }
        
        callback(pageIndicator);
        return false;
    });
}

//천단위 콤마 찍기
function comma(str){
	str = new String(str);
	this.str =str;
	len = str.length;
	str1="";
	for(var i=1; i<=len; i++){
		str1=str.charAt(len-i)+str1;
		if((i%3==0) && (len-i != 0)){
			str1=","+str1;
		}
	}
	return str1;
}

//자리수 처리
function _es_Format_comma(val) {
 val = val+"";
 if(val.length<4){
	 return val;
 }
 var minus = val.substring(0,1)=="-"?true:false;
 var val1 = val.split("-").join("");
   
 var newValue = val1 + ""; //숫자를 문자열로 변환
 var len = newValue.length;
 var ch = "";
 var j = 1;
 var formatValue = "";

 // 콤마제거  
 newValue = newValue.replace(/\,/gi, ' ');

 // comma제거된 문자열 길이
 len = newValue.length;

 for (i = len; i > 0; i--) {
  ch = newValue.substring(i - 1, i);
  formatValue = ch + formatValue;
  if ((j % 3) == 0 && i > 1) {
   formatValue = "," + formatValue;
  }
  j++;
 }
 if(minus){
	 return "-"+formatValue;
 }else{
	 return formatValue;
 }
}

function put_search_cd(input_code) {//종목코드 쿠키 저장
    var result = "";
    if(input_code != null && jQuery.trim(input_code) != "" ){
	    result = input_code;
	    setOtcCookie("search_cd", result, 31);
    }
}


function put_target_id(target_code, param_page) {//화면타겟 쿠키 저장
    var result = "";
    var result_page = "";//매도 매수 용
    if(target_code != null && jQuery.trim(target_code) != "" ){
	    result = target_code;
	    setOtcCookie("target_id", result, 31);
    }
    //매도 매수 용
    if(param_page != null && jQuery.trim(param_page) != "" ){
	    result_page = param_page;
	    setOtcCookie("param_page", result_page, 31);
    }
}

function get_search_cd() {//종목코드 쿠키 조회
    var cookie_value = getOtcCookie("search_cd");
    if (cookie_value == null) {
        return "000000";
    }
    else
    {
    	return cookie_value;
    }
}

function get_target_id() {//화면타겟 쿠키 조회
    var cookie_value = getOtcCookie("target_id");
    var cookie_value_page = getOtcCookie("param_page");// 매도 매수 리턴 페이지 설정
    
    if (cookie_value == null || cookie_value == "" ) {
    	
    	/*if (cookie_value_page != null || cookie_value_page != "" ) {
            return cookie_value_page;
        }*/
    	
    	return '/rest/STOCK/p/subMain';
    }
    else
    {
    	return cookie_value;
    }
}
//매도매수용 함수
function get_target_page() {//화면타겟 쿠키 조회
    var cookie_value_page = getOtcCookie("param_page");
    if (cookie_value_page == null || cookie_value_page == "" ) {
        //return '/rest/ite/itemview/ew';
    }
    else
    {
    	return cookie_value_page;
    }
}
function url_controller(go_url, stock_gubun)  //화면이동 및 화면타겟 쿠키 저장
{
	//put_target_id(go_url);
	
	if(stock_gubun == "sp"){
		//put_search_cd('000000');
		put_target_id("", "/rest/STOCK/p/l");
		location.href="/rest/STOCK/p/m";
	}
	else if(stock_gubun == "ss"){
		//put_search_cd('000000');
		put_target_id("", "/rest/STOCK_SS/p/l");
		location.href="/rest/STOCK_SS/p/m";
	}
	else if(stock_gubun == "ssp"){
		//put_search_cd('000000');
		//put_target_id("", "/rest/STOCK/p/l");
		location.href="/rest/STOCK/p/subMain";
	}
	else{
		put_target_id(go_url);
		location.href=get_target_id();
	}
	
}

//pot(114otc 홈페이지)용 
/*function url_controller_pot(go_url, stock_gubun)  //화면이동 및 화면타겟 쿠키 저장
{
	//put_target_id(go_url);
	alert("go_url   :  "+go_url);
	alert("stock_gubun   :  "+stock_gubun);
	
	if(stock_gubun == "sp"){
		//put_search_cd('000000');
		put_target_id("", "/rest/POT/STOCK/p/m");
		location.href="/rest/POT/STOCK/p/m";
	}
	else if(stock_gubun == "ss"){
		//put_search_cd('000000');
		put_target_id("", "/rest/POT/STOCK_SS/p/m");
		location.href="/rest/POT/STOCK_SS/p/m";
	}
	else if(stock_gubun == "ssp"){
		//put_search_cd('000000');
		//put_target_id("", "/rest/STOCK/p/l");
		location.href="/rest/POT/STOCK/p/subMain";
	}
	else{
		put_target_id(go_url);
		location.href=get_target_id();
	}
	
}*/
//Description  : 
//Input Value  :
//Output Value :
function setOtcCookie(name, value, expiredays) {
var today = new Date();
today.setDate(today.getDate() + expiredays);
document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + today.toGMTString() + ";";
}

//Description  : 
//Input Value  :
//Output Value :
function getOtcCookie(name) {
	var prefix = name + "=";
	
	var startIdx = document.cookie.indexOf(prefix);
	if (startIdx == -1)
	   return null;
	
	var endIdx = document.cookie.indexOf(";", startIdx + prefix.length);   
	if (endIdx == -1)
	   endIdx = document.cookie.length;
	
	return unescape(document.cookie.substring(startIdx + prefix.length, endIdx));
}


//콤마찍기 and 숫자체크-----------------------2012.09.27
function commanAndNum(obj){

	var n = obj.value;
	n = onlyNumber(n);
	var reg = /(^[+-]?\d+)(\d{3})/;   // 정규식
	n += '';                          // 숫자를 문자열로 변환
	while (reg.test(n))
	n = n.replace(reg, '$1' + ',' + '$2');  
	obj.value = n;     
}

// function commaDecimal(obj,upperLimit,belowLimit)
// obj : input
// upperLimit 정수 자리 제한
// belowLimit 소수 자리 제한
// 자리제한을 입력하지 않거나 0이하면 제한을 두지 않습니다.
// 제한을 걸지 않아도 컴마 추가하는 포맷팅은 합니다.
function commaDecimal(obj,upperLimit,belowLimit){
	var n = obj.value;
	// 숫자외의 것이 들어오면
	if(/[^0-9,.]/g.test(n)) {
		alert("숫자만 입력 가능합니다.");
		obj.value = n.replace(/[^0-9,.]/g,"");
		return;
	}
	else
	{
		var twopart = n.split(".");
		// .이 하나만 찍혀야하는데 2개이상 찍히면...
		if(twopart.length > 2)
		{
			var ret = "";
			ret = twopart[0] + ".";
			for(var i =1;i<twopart.length;i++){
				ret += twopart[i];
			}
			alert(".은 한개만 쓰십시요.");
			obj.value = ret;
			return;
		}
		else // 이제 정상적인 것처리 
		{
			var intPart = twopart[0].replace(/[^0-9]/g,"");
			var errorMsg = "";
			var ret = "";
			
			//  정수 자리수 처리,  upperLimit 이 0 이하면 체크 안함 
			if(upperLimit != null && upperLimit > 0 && String(intPart).length > upperLimit)
			{
				ret = comma(intPart.substr(0,upperLimit));
				errorMsg += "정수부는 "+upperLimit+" 자리까지 입력 가능합니다. ";
			}
			else
			{
				ret = comma(intPart);
			}
			
			// 소수점이 있으면, 소수자리 체크
			if(twopart.length > 1) {
				ret += ".";
				if( belowLimit != null && twopart[1].length > belowLimit){
					errorMsg += "소수자리는 " + belowLimit +" 자리까지 입력 가능합니다. ";
				}
				ret += twopart[1].substr(0,belowLimit);
			}
			if(errorMsg != "")
			{
				alert(errorMsg);
			}
			obj.value = ret;
			return;
		}
		
	}
}
//IPO 신규상장 등락률 표시 -- 신규상장 등록, 수정만 쓰임
function commaDecimal2(obj,upperLimit,belowLimit){
	var n = obj.value;
	// 숫자외의 것이 들어오면
	if(/[^0-9.-]/g.test(n)) {
		alert("숫자만 입력 가능합니다.");
		obj.value = n.replace(/[^0-9.-]/g,"");
		return;
	}
	else
	{
		var twopart = n.split(".");
		// .이 하나만 찍혀야하는데 2개이상 찍히면...
		if(twopart.length > 2)
		{
			var ret = "";
			ret = twopart[0] + ".";
			for(var i =1;i<twopart.length;i++){
				ret += twopart[i];
			}
			alert(".은 한개만 쓰십시요.");
			obj.value = ret;
			return;
		}
		else // 이제 정상적인 것처리 
		{
			var intPart = twopart[0].replace(/[^0-9-]/g,"");
			var errorMsg = "";
			var ret = "";
			
			//  정수 자리수 처리,  upperLimit 이 0 이하면 체크 안함 
			if(upperLimit != null && upperLimit > 0 && String(intPart).length > upperLimit)
			{
				//ret = comma(intPart.substr(0,upperLimit));
				ret = intPart.substr(0,upperLimit);
				errorMsg += "정수부는 "+upperLimit+" 자리까지 입력 가능합니다. ";
			}
			else
			{
				//ret = comma(intPart);
				ret = intPart;
			}
			
			// 소수점이 있으면, 소수자리 체크
			if(twopart.length > 1) {
				ret += ".";
				if( belowLimit != null && twopart[1].length > belowLimit){
					errorMsg += "소수자리는 " + belowLimit +" 자리까지 입력 가능합니다. ";
				}
				ret += twopart[1].substr(0,belowLimit);
			}
			if(errorMsg != "")
			{
				alert(errorMsg);
			}
			obj.value = ret;
			return;
		}
		
	}
}

//숫자체크
function onlyNumber(objVal){
	
	var replaceNum = unNumberFormat(objVal);
	var preNum = replaceNum;
	
	if(/[^0123456789]/g.test(replaceNum)){
		
		preNum = "";
		for (i = 0; i < (replaceNum.length - 1); i++){
			preNum = preNum + replaceNum.charAt(i);
		}
		alert("숫자가 아닙니다.\n\n0-9의 정수만 허용합니다.");
	}
	
	if(replaceNum == 0){
		
		if(preNum != ""){
			alert("첫자리 0은 허용하지 않습니다.");
		}
		preNum = "";
	}
	return preNum;
}
//콤마제거
function unNumberFormat(num) 
{
	return (num.replace(/\,/g,""));
} 
