/* eslint-disable prefer-arrow-callback */
/* eslint-disable object-shorthand */
/* eslint-disable no-plusplus */
/* eslint-disable vars-on-top */
/* eslint-disable no-var */

var avatars = [];

var renderAvatar = function () {
  $('.avatars').empty();

  for (var i = 0; i < avatars.length; i++) {
    var source = $('#avatar-template').html();
    var template = Handlebars.compile(source);
    var newHTML = template(avatars[i]);
    $('.avatars').append(newHTML);
  }
};

var addAvatar = function (data) {
  avatars.push({
    login: data.author.login,
    avatarURL: data.author.avatar_url,
  });
  renderAvatar();
};

var fetch = function (sha) {
  $.ajax({
    method: 'GET',
    url: 'https://api.github.com/repos/facebook/react/commits/' + sha,
    dataType: 'json',
    success: function (data) {
      addAvatar(data);
      $('.loading-img').css('display', 'none');
      $('.results-header').css('display', 'block');
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(textStatus);
    },
  });
};

// on click handler
$('.search').on('click', function () {
  $('.loading-img').css('display', 'block');
  var shaVal = $('#search-query').val().toString();
  fetch(shaVal);
});
