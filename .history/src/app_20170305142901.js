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

