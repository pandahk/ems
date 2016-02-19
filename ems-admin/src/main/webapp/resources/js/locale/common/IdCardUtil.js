function getYearByIdCard(idCard) {
    if(idCard == "") {
        return "";
    }
    if (idCard.length==15 ) {
        return idCard.substr(6,2);
    } else if(idCard.length==18) {
        return idCard.substr(6,4);
    }
    return "";
}

function getMonthByIdCard(idCard) {
    if(idCard == "") {
        return "";
    }
    if (idCard.length==15 ) {
        return idCard.substr(8,2);
    } else if(idCard.length==18) {
        return idCard.substr(10,2);
    }
    return "";
}

function getDayByIdCard(idCard) {
    if(idCard == "") {
        return "";
    }
    if (idCard.length==15 ) {
        return idCard.substr(10,2);
    } else if(idCard.length==18) {
        return idCard.substr(12,2);
    }
    return "";
}

function getSexByIdCard(idCard){
    if(idCard == "") {
        return "";
    }
    var sex = "";
    if (idCard.length==15 ) {
        sex = idCard.substr(14,1);
    } else if(idCard.length==18) {
        sex = idCard.substr(16,1);
    }
    if(sex%2==0) {
        return "女";
    }else if(sex%2==1) {
        return "男"
    }
    return "";
}


function getAgeByIdCard(idCard) {
    if(idCard == "") {
        return "";
    }
    if (idCard.length==15 ) {
        return new Date().getFullYear()-1900-idCard.substr(6,2);
    } else if(idCard.length==18) {
        return new Date().getFullYear()-idCard.substr(6,4);
    }
    return "";
}

