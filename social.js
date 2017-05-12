

function determinant(equation1, equation2, equation3){
  let x = equation1[0]*(equation2[1]*equation3[2] - equation2[2]*equation3[1]);
  let y = -equation1[1]*(equation2[0]*equation3[2] - equation2[2]*equation3[0]);
  let z = equation1[2]*(equation2[0]*equation3[1] - equation2[1]*equation3[0]);
  return x+y+z;
}

function equationSolver(equation1, equation2, equation3){
  let denominator = determinant([equation1[0], equation1[1], equation1[2]], [equation2[0], equation2[1], equation2[2]], [equation3[0], equation3[1], equation3[2]]);
  let x = determinant([equation1[3], equation1[1], equation1[2]], [equation2[3], equation2[1], equation2[2]], [equation3[3], equation3[1], equation3[2]])/denominator;
  let y = determinant([equation1[0], equation1[3], equation1[2]], [equation2[0], equation2[3], equation2[2]], [equation3[0], equation3[3], equation3[2]])/denominator;
  let z = determinant([equation1[0], equation1[1], equation1[3]], [equation2[0], equation2[1], equation2[3]], [equation3[0], equation3[1], equation3[3]])/denominator;
  return[x, y, z];
}

function getRatios(liquor, beer, wine){
  return [beer/liquor, wine/liquor];
}

function Drink(brand, price, quantity){
  this.brand = brand;
  this.price = price;
  this.quantity = quantity;
}
function start(){
  let page = null;
  let initialModel = {
    people: document.getElementById('people').value,
    drunkenness: document.getElementById('drunkenness').innerHTML,
    budget: document.getElementById('budget').value,
    food: {
      pizza: document.getElementById('pizza').checked,
      wings: document.getElementById('wings').checked,
      subs: document.getElementById('subs').checked,
      pasta: document.getElementById('pasta').checked
    },
    beer: document.getElementById('beer').innerHTML,
    wine: document.getElementById('wine').innerHTML,
    music: {
      hiphop: document.getElementById('hiphop').checked,
      electronic: document.getElementById('electronic').checked,
      throwbacks: document.getElementById('throwbacks').checked,
      pop: document.getElementById('pop').checked
    },
    liquor: {rank: document.getElementById('liquor').innerHTML, types: {
      rum: document.getElementById('rum').checked,
      vodka: document.getElementById('vodka').checked,
      gin: document.getElementById('gin').checked,
      tequila: document.getElementById('tequila').checked
      }
    }
  };
  let newModel = updateModel(initialModel);

  if(typeof newModel === "string") viewError(newModel);
  else viewSuccess(newModel);

}

