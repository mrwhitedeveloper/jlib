function validator(formName, rulesList) {
    jQuery(formName).validate({
        rules: rulesList,
        errorElement: 'span',
        errorPlacement: function(error, element) {
            error.addClass('invalid-feedback');
            element.closest('.form-group').append(error);
        },
        highlight: function(element, errorClass, validClass) {
            $(element).addClass('is-invalid');
        },
        unhighlight: function(element, errorClass, validClass) {
            $(element).removeClass('is-invalid');
        }
    });
}

function resetForm() {

}

function singleRow(frm, url, callback) {
    $.ajax({
        type: 'POST',
        url: url,
        data: frm,
        success: function(resp) {
            callback(resp);
        },
        error: function() {
            callback("error");
        }
    });
}

function saveData(frm, url, callback) {
    $.ajax({
        type: 'POST',
        url: url,
        data: frm,
        success: function(status) {
            if (status.code == 1) {
                $.dreamAlert({
                    'type': 'success',
                    'message': 'Operation completed!',
                    'position': 'right',
                    'summary': 'Data Submitted'
                });
                callback(1);
            }
        },
        error: function() {
            $.dreamAlert({
                'type': 'error',
                'message': 'Data Not Saved',
                'position': 'right',
                'summary': 'Data Submitted'
            });
            callback(2);
        }
    });
    $("#action").val("create");
}

function deleteData(did, url, callback) {
    $.ajax({
        type: 'POST',
        url: url,
        data: {
            id: did,
            action: 'delete'
        },
        beforeSend: function() {},
        success: function(status) {
            if (status.code == 1) {
                $.dreamAlert({
                    'type': 'success',
                    'message': 'Data deleted Successfully!',
                    'position': 'right',
                    'summary': 'Data Submitted'
                });
            }
            callback(1);
        },
        error: function() {
            $.dreamAlert({
                'type': 'success',
                'message': 'Data not deleted !',
                'position': 'right',
                'summary': 'Data Submitted'
            });
            callback(2);
        }
    });
}
