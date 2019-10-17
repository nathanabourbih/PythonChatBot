function submitName() {
    if ($('#name').val().length > 0) {
        $('#chatWindow').show();
        $('#getName').hide();
        $(".write_msg").focus();

        appendResponse("Hello, how are you today?");
    } else {
        alert("Please type a name.");
        $("#name").focus();
    }
}

function submitMessage() {
    appendMessage($(".write_msg").val());

    $.ajax({
        url: '/api/say',
        data: JSON.stringify({ content: $(".write_msg").val(), user: $("#name").val() }),
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (response) {
            appendResponse(response.content);
        },
        error: function (error) {
            console.log(error);
        }
    });

    $(".write_msg").val("");
}

function appendMessage(message) {
    var messageHTML = `<div class="outgoing_msg">
                                <div class="sent_msg">
                                    <p>@message</p>
                                    <span class="time_date"> @when</span>
                                </div>
                            </div>`;

    var time = new Date().toLocaleTimeString('en-US', {
        hour12: false,
        hour: "numeric",
        minute: "numeric"
    });

    $(".msg_history").append(messageHTML.replace("@when", time).replace("@message", message));
    $('.msg_history').scrollTop($('.msg_history')[0].scrollHeight);
}

function appendResponse(message) {
    var messageHTML = `
    <div class="incoming_msg">
        <div class="incoming_msg_img"> <img src="/static/assets/img/user-profile.png" alt=""> </div>
            <div class="received_msg">
                <div class="received_withd_msg">
                    <p>@message</p>
                    <span class="time_date"> @when</span>
                </div>
            </div>
        </div>`;

    var time = new Date().toLocaleTimeString('en-US', {
        hour12: false,
        hour: "numeric",
        minute: "numeric"
    });

    $(".msg_history").append(messageHTML.replace("@when", time).replace("@message", message));
    $('.msg_history').scrollTop($('.msg_history')[0].scrollHeight);
}

$(document).ready(function () {
    $("#name").focus();
    $(window).bind('keypress', function (e) {
        if (e.keyCode === 13) {
            if ($('#chatWindow').is(":visible")) {
                submitMessage();
            }
            else {
                submitName();
            }
        }
    });

    $('#namebutton').click(function () {
        submitName();
    });

    $('.msg_send_btn').click(function () {
        appendMessage($(".write_msg").val());
        $(".write_msg").val("");
    });

    $('#chatWindow').hide();
    $('#getName').show();

});