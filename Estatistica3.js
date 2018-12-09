function login(){
    var usuario = (document.getElementById("usuario").value);
    var senha = (document.getElementById("senha").value);
    if (usuario == "admin" && senha == "admin123"){
        window.location.href = "index3.html"
    }else 
        alert("Usuário ou Senha inválidos.")
    
}
function getRandomIntInclusive(CSVsaida) {
    var vetor = new Array(); var vetorID = []; var dig = []; 
    var quant = []; var fr = []; var grafico = null;
    var tipocalc; var vetletra = []; var letra = [];
    var num; var nome; var vetporc = []; var radio = 0;

    radio = (document.getElementById("amostra").checked);
    console.log(radio)
    //define nome variavel
    nome = (document.getElementById("nome").value);
    //Fim nome variavel
    //recebe vetor
    CSVsaida = (document.getElementById("CSVsaida2").value);
    //Fim recebe vetor
    //recebe Tipo de calculo
    tipocalc = document.getElementById("tipocalc").value
    //fim tipo de calculo
    //Separa vetor
    vetor = CSVsaida.split(";").map(Number);
    letra = CSVsaida.split(';');
    //Fim Separa
    //ordena letra
    vetletra = letra.sort();
    //fim ordena letra
    //Copia para vetorID
    for (i=0;i<vetor.length;i++){
        vetorID[i]=vetor[i];
    }   

    //Fim cópia
    //Define letra ou Número
    
    switch (tipocalc) {
        case "Qualitativa Nominal":
            vetporc = porcentilquali();
            qualiNom(vetletra, dig, quant);
            geratabledis(dig, fr, quant, nome);
            qualNom(vetletra, quant, dig);
            calcMedSepnom(vetletra, vetporc, dig);
            desenhaGraficoQuali(dig, quant, grafico);
            break;
        case "Qualitativa Ordinal":
            $("#asda").show();
            vetporc = porcentilquali();
            qualiNom(vetletra, dig, quant);
            geratabledis(dig, fr, quant, nome);
            qualNom(vetletra, quant, dig);
            calcMedSepnom(vetletra, vetporc, dig);
            desenhaGraficoQuali(dig, quant, grafico);
            break;
        case "Quantitativa Discreta":
            vetporc = porcentil();
            ordenanúmeros(vetorID);
            quantDiscreta(vetorID, dig, quant);
            geratabledis(dig, fr, quant, nome);
            quantDis(vetorID, quant, dig, radio);
            calcMedSepDisc(vetorID, vetporc, dig);
            desenhaGraficoDisc(dig, quant, grafico);
            break;
        case "Quantitativa Conti­nua":
            vetporc = porcentil();
            ordenanúmeros(vetorID)
            quantCont(vetorID, nome, radio, vetporc)
            break;
    }
}
//Ordana números
function ordenanúmeros(vetorID){
    for(var i=0; i<vetorID.length;i++){
        var aux = vetorID[i];
        var j = i - 1;
        while((j>=0) && (aux<vetorID[j])){
                vetorID[j+1] = vetorID[j];
                j--;
        }
    vetorID[j+1] = aux;             
    }
    var j = -1;
}//Fim ordena números

//todos calculos qualitativa
//separação digitos Qualitativa Nominal
function qualiNom(vetletra, dig, quant){
    var digatual = -1; var j = -1;
    //Separação dos Digitos
    for(i=0;i<vetletra.length;i++){
        if(vetletra[i] != digatual){
            j++;
            digatual = vetletra[i];
            dig[j] = digatual; 
            quant[j] = 1;
        }else{
            quant[j]++;
        }
    }//Fim separação
    console.log(vetletra)
    console.log(dig)
    console.log(quant)
}

function qualNom (vetletra, quant, dig) {
    //calcula média
    var media = 0;
    var soma = 0;
    for (var i = 0; i < quant.length; i++) {
        soma = soma + quant[i];
    }

    var x = soma / quant.length;
    media = vetletra[x.toFixed(0)]

    document.getElementById("x").innerHTML = media;

    //Inicio Moda Qualitativa Discreta
    var maiorFreq = quant[0];

    for (i in quant) {
        if (quant[i] >= maiorFreq) {
            maiorFreq = quant[i]
        }
    }
    var mo = [];
    for (i in quant) {
        if (maiorFreq == quant[i]) {
            mo.push(dig[i]);
        }
    }
    if(mo.length == vetletra.length){
        mo = "Amodal";
    }
    console.log
    document.getElementById("mo").innerHTML = mo;
//Fim Moda Qualitativa Discreta
    //Calcula mediana
    var md = -1;
    if (vetletra.length % 2 == 0) {
        var posicao = (vetletra.length)/2;
        md = (vetletra[posicao-1] + vetletra[posicao]) / 2;
        console.log(vetletra[posicao]);
    } else {
        var posicao = (vetletra.length+1)/2;
        md = vetletra[posicao-1];
    }
    document.getElementById("md").innerHTML = md;
    //Calcula desvio padrÃ£o
    var mediaA = x;
    var dp;
    var div;
    var soma = 0;
    for (i in quant) {
        var result = (dig[i] - mediaA);
        var result2 = Math.pow(result, 2) * quant[i];
        soma = soma + result2;
        }

    div = soma / (vetletra.length - 1);
    dp = Math.sqrt(div).toFixed(2);

    document.getElementById("dp").innerHTML = dp;    
}
function desenhaGraficoQuali(dig, quant, grafico){
    var ctx = document.getElementById("myChart").getContext('2d');
    if(grafico != null){
        grafico.destroy();
    }
    grafico = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: dig,
        datasets: [
            {
                label: "fr%",
                data: quant,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(245, 0, 0, 0.2)',
                    'rgba(0, 122, 245, 0.2)',
                    'rgba(234, 255, 5, 0.2)',
                    'rgba(255, 97, 5, 0.2)',
                    'rgba(5, 255, 138, 0.2)',
                    'rgba(126, 5, 255, 0.2)',
                    'rgba(255, 5, 5, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(245, 0, 0, 1)',
                    'rgba(0, 122, 245, 1)',
                    'rgba(234, 255, 5, 1)',
                    'rgba(255, 97, 5, 1)',
                    'rgba(5, 255, 138, 1)',
                    'rgba(126, 5, 255, 1)',
                    'rgba(255, 5, 5, 1)'
                ],
                borderWidth: 1
            }
        ]
    },
    });
}//fim grafico qualitativa

