$(function(){

  function buildMessage(message){
    image = ( message.image )?`<img class= "lower-message__image" src=${message.image} >` : "";
    let html = `<div class="message">
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
      let html = buildMessage(message);
      $('.messages').append(html);
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      $('form')[0].reset();
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました");
    })
    return false;
  })
});