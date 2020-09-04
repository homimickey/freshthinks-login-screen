function setCookie(cname, cvalue, exhrs) {
    var d = new Date();
    d.setTime(d.getTime() + exhrs * 60 * 60 * 1000);
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export default setCookie