//Medida Separatriz
function calcMedSepnom(vetletra, vetporc, dig){
    var porcentagem = 0;
    var posicao = 0; var md = 0; 
    var aux2 = 0; var vetporc2 = [];
    var q = []; var k = []; var decil = []; var porcentil = [];

    //Quartil
    q[0] = porcentil[24];
    q[1] = " " + porcentil[49];
    q[2] = " " + porcentil[74];
    q[3] = " " + porcentil[99];
    md = q[1];
    var qt = "<table class= 'centered'>" + 
                    "<thead>" + 
                        "<tr>" +
                            "<th>  Q1 </th>" + 
                            "<th>  Q2 </th>" +
                            "<th>  Q3 </th>" +
                            "<th>  Q4 </th>" +
                        "</tr>" +
                    "</thead>";
		for(i=0;i<q.length;i++){
        	qt = qt + "<tbody>" +
                             
                                "<td>" + q[i]  + "</td>" + 
                            
                        "</tbody";  
	}
    console.log("teste Q 0" + q)
    document.getElementById("q").innerHTML = qt;
    
    //Quintil
    k[0] = porcentil[19];
    k[1] = " " + porcentil[39];
    k[2] = " " + porcentil[59];
    k[3] = " " + porcentil[79];
    k[4] = " " + porcentil[99];

    var kt = "<table class= 'centered'>" + 
                    "<thead>" + 
                        "<tr>" +
                            "<th>  K1 </th>" + 
                            "<th>  K2 </th>" +
                            "<th>  K3 </th>" +
                            "<th>  K4 </th>" +
                            "<th>  K5 </th>" +
                        "</tr>" +
                    "</thead>";
		for(i=0;i<k.length;i++){
        	kt = kt + "<tbody>" +
                             
                                "<td>" + k[i]  + "</td>" + 
                            
                        "</tbody";  
	}
    document.getElementById("k").innerHTML = kt;

    //Decil
    decil[0] = porcentil[9];
    decil[1] = " " + porcentil[19];
    decil[2] = " " + porcentil[29];
    decil[3] = " " + porcentil[39];
    decil[4] = " " + porcentil[49];
    decil[5] = " " + porcentil[59];
    decil[6] = " " + porcentil[69];
    decil[7] = " " + porcentil[79];
    decil[8] = " " + porcentil[89];
    decil[9] = " " + porcentil[99];
    
    var D=[];
    
    for(i=1;i<=10;i++){
      D[i] = "D" + i;   
    }
     var dl = "<table class= 'centered'>" + "<thead>";
     for(i=1;i<=10;i++){
            dl = dl +    
                            "<th>" + D[i] + "</th>";
                                      
     }
     dl = dl + "</thead>";
		for(i=0;i<decil.length;i++){
        	dl = dl + "<tbody>" +
                             
                                "<td>" + decil[i]  + "</td>" + 
                            
                        "</tbody";  
	}

    document.getElementById("decil").innerHTML = dl;
     //Porcentil
    for(var i = 1; i <= 100; i++){
        porcentagem = 0.01 * i;
        posicao = (vetletra.length * porcentagem).toFixed(0);
        porcentil[i-1] = vetletra[posicao -1];
    }
    for(var i=0; i<vetporc.length; i++){
        aux2 = vetporc[i]
        vetporc2[i] = porcentil[aux2-1]
    }    
    console.log(porcentil)
    console.log(vetporc);
    if(vetporc2 != ""){
        document.getElementById("porcentil").innerHTML = vetporc2;
        }else
            document.getElementById("porcentil").innerHTML = "Você não escolheu uma posição!"
}  

//Recebe posições do porcentil
function porcentilquali(){
     
    var num2 = (document.getElementById("percenter").value);
    vetporc = num2.split(";").map(Number);
    //ordena vetor de posições do porcentil
    for(var i=0; i<vetporc.length;i++){
        var aux = vetporc[i];
        var j = i - 1;
        while((j>=0) && (aux<vetporc[j])){
                vetporc[j+1] = vetporc[j];
                j--;
        }
    vetporc[j+1] = aux;             
    }
    var j = -1;
    //termina ordenação
    console.log(vetporc)
    return vetporc
}//fim Posições porcentil

//Quantitativa Discreta
function quantDiscreta(vetorID, dig, quant){
    var digatual = -1; var j = -1;
    //Separação dos Digitos
    for(i=0;i<vetorID.length;i++){
        if(vetorID[i] != digatual){
            j++;
            digatual = vetorID[i];
            dig[j] = digatual; 
            quant[j] = 1;
        }else{
            quant[j]++;
        }
    }//Fim separação
    console.log(vetorID)
    console.log(dig)
    console.log(quant)
}//Fim Quantitativa Discreta   

function quantDis(vetorID, quant, dig, radio) {
    //calcula média
    var soma = 0;
    for (var i = 0; i < vetorID.length; i++) {
        soma = soma + vetorID[i];
    }

    var x = soma / vetorID.length;

    document.getElementById("x").innerHTML = x.toFixed(2);
    document.getElementById("medianorm").value = x.toFixed(2);

    //Inicio Moda Qualitativa Discreta
    var maiorFreq = quant[0];

    for (i in quant) {
        if (quant[i] >= maiorFreq) {
            maiorFreq = quant[i]
        }
    }
    var mo = [];
    for (i in quant) {
        if (maiorFreq == quant[i]) {
            mo.push(dig[i]);
        }
    }
    if(mo.length == vetorID.length){
        mo = "Amodal";
    }
    document.getElementById("mo").innerHTML = mo;

    //Calcula mediana
    var md = -1;
    if (vetorID.length % 2 == 0) {
        var posicao = (vetorID.length)/2;
        md = (vetorID[posicao-1] + vetorID[posicao]) / 2;
        console.log(vetorID[posicao]);
    } else {
        var posicao = (vetorID.length+1)/2;
        md = vetorID[posicao-1];
    }
    document.getElementById("md").innerHTML = md;
    
    //Calcula desvio padrÃ£o
    if (radio === true){
        var mediaA = x;
        var dp;
        var div;
        var soma = 0;
        for (i in quant) {
            var result = (dig[i] - mediaA);
            var result2 = Math.pow(result, 2) * quant[i];
            soma = soma + result2;
            }

        div = soma / (vetorID.length - 1);
        dp = Math.sqrt(div).toFixed(2);

        document.getElementById("dp").innerHTML = dp;    
        document.getElementById("desvionorm").value = dp;
    }  
    else{
        var mediaA = x;
        var dp;
        var div;
        var soma = 0;
        for (i in quant) {
            var result = (dig[i] - mediaA);
            var result2 = Math.pow(result, 2) * quant[i];
            soma = soma + result2;
            }

        div = soma / vetorID.length;
        dp = Math.sqrt(div).toFixed(2);

        document.getElementById("dp").innerHTML = dp;    
        document.getElementById("desvionorm").value = dp;
    }

    //coeficiente de variação
    var cov = (dp / x) * 100
        cov = cov.toFixed(2)
        document.getElementById("cov").innerHTML = cov + "%";
}

//Medida Separatriz
function calcMedSepDisc(vetorID, vetporc, dig){
    var porcentagem = 0;
    var posicao = 0;
    var aux2 = 0; var vetporc2 = [];
    var q = []; var k = []; var decil = []; var porcentil = [];

      //Porcentil
      for(var i = 1; i <= 100; i++){
        porcentagem = 0.01 * i;
        posicao = (vetorID.length * porcentagem).toFixed(0);
        porcentil[i-1] = vetorID[posicao -1];
    }
    
    //Quartil
    q[0] = porcentil[24];
    q[1] = " " + porcentil[49];
    q[2] = " " + porcentil[74];
    q[3] = " " + porcentil[99];
    md = q[1];
    var qt = "<table class= 'centered'>" + 
                    "<thead>" + 
                        "<tr>" +
                            "<th>  Q1 </th>" + 
                            "<th>  Q2 </th>" +
                            "<th>  Q3 </th>" +
                            "<th>  Q4 </th>" +
                        "</tr>" +
                    "</thead>";
		for(i=0;i<q.length;i++){
        	qt = qt + "<tbody>" +
                             
                                "<td>" + q[i]  + "</td>" + 
                            
                        "</tbody";  
	}
    console.log("teste Q 0" + q)
    document.getElementById("q").innerHTML = qt;
    
    //Quintil
    k[0] = porcentil[19];
    k[1] = " " + porcentil[39];
    k[2] = " " + porcentil[59];
    k[3] = " " + porcentil[79];
    k[4] = " " + porcentil[99];

    var kt = "<table class= 'centered'>" + 
                    "<thead>" + 
                        "<tr>" +
                            "<th>  K1 </th>" + 
                            "<th>  K2 </th>" +
                            "<th>  K3 </th>" +
                            "<th>  K4 </th>" +
                            "<th>  K5 </th>" +
                        "</tr>" +
                    "</thead>";
		for(i=0;i<k.length;i++){
        	kt = kt + "<tbody>" +
                             
                                "<td>" + k[i]  + "</td>" + 
                            
                        "</tbody";  
	}
    document.getElementById("k").innerHTML = kt;

    //Decil
    decil[0] = porcentil[9];
    decil[1] = " " + porcentil[19];
    decil[2] = " " + porcentil[29];
    decil[3] = " " + porcentil[39];
    decil[4] = " " + porcentil[49];
    decil[5] = " " + porcentil[59];
    decil[6] = " " + porcentil[69];
    decil[7] = " " + porcentil[79];
    decil[8] = " " + porcentil[89];
    decil[9] = " " + porcentil[99];
    
    var D=[];
    
    for(i=1;i<=5;i++){
      D[i] = "D" + i;   
    }
     var dl = "<table class= 'centered'>" + "<thead>";
     for(i=1;i<=5;i++){
            dl = dl +    
                            "<th>" + D[i] + "</th>";
                                      
     }
     dl = dl + "</thead>";
		for(i=0;i<5;i++){
        	dl = dl + "<tbody>" +
                             
                                "<td>" + decil[i]  + "</td>" + 
                            
                        "</tbody" ;  
    }

    dl = dl + "<br>" + "<thead>"
    for(i=5;i<=10;i++){
        D[i] = "D" + i;   
      }

       for(i=6;i<=10;i++){
              dl = dl +    
                              "<th>" + D[i] + "</th>";
                                        
       }
       dl = dl + "</thead>" + "<br>";
       
          for(i=5;i<=9;i++){
              dl = dl + "<tbody>" +
                               
                                  "<td>" + decil[i]  + "</td>" + 
                              
                          "</tbody";  
      }

    document.getElementById("decil").innerHTML = dl;

    for(var i=0; i<vetporc.length; i++){
        aux2 = vetporc[i]
        vetporc2[i] = porcentil[aux2-1]
    }    
    var P = [];

    for(i=1;i<=100;i++){
        P[i] = "P" + i;   
      }
      console.log(P);
       var pt = "<table class= 'centered'>" + "<thead>";
       for(i=0;i<=vetporc.length-1;i++){
              pt = pt +    
                              "<th>" + P[vetporc[i]] + "</th>";
                                        
       }
       console.log("test Pt1 " + pt)
       pt = pt + "</thead>";
          for(i=0;i<vetporc.length;i++){
              pt = pt + "<tbody>" +
                               
                                  "<td>" + vetporc2[i]  + "</td>" + 
                              
                          "</tbody";  
      }
      console.log("test pt2 " + pt)
    console.log(porcentil)
    console.log(vetporc);
    if(pt = undefined){
    document.getElementById("porcentil").innerHTML = pt;
    //fim porcentil
    }else
        document.getElementById("porcentil").innerHTML = "Você não escolheu uma posição!"
}  

//Recebe posições do porcentil
function porcentil(){
    var num2 = (document.getElementById("percenter").value);
    vetporc = num2.split(";").map(Number);
    //ordena vetor de posições do porcentil
    for(var i=0; i<vetporc.length;i++){
        var aux = vetporc[i];
        var j = i - 1;
        while((j>=0) && (aux<vetporc[j])){
                vetporc[j+1] = vetporc[j];
                j--;
        }
    vetporc[j+1] = aux;             
    }
    var j = -1;
    //termina ordenação
    console.log(vetporc)
    return vetporc
}//fim Posições porcentil

  //geração da tabela Discreta
function geratabledis(dig, fr, quant, nome){
    var fac = 0; var facp = 0; var soma = 0;
    for(i=0;i<quant.length;i++){
        soma = soma + quant[i];
    }
    for(j=0;j<quant.length;j++){
        fr[j] = (quant[j] / soma) * 100;
    }
    var vetabdis = [];
    var vetabdis = "<table class= 'centered'>" + 
                    "<thead>" + 
                        "<tr>" +
                            "<th>" + nome + "</th>" + 
                            "<th> Frequência </th>" + 
                            "<th> Fr% </th>" + 
                            "<th> Fac </th>" + 
                            "<th> Fac% </th>" +
                        "</tr>" +
                    "</thead>";
    for(i=0;i<dig.length;i++){
        fac = fac + quant[i];
        facp = facp + fr[i];
        vetabdis = vetabdis + "<tbody>" +
                            "<tr>" + 
                                "<td>" + dig[i] + "</td>" + 
                                "<td>" + quant[i] + "</td>" + 
                                "<td>" + fr[i].toFixed(2) + "%" + "</td>" + 
                                "<td>" + fac + "</td>" + 
                                "<td>" + facp.toFixed(2) + "%" + "</td>" + 
                            "</tr>" +
                        "</tbody";  
    }
    vetabdis = vetabdis + "</table>";

    document.getElementById("saida").innerHTML = vetabdis;
}   //Fim tabela Discreta
//Inicio Grafico Discreta
function desenhaGraficoDisc(dig, quant, grafico){
    var ctx = document.getElementById("myChart").getContext('2d');
    if(grafico != null){
        grafico = [];
        console.log("entrou")
    }
    //pesquisar como definir inicio 0
    grafico = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: dig,
        datasets: [
            {
                label: "fr%",
                data: quant,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(245, 0, 0, 0.2)',
                    'rgba(0, 122, 245, 0.2)',
                    'rgba(234, 255, 5, 0.2)',
                    'rgba(255, 97, 5, 0.2)',
                    'rgba(5, 255, 138, 0.2)',
                    'rgba(126, 5, 255, 0.2)',
                    'rgba(255, 5, 5, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(245, 0, 0, 1)',
                    'rgba(0, 122, 245, 1)',
                    'rgba(234, 255, 5, 1)',
                    'rgba(255, 97, 5, 1)',
                    'rgba(5, 255, 138, 1)',
                    'rgba(126, 5, 255, 1)',
                    'rgba(255, 5, 5, 1)'
                ],
                borderWidth: 1
            }
        ]
    },
        options: {
            legend: { display: false },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }],
            },
        }
    });
}
//Fim Grafico Discreta
//Fim Quantitativa Discreta

