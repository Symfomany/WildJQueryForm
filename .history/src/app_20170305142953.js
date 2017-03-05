let regex = {
    nom: /^[a-zA-ZÀÁÂÃÄÅàáâãäåÒÓÔÕÖØòóôõöøÈÉÊËèéêëÇçÌÍÎÏìíîïÙÚÛÜùúûüÿÑñ\- ]{2,}$/,
    prenom: /^[a-zA-ZÀÁÂÃÄÅàáâãäåÒÓÔÕÖØòóôõöøÈÉÊËèéêëÇçÌÍÎÏìíîïÙÚÛÜùúûüÿÑñ\- ]{3,}$/,
    sport: /^[a-zA-ZÀÁÂÃÄÅàáâãäåÒÓÔÕÖØòóôõöøÈÉÊËèéêëÇçÌÍÎÏìíîïÙÚÛÜùúûüÿÑñ\- ]{3,}$/,
    age: /^[0-9]{2}$/,
    cp: /^[0-9]{5}$/,
    ville: /^[a-zA-ZÀÁÂÃÄÅàáâãäåÒÓÔÕÖØòóôõöøÈÉÊËèéêëÇçÌÍÎÏìíîïÙÚÛÜùúûüÿÑñ\- ]{3,}$/,
    email: /^[a-z0-9\.\-\_]+\@[a-z0-9\-]+\.[a-z]{2,5}$/,
    avatar: /^https?\:\/\/[a-z0-9\.\-\_]+(fbcdn\.net|twimg\.com)[a-z0-9\.\-\_\/]*/,
    bio1: /^[0-9a-zA-ZÀÁÂÃÄÅàáâãäåÒÓÔÕÖØòóôõöøÈÉÊËèéêëÇçÌÍÎÏìíîïÙÚÛÜùúûüÿÑñ\-\'\. ]+$/m,
    bio2: /^(?:\w+\W+){9,}(?:\w+[\. ]*)$/m,
    passwd: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/,
};


//Traitement du champ textarea biographie
$("#bio").blur(function () {// si on sort dans le texte area

    var mabio = $('#bio').val();// recuperation de la valeur age
    if (verifBio(mabio)) { //  si l age correspond a la condition
        $('#bio').removeClass().addClass("green");// css valide
    }
    else {
        $('#bio').removeClass().addClass("danger");// css invalide
    }

});


function checkRegex(idInput, regex) {

    if (regex.test($(idInput).val())) // On verifie si l'input entrée valide la regex en paramètre
    {
        console.log('Regex validée ' + idInput);
        // si oui on enleve ou laisse vide la classe
        setToNormal(idInput);
    }
    else {
        console.log('Regex non validée ' + idInput);
        // si non on met la classe has-error
        setToRed(idInput);
    }

};


// On rempli la ville à partir du CP
$('input#cp').blur(function () {

    var cpSaisi = $('input#cp').val();
    var codeVille = cpSaisi.substr(0, 3);
    //  console.log(cpSaisi);
    //  console.log(codeVille);
    switch (codeVille) {
        case "750":
            // console.log("Paris");
            $('input#ville').val("Paris"); //modifie la valeur de ville
            $('input#ville').attr("disabled", "disabled"); // modifie la valeur de l'attribut disabled
            break;
        case "690":
            $('input#ville').val("Lyon");
            $('input#ville').attr("disabled", "disabled");
            break;
        case "130":
            $('input#ville').val("Marseille");
            $('input#ville').attr("disabled", "disabled");
            break;
        default:
            $('input#ville').val("");
            $('input#ville').removeAttr("disabled"); // removeAttr() supprime un attribut 
            break;
    }

});


$('form textarea#bio').blur(function () {

    var avatar = $('textarea#bio').val();
    console.log(avatar);
    var countWord = avatar.split(" ").length
    var regexWord = /^[a-z\ ]?.{1,}$/im

    if (countWord < 10 || !regexWord.test(avatar)) {
        // passer par les classe CSS et les fct addClass(), removeClass()
        $(this).css({ // plusieurs propriétés CSS d'un coup
            'border': '1px solid red',
            'color': 'red
        });
    }
    else {
        $(this).css('border', '1px solid green');
    }
}); //fermeture de ma fonction blur



var nombreCarac = 0;

$("input#twit").keyup(function () {

    function insert() {
        var compteur = document.createElement("span");
        compteur.textContent = "Il y a " + nombreCarac + " caracteres.";
        compteur.style.color = "grey";
        $("div#prev").html(compteur);
    };

    var tableauCarac = $(this).val().split(""),
        nombre = tableauCarac.length,
        nombreCarac = nombre - 1;

    insert();

});


$("#reduire").click(function () {

    $("input#biographie").css("font-size", "+=1");
});

// Grossir
$("#grossir").click(function () {

    $("input#biographie").css("font-size", "-=1");

});

