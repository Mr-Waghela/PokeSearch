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
        setTimeout(function(){ 
            window.scrollTo({
                top:400,
                left:0,
                behaviour: 'smooth'
            });
        }, 1000);
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

        var scrollTop = document.getElementById('scroll-totop');
        window.addEventListener('scroll', () => {
            var ypos = window.pageYOffset;
            if(ypos >= 300){
                scrollTop.classList.add('visible');
            } else {
                scrollTop.classList.remove('visible');
            }
        })
        scrollTop.addEventListener('click', function(){
          window.scrollTo({
            top:0,
            left:0,
            behaviour: 'smooth'
          });
        })
        getAllpokemonData('https://pokeapi.co/api/v2/pokemon?limit=964');

    };

     function ac(value) {
        loadMore.style.display = 'none';
        var retrievedData = localStorage.getItem("results");
        retrievedPokeData = JSON.parse(retrievedData);
        var n = retrievedPokeData.length;     
        datalist.innerHTML = ''; 
        l=value.length; 
        if(l != 0){
            datalist.style.display = 'block';           
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
        }else{
            datalist.style.display = 'none';
        };

         var listingParent = document.getElementById('datalist').getElementsByTagName('li')
           for(var i=0;i<listingParent.length;i++){
                listingParent[i].addEventListener('click',function(e){
                searchBynameTxt.value = this.innerText;
                datalist.style.display = 'none';
                clear();
                var pokeid = this.getAttribute("data-item");
                pokeid = parseInt(pokeid);
                var imgPath1 = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'+ pokeid +'.png'
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
                var imgPath = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'+ pokeID +'.png'
                var pokeOfdaystr = '<li><a href="" onclick=fetchPokemonData('+ pokeID +',event)><img class="lozad" data-src="'+ imgPath +'" src=""/></a></li>';
                document.querySelector('.pokedata').innerHTML = pokeOfdaystr;
                lazy();
                })
            .catch(function(error) {
                document.write('Looks like there was a problem: \n', error);
            });
        }
    }
    function createListing(arrayChunk,limit){
            for (let i = 0;i<limit;i++){
                var pokemonName = arrayChunk[i].name;
                var pokeUrl = arrayChunk[i].url;
                var res = pokeUrl.split("/");
                var pokeID = res[res.length-2];
                var imgPath = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'+ pokeID +'.png'
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
        var imgPath = pokeDetails['sprites']['front_default'];
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
        setTimeout(function(){ 
            window.scrollTo({
                top:400,
                left:0,
                behaviour: 'smooth'
            });
        }, 1000);
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
              panel.style.opacity = "0";
            } else {
              panel.style.display = "block";
              panel.style.opacity = "1";
            }
          });
        }
    }
