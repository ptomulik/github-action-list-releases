import { by, Parameter, Entry } from '../src/sort'

describe('.by', () => {
  type Case = [Parameter[]|null|undefined, Entry[], Entry[]];
  type Adjusted = Case;

  function adjust(cases: Case[]): Adjusted[] {
    return cases;
  }

  describe.each(adjust([
    [null, [{name: 'B'}, {name: 'A'}], [{name: 'B'}, {name: 'A'}]],
    [undefined, [{name: 'B'}, {name: 'F'}], [{name: 'B'}, {name: 'F'}]],
    [[], [{name: 'B'}, {name: 'A'}], [{name: 'B'}, {name: 'A'}]],

    [['name'], [{name: 'B'}, {name: 'A'}], [{name: 'A'}, {name: 'B'}]],

    [[['name', 'A']], [{name: 'B'}, {name: 'A'}], [{name: 'A'}, {name: 'B'}]],

    [[['name', 'D']], [{name: 'A'}, {name: 'B'}], [{name: 'B'}, {name: 'A'}]],

    [
      ['name', 'id'],
      [
        {name: 'B', id: 2},
        {name: 'B', id: 1},
        {name: 'A', id: 2},
        {name: 'A', id: 1},
      ],
      [
        {name: 'A', id: 1},
        {name: 'A', id: 2},
        {name: 'B', id: 1},
        {name: 'B', id: 2},
      ],
    ],

    [
      [
        ['name', 'A'],
        ['id', 'A'],
      ],
      [
        {name: 'B', id: 2},
        {name: 'B', id: 1},
        {name: 'A', id: 2},
        {name: 'A', id: 1},
      ],
      [
        {name: 'A', id: 1},
        {name: 'A', id: 2},
        {name: 'B', id: 1},
        {name: 'B', id: 2},
      ],
    ],

    [
      [
        ['name', 'A'],
        ['id', 'D'],
      ],
      [
        {name: 'B', id: 1},
        {name: 'B', id: 2},
        {name: 'A', id: 1},
        {name: 'A', id: 2},
      ],
      [
        {name: 'A', id: 2},
        {name: 'A', id: 1},
        {name: 'B', id: 2},
        {name: 'B', id: 1},
      ],
    ],

    [
      [
        ['name', 'D'],
        ['id', 'A'],
      ],
      [
        {name: 'A', id: 2},
        {name: 'A', id: 1},
        {name: 'B', id: 2},
        {name: 'B', id: 1},
      ],
      [
        {name: 'B', id: 1},
        {name: 'B', id: 2},
        {name: 'A', id: 1},
        {name: 'A', id: 2},
      ],
    ],

    [
      [
        ['name', 'D'],
        ['id', 'D'],
      ],
      [
        {name: 'A', id: 1},
        {name: 'A', id: 2},
        {name: 'B', id: 1},
        {name: 'B', id: 2},
      ],
      [
        {name: 'B', id: 2},
        {name: 'B', id: 1},
        {name: 'A', id: 2},
        {name: 'A', id: 1},
      ],
    ],

    [
      [
        ['id', 'A'],
        ['name', 'A'],
      ],
      [
        {name: 'B', id: 2},
        {name: 'A', id: 2},
        {name: 'B', id: 1},
        {name: 'A', id: 1},
      ],
      [
        {name: 'A', id: 1},
        {name: 'B', id: 1},
        {name: 'A', id: 2},
        {name: 'B', id: 2},
      ],
    ],

    [
      [
        ['id', 'A'],
        ['name', 'D'],
      ],
      [
        {name: 'A', id: 2},
        {name: 'B', id: 2},
        {name: 'A', id: 1},
        {name: 'B', id: 1},
      ],
      [
        {name: 'B', id: 1},
        {name: 'A', id: 1},
        {name: 'B', id: 2},
        {name: 'A', id: 2},
      ],
    ],

    [
      [
        ['id', 'D'],
        ['name', 'A'],
      ],
      [
        {name: 'B', id: 1},
        {name: 'A', id: 1},
        {name: 'B', id: 2},
        {name: 'A', id: 2},
      ],
      [
        {name: 'A', id: 2},
        {name: 'B', id: 2},
        {name: 'A', id: 1},
        {name: 'B', id: 1},
      ],
    ],

    [
      [
        ['id', 'D'],
        ['name', 'D'],
      ],
      [
        {name: 'A', id: 1},
        {name: 'B', id: 1},
        {name: 'A', id: 2},
        {name: 'B', id: 2},
      ],
      [
        {name: 'B', id: 2},
        {name: 'A', id: 2},
        {name: 'B', id: 1},
        {name: 'A', id: 1},
      ],
    ],

    [
      [
        ['name', 'D'],
        ['id', 'D'],
      ],
      [
        {name: 'A', id: 1},
        {name: 'A', id: 2, tag_name: 'X'},
        {name: 'A', id: 2, tag_name: 'Y'},
        {name: 'B', id: 1},
        {name: 'B', id: 2},
      ],
      [
        {name: 'B', id: 2},
        {name: 'B', id: 1},
        {name: 'A', id: 2, tag_name: 'X'},
        {name: 'A', id: 2, tag_name: 'Y'},
        {name: 'A', id: 1},
      ],
    ],

    [
      [
        ['name', 'D'],
        ['id', 'D'],
      ],
      [
        {name: 'A', id: 1},
        {name: 'A', id: 2, tag_name: 'Y'},
        {name: 'A', id: 2, tag_name: 'X'},
        {name: 'B', id: 1},
        {name: 'B', id: 2},
      ],
      [
        {name: 'B', id: 2},
        {name: 'B', id: 1},
        {name: 'A', id: 2, tag_name: 'Y'},
        {name: 'A', id: 2, tag_name: 'X'},
        {name: 'A', id: 1},
      ],
    ],

    [
      [['name', 'A']],
      [{name: 'Z', id: 2}, {id: 1}, {name: 'A', id: 4}],
      [{name: 'A', id: 4}, {name: 'Z', id: 2}, {id: 1}],
    ],

    [
      [['name', 'A']],
      [{id: 1}, {name: 'Z', id: 2}, {id: 3}, {name: 'A', id: 4}],
      [{name: 'A', id: 4}, {name: 'Z', id: 2}, {id: 1}, {id: 3}],
    ],

    [
      [['name', 'A']],
      [
        {id: 1},
        {name: null, id: 2},
        {name: 'Z', id: 3},
        {name: null, id: 4},
        {id: 5},
        {name: 'A', id: 6},
      ],
      [
        {name: 'A', id: 6},
        {name: 'Z', id: 3},
        {name: null, id: 2},
        {name: null, id: 4},
        {id: 1},
        {id: 5},
      ],
    ],
    [
      [['draft', 'A']],
      [
        {id: 1},
        {draft: true, id: 3},
        {draft: false, id: 4},
        {draft: false, id: 5},
        {draft: true, id: 6},
      ],
      [
        {draft: false, id: 4},
        {draft: false, id: 5},
        {draft: true, id: 3},
        {draft: true, id: 6},
        {id: 1},
      ],
    ],
  ]))('.by(%j).sort(%j)', (specs, entries, output) => {
    it(`returns ${JSON.stringify(output)}`, () => {
      expect.assertions(1)
      expect(by(specs).sort(entries)).toStrictEqual(output)
    })
  })
})

// vim: set ts=2 sw=2 sts=2:
