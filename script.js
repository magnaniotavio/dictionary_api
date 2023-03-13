/* This is a project I made using the Free Dictionary API.
It consists of a simple search bar into which you can type any word
you want, and it will bring either a full definition, with different 
meanings, parts of speech, definitions, synonyms, and antonyms,
or a simple error message in case the word doesn't exist. */



// Prevents default refereshing behavior when you press the 'Enter' key.
const ClickOnEnter = document.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("search_button").click();
  }
});


/* In the code below, first the Free Dictionary API is called,
then the functions are defined which are going to loop through it,
push its results into an array, and stringify the array so as to print
the results into the DOM */ 
async function dictApi(word) {


/* Basic API request using fetch. Includes a simple error message in case 
the word you're looking for doesn't exist. */
adress = "https://api.dictionaryapi.dev/api/v2/entries/en/" + `${word}`;
let result = await fetch(adress);
let apiResponse = await result.json();
$json = JSON.stringify(apiResponse);
console.log(apiResponse);

let errorMessage = document.getElementById("error")
{if (result?.ok) {
  console.log('Use the response here!');
  errorMessage.innerHTML = "";
} else {
  errorMessage.innerHTML = "Sorry! We could not find the word in the dictionary!"
}}

const apiList = JSON.parse($json); 
apiListLength = apiList.length;

 function getAntonyms(x) { 
    a = "";
    array = x;
    if (array.length === 0) {
      a = "no antonyms found.";
      return a;
    }
    for (i = 0; i < array.length; i++) {
    lastItem = array.length - 1;
    if (i === lastItem) {
      x = array[i] + ".";
    } else
    {x = array[i] + ", ";
  }
    a = a + x;
  }
    return a
}

 function getSynonyms(x) { 
  a = "";
  array = x;
  if (array.length === 0) {
    a = "no synonyms found";
    return a;
  }
  for (i = 0; i < array.length; i++) {
  lastItem = array.length - 1;
  if (i === lastItem) {
    x = array[i] + ".";
  } else
  {x = array[i] + ", ";
}
  a = a + x;
}
  return a
}

function getPartOfSpeech(x) { 
  /* Here, there is no need to iterate, because
     any given word belongs to just one part of speech,
     and the eight parts of speech in the English language are
     composed of just one word, e.g., 'verb', 'adjective', 'noun', etc. */
  return x
}


 function apiListIterator(p) {
  /* Iterates over the arrays stringified by the JSON, using their length
     contains also the getDefinitions() function, which is special, because definitions come with numbers,
     therefore, get definitions uses a "one-indexed" length, so as not to get definitions starting with 0,
     which is not common practice in dictionaries */


    length = apiList[`${p}`].meanings.length;
    oneIndexedLength = length - 1;

    function getDefinitions() { 
      a = "";
      for (i = 0; i < apiList[`${p}`].meanings[`${oneIndexedLength}`].definitions.length; i++) {
      x = i+1 + ". " + apiList[`${p}`].meanings[`${oneIndexedLength}`].definitions[i].definition + " "
      a = a + x;
    }
      return a
    }

    /* Here we add the loop through all elements of each meaning, then 
    then apply the functions above to them*/
    while ( oneIndexedLength > -1 ) {
    defs = getDefinitions()
    ants = apiList[`${p}`].meanings[`${oneIndexedLength}`].antonyms;  
    syns = apiList[`${p}`].meanings[`${oneIndexedLength}`].synonyms;
    part = apiList[`${p}`].meanings[`${oneIndexedLength}`].partOfSpeech;

    const arrayDef = " Definition: " + getDefinitions();
    const arrayAnt = " Antonyms: " + getAntonyms(ants);
    const arraySin = " Synonyms: " + getSynonyms(syns);
    const arrayOver = "___________";
    const arrayNew = "MEANING " + "(" + getPartOfSpeech(part) + ")";

    // Here we create an array into which we put those words.
    const keepResults = [];
    keepResults.push(arrayOver);
    keepResults.push(arrayNew);
    keepResults.push(arrayDef);
    keepResults.push(arraySin);
    keepResults.push(arrayAnt);
 
    oneIndexedLength = oneIndexedLength - 1;
    

    /* Here we turn the array elements into strings,
    then print them into the DOM element, creating
    a paragraph for each. */
    function WriteResultsIntoDOM() {

    const element = document.getElementById("title_definitions");
      for (i = 0; i < keepResults.length; i++) {
        const para = document.createElement("p");
        para.setAttribute("class", "section")
        console.log(i)
        stringRes = keepResults[i].toString()
        para.appendChild(document.createTextNode(stringRes));
        element.appendChild(para);
        }

    }

    WriteResultsIntoDOM()
   }

  } 


/* The code only brings the results for each meaning of the word.
In the while loop below, we actually loop it through all lists of meanings,
thus bringing all the different meanings of the word. */
counter = 0;
while (counter <= apiListLength)  {
  apiListIterator(counter)
  counter = counter + 1;
}

}

/* Empties the definitions DIV so that a new search may start */
function prepareNewSearch() {
    title_definitions.innerHTML = ""
 }

/* Performs search and prepares new one */
function makeSearch() {
   let search_value = document.getElementById("search_bar").value; // This gives a "cannot read properties of undefined error", but it's mereley cause the page loads and VALUE is not defined until you WRITE IT IN SEARCH BAR; IRRELEVANT ERROR
   word = search_value;
   dictApi(word);
   prepareNewSearch()
  }


makeSearch()