//Inicio Qualitativa Continua
function quantCont(vetorID, nome, radio, vetporc) {
    var mediaclass = [];
    var classnum = numeroDeClasses(vetorID);
    console.log("número de classes " + classnum)
    var classint = intervaloDeClasses(vetorID);
    console.log("intervalo de classes " + classint)
    var classlim = determinaClasses(vetorID[0], classint, classnum);
    console.log("limite de classes " + classlim)
    
    for(i=0;i<classlim.length-1;i++){
           mediaclass[i] = (classlim[i] + classlim[i+1])/2;
    }    
    console.log(mediaclass)
    var grafconteudo = [];
    var fs = calculaFrequenciaSimples(vetorID, classlim, classnum, mediaclass);
    var fac = calculaFrequenciaAcumulada(fs);
    var fr = calculaFrequenciaSimplesRelativa(fs, vetorID.length);
    var facporc = calculaFrequenciaAcumuladaRelativa(fac, vetorID.length);
    geratablecont(fs, fr, classlim, mediaclass, nome, grafconteudo);

    var calcmedia = mediaContinua(classlim, fs, vetorID.length);
    var calcmediana = medianaContinua(vetorID.length, classint, fs, fac, classlim);
    var desviop = desviopadrao(vetorID, fs, calcmedia, mediaclass, radio);
    calcMedSepCont(vetorID.length, fs, classlim, fac, classint, vetporc);
    desenhaGraficosContinua(grafconteudo, fs, nome)

    var covcont = (desviop / calcmedia) * 100
    covcont = covcont.toFixed(2);

    document.getElementById("x").innerHTML = calcmedia;
    document.getElementById("medianorm").value = calcmedia;
    document.getElementById("md").innerHTML = calcmediana;
    document.getElementById("dp").innerHTML = desviop;  
    document.getElementById("desvionorm").value = desviop; 
    document.getElementById("cov").value = covcont + "%";
//    }
}

function intervaloDeClasses(vetorID){
    var amplitude = vetorID[vetorID.length -1] - vetorID[0];
    amplitude = Math.ceil(amplitude);
    var isDecimal = false;
    if (amplitude % 1 != 0){
        isDecimal = true;
    }

    //Calcula as possiveÃ­s classes para divisÃ£o
    var sqrtvet = parseInt(Math.sqrt(vetorID.length));
    var classes = [sqrtvet - 1, sqrtvet, sqrtvet + 1];

    //Determina por qual classe sera feita a divisÃ£o
    var numeroClasses;
    var parada = true;
    
    do {
        if (!isDecimal)
        amplitude++;
        for (var j = 0; j < 4; j++) {
            if (amplitude % classes[j] === 0) {
                numeroClasses = classes[j];
                parada = false;
            }

        }
    } while (parada)

    var intervalc = amplitude / numeroClasses;
    return intervalc
}

function numeroDeClasses(vetorID){

    var amplitude = vetorID[vetorID.length -1] - vetorID[0];

    //Calcula as possiveÃ­s classes para divisÃ£o
    var sqrtvet = parseInt(Math.sqrt(vetorID.length));
    var classes = [sqrtvet - 1, sqrtvet, sqrtvet + 1];
    console.log("classesssss " + classes)
    //Determina por qual classe sera feita a divisÃ£o
    var numeroClasses;
    var parada = true;
    
    do {
        amplitude++;
        for (var j = 0; j < 4; j++) {
            if (amplitude % classes[j] === 0) {
                numeroClasses = classes[j];
                parada = false;
            }

        }
    } while (parada)
    console.log("numero de classessss " + numeroDeClasses)
    return numeroClasses;
}

function calcAmplitude(vetorID){
    return vetorID[vetorID.length -1] - vetorID[0];
}

function determinaClasses(limInferior, classint, classnum){
    var limites = [];

    limites.push(limInferior);

    for(var i = 0; i < classnum; i++){
        var limSuperior = limInferior + classint;
        limites.push(limSuperior);
        limInferior = limSuperior;
    }

    return limites;

}

function calculaFrequenciaSimples(vetorID, classlim, classnum, mediaclass){
    var quant = [];
    console.log("desbugar " + classlim)
    for (var i = 0; i < classnum; i++){
        var limInf = classlim[i];
        var limSup = classlim[i + 1];
        var total = 0;
        console.log("desbugar " + classlim)
        for(var j = 0; j < vetorID.length; j++){
            if(vetorID[j] >= limInf && vetorID[j] < limSup){
                total++;
            }
        }
        quant[i] = total;
    } 
    console.log("desbugar " + classlim)
    var maiorFreq = quant[0];

    for (i in quant) {
        if (quant[i] >= maiorFreq) {
            maiorFreq = quant[i]
        }
    }
    var mo = [];
    for (i in quant) {
        if (maiorFreq == quant[i]) {
            mo.push(mediaclass[i]);
        }
    }
    if(mo.length == vetorID.length){
        mo = "Amodal";
    }
    document.getElementById("mo").innerHTML = mo;
    return quant;

}

function calculaFrequenciaAcumulada(fs){
    fAcum = new Array(fs.length).fill(0);

    fAcum[0] = fs[0];

    for(var i = 1; i < fs.length; i++){
        fAcum[i] = fAcum[i-1] + fs[i];
    }

    return fAcum;
}

function calculaFrequenciaSimplesRelativa(fi, numeroElementos){
    var fSimplesRelativa = [];

    for(var i = 0; i < fi.length; i++){
        fSimplesRelativa[i] = ((fi[i] * 100)/numeroElementos).toFixed(2);
    }

    return fSimplesRelativa;
}

function calculaFrequenciaAcumuladaRelativa(freqAcum, numeroElementos){
    var fAcumRelativa = [];

    for(var i = 0; i < freqAcum.length; i++){
        fAcumRelativa[i] = ((freqAcum[i] * 100)/numeroElementos).toFixed(2);
    }

    return fAcumRelativa;
}

function formataClasses(limites){
    var classesTexto = [];
    for(var i = 0; i < limites.length -1; i++){
        classesTexto.push(limites[i] + "\u22a2" + limites[i + 1]);
    }

    return classesTexto;
}

function medianaContinua(numeroElementos, classint, fs, freqAcum, classlim){
    var fAcumAnterior;
    var classeMediana;
    var posicaoMediana = numeroElementos /2;

    for(var i = 0; i < freqAcum.length; i++){
        if(freqAcum[i] >= posicaoMediana ){
            classeMediana = i;
            break;
        }
    }

    if(classeMediana == 0){
        fAcumAnterior = 0;
    }else{
        fAcumAnterior = freqAcum[classeMediana - 1];
    }

    var limInferior = classlim[classeMediana];

    var mediana = limInferior + ( (posicaoMediana - fAcumAnterior) / fs[classeMediana]) * classint;
    console.log(mediana + " mediana")
    return mediana.toFixed(2);

}

function mediaContinua(limites, fi, numeroElementos){
    var somatorioLimites = 0;
    var mediaLimites = calculaMediaLimites(limites);
    
    for(var i = 0; i < mediaLimites.length; i++){
        somatorioLimites += mediaLimites[i] * fi[i]
    }

    var media = somatorioLimites / numeroElementos;

    return media.toFixed(2);

}

