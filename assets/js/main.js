    var str = '';
    var pokelimit;
    var listItems = document.querySelector("#allListings");
    var detailsList = document.querySelector("#details");
    pokelimit = document.querySelector('#pokeVal');
    advice = document.querySelector('#limit');
    var totalPokemon;

    pokelimit.onfocus = function(){
        clear();
    } 
    document.querySelector('#clear').onclick = function(){
        clear();
    } 

    document.querySelector('#dspPoke').onclick = function(){
        catchemAll(pokelimit.value);
    }
    document.querySelector('#back').onclick = function(){
        document.querySelector("#back").style.visibility = 'hidden';
        catchemAll(pokelimit.value);
    }
    document.querySelector('#pokeofday').onclick = function(){
        pokemonOfDay('https://pokeapi.co/api/v2/pokemon?limit=100');
    }
    document.querySelector('.overlay').onclick = function(){
        // pokemonOfDay('https://pokeapi.co/api/v2/pokemon?limit=100');
        this.style.display = 'none';
    }

    function catchemAll(lim){
        str = '';
        detailsList.innerHTML = '';
        if(lim == '' && lim == 0){
            advice.innerHTML = 'please enter limit to display pokemon';
        }
        else if(lim < 965){
            advice.innerHTML = "THERE YOU GO POKEMON MASTER, GOTTA CATCH EM ALL";
            feturl = 'https://pokeapi.co/api/v2/pokemon?limit='+ lim;
            fetAllPokemon(feturl);
        }
        else{
            advice.innerHTML = "OOPS!! GUESS WE RAN OUT OF POKEMON'S OVER HERE, HERE A ADVICE TRY NUMBERS BETWEEN 1 - 695";
        }
    }

    function clear(){
        listItems.innerHTML = '';
        detailsList.innerHTML = '';
        document.querySelector("#back").style.visibility = 'hidden';
        advice.innerHTML = "ALL THE RARE POKEMON ARE YET TO BE LISTED IN THE POKEDEX, TOTAL NUMBER OF POKEMON DATA STORED IS 964...SO DON'T BE TEAM ROCKET AND SEARCH BETWEEN 1-964"
    }

    
    function fetAllPokemon(url){
        if(url){
            fetch(url)
            .then(function(response) {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                // Read the response as json.
                return response.json();
                })
            .then(function(responseAsJson) {
                // Do stuff with the JSON.
                displayPokemon(responseAsJson);
                })
            .catch(function(error) {
                document.write('Looks like there was a problem: \n', error);
            });
        }
    }

    function fetchPokemonData(pid,e){
        e.preventDefault();
        document.querySelector("#back").style.visibility = 'visible';
        var feturl = totalPokemon[pid-1].url;
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
                // Do stuff with the JSON.
                document.querySelector('.overlay').style.display = 'block';
                document.querySelector("#back").style.visibility = 'hidden';
                detailsList.innerHTML = '';

                // .style.display = 'block';
                totalPokemon = responseAsJson1.results;
                newInd = Math.floor((Math.random() * 100) + 1);
                var pokemonName = responseAsJson1.results[newInd].name;
                var pokeUrl = responseAsJson1.results[newInd].url;
                var res = pokeUrl.split("/");
                var pokeID = res[res.length-2];
                imgPath = 'https://pokeres.bastionbot.org/images/pokemon/'+ pokeID +'.png'
                str1 = '<li><a href="" onclick=fetchPokemonData('+ pokeID +',event)><img class="lozad" data-src="'+ imgPath +'" src=""/></a></li>';
                document.querySelector('.pokedata').innerHTML = str1;
                lazy();
                })
            .catch(function(error) {
                document.write('Looks like there was a problem: \n', error);
            });
        }
    }
    

    function displayPokemon(pokemonData){
        if(pokemonData){
            totalPokemon = pokemonData.results;
            var str = createListing(totalPokemon);
        }
    }

    function createListing(totalPokemon){
        if(totalPokemon){
            var myArr = [];
            for (let index in totalPokemon){
                randomNumber(myArr);
                var newInd = myArr[index];
                var pokemonName = totalPokemon[newInd].name;
                var pokeUrl = totalPokemon[newInd].url;
                var res = pokeUrl.split("/");
                var pokeID = res[res.length-2];
                imgPath = 'https://pokeres.bastionbot.org/images/pokemon/'+ pokeID +'.png'
                str = str + '<li><a href="" onclick=fetchPokemonData('+ pokeID +',event)><img class="lozad" data-src="'+ imgPath +'" src=""/></a><h3>'+ pokemonName +' </h3> </li>';
            }
            listItems.innerHTML = str;
            lazy();
        }
    }


    function displayAbility(pokeDetails){
        console.log(pokeDetails)
        var Pokename = pokeDetails.name;
        var ability = '';
        var Pokemove = '';
        var Ptype = '';
        imgPath = 'https://pokeres.bastionbot.org/images/pokemon/'+ pokeDetails.id +'.png';
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
        detailsList.innerHTML ='<div class="img-wrap"><img class="lozad" data-src="'+ imgPath +'" src=""/></div><h3>name :  '+ Pokename +' </h3><div class="detail-wrap"><div class="pability"><h4>Abilities</h4>'+ ability+'</div><div class="pheight"><h4>Height</h4><p>'+ pokeDetails.height+' </p></div><div class="pType"><h4>Type</h4>'+ Ptype +'</div><div class="pmove"><h4>Top Moves</h4>'+ Pokemove +'</div></div>';
        lazy();

    };


    function randomNumber(myArr){
        if(myArr.length == 0){
            var val = Math.floor(Math.random() * pokelimit.value);
            myArr.push(val);
        }
        else{
            val = Math.floor(Math.random() * pokelimit.value);
            if(myArr.indexOf(val) == -1){
                myArr.push(val);
            }
            else{
                randomNumber(myArr);
            }
        }
    }
    
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
