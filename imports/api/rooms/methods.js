//Methods related to roooms

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Rooms } from './rooms.js';

Meteor.methods({
  'rooms.insert': (title) => {
    check(title, String);

    return Rooms.insert({
      title,
      createdAt: new Date()
    });
  },
  'rooms.remove': (title) => {
    check(title, String);
    console.log('rooms insert called')

    return Rooms.remove({title})    
  },
  'rooms.update': (roomId, dataUrl) => {
    check(roomId, String);
    check(dataUrl, String);

    return Rooms.update(roomId, {$set: {
      dataUrl,
      updatedAt: new Date()
    }})
  },
  'rooms.clear': (roomId) => {
    check(roomId, String);

    return Rooms.update(roomId, {$set: {
      dataUrl: ''
    }})
  }
})