function updateModel(initialModel){
  let vodka = [new Drink("Rubinoff", 13, 40), new Drink("Smirnoff", 21, 40), new Drink("Tito's", 31, 40), new Drink("Grey Goose", 57, 40)];
  let tequila = [new Drink("Old Mexico", 20, 40), new Drink("Jose Cuervo", 32, 40)];
  let gin = [new Drink("Gordons", 21, 40), new Drink("Beefeater", 31, 40), new Drink("Bombay Sapphire", 40, 40)];
  let rum = [new Drink("Admiral Nelson", 18, 40), new Drink("Barcardi Silver", 21, 40), new Drink("Captain Morgan", 26, 40)];

  let beers = [new Drink("30 racks of Genesee", 15, 30), new Drink("30 racks of Natural Light", 16.5, 30), new Drink("30 racks of Bud Light", 23.5, 30)];
  let wines = [new Drink("boxes of Franzia", 12, 33), new Drink("bottles of Barefoot", 11, 10)];

  let drinks = {
    liquor: {vodka, tequila, gin, rum},
    beer:beers,
    wine:wines
  };

  let food = {
    pizza: {
      price: 10,
      people: 4
      },
    wings: {
      price: 26,
      people: 6
    },
    subs: {
      price: 6,
      people: 1
    },
    pasta: {
      price: 6,
      people: 1
    }
  };
  let music = {
    hiphop: ["In Da Club by 50 Cent", "No Problems by Chance the Rapper", "Sweatpants by Childish Gambino", "The Next Episode by Dr. Dre", "Forgot About Dre by Dr. Dre", "A Milli by Lil Wayne", "Shake That by Eminem", "Mask Off by Future", "How We Do by Game", "Gold Digger by Kanye West"],
    electronic: ["Closer by The Chainsmokers", "It Aint Me by Kygo", "Stay by Zedd", "Slide by Calvin Harris", "Something Just Like This by The Chainsmokers", "Scared To Be Lonely by Martin Garrix", "Andromeda by The Gorillaz", "Say Less by Dillon Francis", "Paris by The Chainsmokers", "Let Me Love You by DJ Snake"],
    throwbacks: ["Ignition (Remix) by R. Kelly", "Sugar, We're Goin' Down by Fall Out Boy", "Stacy's Mom by Founders of Wayne", "Lose Control by Missy Elliot", "Fireflies by Owl City", "Yeah! by Usher", "Temperature by Sean Paul", "Hey Ya by Outkast", "Mr. Brightside by The Killers", "Lollipop by Lil Wayne", "Crank That by Soulja Boy"],
    pop: ["Shape Of You by Ed Sheeran", "That's What I Like by Bruno Mars", "I Feel It Coming by The Weeknd", "Chained To The Rhythm by Katy Perry", "Cold by Maroon 5", "Passionfruit by Drake", "One Dance by Drake", "All Night by Chance the Rapper", "Rockabye by Clean Bandit", "Love On The Brain by Rihanna"]
  };

  let totalDrinks = initialModel.drunkenness*initialModel.people;
  let totalFood
  let ratios = getRatios(initialModel.liquor.rank, initialModel.beer, initialModel.wine);
  let initialAmounts = getAmounts(initialModel, ratios, totalDrinks);

  if(typeof initialAmounts === "string") return initialAmounts;

  let finalDrinks = maximizeQuality(initialAmounts, [initialModel.liquor.rank, initialModel.beer, initialModel.wine], initialModel.budget, drinks);

  if(typeof finalDrinks === "string") return finalDrinks;

  let priceOfAlcohol = calculateFinalPrice(initialAmounts, finalDrinks);

  let liquorFinal = {
    vodka: {brand: finalDrinks.liquors.vodka.brand, quantity: initialAmounts.liquor.vodka},
    gin: {brand: finalDrinks.liquors.gin.brand, quantity: initialAmounts.liquor.gin},
    rum: {brand: finalDrinks.liquors.rum.brand, quantity: initialAmounts.liquor.rum},
    tequila: {brand: finalDrinks.liquors.tequila.brand, quantity: initialAmounts.liquor.tequila}
  };
  let alcAmounts = {
    liquor:liquorFinal,
    beer:{brand: finalDrinks.beer.brand, quantity: initialAmounts.beer},
    wine:{brand: finalDrinks.wine.brand, quantity: initialAmounts.wine}
  };

  let foodSelections = getFood(food, initialModel.food, initialModel.people);
  if(typeof foodSelections === "string") return foodSelections;

  let priceOfFood = getFoodPrice(food, foodSelections);
  let playlist = getMusic(music, initialModel.music, 10);
  if(typeof playlist === "string") return playlist;

  let finalModel = {
    alcAmounts: alcAmounts,
    alcPrice: priceOfAlcohol,
    foodAmounts: foodSelections,
    foodPrice:priceOfFood,
    music: playlist
  };
  return finalModel;

}


