$(document).ready(function () {
  var $ccForm = $('.cc_form');

  $ccForm.on('submit', submitHandler);

  function submitHandler (event) {
    var $form = $(event.target);
    $form.find('input[type="submit"]').prop('disabled', true);

    if (Stripe) {
      Stripe.card.createToken($form, stripeResponseHandler);
    } else {
      show_error("Failed to process card. Reload page.");
    }
    return false;
  }

  function stripeResponseHandler (status, response) {
    var token;

    if (response.error) {
      show_error(response.error.message);
      $ccForm.find('input[type="submit"]').prop('disabled', false);
    } else {
      token = response.id;
      $ccForm.append($('<input type="hidden" name="payment[token]" />').val(token));
      $('[data-stripe]').remove();
      $ccForm.get(0).submit();
    }
    return false;
  }

  function show_error (message) {
    if ($('#flash-messages').size() < 1) {
      $('div.container.main div:first').prepend('<div id="flash-messages"></div>');
    }
    $('#flash-messages').html('<div class="alert alert-warning"><a class="close" data-dismiss="alert">&times;</a><div id="flash_alert">' + message + '</div></div>');
    $('.alert').delay(5000).fadeOut(3000);
    return false;
  }

});
