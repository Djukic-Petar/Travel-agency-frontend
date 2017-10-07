function validacija() {

    var ime = document.forms["forma"]["ime"].value;
    var imePrazno = false;
	var imeDugacko = false;
	var imeNekorektno = false;

    var regex1 = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ðđ]+([ '-]?[[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ðđ]+)*$/;

    if (ime == null || ime == "")
        imePrazno = true;

    if (ime.length > 30)
        imeDugacko = true;

    if (!(regex1.test(ime)) && !imePrazno)
		imeNekorektno = true;

    var prezime = document.forms["forma"]["prezime"].value;
    var prezimePrazno = false;
	var prezimeDugacko = false;
	var prezimeNekorektno = false;

    if (prezime == null || prezime == "")
        prezimePrazno = true;

    if (prezime.length > 30)
        prezimeDugacko = true;

    if (!(regex1.test(prezime)) && !prezimePrazno)
		prezimeNekorektno = true;

    var email = document.forms["forma"]["email"].value;

    var emailPrazan = false;
	var emailNekorektan = false;

	if (email == null || email == "")
		emailPrazan = true;

    if (!(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) && !emailPrazan)
		emailNekorektan = true;

    var brPutnika = document.forms["forma"]["brPut"].value;
    var brPutnikaNekorektan = false;

    if(brPutnika <= 0 || brPutnika >20)
        brPutnikaNekorektan = true;

    var datumPolaskaTxt = document.forms["forma"]["datumPol"].value;
    var datumPolaska = new Date();
    var datumFormatNekorektan = false;

    /*Pozicije datuma:
    (0,2) dan
    (3,5) mesec
    (6,10) godina
    */

    var datumRegex = /[0-9][0-9]\.[0-9][0-9]\.[0-9][0-9][0-9][0-9]/;
    if(!datumRegex.test(datumPolaskaTxt))
    {
        alert("Pogresan format datuma!\nDatum unesite u formatu dd.mm.gggg");
        return false;   
    }

    datumPolaska.setFullYear(parseInt(datumPolaskaTxt.substring(6,10)));
    datumPolaska.setMonth(parseInt(datumPolaskaTxt.substring(3,5)));
    datumPolaska.setDate(parseInt(datumPolaskaTxt.substring(0,2)));

    var today = new Date();
    if(today.getTime() >= datumPolaska.getTime())
    {
        alert("Pogresan datum polaska!");
        return false;
    }

    var datumPovratkaTxt = document.forms["forma"]["datumPov"].value;
    var datumPovratka = new Date();

    datumPovratka.setFullYear(parseInt(datumPovratkaTxt.substring(6,10)));
    datumPovratka.setMonth(parseInt(datumPovratkaTxt.substring(3,5)));
    datumPovratka.setDate(parseInt(datumPovratkaTxt.substring(0,2)));

    if(!datumRegex.test(datumPovratkaTxt))
    {
        alert("Pogresan format datuma!\nDatum unesite u formatu dd.mm.gggg");
        return false;
    }
/*
    var debugStr = ""+datumPovratka.getTime()+"datumPov\n"+datumPolaska.getTime()+"datumPol";
    alert(debugStr);
*/
    if(datumPovratka.getTime() - datumPolaska.getTime() < 172800000)
    {
        alert("Minimalna duzina puta je 2 dana!");
        return false;
    }
    
    var brKartice = document.forms["forma"]["brKartice"].value;
    var brRegex = /[0-9][0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]/;
    if(!brRegex.test(brKartice))
    {
        alert("Uneli ste pogresan broj kartice!");
        return false;
    }

    if (imeNekorektno)
    {
        alert("Uneli ste nevalidno ime!");
        return false;
    }
    else if(imePrazno)
    {
        alert("Molimo unesite ime!");
        return false;
    }
    else if(imeDugacko)
    {
        alert("Ime ne sme da sadrži više od 30 karaktera!");
        return false;
    }
    else if (prezimeNekorektno)
    {
        alert("Uneli ste nevalidno prezime!");
        return false;
    }
    else if(prezimePrazno)
    {
        alert("Molimo unesite prezime!");
        return false;
    }
    else if(prezimeDugacko)
    {
        alert("Prezime ne sme da sadrži više od 30 karaktera!");
        return false;
    }
    else if(emailPrazan)
    {
        alert("Molimo unesite email!");
        return false;
    }
    else if(emailNekorektan)
    {
        alert("Uneli ste nevalidan email!");
        return false;
    }
    else if(brPutnikaNekorektan)
    {
        alert("Broj putnika mora biti izmedju 1 i 20");
        return false;
    }
    
    //Sve provere ispravne, cuvamo podatke
    var hotelID = document.getElementById("hotelId").innerHTML;
    var reservationID = localStorage.getItem("idGen");
    if(reservationID === null)
    {
        reservationID = 1;
        localStorage.setItem("idGen", "1");
    }
    else
    {
        reservationID = parseInt(reservationID) + 1;
        localStorage.setItem("idGen", ""+reservationID);
    }

    var reservationKey = hotelID+"_"+reservationID;

    //reservation je string koji se pamti kao vrednost u localStorage-u. Format:
    //(Vreme-rez-u-ms)_(broj-putnika)_(dan-odlaska).(mesec-odlaska).(godina-odlaska)_(broj-dana)
    var reservation = today.getTime()+"_"+brPutnika+"_"+datumPolaskaTxt;
    var periodBoravka = (datumPovratka.getTime() - datumPolaska.getTime()) / 86400000;
    reservation += "_"+periodBoravka;
    
    localStorage.setItem(reservationKey, reservation);
    return true;
}

function CheckBrowser() {
    if ('localStorage' in window && window.localStorage !== null) {
        // we can use localStorage object to store data
        return true;
    } else {
            return false;
    }
}

function listajRezervacije() {
    if (CheckBrowser()) {
        var key = "";
        var list = "<tr><th width='500'>Datum polaska</th><th width='500'>Broj dana</th><th width='500'>Broj putnika</th></tr>\n";
        var hotelIDElem = document.getElementById("hotelId");
        var hotelID = hotelIDElem.innerHTML;
        var i = 0;
        for (i = 0; i <= localStorage.length - 1; i++) {
            key = localStorage.key(i);

            /*
            * Proveriti da li je vrednost prikljucena ovom kljucu starija od 7 dana.
            * Ako jeste, izbaciti je iz storidza.
            */
            var reservation = localStorage.getItem(key);
            var reservationTime = parseInt(reservation.substring(0, reservation.indexOf("_")));
            var currentTime = new Date();
            currentTime = currentTime.getTime();
            if(currentTime - reservationTime > 604800000)
            {
                localStorage.removeItem(key);
                continue;
            }

            if(key.indexOf(hotelID) != -1)
            {
                /*
                *Ispis napraviti da bude lep.
                *Mozda ubaciti funkciju koja ce da formatira string dobijen getItem funkcijom?
                */
                var sep1Index = reservation.indexOf("_");
                var sep2Index = reservation.indexOf("_", sep1Index+1);
                var sep3Index = reservation.indexOf("_", sep2Index+1);
                var reservationCount = reservation.substring(sep1Index+1, sep2Index);
                var date = reservation.substring(sep2Index+1, sep3Index);
                var numberOfDays = reservation.substring(sep3Index+1);

                list += "<tr><td>" + date + "</td>\n<td>" + numberOfDays 
                        + "</td>\n<td>" + reservationCount + "</td></tr>\n";
            }
        }
        if (list == "<tr><th width='500'>Datum polaska</th><th width='500'>Broj dana</th><th width='500'>Broj putnika</th></tr>\n") {
            list = "<tr><td><i>Nema rezervacija za ovaj hotel u poslednjih nedelju dana!</i></td></tr>\n";
        }
        document.getElementById("list").innerHTML = list;
    } else {
        alert('Cannot store shopping list as your browser do not support local storage');
    }
}