function desviopadrao(vetorID, fs, calcmedia, mediaclass, radio){
    var mediaA = calcmedia;
    var dp;
    var div;
    var soma = 0;
    for (i in fs) {
        var result = (mediaclass[i] - mediaA);
        var result2 = Math.pow(result, 2) * fs[i];
        soma = soma + result2;
        }
    if(radio === true){
        div = soma / (vetorID.length - 1);
        dp = Math.sqrt(div).toFixed(2);
        return dp
    }else{
        div = soma / (vetorID.length);
        dp = Math.sqrt(div).toFixed(2);
        return dp
    }
}

function calculaClasseModal(fi){
    var classes = [];
    var aux = 0;

    for(var i = 0; i < fi.length; i++){
        if(fi[i] > aux){
            aux = fi[i];
        }
    }

    for(var i = 0; i < fi.length; i++){
        if(fi[i] == aux){
            classes.push(i);
        }
    }

    return classes;
}

function calculaMediaLimites(limites){
    var mediaLimites = [];
    for (var i = 0; i < limites.length - 1; i++) {
        var mediaLim = ((limites[i] + limites[i+1])/2).toFixed(2);
        mediaLimites.push(mediaLim);
        
    }

    return mediaLimites;
}

function geratablecont(fs, fr, classlim, mediaclass, nome, grafconteudo){
    var fac = 0; var facp = 0; var soma = 0;
    console.log("tabela bugada1 " + classlim)
    for(i=0;i<fs.length;i++){
        soma = soma + fs[i];
    }
    console.log("tabela bugada2 " + classlim)
    for(j=0;j<fs.length;j++){
        fr[j] = (fs[j] / soma) * 100;
    }
    console.log("tabela bugada3 " + classlim)
    var vetab = [];
    var vetab = "<table class= 'centered'>" + 
                    "<thead>" + 
                        "<tr>" +
                            "<th>" + nome + "</th>" + 
                            "<th> Frequência </th>" + 
                            "<th> Fr% </th>" + 
                            "<th> Fac </th>" + 
                            "<th> Fac% </th>" +
                        "</tr>" +
                    "</thead>";
                    console.log("tabela bugada4 " + classlim)
    for(i=0;i<mediaclass.length;i++){
        fac = fac + fs[i];
        console.log("tabela bugada " + classlim)
        facp = facp + fr[i];
        vetab = vetab + "<tbody>" +
                            "<tr>" + 
                                "<td>" + classlim[i] + " |--" + mediaclass[i] + "-- " + classlim[i+1] + "</td>" + 
                                "<td>" + fs[i] + "</td>" + 
                                "<td>" + fr[i].toFixed(2) + "%" + "</td>" + 
                                "<td>" + fac + "</td>" + 
                                "<td>" + facp.toFixed(2) + "%" + "</td>" + 
                            "</tr>" +
                        "</tbody";  
                        grafconteudo[i] = classlim[i] + " |---- " + classlim[i+1]
    }
    vetab = vetab + "</table>";
    //Fim tabelapj
    document.getElementById("saida").innerHTML = vetab;
}


function desenhaGraficosContinua(grafconteudo, fi, nome){
    var graficoVar = null
    var ctx = document.getElementById("myChart").getContext('2d');
    if(graficoVar != null){
        graficoVar.destroy();
    }
    Chart.defaults.scale.StartValue = 0;

    graficoVar = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: grafconteudo,
        datasets: [
            {
                label: "fr%",
                data: fi,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(245, 0, 0, 0.2)',
                    'rgba(0, 122, 245, 0.2)',
                    'rgba(234, 255, 5, 0.2)',
                    'rgba(255, 97, 5, 0.2)',
                    'rgba(5, 255, 138, 0.2)',
                    'rgba(126, 5, 255, 0.2)',
                    'rgba(255, 5, 5, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(245, 0, 0, 1)',
                    'rgba(0, 122, 245, 1)',
                    'rgba(234, 255, 5, 1)',
                    'rgba(255, 97, 5, 1)',
                    'rgba(5, 255, 138, 1)',
                    'rgba(126, 5, 255, 1)',
                    'rgba(255, 5, 5, 1)'
                ],
                borderWidth: 1
            }
        ]
    },
        options: {
            legend: { display: false },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }],
                xAxes: [{
                    categoryPercentage: 1,
                    barPercentage: 1
                }]
            },
            title: {
                display: true,
                text: nome
            }
        }
    });
}

function calcMedSepCont(numeroElementos, fi, limites, fAc, classint, vetporc){
    var porcentagem = 0; var aux2 = 0; var vetporc2 = []
    var posicao = 0;
    var q = []; var k = []; var decil = []; var porcentil = [];

     //Porcentil
     for(var i = 0; i <= 99; i++){
        porcentagem = 0.01 * i;
        posicao = (numeroElementos * porcentagem).toFixed(0);
        var classe = 0;
        for(var j = 0; j < fAc.length; j++){
            if(posicao < fAc[j]){
                classe = j;
                break;
            }
        }

        var limInferior = limites[classe];

        var fAnt;
        if(classe == 0){
            fAnt = 0;
        }else{
            fAnt = fAc[classe - 1];
        }

        porcentil[i] = " " +(limInferior + ((posicao - fAnt)/fi[classe]) * classint).toFixed(2);
    }
   
    console.log("oqé " + aux2)
    console.log("vetporc2 " + vetporc2)
    console.log(porcentil)
    console.log("vetporc1 " + vetporc);
    
    //Quartil
    q[0] = porcentil[24];
    q[1] = " " + porcentil[49];
    q[2] = " " + porcentil[74];
    q[3] = " " + porcentil[99];
    var qt = "<table class= 'centered'>" + 
                    "<thead>" + 
                        "<tr>" +
                            "<th>  Q1 </th>" + 
                            "<th>  Q2 </th>" +
                            "<th>  Q3 </th>" +
                            "<th>  Q4 </th>" +
                        "</tr>" +
                    "</thead>";
		for(i=0;i<q.length;i++){
        	qt = qt + "<tbody>" +
                             
                                "<td>" + q[i]  + "</td>" + 
                            
                        "</tbody";  
	}
    console.log("teste Q 0" + q)
    document.getElementById("q").innerHTML = qt;
    
    //Quintil
    k[0] = porcentil[19];
    k[1] = " " + porcentil[39];
    k[2] = " " + porcentil[59];
    k[3] = " " + porcentil[79];
    k[4] = " " + porcentil[99];

    var kt = "<table class= 'centered'>" + 
                    "<thead>" + 
                        "<tr>" +
                            "<th>  K1 </th>" + 
                            "<th>  K2 </th>" +
                            "<th>  K3 </th>" +
                            "<th>  K4 </th>" +
                            "<th>  K5 </th>" +
                        "</tr>" +
                    "</thead>";
		for(i=0;i<k.length;i++){
        	kt = kt + "<tbody>" +
                             
                                "<td>" + k[i]  + "</td>" + 
                            
                        "</tbody";  
	}
    document.getElementById("k").innerHTML = kt;

    //Decil
    decil[0] = porcentil[9];
    decil[1] = " " + porcentil[19];
    decil[2] = " " + porcentil[29];
    decil[3] = " " + porcentil[39];
    decil[4] = " " + porcentil[49];
    decil[5] = " " + porcentil[59];
    decil[6] = " " + porcentil[69];
    decil[7] = " " + porcentil[79];
    decil[8] = " " + porcentil[89];
    decil[9] = " " + porcentil[99];
    
    var D=[];
    
    for(i=1;i<=10;i++){
      D[i] = "D" + i;   
    }
     var dl = "<table class= 'centered'>" + "<thead>";
     for(i=1;i<=10;i++){
            dl = dl +    
                            "<th>" + D[i] + "</th>";
                                      
     }
     dl = dl + "</thead>";
		for(i=0;i<decil.length;i++){
        	dl = dl + "<tbody>" +
                             
                                "<td>" + decil[i]  + "</td>" + 
                            
                        "</tbody";  
	}

    document.getElementById("decil").innerHTML = dl;
    //fim decil
    if(vetporc != 0){
        for(var i=0; i<vetporc.length; i++){
        aux2 = vetporc[i]
        vetporc2[i] = " " + porcentil[aux2-1];
        }    
    }
    if(vetporc2 != ""){
    document.getElementById("porcentil").innerHTML = vetporc2;
    //fim porcentil
    }else{
        document.getElementById("porcentil").innerHTML = "Você não escolheu uma posição!"
    }
}
//Fim Continua

