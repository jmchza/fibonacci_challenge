const functions = require('./fib')

test('return true if val is in the fibo list', () =>{
          expect(functions.fiboList(8,1000)).toBe(true)        
});

test('return false if val is in the fibo list', () =>{
          expect(functions.fiboList(10,1000)).toBe(false)        
});