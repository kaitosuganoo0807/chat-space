$(function(){

  function buildHTML(message){
    image = ( message.image )?`<img class= "lower-message__image" src=${message.image} >` : "";
    let html = `<div class="message", data-message-id="${message.id}">
                  <div class="message__upper-info">
                    <div class="message__upper-info__talker">
                      ${message.name}
                    </div>
                    <div class="message__upper-info__date">
                     ${message.created_at}
                    </div>
                  </div>
                  <div class="lower-message">
                   <p class="lower-message__content">
                    ${message.content}
                   </p>
                   ${image}
                  </div>
                 </div>`
    $('.messages').append(html);
  }

  $('.new_message').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      let html = buildHTML(message);
      $('.messages').append(html);
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      $('.new_message')[0].reset();
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました");
    })
    return false;
  })

  let reloadMessages = function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)) {
      let last_message_id = $('.message:last').data("message-id");
      $.ajax({
        url: "api/messages",
        type: 'get',
        dataType: 'json',
        data: {last_id: last_message_id}
      })
      .done(function(messages){
        let insertHTML = '';
        messages.forEach(function(message){
          insertHTML = buildHTML(message);
          $('.messages').append(insertHTML);
          $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
        })
      })
      .fail(function(){
        alert("自動更新に失敗しました");
      });
    };
  };
setInterval(reloadMessages, 7000);
});