/*
 * Copyright 2017 Google Inc.
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import * as ActionCreators from '../../both/action-creators';
import { createStore, applyMiddleware } from 'redux';
import io from 'socket.io-client';

export class Multiplayer {
  constructor(socketImpl) {
    this.gameid = 'default';
    this.player = null;

    if (socketImpl !== undefined) {
      this.socket = socketImpl;
    } else {
      this.socket = io();
    }

  }

  createStore(reducer) {
    let store = null;

    const whiteListedActions = {
      'MAKE_MOVE': true,
      'END_TURN': true,
    };

    // Redux middleware to emit a message on a socket
    // whenever an action is dispatched.
    const SocketUpdate = ({ getState }) => next => action => {
      const state = getState();
      const result = next(action);

      if (whiteListedActions[action.type]) {
        action._id = state._id;
        action._gameid = this.gameid;
        action._player = this.player;
        this.socket.emit('action', action);
      }

      return result;
    }

    store = createStore(reducer, applyMiddleware(SocketUpdate));

    this.socket.on('sync', state => {
      store.dispatch(ActionCreators.restore(state));
    });

    return store;
  }

  updateGameID(id) {
    this.gameid = id;

    if (this.socket) {
      this.socket.emit('sync', id);
    }
  }

  updatePlayer(id) {
    this.player = id;
  }
}

