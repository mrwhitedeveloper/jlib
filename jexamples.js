$(document).ready(function() {

    $("#btnReset,#btnCloseModal,#btnCloseModalTop").click(function(e) {
        e.preventDefault();
        $("#frmid")[0].reset();
    });

    //table row edit click
    $(document).on("click", '#btnEdit', function() {
        $("#id").val($(this).attr("data-id"));
        $("#first_name").val($(this).attr("data-first_name"));
        $('input[name="gender"][value="' + $(this).attr("data-gender") + '"]').prop('checked',
            true);
        $('#myModal').modal('show');
    });


    //delete click
    $(document).on("click", '#btnDelete', function() {
        var jid = $(this).attr("data-id");
        $("#delete_id").val($(this).attr("data-id"));
        $('#confirmDelete').modal('show');
    });



    //confirm delete click
    $(document).on("click", '#confirm_delete_ok', function() {
        //var jid=$(this).attr("data-id");
        var jid = $("#delete_id").val();
        deleteData(jid, 'Record.php');
        $("#delete_id").val("");
        $('#confirmDelete').modal('hide');
    });


    //cancel delete click
    $(document).on("click", '#delete_cancel', function() {
        $("#delete_id").val("");
    });


    //table row click
    $(document).on("click", '#btnCheck', function() {
        var sid = $(this).attr("data-id");
        $.ajax({
            url: 'Check.php',
            type: 'post',
            data: {
                id: sid
            },
            success: function(response) {
                var status = JSON.parse(response);
                if (status.code == 1) {
                    alert("Updated");
                } else {
                    alert("Error");
                }
            }
        });
    });



    //get data
    function getRollNo(bid) {
        $.getJSON("RollNo.php?id=" + bid, function(data) {
            $("#roll_no").val('');
            $.each(data, function(key, val) {
                $("#roll_no").val(val.roll);
            });
        });
    }


    //on change
    $(document).on('change', '#User', function() {
        var uid = $(this).find(":selected").val();
        getDetails(uid);

    });

    //custom datatable filter
    $('#searchByName').keyup(function() {
        dataTable.draw();
    });

    //refresh data
    function refreshData() {
        $('#dtable').DataTable().ajax.reload();
        $("#frmid")[0].reset();
    }


    //upload file with data
    //       <div id='preview'></div>
    $('#upload').click(function() {

        var fd = new FormData();
        var files = $('#file')[0].files[0];
        fd.append('file', files);
        fd.append('sid', $("#sid").val())

        // AJAX request
        $.ajax({
            url: 'Profile.php',
            type: 'post',
            data: fd,
            contentType: false,
            processData: false,
            success: function(response) {
                var status = JSON.parse(response);
                if (status.code == 1) {
                    // Show image preview
                    $('#preview').empty();
                    $('#preview').append("<img src='" + status.location +
                        "' width='100' height='100' style='display: inline-block;'>"
                    );
                } else {
                    alert('file not uploaded');
                }

            }
        });
    });


    //upload form with 
    /* <div class="progress">
        <div class="progress-bar"></div>
        </div>
      */
    $("#frmid").on('submit', (function(e) {
        e.preventDefault();
        var formData = new FormData(this);

        if ($("#frmid").valid()) {
            $.ajax({
                xhr: function() {
                    var xhr = new window.XMLHttpRequest();
                    xhr.upload.addEventListener("progress", function(evt) {
                        if (evt.lengthComputable) {
                            var percentComplete = ((evt.loaded / evt.total) * 100);
                            $(".progress-bar").width(percentComplete + '%');
                            $(".progress-bar").html(percentComplete + '%');
                        }
                    }, false);
                    return xhr;
                },
                beforeSend: function() {
                    $(".progress-bar").width('0%');
                    $('#uploadStatus').html('<img src="../assets2/LoaderIcon.gif"/>');
                },
                type: 'POST',
                url: 'Upload.php',
                data: fdata,
                enctype: 'multipart/form-data',
                processData: false, // Important!
                contentType: false,
                cache: false,
                success: function(resp) {
                    console.log(resp);

                    var status = JSON.parse(resp);
                    if (status.code == 1) {
                        alert("data saved");
                        //$('#importModal').modal('hide');
                    }
                    refreshData();
                    $(".progress-bar").width('0%');
                    $('#uploadStatus').html('');
                },
                error: function() {
                    $.dreamAlert({
                        'type': 'error',
                        'message': 'Data Not Saved',
                        'position': 'right',
                        'summary': 'Data Submitted'
                    });
                }
            });
        }
        //$('#frmid').trigger("reset");
    }));



});
