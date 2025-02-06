jQuery(function () {

  var episodes_left;
  var hours_left;
  var minutes_left;
  var days_left;

  var filler_count = 95;
  var current_episode = $('#current_ep').val();
  var hours_per_day = $('#hours_per_day').val();
  var episode_length = $('#skip_op_ed').prop('checked') ? 20 : 24;
  var episodes_count = $('#skip_filler').prop('checked') ? Number($('#total_ep').val()) - filler_count : Number($('#total_ep').val());
  
  calculate();

  $('#calculate').on('click', function () {
    calculate();
  })

  $('#current_ep').on('change', function () {
    current_episode = $('#current_ep').val();
  })

  $('#total_ep').on('change', function () {
    if ($('#skip_filler').prop('checked')) {
      episodes_count = Number($('#total_ep').val()) - filler_count;
    } else {
      episodes_count = Number($('#total_ep').val());
    }
  })

  $('#hours_per_day').on('change', function () {
    hours_per_day = $('#hours_per_day').val();
  })

  $('#skip_filler').on('change', function () {
    if ($('#skip_filler').prop('checked')) {
      episodes_count = Number($('#total_ep').val()) - filler_count;
    } else {
      episodes_count = Number($('#total_ep').val());
    }
  })

  $('#skip_op_ed').on('change', function () {
    if ($('#skip_op_ed').prop('checked')) {
      episode_length = 20;
    } else {
      episode_length = 24;
    }
  })

  function calculate() {
    episodes_left = episodes_count - current_episode;
    var all_minutes_left = episodes_left * episode_length;
    hours_left = Math.floor(all_minutes_left / 60);
    minutes_left = all_minutes_left % 60;
    days_left = hours_left % hours_per_day > 0 ? Math.floor(hours_left / hours_per_day) + 1 : Math.floor(hours_left / hours_per_day);

    $('#ep_left').text(episodes_left);
    $('#time_left').text(hours_left + " hours and " + minutes_left + " minutes");
    $('#days_left').text(days_left);
  }

})