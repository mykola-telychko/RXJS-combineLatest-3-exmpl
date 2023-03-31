// RxJS v6+
import { fromEvent, combineLatest } from 'rxjs';
import { mapTo, startWith, scan, tap, map } from 'rxjs/operators';

// elem refs
const redTotal = document.getElementById('red-total');
const blackTotal = document.getElementById('black-total');
const whiteTotal = document.getElementById('white-total');
const total = document.getElementById('total');

// single click accumulation function
const addOneClick$ = (id) =>
  fromEvent(document.getElementById(id), 'click').pipe(
    // map every click to 1
    mapTo(1),
    // keep a running total
    scan((acc, curr) => acc + curr, 0),
    startWith(0)
  );

// accumulation of all results after any clicks
combineLatest(
  addOneClick$('red'),
  addOneClick$('black'),
  addOneClick$('white')
).subscribe(([red, black, white]: any) => {
  redTotal.innerHTML = red;
  blackTotal.innerHTML = black;
  whiteTotal.innerHTML = white;

  total.innerHTML = red + black + white;
});
