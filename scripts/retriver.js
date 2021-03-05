var Crawler = require("crawler");
const zap = "https://www.zap.co.il"
let pageNumber = 1
const pageUrl = 'https://www.zap.co.il/models.aspx?sog=e-cellphone&pageinfo='
var getPhonesCrawler = new Crawler({
    // This will be called for each crawled page
    maxConnections: 1, 
    rateLimit: 1000,
    skipDuplicates: true,
    callback : function (error, res, done) {
        if(error){
            console.log(error);
        }else{
            var $ = res.$;
            // $ is Cheerio by default
            //a lean implementation of core jQuery designed specifically for the server
   
   //let finalPage = $(".DisabledDoubleForwordBtn")
     let hrefList =   $(".MoreInfo a")
    .map(function (i, el) {
      // this === el
      getPhonesCrawler.queue(pageUrl + pageNumber);
      pageNumber += 1
      return zap + $(el).attr("href");
  
    })
    .get()
       
  //=> "apple orange pear"

            console.log(hrefList);
            console.log("done");
        
    }
 
        done();
    
    }
   

});

// Queue just one URL, with default callback
getPhonesCrawler.queue(pageUrl + pageNumber);

//1. להכין משתנה שכל התוצאות יהיו עם קדומת zap 
//2. שירוץ על כל הדפים עד לאחרון וששם יעצור
//3. להכין קרואלר נוסף שיביא את כל המידע שצריך מתוך כל כתובת במערך
//4. לייצר אובייקט שיכיל את כל האטריביוט הנדרשים
//5. לוודא מה קורה במקרה ואין פרטים על הפלאפון