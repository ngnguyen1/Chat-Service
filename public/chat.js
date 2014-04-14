var message, inp;
$(document).ready(function() {
    message = $("#messageInput");
    $("#alertError").hide();
    $('#modalPseudo').modal('toggle');
    $('#pseudoSubmit').click(function() {
        setConnect();
    });
    checkInput();
    message = $('#messageInput');
});

var socket = io.connect();

socket.on('connect', function() {
    console.log('connected');
});
socket.on('greeting', function(data) {
    //alert(data);
});

socket.on('nUsers', function(u) {
    $("#numUser").html(u.nb + " ket noi");
});


function setConnect() {
    inp = $('#pseudoInput').val();
    //if ($('#pseudoInput').val() != "") {
    if ($.trim(inp) != "") {
        socket.emit('setNickName', $('#pseudoInput').val());
        socket.on('status', function(data) {
            if (data == "ok") {
                $("#alertError").hide();
                $("#modalPseudo").modal('hide');
                
                $("#luser").append(inp);
            } else {
                $("#alertError").html("The user " + inp + " realy taken!!");
                $("#alertError").slideDown();
            }
        });
        //$('#modalPseudo').modal('hide');
    } else {
        alert("Please enter your nick name to chat!!");
    }
}

function checkInput() {
    $("#messageInput").keyup(function(e) {
        var value = $( this ).val();
        if(e.keyCode == 13) {
            if ($.trim(value) == "") {
                alert("Ban phai nhap vao tin nhan");
            } else {
                sendMess();
            }
        }
    });
}


function sendMess() {
    if (message != "") {
        alert(inp);
    } else {
        alert("failed");
    }
}