function maximizeQuality(amounts,preferences,budget, drinks){
  let liquorIndex = 0;
  let beerIndex = 0;
  let wineIndex = 0;
  let vodkaIndex = 0;
  let ginIndex = 0;
  let tequilaIndex = 0;
  let rumIndex = 0;
  let vodka = {brand: "None", price:0};
  let gin = {brand: "None", price:0};
  let tequila = {brand: "None", price:0};
  let rum = {brand: "None", price:0};
  let counter = 0;

  let totalLoops = 10+ drinks.liquor.vodka.length + drinks.liquor.gin.length + drinks.liquor.tequila.length+drinks.liquor.rum.length+drinks.beer.length+drinks.wine.length;

  let totalPrice = calculatePrice(vodkaIndex, ginIndex, tequilaIndex, rumIndex, beerIndex, wineIndex, amounts, drinks);

  if(totalPrice > budget) return "You are overbudget by " + (totalPrice - budget) + " dollars. Please increase your budget or alter your liquor types and drunkenness levels";

  let order = preferenceOrder(preferences);
  let liquorArray = [amounts.liquor.vodka, amounts.liquor.gin, amounts.liquor.tequila, amounts.liquor.rum];


  while (true){

    for (i=0;i<3;i++){

      if(counter > totalLoops) {

        if(liquorArray[0] != 0) vodka = drinks.liquor.vodka[vodkaIndex];
        if(liquorArray[1] != 0) gin = drinks.liquor.gin[ginIndex];
        if(liquorArray[2] != 0) tequila = drinks.liquor.tequila[tequilaIndex];
        if(liquorArray[3] != 0) rum = drinks.liquor.rum[rumIndex];

        let total = {
          liquors: {vodka, gin, tequila, rum},
          beer: (amounts.beer !=0) ? drinks.beer[beerIndex]:{brand: "None", price:0},
          wine: (amounts.wine !=0) ? drinks.wine[wineIndex]:{brand: "None", price:0}
        };

        return total;
      }
      if (order[i] == 0){
        while(liquorArray[liquorIndex] == 0){
          liquorIndex++;
          if(liquorIndex == 4) liquorIndex = 0;
        };

        if(liquorIndex == 0 && vodkaIndex < drinks.liquor.vodka.length-1) vodkaIndex += 1;
        else if(liquorIndex == 1 && ginIndex < drinks.liquor.gin.length-1) ginIndex += 1;
        else if(liquorIndex == 2 && tequilaIndex < drinks.liquor.tequila.length-1) tequilaIndex += 1;
        else if(liquorIndex == 3 && rumIndex < drinks.liquor.rum.length - 1) rumIndex += 1;

        totalPrice = calculatePrice(vodkaIndex, ginIndex, tequilaIndex, rumIndex, beerIndex, wineIndex, amounts, drinks);


        if (totalPrice>budget){
          if(liquorIndex == 0) vodkaIndex -= 1;
          else if(liquorIndex == 1) ginIndex -= 1;
          else if(liquorIndex == 2) tequilaIndex -= 1;
          else rumIndex -= 1;

          if(liquorArray[0] != 0) vodka = drinks.liquor.vodka[vodkaIndex];
          if(liquorArray[1] != 0) gin = drinks.liquor.gin[ginIndex];
          if(liquorArray[2] != 0) tequila = drinks.liquor.tequila[tequilaIndex];
          if(liquorArray[3] != 0) rum = drinks.liquor.rum[rumIndex];

          let total = {
            liquors: {vodka, gin, tequila, rum},
            beer: (amounts.beer !=0) ? drinks.beer[beerIndex]:{brand: "None", price:0},
            wine: (amounts.wine !=0) ? drinks.wine[wineIndex]:{brand: "None", price:0}
          };

          return total;
        }
        liquorIndex += 1;
        if(liquorIndex == 4) liquorIndex = 0;
      }
      else if (order[i] == 1){

        if(beerIndex < drinks.beer.length - 1) beerIndex += 1;
        totalPrice = calculatePrice(vodkaIndex, ginIndex, tequilaIndex, rumIndex, beerIndex,wineIndex,amounts, drinks);

        if (totalPrice>budget){
          beerIndex = beerIndex - 1;

          if(liquorArray[0] != 0) vodka = drinks.liquor.vodka[vodkaIndex];
          if(liquorArray[1] != 0) gin = drinks.liquor.gin[ginIndex];
          if(liquorArray[2] != 0) tequila = drinks.liquor.tequila[tequilaIndex];
          if(liquorArray[3] != 0) rum = drinks.liquor.rum[rumIndex];

          let total = {
            liquors: {vodka, gin, tequila, rum},
            beer: (amounts.beer !=0) ? drinks.beer[beerIndex]:{brand: "None", price:0},
            wine: (amounts.wine !=0) ? drinks.wine[wineIndex]:{brand: "None", price:0},
          };

          return total;
        }
      }
      else {
        if(wineIndex < drinks.wine.length - 1) wineIndex += 1;
        totalPrice = calculatePrice(vodkaIndex, ginIndex, tequilaIndex, rumIndex, beerIndex,wineIndex,amounts, drinks);

        if (totalPrice>budget){
          wineIndex = wineIndex - 1;
          if(liquorArray[0] != 0) vodka = drinks.liquor.vodka[vodkaIndex];
          if(liquorArray[1] != 0) gin = drinks.liquor.gin[ginIndex];
          if(liquorArray[2] != 0) tequila = drinks.liquor.tequila[tequilaIndex];
          if(liquorArray[3] != 0) rum = drinks.liquor.rum[rumIndex];
          let total = {
            liquors: {vodka, gin, tequila, rum},
            beer: (amounts.beer !=0) ? drinks.beer[beerIndex]:{brand: "None", price:0},
            wine: (amounts.wine !=0) ? drinks.wine[wineIndex]:{brand: "None", price:0}
          };
          return total;
        }
      }
      counter++;
    }
  }
}