//inicio Distribuição Normal
function distribuicaonormal() {
    var normx = Number(document.getElementById("normx").value);
    var normy = Number(document.getElementById("normy").value);
    var calcnormal = (document.getElementById("calcnormal").value);
    var media = Number(document.getElementById("medianorm").value);
    var dp = Number(document.getElementById("desvionorm").value);
    var tableZ = new Array(
        0.0000 , 0.0040 , 0.0080 , 0.0120 , 0.0160 , 0.0199 , 0.0239 , 0.0279 , 0.0319 , 0.0359,
        0.0398 , 0.0438 , 0.0478 , 0.0517 , 0.0557 , 0.0596 , 0.0636 , 0.0675 , 0.0714 , 0.0753,
        0.0793 , 0.0832 , 0.0871 , 0.0910 , 0.0948 , 0.0987 , 0.1026 , 0.1064 , 0.1103 , 0.1141,
        0.1179 , 0.1217 , 0.1255 , 0.1293 , 0.1331 , 0.1368 , 0.1406 , 0.1443 , 0.1480 , 0.1517,
        0.1554 , 0.1591 , 0.1628 , 0.1664 , 0.1700 , 0.1736 , 0.1772 , 0.1808 , 0.1844 , 0.1879,
        0.1915 , 0.1950 , 0.1985 , 0.2019 , 0.2054 , 0.2088 , 0.2123 , 0.2157 , 0.2190 , 0.2224,
        0.2257 , 0.2291 , 0.2324 , 0.2357 , 0.2389 , 0.2422 , 0.2454 , 0.2486 , 0.2517 , 0.2549,
        0.2580 , 0.2611 , 0.2642 , 0.2673 , 0.2704 , 0.2734 , 0.2764 , 0.2794 , 0.2823 , 0.2852,
        0.2881 , 0.2910 , 0.2939 , 0.2967 , 0.2995 , 0.3023 , 0.3051 , 0.3078 , 0.3106 , 0.3133,
        0.3159 , 0.3186 , 0.3212 , 0.3238 , 0.3264 , 0.3289 , 0.3315 , 0.3340 , 0.3365 , 0.3389,
        0.3413 , 0.3438 , 0.3461 , 0.3485 , 0.3508 , 0.3531 , 0.3554 , 0.3577 , 0.3599 , 0.3621,
        0.3643 , 0.3665 , 0.3686 , 0.3708 , 0.3729 , 0.3749 , 0.3770 , 0.3790 , 0.3810 , 0.3830,
        0.3849 , 0.3869 , 0.3888 , 0.3907 , 0.3925 , 0.3944 , 0.3962 , 0.3980 , 0.3997 , 0.4015,
        0.4032 , 0.4049 , 0.4066 , 0.4082 , 0.4099 , 0.4115 , 0.4131 , 0.4147 , 0.4162 , 0.4177,
        0.4192 , 0.4207 , 0.4222 , 0.4236 , 0.4251 , 0.4265 , 0.4279 , 0.4292 , 0.4306 , 0.4319,
        0.4332 , 0.4345 , 0.4357 , 0.4370 , 0.4382 , 0.4394 , 0.4406 , 0.4418 , 0.4429 , 0.4441,
        0.4452 , 0.4463 , 0.4474 , 0.4484 , 0.4495 , 0.4505 , 0.4515 , 0.4525 , 0.4535 , 0.4545,
        0.4554 , 0.4564 , 0.4573 , 0.4582 , 0.4591 , 0.4599 , 0.4608 , 0.4616 , 0.4625 , 0.4633,
        0.4641 , 0.4649 , 0.4656 , 0.4664 , 0.4671 , 0.4678 , 0.4686 , 0.4693 , 0.4699 , 0.4706,
        0.4713 , 0.4719 , 0.4726 , 0.4732 , 0.4738 , 0.4744 , 0.4750 , 0.4756 , 0.4761 , 0.4767,
        0.4772 , 0.4778 , 0.4783 , 0.4788 , 0.4793 , 0.4798 , 0.4803 , 0.4808 , 0.4812 , 0.4817,
        0.4821 , 0.4826 , 0.4830 , 0.4834 , 0.4838 , 0.4842 , 0.4846 , 0.4850 , 0.4854 , 0.4857,
        0.4861 , 0.4864 , 0.4868 , 0.4871 , 0.4875 , 0.4878 , 0.4881 , 0.4884 , 0.4887 , 0.4890,
        0.4893 , 0.4896 , 0.4898 , 0.4901 , 0.4904 , 0.4906 , 0.4909 , 0.4911 , 0.4913 , 0.4916,
        0.4918 , 0.4920 , 0.4922 , 0.4925 , 0.4927 , 0.4929 , 0.4931 , 0.4932 , 0.4934 , 0.4936,
        0.4938 , 0.4940 , 0.4941 , 0.4943 , 0.4945 , 0.4946 , 0.4948 , 0.4949 , 0.4951 , 0.4952,
        0.4953 , 0.4955 , 0.4956 , 0.4957 , 0.4959 , 0.4960 , 0.4961 , 0.4962 , 0.4963 , 0.4964,
        0.4965 , 0.4966 , 0.4967 , 0.4968 , 0.4969 , 0.4970 , 0.4971 , 0.4972 , 0.4973 , 0.4974,
        0.4974 , 0.4975 , 0.4976 , 0.4977 , 0.4977 , 0.4978 , 0.4979 , 0.4979 , 0.4980 , 0.4981,
        0.4981 , 0.4982 , 0.4982 , 0.4983 , 0.4984 , 0.4984 , 0.4985 , 0.4985 , 0.4986 , 0.4986,
        0.4987 , 0.4987 , 0.4987 , 0.4988 , 0.4988 , 0.4989 , 0.4989 , 0.4989 , 0.4990 , 0.4990,
        0.4990 , 0.4991 , 0.4991 , 0.4991 , 0.4992 , 0.4992 , 0.4992 , 0.4992 , 0.4993 , 0.4993,
        0.4993 , 0.4993 , 0.4994 , 0.4994 , 0.4994 , 0.4994 , 0.4994 , 0.4995 , 0.4995 , 0.4995,
        0.4995 , 0.4995 , 0.4995 , 0.4996 , 0.4996 , 0.4996 , 0.4996 , 0.4996 , 0.4996 , 0.4997,
        0.4997 , 0.4997 , 0.4997 , 0.4997 , 0.4997 , 0.4997 , 0.4997 , 0.4997 , 0.4997 , 0.4998,
        0.4998 , 0.4998 , 0.4998 , 0.4998 , 0.4998 , 0.4998 , 0.4998 , 0.4998 , 0.4998 , 0.4998,
        0.4998 , 0.4998 , 0.4999 , 0.4999 , 0.4999 , 0.4999 , 0.4999 , 0.4999 , 0.4999 , 0.4999,
        0.4999 , 0.4999 , 0.4999 , 0.4999 , 0.4999 , 0.4999 , 0.4999 , 0.4999 , 0.4999 , 0.4999,
        0.4999 , 0.4999 , 0.4999 , 0.4999 , 0.4999 , 0.4999 , 0.4999 , 0.4999 , 0.4999 , 0.4999,
        0.5000 , 0.5000 , 0.5000 , 0.5000 , 0.5000 , 0.5000 , 0.5000 , 0.5000 , 0.5000 , 0.5000,
        );

        z1 = (normx - media) / dp
        if(z1 < 0){
            z1 *= -1;
        }
        var indice1 = Math.round(z1.toFixed(2) * 100)

        z2 = (normy - media) / dp
        if(z2 < 0){
            z2 *= -1;
        }
        var indice2 = Math.round(z2.toFixed(2) * 100)

        console.log("Valor de z1: " + z1);
        console.log("Valor de z2: " + z2);
        console.log("valor do indice: " + indice1);
        console.log("Valor de valor: " + normx);
        if(indice1 <= 309){
            tabela1=parseFloat(tableZ[indice1]);
        } else {
            tabela1=0.4999 
        }

        if(indice2 <= 309){
            tabela2=parseFloat(tableZ[indice2]);
        } else {
            tabela2=0.4999 
        }

        switch (calcnormal) {
            case "Maior que":
                if(normx > media){
                    p = (0.5 - tabela1) * 100;
                } else {
                    p = (0.5 + tabela1) * 100; 
                }   
                p = p.toFixed(2);
                console.log("Valor de porcentagem: " + p + "%");
                document.getElementById("pronorm").innerHTML = p + "%";
            break;
            case "Menor que":
                if(normx < media){
                    p = (0.5 - tabela1) * 100;
                } else {
                    p = (0.5 + tabela1) * 100; 
                }   
                p = p.toFixed(2);
                console.log("Valor de porcentagem: " + p + "%");
                document.getElementById("pronorm").innerHTML = p + "%";
            break;
            case "Entre":
                if(normx == media){
                    p = (tabela2 * 100)
                }else if(normy == media){
                    p = (tabela1 * 100)
                }else if(((normx > media && normy < media)) || ((normy > media && normx < media))){
                    p = (tabela1 + tabela2) * 100
                }else if(normx > media && normy > media){
                    if(normx > normy){
                        p = (tabela1 - tabela2) * 100
                    }else{
                        p = (tabela2 - tabela1) * 100
                    }
                }else if(normx < media && normy < media){
                    if(normx > normy){
                        p = (tabela1 - tabela2) * 100
                    }else{
                        p = (tabela1 - tabela2) * 100
                    }
                }
                p = p.toFixed(2);
                console.log("Valor de porcentagem: " + p + "%");
                document.getElementById("pronorm").innerHTML = p + "%";
            
        }
        console.log("Valor da tabela1: " + tabela1);
        console.log("Valor da tabela2: " + tabela2);

}
//Fim Distribuição Normal

