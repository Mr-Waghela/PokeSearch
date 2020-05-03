    var displayStr = '';
    var pokelimit;
    var totalPokemon;
    var pokemonNames = [];
    var listItems = document.querySelector("#allListings");
    var detailsList = document.querySelector("#details");
    var pokelimit = document.querySelector('#pokeVal');
    var displayPokemon = document.querySelector('#dspPoke');
    var SupriseBtn = document.querySelector('#pokeofday');
    var overlay = document.querySelector('.overlay');
    var searchBynameTxt = document.querySelector('#searchByname');
    var datalist = document.querySelector("#datalist");
    var loadMore = document.querySelector("#loadMore");
    var nametxt = document.querySelector(".nametxt");
    var inputFields = document.querySelector(".input-fields");
    var showAll = document.querySelector(".showAll");
    var retrievedData = localStorage.getItem("results");
    var retrievedPokeData = JSON.parse(retrievedData);
    var limit = 10;
    var evnum;


    showAll.onclick = function(){
        loadMore.style.display = 'block';
        displayStr = '';
        detailsList.innerHTML = '';
        createListing(retrievedPokeData,10);
    }

    loadMore.onclick = function(){
        limit = limit + 10;
        createListing(retrievedPokeData,limit);
    }

    window.onload = function(){
        var stylesheet = document.styleSheets[1].ownerNode.getAttribute('href');
        var date = new Date();
        var time = date.getTime();
        newStylesheet = stylesheet + '?' + time;
        document.styleSheets[1].ownerNode.setAttribute('href',newStylesheet)
        getAllpokemonData('https://pokeapi.co/api/v2/pokemon?limit=964');
    };

     function ac(value) {
        loadMore.style.display = 'none';
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
                clear();
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
    }

    function fetchPokemonData(pid,e){
        loadMore.style.display = 'none';
        e.preventDefault();
        var feturl = retrievedPokeData[pid-1].url;
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

    // function PokeEvolve(PokemonId){
    //     fetch("https://pokeapi.co/api/v2/pokemon-species/"+PokemonId+"/")
    //     .then(function(response) {
    //         if (!response.ok) {
    //             throw Error(response.statusText);
    //         }
    //         // Read the response as json.
    //         return response.json();
    //         })
    //     .then(function(species) {
    //         console.log(species.)
    //             fetch(species.evolution_chain.url)
    //             .then(function(response) {
    //                 if (!response.ok) {
    //                     throw Error(response.statusText);
    //                 }
    //                 // Read the response as json.
    //                 return response.json();
    //                 })
    //             .then(function(evovle) {
    //                 console.log(evovle)
    //                 var imgPath = 'https://pokeres.bastionbot.org/images/pokemon/'+ PokemonId +'.png'
    //                 detailsList.insertAdjacentHTML('beforeend', '<div class="evovle-title">Pokemon Evolution</div><div class="img-wrap"><img class="lozad" data-src="" src="'+ imgPath +'"/><div class="pname">'+evovle.chain.species.name+'<div></div>');
    //                 console.log(evovle.chain.evolves_to[0])
    //                 if (evovle.chain.evolves_to[0].length != 0) {
    //                     var evolveId = PokemonId+1;
    //                      var imgPath = 'https://pokeres.bastionbot.org/images/pokemon/'+ evolveId +'.png'
    //                     detailsList.insertAdjacentHTML('beforeend', '<div class="img-wrap"><img class="lozad" data-src="" src="'+ imgPath +'"/><div class="pname">'+evovle.chain.evolves_to[0].species.name+'<div></div>');
    //                      console.log(evovle.chain.evolves_to[0].evolves_to[0])
    //                     if(evovle.chain.evolves_to[0].evolves_to[0].length != 0){
    //                         var evolveId1 = evolveId+1;
    //                         var imgPath = 'https://pokeres.bastionbot.org/images/pokemon/'+ evolveId1 +'.png'
    //                         detailsList.insertAdjacentHTML('beforeend', '<div class="img-wrap"><img class="lozad" data-src="" src="'+ imgPath +'"/><div class="pname">'+evovle.chain.evolves_to[0].evolves_to[0].species.name+'<div></div>');
    //                     }
    //                 }
    //             })
    //             .catch(function(error) {
    //                 document.write('Looks like there was a problem: \n', error);
    //             });
    //         })
    //     .catch(function(error) {
    //         document.write('Looks like there was a problem: \n', error);
    //     });
    // }

    function createListing(arrayChunk,limit){
            
            for (let i = 0;i<limit;i++){
                var pokemonName = arrayChunk[i].name;
                var pokeUrl = arrayChunk[i].url;
                var res = pokeUrl.split("/");
                var pokeID = res[res.length-2];
                var imgPath = 'https://pokeres.bastionbot.org/images/pokemon/'+ pokeID +'.png'
                displayStr = displayStr + '<li><a href="" onclick=fetchPokemonData('+ pokeID +',event)><img class="lozad" data-src="'+ imgPath +'" src=""/></a><h3>'+ pokemonName +' </h3> </li>';
            }
            listItems.innerHTML = displayStr;
            lazy();
    }


    function displayAbility(pokeDetails){
        var Pokename = pokeDetails.name;
        var ability = '';
        var Pokemove = '';
        var Ptype = '';
        var statedata = '';
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
        for(let l in pokeDetails.stats){
            stateNum = pokeDetails.stats[l].base_stat;
            stateName = pokeDetails.stats[l].stat.name;
            statedata = statedata + '<p>'+stateName+' : '+stateNum+'</p>';
        }

        listItems.innerHTML = '';
        detailsList.innerHTML ='<div class="img-wrap"><img class="lozad" data-src="'+ imgPath +'" src=""/><h3>name :  '+ Pokename +' </h3></div><div class="detail-wrap"><div class="pability"><h4 class="accordion">Abilities</h4><div class="desc">'+ ability+'</div></div><div class="pheight"><h4 class="accordion">Height</h4><div class="desc"><p>'+ pokeDetails.height+' </p></div></div><div class="pType"><h4 class="accordion">Type</h4><div class="desc">'+ Ptype +'</div></div><div class="pmove"><h4 class="accordion">Top Moves</h4><div class="desc">'+ Pokemove +'</div></div><div class="pstat"><h4 class="accordion">Stats</h4><div class="desc">'+ statedata +'</div></div></div>';
        // PokeEvolve(pokeDetails.id);
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