function calculatePrice(vodkaIndex, ginIndex, tequilaIndex, rumIndex, beerIndex, wineIndex, amounts, drinks){

  liquors = amounts.liquor;
  liquorPrice = liquors.vodka*(drinks.liquor.vodka[vodkaIndex].price) + liquors.gin*(drinks.liquor.gin[ginIndex].price) + liquors.tequila*(drinks.liquor.tequila[tequilaIndex].price) + liquors.rum*(drinks.liquor.rum[rumIndex].price);
  return liquorPrice + amounts.beer * drinks.beer[beerIndex].price + amounts.wine * drinks.wine[wineIndex].price;
}


function preferenceOrder(preferences){
  let preferenceList = [];
  if (preferences.indexOf(Math.max(...preferences)) == preferences.indexOf(Math.min(...preferences))){
    preferenceList = [0,1,2]
  }
  else{
  preferenceList.push(indexOfMax(preferences));
  preferenceList.push(-1)
  preferenceList.push(indexOfMin(preferences));
  for (i = 0; i<3; i++){
    if(!preferenceList.includes(i)){
      preferenceList[1] = i;}}}
  return preferenceList
}

function indexOfMax(list) {
    var max = list[0];
    var maxIndex = 0;
    for (var i = 1; i < list.length; i++) {
        if (list[i] > max) {
            maxIndex = i;
            max = list[i];}}
    return maxIndex;
  }

function indexOfMin(list) {
    var min = list[0];
    var minIndex = 0;
    for (var i = 1; i < list.length; i++) {
        if (list[i] < min) {
            minIndex = i;
            min = list[i];}}
    return minIndex;
}

function getAmounts(initialModel, ratios, totalDrinks){
  let amounts = equationSolver([40, 30, 33, totalDrinks], [-ratios[0], 1, 0, 0], [-ratios[1], 0, 1, 0]);

  let totalLiquor = getLiquorQuantities(initialModel, Math.floor(amounts[0]));
  if (typeof totalLiquor === "string") return totalLiquor;
  let totals = {
    liquor: totalLiquor,
    beer: Math.floor(amounts[1]),
    wine: Math.floor(amounts[2])
  };
  return totals;
}

function getLiquorQuantities(initialModel, liquor){
  let array = [(initialModel.liquor.types.vodka) ? 1 : 0, (initialModel.liquor.types.gin) ? 1 : 0, (initialModel.liquor.types.tequila) ? 1 : 0, (initialModel.liquor.types.rum) ? 1 : 0];
  let sum = array.reduce((a, b) => a + b, 0);
  position = 0;
  if(sum == 0) return "Please pick a liquor option or set the slider to 0";


  while(liquor > sum){
    if(array[position] != 0){
      array[position] += 1;
      sum += 1;
    }
    position += 1;
    if(position == 4) position = 0;
  };

  let totalLiquor = {
    vodka: array[0],
    gin: array[1],
    tequila: array[2],
    rum: array[3]
  };

  return totalLiquor;
}

function calculateFinalPrice(amounts,types){
  let beerPrice = amounts.beer*types.beer.price;
  let winePrice = amounts.wine*types.wine.price;
  let liquorPrice = amounts.liquor.vodka*types.liquors.vodka.price+amounts.liquor.gin*types.liquors.gin.price+amounts.liquor.tequila*types.liquors.tequila.price+amounts.liquor.rum*types.liquors.rum.price;
  let prices = {
    total: beerPrice+winePrice+liquorPrice,
    beer:beerPrice,
    liquor:liquorPrice,
    wine:winePrice
  };
  return prices;
}

