import { Rooms } from '/imports/api/rooms/rooms.js';
import { Meteor } from 'meteor/meteor';
import './rooms.html';

Template.rooms.onCreated(function () {
  Meteor.subscribe('rooms.all');
});

Template.rooms.helpers({
  rooms() {
    return Rooms.find({});
  },
});

Template.rooms.events({
  'submit .room-add'(event) {
    event.preventDefault();

    const target = event.target;
    const title = target.title.value;
    console.log(title)

    Meteor.call('rooms.insert', title, (error) => {
      if (error) {
        alert(error.error);
      } else {
        title.value = '';
      }
    });
  },
  'click #remove'(event) {
    event.preventDefault();

    const title = $(event.target).siblings()[0].innerHTML;
    console.log($(event.target).attr('data-id'))

    Meteor.call('rooms.remove', title, (error) => {
      if (error) {
        alert(error.error);
      } else {
        title.value = '';
      }
    });
  }
});