//Inicio Distribuição Binomial
function ditribuicaobinomial(){
    var vetor = [], pro = [], analise = [], s = [];
    var tabbin = [], media , desvio , n , p , q , k;
    n = document.getElementById("txttamanho").value;
    p = document.getElementById("txtsucesso").value;
    q = document.getElementById("txtfracasso").value;
    k = document.getElementById("txtelemento").value;

    var vetn = n.split(";").map(Number);
    var vetp = p.split(";").map(Number);
    var vetq = q.split(";").map(Number);
    //Elementos 
    vetor = k.split(";").map(Number);
    for(let i = 0; i < vetor.length; i++){
        vetor[i] = Number(vetor[i]);
    }
    console.log("Vetor: " + vetor);


    for(let i = 0; i < vetor.length; i++){
        s[i] = vetn - vetor[i]
    }
            
    for(let i = 0; i < vetor.length; i++){
        if(vetor[i] == vetn || vetor[i] == 0){
            analise[i] = 1;
            pro[i] = 100 * analise[i] * Math.pow(vetp , vetor[i]) * Math.pow(vetq , (s[i])) 
            console.log("1º Probabilidade: " + pro[i].toFixed(2) + " %");
        }
        else if(vetor[i] == 1){
            analise[i] = vetn;
            pro[i] = 100 * analise[i] * Math.pow(vetp , vetor[i]) * Math.pow(vetq , (s[i])) 
            console.log("2º Probabilidade: " + pro[i].toFixed(2) + " %");
        }
        else{
            for(let i = 0; i < vetor.length; i++){
                if(vetor[i] > 1){
                    s[i] = vetn - vetor[i]
                }
            }

            //Função recursiva (FATORIAL)

            console.log("Valor de n: " + vetn);
            console.log("Valor de k: " + k);
            console.log("Valor de s: " + vets);            

        //FATORIAL DE N
            i = 1, fatn = 1;

            while (i <= n ){
                fatn = fatn * i;
                i+=1;
            }
            
            console.log("Fatorial de n: " + fatn); 
        ///////////////////////////////////////
        
        //FATORIAL DE K
            fatk = 1, vetk = []; i = 1;
            for(let x = 0; x < vetor.length; x++){
                while (i <= vetor[x]){
                    fatk = fatk * i
                    i+=1;
                }
                vetk.push(fatk)
            }
            console.log("Fatorial de k: " + vetk); 
        /////////////////////////////////////
        
        
        //FATORIAL DE S
            var fats = 1, vets = [], c = 1;
            for(let x = 0; x < s.length; x++){
                while (c <= s[x]){
                    fats = fats * c
                    c+=1;
                }
                vets.push(fats)
                fats = 1 
                c = 1  
            }
            console.log("Fatorial de s: " + vets);
        /////////////////////////////////////
        
            //Calculo da Analise combinatoria
            for(let i = 0; i < vetor.length; i++){
                analise[i] = fatn / (vetk[i] * vets[i])
            }
            console.log("Analise combinatoria: " + analise);

            //Calculo da probabilidade

            for(let i = 0; i < vetor.length; i++){
                pro[i] = 100 * analise[i] * Math.pow(vetp , vetor[i]) * Math.pow(vetq , s[i])
            }
            console.log("3º Probabilidade: " + pro[2] + " %");
        }   
    }

    //Calculo da media
        media = vetn * vetp
        console.log("Media: " + media);

    //Calculo do desvio Padrao
        desvio = Math.sqrt(vetn* vetp * vetq);
        console.log("Desvio: " + desvio.toFixed(2));

    //Calculo do coeficiente de variação
        cv = (desvio / media) * 100
        console.log("Coeficiente de variancia: " + cv.toFixed(2) + " %");

    //Calculo soma probabilidade
        soma = 0;
        for(let i = 0; i < vetor.length; i++){
            soma = pro[i] + soma;
        }
        console.log("Soma total das probabilidades: " + soma.toFixed(2) + " %")
    // INICIO TABELA
    tabbin = "<table class= 'centered'>" + 
                "<thead>" + 
                    "<tr>" +
                        "<th> Variavel </th>" + 
                        "<th> Frequência </th>" + 
                        "<th> Fr% </th>" + 
                     "</tr>" +
                "</thead>";
    tabbin = tabbin +   "<tbody>" +
                            "<tr>" + 
                                "<td align=center> SUCESSO </td>" + 
                                "<td align=center>" +  vetp  + "</td>" + 
                                "<td align=center>" +  vetp * 100 + "</td>" +
                            "</tr>" + 
                            "<tr>" + 
                                "<td align=center> FRACASSO </td>" + 
                                "<td align=center>" +  vetq + "</td>" + 
                                "<td align=center>" +  vetq * 100 + "</td>" +
                            "</tr>"+
                        "</tbody>";
    // FIM TABELA 

    // Saida
    tabbin = tabbin + "</table>";
    document.getElementById("prob").innerHTML = soma.toFixed(2) + " % "; 
    document.getElementById("mediabino").innerHTML = media.toFixed(2);
    document.getElementById("desvio").innerHTML = desvio.toFixed(2);
    document.getElementById("cdv").innerHTML = cv.toFixed(2) + " % ";
    document.getElementById("exibetab").innerHTML = tabbin;
}
//Fim Distribuição Binomial

