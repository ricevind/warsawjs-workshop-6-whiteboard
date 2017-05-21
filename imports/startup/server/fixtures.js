// Fill the DB with example data on startup

import { Meteor } from 'meteor/meteor';
import { Rooms } from '../../api/rooms/rooms.js';

Meteor.startup(() => {
  // if the Links collection is empty
 
  if (Rooms.find().count() === 0) {
    Rooms.insert({title:'first', createdAt: new Date()})
  }
});
