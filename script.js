
const quoteContainer=document.getElementById('quote-container');
const quoteText=document.getElementById('quote');
const authorText=document.getElementById('author');
const facebootBtn=document.getElementById('facebook');
const newQuoteBtn=document.getElementById('new-quote'); 
const loader=document.getElementById('loader'); 

//show loading option

function showLoadingSpinner(){
    loader.hidden=false;
    quoteContainer.hidden=true;
}

let quotesList = [];
//hidding loading option
function removeLoadingSpinner(){
    if(!loader.hidden){
        loader.hidden=true;
        quoteContainer.hidden=false;
    }
}

//new quote function
function newQuote() {
    showLoadingSpinner();
    const quote = quotesList[Math.floor(Math.random() * quotesList.length)];
    if (!quote.author) {
      authorText.textContent = 'Unknown';
    } else {
      authorText.textContent = quote.author;
    }
    if (quote.text.length > 120) {
      quoteText.classList.add('long-quote');
    } else {
      quoteText.classList.remove('long-quote');
    }
    quoteText.textContent = quote.text;
    removeLoadingSpinner();
  }

//Get quote from API

async function getQuote() {
    showLoadingSpinner();
    const apiUrl = 'https://type.fit/api/quotes';
    //const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

    try {
        const response = await fetch(apiUrl);
        quotesList = await response.json();
        newQuote();

    } catch (error) {
       // getQuote();
        //nsole.log('whoops, no quote', error);
        removeLoadingSpinner();
        newQuoteBtn.hidden = false;
    quoteContainer.hidden = true;
    console.log('Log: getQuote -> error', error);
    }

}
//this its to tweet the quote
/*function postQuote(){
    const quote=quoteText.innerText;
    const author=authorText.innerText;
    const facebookUrl= `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(facebookUrl,'_blank');
}*/

//event Listeners
newQuoteBtn.addEventListener('click',getQuote);
//facebootBtn.addEventListener('click',postQuote);


//On Load
getQuote();
$(function() {
    /*Define some constants */
    
	const ARTICLE_TITLE =  document.title;
	const ARTICLE_URL = encodeURIComponent(window.location.href);
	const MAIN_IMAGE_URL = encodeURIComponent($('meta[property="og:image"]').attr('content'));

	$(facebootBtn).click(function(){
       
		open_window('http://www.facebook.com/sharer/sharer.php?u='+ARTICLE_URL, authorText);
	});

	/* $('.share-twitter').click(function(){
		open_window('http://twitter.com/share?url='+ARTICLE_URL, 'twitter_share');
	});

	$('.share-google-plus').click(function(){
		open_window('https://plus.google.com/share?url='+ARTICLE_URL, 'google_share');
	});

	$('.share-linkedin').click(function(){
		open_window('https://www.linkedin.com/shareArticle?mini=true&url='+ARTICLE_URL+'&title='+ARTICLE_TITLE+'&summary=&source=', 'linkedin_share');
    });
    
    {+









	$('.share-pinterest').click(function(){
		open_window('https://pinterest.com/pin/create/button/?url='+ARTICLE_URL+'&media='+MAIN_IMAGE_URL+'&description='+ARTICLE_TITLE, 'pinterest_share');
	});
	
	$('.share-tumblr').click(function(){
		open_window('http://www.tumblr.com/share/link?url='+ARTICLE_URL+'&name='+ARTICLE_TITLE+'&description='+ARTICLE_TITLE, 'tumblr_share');
	}); */

	function open_window(url, name){
		window.open(url, name, 'height=320, width=640, toolbar=no, menubar=no, scrollbars=yes, resizable=yes, location=no, directories=no, status=no');
	}
});
