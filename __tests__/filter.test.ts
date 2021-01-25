import { Filter } from '../src/filter';

describe('.Filter', () => {
  describe.each([
    [{}, [{name: 'foo'}], [{name: 'foo'}]],
    [{name: null}, [{name: 'a'}, {name: 'b'}], [{name: 'a'}, {name: 'b'}]],
    [{name: 'foo'}, [{name: 'foo'}, {name: 'bar'}], [{name: 'foo'}]],
    [
      {name: /^v?\d+\.\d+.\d+$/},
      [{name: 'latest'}, {name: 'v1.0.0'}, {name: 'v1.1.0'}, {name: '1.2.0'}],
      [{name: 'v1.0.0'}, {name: 'v1.1.0'}, {name: '1.2.0'}],
    ],
    [
      {tag_name: 'foo'},
      [{tag_name: 'foo'}, {tag_name: 'bar'}],
      [{tag_name: 'foo'}],
    ],
    [
      {tag_name: /^v?\d+\.\d+.\d+$/},
      [
        {tag_name: 'latest'},
        {tag_name: 'v1.0.0'},
        {tag_name: 'v1.1.0'},
        {tag_name: '1.2.0'},
      ],
      [{tag_name: 'v1.0.0'}, {tag_name: 'v1.1.0'}, {tag_name: '1.2.0'}],
    ],
    [
      {draft: false},
      [
        {name: 'draft', draft: true},
        {name: 'non-draft', draft: false},
      ],
      [{name: 'non-draft', draft: false}],
    ],
    [
      {draft: true},
      [
        {name: 'draft', draft: true},
        {name: 'non-draft', draft: false},
      ],
      [{name: 'draft', draft: true}],
    ],
    [
      {prerelease: false},
      [
        {name: 'prerelease', prerelease: true},
        {name: 'non-prerelease', prerelease: false},
      ],
      [{name: 'non-prerelease', prerelease: false}],
    ],
    [
      {prerelease: true},
      [
        {name: 'prerelease', prerelease: true},
        {name: 'non-prerelease', prerelease: false},
      ],
      [{name: 'prerelease', prerelease: true}],
    ],
    [
      {name: /^v?\d+\.\d+.\d+$/, draft: false},
      [
        {name: 'latest', draft: false},
        {name: 'v1.0.0', draft: false},
        {name: 'v1.1.0', draft: false},
        {name: '1.2.0', draft: true},
      ],
      [
        {name: 'v1.0.0', draft: false},
        {name: 'v1.1.0', draft: false},
      ],
    ],
    [
      {name: /^v?\d+\.\d+.\d+$/, draft: true},
      [
        {name: 'latest', draft: false},
        {name: 'v1.0.0', draft: false},
        {name: 'v1.1.0', draft: false},
        {name: '1.2.0', draft: true},
      ],
      [{name: '1.2.0', draft: true}],
    ],
    [
      {tag_name: /^v?\d+\.\d+.\d+$/, prerelease: false},
      [
        {tag_name: 'latest', prerelease: false},
        {tag_name: 'v1.0.0', prerelease: false},
        {tag_name: 'v1.1.0', prerelease: false},
        {tag_name: '1.2.0', prerelease: true},
      ],
      [
        {tag_name: 'v1.0.0', prerelease: false},
        {tag_name: 'v1.1.0', prerelease: false},
      ],
    ],
    [
      {tag_name: /^v?\d+\.\d+.\d+$/, prerelease: true},
      [
        {tag_name: 'latest', prerelease: false},
        {tag_name: 'v1.0.0', prerelease: false},
        {tag_name: 'v1.1.0', prerelease: false},
        {tag_name: '1.2.0', prerelease: true},
      ],
      [{tag_name: '1.2.0', prerelease: true}],
    ],
  ])('new Filter(%j).filter(%j)', (inputs, entries, output) => {
    it(`returns ${JSON.stringify(output)}`, () => {
      expect.assertions(1)
      expect(new Filter(inputs).filter(entries)).toStrictEqual(output)
    })
  })
})

// vim: set ts=2 sw=2 sts=2:
