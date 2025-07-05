$(function () {
  const $img = $('#imageResizable');

  // Valeurs initiales
  let initialWidth = $img.width();
  let initialHeight = $img.height();

  $('#sliderW').slider({
    min: 50,
    max: 600,
    value: initialWidth,
    slide: function (event, ui) {
      $img.width(ui.value);
    },
  });

  $('#sliderH').slider({
    min: 50,
    max: 600,
    value: initialHeight,
    slide: function (event, ui) {
      $img.height(ui.value);
    },
  });
});