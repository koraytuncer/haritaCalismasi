$("#haritaIlce").on("change", function (event) {
    var ilceKor = $("#haritaIlce option:selected").text();
    $('#aramaKutusu').val(ilceKor)
    $('#aramaKutusu').trigger('keyup')
    $('#aramaKutusu').val("")
})
$('#aramaKutusu').keyup(function () {

    if ($('#aramaKutusu').val().length < 2) {
        var tg = $('.sonucEleman');
        tg.show();
        return;
    }
    $('.sonucEleman').hide();
  
    var txt = $('#aramaKutusu').val();
    
    $('.sonucEleman').each(function () {
        if ($(this).text().toLocaleUpperCase('tr-TR').indexOf(txt.toLocaleUpperCase('tr-TR')) != -1) {
            $(this).show();
        }
    });
    
  });


  