//import * as select from './select'
//import * as slice from './slice'
//import * as filter from './filter'
//import * as sort from './sort'
//
//export type Parameters = {
//  select?: select.Parameter;
//  slice?: slice.Parameters;
//  sort?: sort.Parameters;
//} & filter.Parameters;
//
//class Processor {
//  constructor(parameters?: Parameters | null) {
//    this.filter = filter.filter(parameters)
//    this.sorter = new Sorter(parameters.sort)
//    this.selector = new Selector(parameters.select)
//    this.slicer = new Slicer(parameters.slice)
//  }
//
//  process(entries) {
//    return this.slicer.slice(
//      this.selector.select(this.sorter.sort(this.filter.filter(entries)))
//    )
//  }
//}

// vim: set ts=2 sw=2 sts=2:
