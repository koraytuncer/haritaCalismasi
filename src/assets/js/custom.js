$('#aramaKutusu').keyup(function () {

  if ($('#aramaKutusu').val().length < 2) {
      var tg = $('.sonucEleman');
      tg.show();
      return;
  }
  $('.sonucEleman').hide();

  var txt = $('#aramaKutusu').val();
  $('.sonucEleman').each(function () {
      if ($(this).text().toUpperCase().indexOf(txt.toUpperCase()) != -1) {
          $(this).show();
      }
  });
  
});