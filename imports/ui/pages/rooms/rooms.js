import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Rooms } from '/imports/api/rooms/rooms.js'
import './rooms.html';
import './rooms.css';
import { CanvasManager } from '/imports/utils/canvas_manager.js';

let canvas_manager = null;
let init = false;

Template.App_room.onCreated(()=>{
  Meteor.subscribe('rooms.show', FlowRouter.getParam('id'));
  init = null;
});

Template.App_room.onRendered(function() {
  this.autorun(() => {
    if (!init) {
        const canvas = document.querySelector('#canvas');
        const room = Rooms.findOne(FlowRouter.getParam('id'));
        if(room) {
          canvas_manager = new CanvasManager(canvas, {
            callback() {
              Meteor.call('rooms.update', room._id, canvas.toDataURL())
            }
          });
          canvas_manager.load(room.dataUrl)
           init=true;
      }
      
    }
  });
})

Template.App_room.events({
  'click #clear': (event)=>{
    event.preventDefault();
    canvas_manager.clear(true);
    Meteor.call('rooms.clear', FlowRouter.getParam('id'))
  },
  'keyup #size_input': (event)=> {
    event.preventDefault();
    canvas_manager.size = +$('#size_input').val();    
    console.log($('#size_input').val())
  },
  'change #color': (event)=> {
    event.preventDefault();
    canvas_manager.color = $('#color').val();    
    console.log($('#color').val())
  }

})

Template.App_room.helpers({
  room() {
    const room = Rooms.findOne(FlowRouter.getParam('id'));
    if (room && canvas_manager) {
      canvas_manager.load(room.dataUrl);
      if (room.dataUrl === '') {
       canvas_manager.clear(false);
    }
    }
    
    return Rooms.findOne(FlowRouter.getParam('id'));
  }
});