function getFood(foodList, foodChoices, people){

  let pizza = 0;
  let wings = 0;
  let pasta = 0;
  let subs = 0;

  if(foodChoices.pizza == true) pizza = 1;
  if(foodChoices.wings == true) wings = 1;
  if(foodChoices.pasta == true) pasta = 1;
  if(foodChoices.subs == true) subs = 1;

  let totalFood = {pizza, wings, pasta, subs};
  let price = getFoodPrice(foodList, totalFood);
  if(price == 0) return "Please select a food option";
  if(getPeopleFed(foodList, totalFood)>people) return totalFood;

  let counter = 0;

  while(true){
    if(counter == 0 && totalFood.pizza != 0) {
      totalFood.pizza += 1;
      if(getPeopleFed(foodList, totalFood)>people) return totalFood;
    }
    else if(counter == 1 && totalFood.wings != 0) {
      totalFood.wings += 1;
      if(getPeopleFed(foodList, totalFood)>people) return totalFood;
    }
    else if(counter == 2 && totalFood.pasta != 0) {
      totalFood.pasta += 1;
      if(getPeopleFed(foodList, totalFood)>people) return totalFood;
    }
    else if(counter == 3 && totalFood.subs != 0) {
      totalFood.subs += 1;
      if(getPeopleFed(foodList, totalFood)>people) return totalFood;
    }
    counter += 1;
    if(counter == 4) counter = 0;
  }
}

function getFoodPrice(foodList, totalFood){
  return totalFood.pizza*foodList.pizza.price+totalFood.wings*foodList.wings.price+totalFood.pasta*foodList.pasta.price+totalFood.subs*foodList.subs.price;
}

function getPeopleFed(foodList, totalFood){
  return totalFood.pizza*foodList.pizza.people+totalFood.wings*foodList.wings.people+totalFood.pasta*foodList.pasta.people+totalFood.subs*foodList.subs.people;
}

function getRandomInt(max){
  return Math.floor(Math.random()*max)
}

function getMusic(musicList, music, numberOfSongs){

  if(music.hiphop == false && music.electronic == false && music.throwbacks == false && music.pop == false) return "Please select a music option";
  let totalSongs = 0;
  let counter = 0;
  let songs = [];
  let randomIndex = 0;
  let song = "";
  let switched = 0;

  while (totalSongs < numberOfSongs){

    if(counter == 0 && music.hiphop == true){
      while(switched == 0){
        randomIndex = getRandomInt(musicList.hiphop.length);
        song = musicList.hiphop[randomIndex];

        if(!hasItem(songs, song)) {
          songs.push(song);
          totalSongs += 1;
          switched = 1;
        }
      }
    }
    else if(counter == 1 && music.electronic == true){
      while(switched == 0){
        randomIndex = getRandomInt(musicList.electronic.length);
        song = musicList.electronic[randomIndex];
        if(!hasItem(songs, song)) {
          songs.push(song);
          totalSongs += 1;
          switched = 1;
        }
      }
    }
    else if(counter == 2 && music.throwbacks == true){
      while(switched == 0){
        randomIndex = getRandomInt(musicList.throwbacks.length);
        song = musicList.throwbacks[randomIndex];
        if(!hasItem(songs, song)) {
          songs.push(song);
          totalSongs += 1;
          switched = 1;
        }
      }
    }
    else if(counter == 3 && music.pop == true){
      while(switched == 0){
        randomIndex = getRandomInt(musicList.pop.length);
        song = musicList.pop[randomIndex];
        if(!hasItem(songs, song)) {
          songs.push(song);
          totalSongs += 1;
          switched = 1;
        }
      }
    }
    counter += 1;
    switched = 0;
    if (counter == 4) counter = 0;
  }
  return songs;
}

function hasItem(array, item){
  for(i = 0; i < array.length; i++){
    if(array[i] === item) return true;
  }
  return false;
}

function viewError(model){
  document.getElementById("initial").className = "output"
  document.getElementById("initial").innerHTML = model;
}