//Inicio Distribuição Uniforme
function distribuicaouniforme(){
    
    var valorx = Number(document.getElementById("valorx").value);
    var valory = Number(document.getElementById("valory").value);
    var unix = Number(document.getElementById("unix").value);
    var uniy = Number(document.getElementById("uniy").value);
    
    var probabilidade = ((1 / (valory-valorx)) * unix) * 100;
    console.log("Probabilidade: " + probabilidade);

    var media = (valory + valorx) / 2;
    console.log("Media: " + media);

    var desvio = Math.sqrt((Math.pow(valory-valorx, 2)) / 12);
    console.log("Desvio Padrao: " + desvio);

    var cov = (desvio / media) * 100;
    cov = cov.toFixed(2);

    document.getElementById("prouni").innerHTML = probabilidade.toFixed(2)+ "%";
    document.getElementById("mediauni").innerHTML = media;
    document.getElementById("cdvuni").innerHTML = cov;
    document.getElementById("desviouni").innerHTML = desvio.toFixed(2);
}
//Fim Distribuição Uniforme

//Inicio Correlação e Regressão
function correlacaoregrecao(){
    var nomex; var nomey;
    var numx = []; var numy = [];
    var varx = []; var vary = []; var x, y, r = 0;
    var somaX = 0; var somaY = 0; var somaXY = 0; var somaX2 = 0; var somaY2 = 0, a = 0, b = 0;
    var scatter = []; var line = []; var maior, menor, forca, equacao;
    
    nomex = (document.getElementById("nomex").value);
    nomey = (document.getElementById("nomey").value);
    numx = (document.getElementById("txtdadosx").value);
    numy = (document.getElementById("txtdadosy").value);
    varx = numx.split(";").map(Number);
    vary = numy.split(";").map(Number);

    console.log(vary);
    console.log(varx);
        
    
    for (var i = 0; i < vary.length; i++) {
        varx[i] = Number(varx[i]);
        vary[i] = Number(vary[i]);
        somaX += varx[i];
        somaY += vary[i];
        somaXY += vary[i] * varx[i];
        somaX2 += Math.pow(varx[i], 2);
        somaY2 += Math.pow(vary[i], 2);
    } 
        
        
    //correlação
    r = ((vary.length * somaXY) - (somaX * somaY)) /
        (Math.sqrt(((vary.length * somaX2) - (Math.pow(somaX, 2))) * ((vary.length * somaY2) - (Math.pow(somaY, 2)))));
        console.log("r:" + r)

    if (Math.abs(r) == 0) {
        console.log("Não existe relação");
        forca = "Não existe";
        }
    else if (Math.abs(r) < 0.3) {
        console.log("A relação é fraca.");
        forca = "Fraca";        
        }
    else if (Math.abs(r) < 0.6) {
        console.log("A relação é média");
        forca = "Media";                
        }
    else if (Math.abs(r) < 1) {
        console.log("A relação é forte");
        forca = "Forte";                        
        }
    else {
        console.log("A relação é perfeita");
        forca = "Perfeita";                                
        }
    
        console.log("Coeficiente de correlação linear: " + r.toFixed(2));

    
        //regressão
    a = ((vary.length * somaXY) - (somaX * somaY)) /
        ((vary.length * somaX2) - (Math.pow(somaX, 2)));
    
    b = (somaY / vary.length) - a * (somaX / vary.length);
    
    console.log("A equação da regrssão é: y = " + a.toFixed(2) + "x + " + b.toFixed(2) + ".");
    if (b > 0) {
        equacao = "y = " + a.toFixed(2) + "x + " + b.toFixed(2);
    }
    else {
        equacao = "y = " + a.toFixed(2) + "x " + b.toFixed(2);
    }
    
        //gerando dados do gráfico
    maior = vary[0];
    menor = vary[0];

    for (var i = 1; i < vary.length; i++) {
    if (vary[i] > maior) {
        maior = vary[i];
        }
    
    if (vary[i] < menor) {
            menor = vary[i];
        }
    }
    
    y = maior;
    x = (y - b)/a;
    line.push({ x, y });
    
    y = menor;
    x = (y - b)/a;
    line.push({ x, y });
    console.log(line);
    
    for (var i = 0; i < vary.length; i++) {
        scatter.push({ x: varx[i], y: vary[i] });
    }
    console.log(scatter);

    document.getElementById("corelaline").innerHTML = r.toFixed(4)*100 + "%";
    document.getElementById("força").innerHTML = forca;
    document.getElementById("equac").innerHTML = "y = " + a.toFixed(2) + "x + " + b.toFixed(2) + ".";
    graficocorrela(scatter, line);
}
    
function graficocorrela(scatter, line){  
    var ctx = document.getElementById("myChartcorrela");
    var mixedChart = new Chart(ctx, {
    type: 'scatter',
    data: {
    datasets: [{
        label: 'scatter',
            data: scatter,
                backgroundColor: "rgba(255,0,0,1)"
            },
        {
        type: 'line',
        label: 'Line Dataset',
            data: line,
            showLine: true,
                backgroundColor: "rgba(0,0,255,0)",
                pointBorderColor: "rgba(0,0,255,0)",                
                borderColor: "rgba(0,0,255,.5)"                
                },
                ]
            },
            options: {
                scales: {
                    yAxes: [{
                        beginAtZero: true
                    }],
                    xAxes: [{
                        beginAtZero: true
                    }]
                }
            }
    });
}
//Fim Correlação e Regressão