/**
* Created with phantomBox.
* User: jayqueue
* Date: 2014-08-21
* Time: 06:24 PM
* To change this template use Tools | Templates.
*/


// Configure the default routes for layout, loading, and not found
Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound'
});

// Initialize the loading template before hand
//Router.onBeforeAction('loading');
// Map the routes
Router.map(function() {
  // Homepage
  this.route('home', {
    path: '/'
  });

  this.route('inboundTest', {
    path: '/inbound',
    where: 'server',

    action: function () {
   //   console.log('triggered inbound!');

      post = this.request.body;
      console.log(post);
      subj = post.subject;
      txt = post.text;


      //message = post.body;

      //subj = 'YOUSEF';

      if ((typeof subj) === 'undefined'){
        subj = 'SUBJECT WAS UNDEFINED';
        console.log('subject wasnt defined..');
        txt = 'BODY WAS PBBLY NOT DEFINIED EITHER';
      }
      else
      {
        console.log('subject WAS defined as: ' + subj);
      }
/*
      Meteor.call('addTest', {s: subj, t: txt}, function (err){
        if (err) {
        // Something went wrong :(
        // Session.set('inboundError', true);
        } else {
        } 

      }); //Meteor.call('addTest')
*/
      // Submit the 200 response SendGrid needs to know that everything was okay
      //
      this.response.writeHead(200, {'Content-Type': 'text/html'});
      this.response.end('hello from server, we got your message!\n');

      Meteor.call('addWorkflowy', {s: subj, t: txt}, function (error, result) {});

      
    } //(this.route.)action
  });

  // 404
  this.route('notFound', {
    path: '*'
  });
});
