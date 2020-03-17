/*
 * Copyright 2018 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import { Random } from './random/random';

export default {
  name: 'random',

  noClient: ({ api }) => {
    return api._obj.isUsed();
  },

  flush: ({ api }) => {
    return api._obj.getState();
  },

  api: ({ data }) => {
    const random = new Random(data);
    return random.api();
  },

  setup: ({ game }) => {
    let seed = game.seed;
    if (seed === undefined) {
      seed = Random.seed();
    }
    return { seed };
  },
};
