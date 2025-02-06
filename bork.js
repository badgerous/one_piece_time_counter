jQuery(function () {

  var episodes_left;
  var hours_left;
  var minutes_left;
  var days_left;

  var filler_list = [54, 55, 56, 57, 58, 59, 60, 98, 99, 102, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 220, 221, 222, 223, 224, 225, 279, 280, 281, 282, 283, 291, 292, 303, 317, 318, 319, 326, 327, 328, 329, 330, 331, 332, 333, 334, 335, 336, 382, 383, 384, 406, 407, 426, 427, 428, 429, 457, 458, 492, 542, 575, 576, 577, 578, 590, 626, 627, 747, 748, 749, 750, 780, 781, 782, 895, 896, 907, 1029, 1030, 1123];

  if (localStorage.getItem("current_episode")) $('#current_ep').val(localStorage.getItem("current_episode"));
  if (localStorage.getItem("episodes_count")) $('#total_ep').val(localStorage.getItem("episodes_count"));
  if (localStorage.getItem("hours_per_day")) $('#hours_per_day').val(localStorage.getItem("hours_per_day"));
  if (localStorage.getItem("skip_filler")) $('#skip_filler').prop("checked", localStorage.getItem("skip_filler") == "checked" ? true : false);
  if (localStorage.getItem("skip_op_ed")) $('#skip_op_ed').prop("checked", localStorage.getItem("skip_op_ed") == "checked" ? true : false);

  var current_episode = $('#current_ep').val();
  var episodes_count = $('#total_ep').val();
  var hours_per_day = $('#hours_per_day').val();
  var skip_filler = $('#skip_filler').prop('checked') ? true : false;
  var episode_length = $('#skip_op_ed').prop('checked') ? 20 : 24;

  calculate();

  $('#calculate').on('click', function () {
    calculate();
  })

  $('#current_ep').on('change', function () {
    if (/^\d+$/.test($('#current_ep').val())) {
      current_episode = $('#current_ep').val();
      localStorage.setItem("current_episode", current_episode);
    }
  })

  $('#total_ep').on('change', function () {
    if (/^\d+$/.test($('#total_ep').val())) {
      if (episodes_count > current_episode) {
        episodes_count = $('#total_ep').val();
        localStorage.setItem("episodes_count", episodes_count);
      }
    }
  })

  $('#hours_per_day').on('change', function () {
    if (/^\d+$/.test($('#hours_per_day').val())) {
      hours_per_day = $('#hours_per_day').val();
      localStorage.setItem("hours_per_day", hours_per_day);
    }
  })

  $('#skip_filler').on('change', function () {
    skip_filler = $('#skip_filler').prop('checked') ? true : false;
    localStorage.setItem("skip_filler", $('#skip_filler').prop('checked') ? "checked" : "unchecked");
  })

  $('#skip_op_ed').on('change', function () {
    episode_length = $('#skip_op_ed').prop('checked') ? 20 : 24;
    localStorage.setItem("skip_op_ed", $('#skip_op_ed').prop('checked') ? "checked" : "unchecked");
  })

  function calculate() {

    if (!current_episode) return
    if (!episodes_count) return
    if (!hours_per_day) return
    if (episodes_count < current_episode) return

    episodes_left = episodes_count - current_episode;

    if (skip_filler) {
      const filler_left = filler_list.filter((ep) => ep > current_episode);
      episodes_left = episodes_count - current_episode - filler_left.length;
    }

    var all_minutes_left = episodes_left * episode_length;
    hours_left = Math.floor(all_minutes_left / 60);
    minutes_left = all_minutes_left % 60;
    days_left = hours_left % hours_per_day > 0 ? Math.floor(hours_left / hours_per_day) + 1 : Math.floor(hours_left / hours_per_day);

    $('#ep_left').text(episodes_left);
    $('#time_left').text(hours_left + " hours and " + minutes_left + " minutes");
    $('#days_left').text(days_left);
  }

})