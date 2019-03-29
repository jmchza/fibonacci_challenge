### The Application
Create an application accepts an ongoing series of user supplied numbers and
outputs notifications when certain conditions are met. It should operate as follows:
1. On startup, the program will prompt the user for the number of seconds (X)
between outputting the frequency of each number to the screen.
2. Every X seconds the program will display, in frequency descending order, the
list of numbers and their frequency.
3. If the user enters 'halt' the timer should pause
4. If the user enters 'resume' the timer should resume
5. If the user enters a number that is one of the first 1000 Fibonacci numbers, the
system should alert "FIB" 
6. If the user enters "quit", the application should
output the numbers and their frequency, a farewell message and finally
terminate.

### Example

> Please input the number of time in seconds between emitting numbers and their frequency

15
> Please enter the first number

10
> Please enter the next number

10
> Please enter the next number

8

> FIB

> Please enter the next number

> 10:2, 8:1

halt
> timer halted

10
> Please enter the next number resume

> timer resumed

8
> FIB

> Please enter the next number

33
> 10:3, 8:2, 33:1

> Please enter the next number

quit
> 10:3, 8:2, 33:1

> Thanks for playing