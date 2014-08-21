if (Meteor.isClient) {
  Template.hello.greeting = function () {
    return "Welcome to phantomApp.";
  };

  Template.hello.events({
    'click input': function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    // 
     console.log("adding to workflowy 1...");
      // Now go and deposit the information into Workflowy via phantomJS
      //
     // var phantomjs = Npm.require('phantom');

      //var phantomBrowser = new phantom();
      //
      //
      //
      //
phantom.create(function (ph) {
  ph.createPage(function (page) {
   // var thisPage = page;
    page.open("https://workflowy.com/s/NTk7eZCEoE", function (status) {
      console.log("opened workflowy? ", status);
        
        var subj = "The subject"
        var txt = "The sub header"
        

        //page.sendEvent('keypress', 65, null, null, 0);
        
    	page.sendEvent('keypress', subj, null, null, 0);
        console.log("Just entered the subject...");

         setTimeout(function() {
           	 
             page.sendEvent('keypress', 16777220, null, null, 0);  
        
             //Hit enter to submit the new item
             console.log("Just hit return...");

             setTimeout(function() {
                 // Go back up... 
                 page.sendEvent('keypress', 16777235);
                 
                 console.log("Went back up...");


                 // ... Now hold shift while hitting Enter to access the subheading
                 //
                 setTimeout(function(){
                     page.sendEvent('keypress', 16777220, null, null, 0x02000000);
                     console.log("Held down shift...");
                     setTimeout(function(){
                         
                         page.sendEvent('keypress', txt, null, null, 0);

                         setTimeout(function() {
                             ph.exit();
                             console.log("Exiting...");

                         }, 11000);

                     console.log("Done pressing keys...");
                     }, 3000);
                    
                 },3000);
                 
             }, 3000);   
         
         
         
         }, 3000);
        
       

        
/*        
      page.evaluate(function () { 
          
          
          return document.title; }, function (result) {
        console.log('Page title is ' + result);
      //  ph.exit();
      });
*/        
    });
  });
});
      
      
/*
      phantom.create(function (ph) 
      {
        console.log("adding to workflowy 2...");

        ph.createPage(function (page) 
        {
          console.log("adding to workflowy 3...");

          page.open("https://workflowy.com/s/NTk7eZCEoE", function (status) 
          {
           
           console.log("opened workflowy? ", status);
*/
      
/*
            page.evaluate(
              function () { return document.title; }, 
              function (result) 
              {
             // console.log('Page title is ' + result);
              ph.exit();
              });
            */
/*
           console.log("About to evaluate page...");

 			page.evaluate(
              function () { 
                   console.log("Evaluating page 1...");

                    //page.sendEvent('keypress', page.event.key.A, null, null, 0x02000000 | 0x08000000);
                    //// page.sendEvent('keypress', subj, null, null);
                    this.sendEvent('keypress', page.event.key.A, null, null);
                   console.log("Evaluating page 1...");

                    //Hit enter to submit the new item
                    this.sendEvent('keypress', page.event.key.Enter, null, null);
                   console.log("Evaluating page 1...");

                    // Go back up... 
                    this.sendEvent('keypress', page.event.key.Up, null, null);

                    // ... Now hold shift while hitting Enter to access the subheading
                    //
                    this.sendEvent('keypress', page.event.key.Enter, null, null, 0x02000000);

                    ////page.sendEvent('keypress', txt, null, null);

                    setTimeout(function() {
                    ph.exit();
                    }, 11000);
              });

        
          }); //page.open
        }); //ph.createPage
      }); //phantomBrowser.create
*/      
      
  });
}
