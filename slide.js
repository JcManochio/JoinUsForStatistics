
// ====== ATIVAÇÃO NAVBAR ========== //

$(document).ready(function(){
    $('.sidenav').sidenav();
  });


// ====== ATIVAÇÃO SLIDE ========== //

$(document).ready(function(){
    $('.slider').slider();
  });

// ====== ATIVAÇÃO EFEITO SCROLL ========== //   
   $(document).ready(function(){
    $('.scrollspy').scrollSpy({
    	scrollOffset:0
    });
  });
 
// ====== ATIVAÇÃO EFEITO PARALLAX ========== //       
  $(document).ready(function(){
    $('.parallax').parallax();
  });  

// ====== ATIVAÇÃO INPUT ========== //  
 
  $(document).ready(function() {
    $('input#nome, textarea#text').characterCounter();
  });

   $(document).ready(function(){
    $('.modal').modal();
  });
        
// ====== ATIVAÇÃO INPUT SELECT ========== //  
$(document).ready(function(){
    $('select').formSelect();
  });


// ====== BOTÃO DOWNLOAD ========== //  
 
 $(document).on('change', '.file-field input[type="file"]', function () {
    var file_field = $(this).closest('.file-field');
    var path_input = file_field.find('input.file-path');
    var files      = $(this)[0].files;      
    var file_names = [];
    for (var i = 0; i < files.length; i++) {
        file_names.push(files[i].name);
    }
    path_input.val(file_names.join(", "));
    path_input.trigger('change');
});
 // ====== ESCONDER SELECT INPUT ========== //  
   function exibir_ocultar(val) {
      if(val.value == 'decil') {
      
        document.getElementById('perc').style.display = 'none';
        document.getElementById('dec').style.display = 'block';
      }
      else {
        document.getElementById('perc').style.display = 'block';
        document.getElementById('dec').style.display = 'none';
      }
};

// ====== ESCONDER CARDS  ========== // 

$(document).ready(function() {
      //ELEMENTOS QUE INICIAM OCULTOS
      $(document).ready(function(){	
            $('#tabel').hide();
            $('#distNormal').hide();
            $('#distBinominal').hide();
            $('#distUniforme').hide();
            $('#correlacao').hide();
            $('#espnorm').hide();
            $('#espbin').hide();
            $('#espuni').hide();
            $('#espcorre').hide();
            $('#tabbin').hide();
      });
    //ELEMENTOS QUE INICIAM OCULTOS
      $('#btnCal').click( function(){
            $('#tabel').fadeIn();
          });
    //MOSTRAR E OCULTAR ELEMENTOS 
      $('#efeitoNormal').click( function(){
              $('#distNormal').fadeIn();
              $('#espnorm').fadeIn();
          });
          $('#efeitoBinomial').click( function(){
              $('#distBinominal').fadeIn();
              $('#espbin').fadeIn();
          });
          $('#efeitoUniforme').click( function(){
              $('#distUniforme').fadeIn();
              $('#espuni').fadeIn();
          });
          $('#efeitoCorrelacao').click( function(){
            $('#correlacao').fadeIn();
            $('#espcorre').fadeIn();
          });
          $('#btncalcbin').click( function(){
            $('#tabbin').fadeIn();
          });
               //Esconde input de ordenação  
        $('#ocultaord').hide();
        $('#tipocalc').change(function() {
          if ($('#tipocalc').val() == 'Qualitativa Ordinal') {
            $('#ocultaord').show();
          } else {
            $('#ocultaord').hide();
          }
        });   
});