Meteor.methods({
    addWorkflowy: function(emailObj){
        console.log("adding to workflowy 1...");
        // Now go and deposit the information into Workflowy via phantomJS               
        var subj = emailObj.s;
        var txt = emailObj.t;
        
        phantom.create(function (ph) {
            ph.createPage(function (page) {
                // var thisPage = page;
                page.open("https://workflowy.com/s/NTk7eZCEoE", function (status) {
                    console.log("opened workflowy? ", status);

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
                                console.log("Held down shift + return...");
                                setTimeout(function(){

                                    // Workflowy messes with the subheading whenever it detects there is
                                    // a web address being typed in. Since phantom types super fast, this
                                    // is probably interfering with the keypress events. 
                                    // For now, we'll just add a blank space after any periods we see. In the 
                                    // future we can either record how where the blank spaces were inserted and 
                                    // move left that many times and hit delete, or we can wait for workflowy
                                    // to finish it's underlining / hypertexting business before continuing
                                    // to type a web address. Or we can keep moving left until we're
                                    // about to hit a blank character and then hit the delete key
                                    // Probably the best thing to do is to break the string up by '.' characters,
                                    // then to wait for a bit after entering a the first /second character
                                    // after that initial period.
                                    //  
                                    //page.sendEvent('keypress', JSON.stringify(txt), null, null, 0);
                                    //
                                    txt = txt.replace("http://","");
                                    txt = txt.split(".").join(". ");
                                    
                                    console.log("The new txt is: " + txt);
                                    
                                    page.sendEvent('keypress', txt, null, null, 0);

                                    setTimeout(function() {
                                        ph.exit();
                                        console.log("Exiting...");

                                    	}, 15000);

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
    }
});