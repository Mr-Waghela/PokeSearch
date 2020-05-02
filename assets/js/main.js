    var displayStr = '';
    var pokelimit;
    var totalPokemon;
    var pokemonNames = [];
    var listItems = document.querySelector("#allListings");
    var detailsList = document.querySelector("#details");
    var pokelimit = document.querySelector('#pokeVal');
    var advice = document.querySelector('#limit');
    var displayPokemon = document.querySelector('#dspPoke');
    var backBtn = document.querySelector('#back');
    var SupriseBtn = document.querySelector('#pokeofday');
    var overlay = document.querySelector('.overlay');
    var searchBynameTxt = document.querySelector('#searchByname');
    var datalist = document.querySelector("#datalist");
    var nametxt = document.querySelector(".nametxt");
    var inputFields = document.querySelector(".input-fields");
    var showbyname = document.querySelector(".showbyname");
    var showAll = document.querySelector(".showAll");
    // var nextPage = document.querySelector(".next-page");
    var retrievedData = localStorage.getItem("results");
    var retrievedPokeData = JSON.parse(retrievedData);
    var chunk = 10;
    var incNum = 0;

    showbyname.onclick = function(){
        inputFields.style.display = 'none';
        nametxt.style.display = 'block';
        showbyname.style.display = 'none';
        showAll.style.display = 'block';
        clear();
    }

    // nextPage.onclick = function(){
    //     incNum++;
    //     showpage();
    // }

    showAll.onclick = function(){
        incNum++;
        createListing(retrievedPokeData);
    }

    // function showpage(){
    //     totalPokemon = retrievedPokeData;
    //     var array1 = totalPokemon.splice(0, chunk); 
    //     var array2 = totalPokemon.splice(0, chunk); 
    //     var array3 = totalPokemon.splice(0, chunk); 
    //     var array4 = totalPokemon.splice(0, chunk); 
    //     var array5 = totalPokemon.splice(0, chunk); 
    //     var array6 = totalPokemon.splice(0, chunk); 
    //     var array7 = totalPokemon.splice(0, chunk); 
    //     var array8 = totalPokemon.splice(0, chunk); 
    //     var array9 = totalPokemon.splice(0, chunk); 
    //     console.log(array9)
    //     if(incNum == 1){
    //         nextPage.innerText = incNum;
    //         showAllsection(array1);
    //     }
    //     else if(incNum == 2){
    //         nextPage.innerText = incNum;
    //         showAllsection(array2);
    //     }        
    //     else if(incNum == 3){
    //         nextPage.innerText = incNum;
    //         showAllsection(array3);
    //     }        
    //     else if(incNum == 4){
    //         nextPage.innerText = incNum;
    //         showAllsection(array4);
    //     }
    //     else if(incNum == 5){
    //         nextPage.innerText = incNum;
    //         showAllsection(array5);
    //     }
    //     else if(incNum == 6){
    //         nextPage.innerText = incNum;
    //         showAllsection(array6);
    //     }
    //     else if(incNum == 7){
    //         nextPage.innerText = incNum;
    //         showAllsection(array7);
    //     }
    //     else if(incNum == 8){
    //         nextPage.innerText = incNum;
    //         showAllsection(array8);
    //     }    
    //     else if(incNum == 9){
    //         nextPage.innerText = incNum;
    //         showAllsection(array9);
    //     }        
    //     else{
    //          nextPage.display.style = 'none'; 
    //     }
    // }

    function showAllsection(arrayChunk){
        showAll.style.display = 'none';
        nametxt.style.display = 'none';
        showbyname.style.display = 'block';
        createListing(arrayChunk);
    }

    window.onload = function(){
        getAllpokemonData('https://pokeapi.co/api/v2/pokemon?limit=964');
    };

     function ac(value) {
        var retrievedData = localStorage.getItem("results");
        retrievedPokeData = JSON.parse(retrievedData);
        var n = retrievedPokeData.length;     
        datalist.innerHTML = ''; 
        datalist.style.display = 'block';           
         l=value.length; 
        for (var i = 0; i<n; i++) { 
         var retrivedName = retrievedPokeData[i].name;
         if(((retrievedPokeData[i].name.toLowerCase()).indexOf(value.toLowerCase()))>-1) 
            { 
                var retrivedurl = retrievedPokeData[i].url;
                var urlsubstrng = retrivedurl.split("/");
                var retrivedId = urlsubstrng[urlsubstrng.length-2];
                var node = document.createElement("li"); 
                node.setAttribute('data-item',retrivedId)
                var val = document.createTextNode(retrivedName); 
                node.appendChild(val);
                datalist.appendChild(node); 
             } 
         } 

         var listingParent = document.getElementById('datalist').getElementsByTagName('li')
           for(var i=0;i<listingParent.length;i++){
                listingParent[i].addEventListener('click',function(e){
                searchBynameTxt.value = this.innerText;
                datalist.style.display = 'none';
                var pokeid = this.getAttribute("data-item");
                pokeid = parseInt(pokeid);
                var imgPath1 = 'https://pokeres.bastionbot.org/images/pokemon/'+ pokeid +'.png'
                seachtext ='<li><a href="" onclick=fetchPokemonData('+ pokeid +',event)><img class="lozad" data-src="'+ imgPath1 +'" src=""/></a><h3>'+ this.innerText +' </h3> </li>';
                listItems.innerHTML = seachtext;
                lazy();
             });
           }
     } 

    function getAllpokemonData(url){
        if(url){
            fetch(url)
            .then(function(response) {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                // Read the response as json.
                return response.json();
                })
            .then(function(allDAta) {
                // Do stuff with the JSON.
                var results = allDAta.results;
                // console.log(results)
                localStorage.setItem("results", JSON.stringify(results));
                var storedNames = JSON.parse(localStorage.getItem("results"));
                })
            .catch(function(error) {
                document.write('Looks like there was a problem: \n', error);
            });
        }
    }

    SupriseBtn.onclick = function(){
        pokemonOfDay('https://pokeapi.co/api/v2/pokemon?limit=100');
    }
    overlay.onclick = function(){
        this.style.display = 'none';
    }

    function clear(){
        listItems.innerHTML = '';
        detailsList.innerHTML = '';
        advice.innerHTML = "ALL THE RARE POKEMON ARE YET TO BE LISTED IN THE POKEDEX,<br> TOTAL NUMBER OF POKEMON DATA STORED IS 964... <br> SO DON'T BE <i>TEAM ROCKET</i> AND SEARCH BETWEEN 1-964"
    }

    function fetchPokemonData(pid,e){
        e.preventDefault();
        var feturl = retrievedPokeData[pid-1].url;
        console.log(retrievedPokeData[pid]);
        fetch(feturl)
        .then(function(response) {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            // Read the response as json.
            return response.json();
            })
        .then(function(pokeDetails) {
            // Do stuff with the JSON
            displayAbility(pokeDetails);
            })
        .catch(function(error) {
            document.write('Looks like there was a problem: \n', error);
        });
    }

    function pokemonOfDay(url){
        if(url){
            fetch(url)
            .then(function(response) {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                // Read the response as json.
                return response.json();
                })
            .then(function(responseAsJson1) {
                overlay.style.display = 'block';
                detailsList.innerHTML = '';
                totalPokemon = responseAsJson1.results;
                newInd = Math.floor((Math.random() * 100) + 1);
                var pokemonName = responseAsJson1.results[newInd].name;
                var pokeUrl = responseAsJson1.results[newInd].url;
                var res = pokeUrl.split("/");
                var pokeID = res[res.length-2];
                var imgPath = 'https://pokeres.bastionbot.org/images/pokemon/'+ pokeID +'.png'
                var pokeOfdaystr = '<li><a href="" onclick=fetchPokemonData('+ pokeID +',event)><img class="lozad" data-src="'+ imgPath +'" src=""/></a></li>';
                document.querySelector('.pokedata').innerHTML = pokeOfdaystr;
                lazy();
                })
            .catch(function(error) {
                document.write('Looks like there was a problem: \n', error);
            });
        }
    }

    function createListing(arrayChunk){
        displayStr = '';
        detailsList.innerHTML = '';
            for (let index in arrayChunk){
                var pokemonName = arrayChunk[index].name;
                var pokeUrl = arrayChunk[index].url;
                var res = pokeUrl.split("/");
                var pokeID = res[res.length-2];
                var imgPath = 'https://pokeres.bastionbot.org/images/pokemon/'+ pokeID +'.png'
                displayStr = displayStr + '<li><a href="" onclick=fetchPokemonData('+ pokeID +',event)><img class="lozad" data-src="'+ imgPath +'" src=""/></a><h3>'+ pokemonName +' </h3> </li>';
            }
            listItems.innerHTML = displayStr;
            // nextPage.style.display = 'block';
            lazy();
    }


    function displayAbility(pokeDetails){
        console.log(pokeDetails)
        var Pokename = pokeDetails.name;
        var ability = '';
        var Pokemove = '';
        var Ptype = '';
        var imgPath = 'https://pokeres.bastionbot.org/images/pokemon/'+ pokeDetails.id +'.png';
        for(let i in pokeDetails.abilities){
            PokeAb = pokeDetails.abilities[i].ability.name;
            ability = ability + '<p>'+PokeAb+'</p>';
        }
        for(let j in pokeDetails.moves){
            if(j <= 10){
                Pokemoves = pokeDetails.moves[j].move.name;
                Pokemove = Pokemove + '<p>'+Pokemoves+'</p>';
            }
        }
        for(let k in pokeDetails.types){
            Poketype = pokeDetails.types[k].type.name;
            Ptype = Ptype + '<p>'+Poketype+'</p>';
        }

        listItems.innerHTML = '';
        detailsList.innerHTML ='<div class="img-wrap"><img class="lozad" data-src="'+ imgPath +'" src=""/><h3>name :  '+ Pokename +' </h3></div><div class="detail-wrap"><div class="pability"><h4 class="accordion">Abilities</h4><div class="desc">'+ ability+'</div></div><div class="pheight"><h4 class="accordion">Height</h4><div class="desc"><p>'+ pokeDetails.height+' </p></div></div><div class="pType"><h4 class="accordion">Type</h4><div class="desc">'+ Ptype +'</div></div><div class="pmove"><h4 class="accordion">Top Moves</h4><div class="desc">'+ Pokemove +'</div></div></div>';
        lazy();
        accordian();

    };
    
    function lazy(){
    lozad('.lozad', {
        load: function(el) {
            el.src = 'assets/images/preloader.gif';
            el.onload = function() {
                el.src = el.dataset.src;
                el.classList.add('fade')
            }
        }
    }).observe()
    }    

    new Darkmode().showWidget();

function accordian(){
var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}
}