function viewSuccess(model){
  document.getElementById("initial").innerHTML = "";
  document.getElementById("initial").className = "output";

  let wineOutput = document.createElement("div");
  wineOutput.className = "alcOutput";
  document.getElementById("initial").appendChild(wineOutput);
  let wineNumber = model.alcAmounts.wine.quantity;
  let wineText = wineNumber.toString();
  if(wineNumber != 0) wineOutput.innerHTML = "Buy " + wineText + " " + model.alcAmounts.wine.brand;
  else document.getElementById("initial").removeChild(wineOutput);

  let beerOutput = document.createElement("div");
  beerOutput.className = "alcOutput";
  document.getElementById("initial").appendChild(beerOutput);
  let beerNumber = model.alcAmounts.beer.quantity;
  let beerText = beerNumber.toString();
  if(beerNumber != 0) beerOutput.innerHTML = "Buy " + beerText + " " + model.alcAmounts.beer.brand;
  else document.getElementById("initial").removeChild(beerOutput);

  let liquorOutput = document.createElement("div");
  liquorOutput.className = "alcOutput";
  document.getElementById("initial").appendChild(liquorOutput);
  let vodkaNumber = model.alcAmounts.liquor.vodka.quantity;
  let vodkaText = vodkaNumber.toString();

  let ginNumber = model.alcAmounts.liquor.gin.quantity;
  let ginText = ginNumber.toString();

  let tequilaNumber = model.alcAmounts.liquor.tequila.quantity;
  let tequilaText = tequilaNumber.toString();

  let rumNumber = model.alcAmounts.liquor.rum.quantity;
  let rumText = rumNumber.toString();

  let liquorOutputTemp = "Buy ";
  if(vodkaNumber != 0){
    liquorOutputTemp += vodkaText + " handles of " + model.alcAmounts.liquor.vodka.brand + " vodka";
   }
  if(ginNumber != 0){
    if(liquorOutputTemp === "Buy ") liquorOutputTemp += ginText + " handles of " + model.alcAmounts.liquor.gin.brand + " gin";
    else liquorOutputTemp += ", " + ginText + " handles of " + model.alcAmounts.liquor.gin.brand + " gin";
  }
  if(tequilaNumber != 0){
    if(liquorOutputTemp === "Buy ") liquorOutputTemp += tequilaText + " handles of " + model.alcAmounts.liquor.tequila.brand+ " tequila";
    else liquorOutputTemp += ", " + tequilaText + " handles of " + model.alcAmounts.liquor.tequila.brand+ " tequila";
  }
  if(rumNumber != 0){
    if(liquorOutputTemp === "Buy ") liquorOutputTemp += rumText + " handles of " + model.alcAmounts.liquor.rum.brand + " rum";
    else liquorOutputTemp += ", " + rumText + " handles of " + model.alcAmounts.liquor.rum.brand + " rum";
  }
  liquorOutput.innerHTML = liquorOutputTemp;
  if(liquorOutputTemp === "Buy ") document.getElementById("initial").removeChild(liquorOutput);

  let foodOutput = document.createElement("div");
  foodOutput.className = "alcOutput";
  document.getElementById("initial").appendChild(foodOutput)

  let pizzaNumber = model.foodAmounts.pizza;
  let pizzaText = pizzaNumber.toString();

  let wingsNumber = model.foodAmounts.wings;
  let wingsText = wingsNumber.toString();

  let pastaNumber = model.foodAmounts.pasta;
  let pastaText = pastaNumber.toString();

  let subsNumber = model.foodAmounts.subs;
  let subsText = subsNumber.toString();

  foodOutputTemp = "Buy ";

  if(pizzaNumber != 0) foodOutputTemp += pizzaText + " pizzas";
  if(wingsNumber != 0) {
    if(foodOutputTemp === "Buy ") foodOutputTemp += wingsText + " orders of wings";
    else foodOutputTemp += ", " + wingsText + " orders of wings";
  }
  if(pastaNumber != 0) {
    if(foodOutputTemp === "Buy ") foodOutputTemp += pastaText + " orders of pastas";
    else foodOutputTemp += ", " + pastaText + " orders of pastas";
  }
  if(subsNumber != 0) {
    if(foodOutputTemp === "Buy ") foodOutputTemp += subsText + " subs";
    else foodOutputTemp += ", " + subsText + " subs";
  }
  foodOutput.innerHTML = foodOutputTemp;

  let musicOutput = document.createElement("div");
  musicOutput.className = "musicOutput";
  document.getElementById("initial").appendChild(musicOutput)

  playlist = "Your playlist is: "
  for(i = 0; i < model.music.length; i++){
    if(i != model.music.length - 1) playlist += model.music[i] + ", ";
    else playlist += model.music[i];
  }
  musicOutput.innerHTML = playlist;

  let priceOutput = document.createElement("div");
  priceOutput.className = "priceOutput";
  document.getElementById("initial").appendChild(priceOutput)
  let alcPrice = model.alcPrice.total;
  let foodPrice = model.foodPrice;

  priceOutput.innerHTML = "Total alcohol price = " + alcPrice.toString() + " dollars, " + "total food price = " + foodPrice.toString() + " dollars";
}
