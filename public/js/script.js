$(function () {
    $("#name").on('input', function () {
        var ok = checkUpperCase($(this).val());
        if (ok == 1) {
            $("#name").get(0).setCustomValidity("First letter of each word must be capitalized");
            $("#name").get(0).reportValidity();
        }
        else {
            $("#name").get(0).setCustomValidity("");
            $("#name").get(0).reportValidity();
        }
    });
    $("#username").on('input', function () {
        var ok = checkUserName($(this).val());
        if (ok == 0) {
            $("#username").get(0).setCustomValidity("");
            $("#username").get(0).reportValidity();
        }
        else if (ok == 1) {
            $("#username").get(0).setCustomValidity("Username must not contain space");
            $("#username").get(0).reportValidity();
        }
        else if (ok == 2) {
            $("#username").get(0).setCustomValidity("Username must contain only letters, numbers and underscore characters");
            $("#username").get(0).reportValidity();
        }
        else if (ok == 3) {
            $("#username").get(0).setCustomValidity("Username must not start with number");
            $("#username").get(0).reportValidity();
        }
    });
    $("#password").on('input', function () {
        var ok = checkPassWord($(this).val());
        if (ok == 1) {
            $("#password").get(0).setCustomValidity("Password must has at least 6 characters");
            $("#password").get(0).reportValidity();
        }
        else {
            $("#password").get(0).setCustomValidity("");
            $("#password").get(0).reportValidity();
        }
    });
    $("#retype_password").on('input', function () {
        var ok = checkPassWordRetype($(this).val(), $("#password").val());
        if (ok == 1) {
            $("#retype_password").get(0).setCustomValidity("Password does not match");
            $("#retype_password").get(0).reportValidity();
        }
        else {
            $("#retype_password").get(0).setCustomValidity("");
            $("#retype_password").get(0).reportValidity();
        }
    });
    $("#addCatForm").submit(function () {
        var toast = document.getElementById('addCatToast');
        var bsToast = new bootstrap.Toast(toast);
        bsToast.show();
    });
    $("#delCatForm").submit(function () {
        var toast = document.getElementById('delCatToast');
        var bsToast = new bootstrap.Toast(toast);
        bsToast.show();
    });
    $("#editCatForm").submit(function () {
        var toast = document.getElementById('editCatToast');
        var bsToast = new bootstrap.Toast(toast);
        bsToast.show();
    });
    $("#addProForm").submit(function () {
        var toast = document.getElementById('addProToast');
        var bsToast = new bootstrap.Toast(toast);
        bsToast.show();
    });
    $("#editProForm").submit(function () {
        var toast = document.getElementById('editProToast');
        var bsToast = new bootstrap.Toast(toast);
        bsToast.show();
    });
    document.getElementById('FileE').addEventListener("change", event =>showPreview(event));
    $("#delProForm").submit(function () {
        var toast = document.getElementById('delProToast');
        var bsToast = new bootstrap.Toast(toast);
        bsToast.show();
    });
})

function checkUpperCase(name) {
    var splitStr = name.split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        if (splitStr[i].charAt(0) != splitStr[i].charAt(0).toUpperCase()) {
            return 1;
        }
    }
    return 0;
}

function checkUserName(name) {
    if (name.indexOf(' ') >= 0) {
        return 1;
    }
    if (!(/^[A-Za-z0-9_]*$/.test(name))) {
        return 2;
    }
    if (name.charAt(0) >= '0' && name.charAt(0) <= '9') {
        return 3;
    }
    return 0;
}

function checkPassWord(password) {
    if (password.length < 6) {
        return 1;
    }
    else {
        return 0;
    }
}

function checkPassWordRetype(pass_retype, pass) {
    if (pass_retype.length > 0 && pass != pass_retype) {
        return 1;
    }
    else {
        return 0;
    }
}
function showPreview(event) {
    if (event.target.files.length > 0) {
        var src = URL.createObjectURL(event.target.files[0]);
        var preview = document.getElementById("file-ip-1-preview");
        preview.src = src;
        preview.style.display = "block";
    }
}