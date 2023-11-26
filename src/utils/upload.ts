/**
  {
    Category: "Javascript Array Methods",
    Description:
      "For each number in the array, add it with all previous numbers. E.g., for [1,2,3] the result would be [1, 3, 6].",
    "Difficulty Score (1-10)": 7,
    "Exercise Name": "Accumulative Addition",
    "Expected Output": "[1, 3, 6]",
    "Initial Code": "export const accumulativeAdd = (arr) => { }",
    "Jest Test Code":
      "import { accumulativeAdd } from './exercise.js'; test('Accumulative Addition', () => { expect(accumulativeAdd([1, 2, 3])).toEqual([1, 3, 6]); });",
    "Solution Code": "export const accumulativeAdd = (arr) => { let sum = 0; return arr.map(num => sum += num); }",
  },

{

  "Category": "JavaScript Promises",
  "Description": "Return a promise that resolves with 'Hello, world!' after 1 second.",
  "Difficulty Score (1-10)":" 2,
  "Exercise Name": "Hello Promise",
  "Expected Output": "'Hello, world!'",
  "Initial Code": "export const helloPromise = () => { }",
  "Jest Test Code": "import { helloPromise } from './exercise.js'; test('Hello Promise', () => { return helloPromise().then(data => { expect(data).toBe('Hello, world!'); }); });",
  "Solution Code": "export const helloPromise = () => { return new Promise(resolve => { setTimeout(() => { resolve('Hello, world!'); }, 1000); }); }" ,
}

*/

import { doc, setDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCKue2FBlrIa_6TGmQR6Gl1nDw_ptx-GyI",
  authDomain: "learn-web-development-f0d22.firebaseapp.com",
  projectId: "learn-web-development-f0d22",
  storageBucket: "learn-web-development-f0d22.appspot.com",
  messagingSenderId: "55949130197",
  appId: "1:55949130197:web:ba27885dcf9ca9c104a55c",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const exercises = [
  {
    Category: "Javascript Array Methods",
    Description: "Find all even numbers in an array and sum them up.",
    "Difficulty Score (1-10)": 5,
    "Exercise Name": "SumEvenNumbers",
    "Expected Output": "12 (For [1, 2, 3, 4, 5, 6])",
    "Initial Code": "export const sumEvenNumbers = (arr) => { }",
    "Jest Test Code":
      "import { sumEvenNumbers } from './exercise.js'; test('Sum Even Numbers', () => { expect(sumEvenNumbers([1, 2, 3, 4, 5, 6])).toEqual(12); });",
    "Solution Code":
      "export const sumEvenNumbers = (arr) => arr.filter(num => num % 2 === 0).reduce((sum, num) => sum + num, 0);",
  },
  {
    Category: "Javascript Array Methods",
    Description: "Create an array of squared values from the original array.",
    "Difficulty Score (1-10)": 4,
    "Exercise Name": "SquareArray",
    "Expected Output": "[1, 4, 9, 16] (For [1, 2, 3, 4])",
    "Initial Code": "export const squareArray = (arr) => { }",
    "Jest Test Code":
      "import { squareArray } from './exercise.js'; test('Square Array', () => { expect(squareArray([1, 2, 3, 4])).toEqual([1, 4, 9, 16]); });",
    "Solution Code": "export const squareArray = (arr) => arr.map(num => num * num);",
  },
  {
    Category: "Javascript Array Methods",
    Description: "Filter out all the negative numbers and then sort the remaining numbers in ascending order.",
    "Difficulty Score (1-10)": 6,
    "Exercise Name": "FilterAndSort",
    "Expected Output": "[1, 2, 5] (For [-3, 1, 2, -7, 5])",
    "Initial Code": "export const filterAndSort = (arr) => { }",
    "Jest Test Code":
      "import { filterAndSort } from './exercise.js'; test('Filter and Sort', () => { expect(filterAndSort([-3, 1, 2, -7, 5])).toEqual([1, 2, 5]); });",
    "Solution Code": "export const filterAndSort = (arr) => arr.filter(num => num > 0).sort((a, b) => a - b);",
  },
  {
    Category: "Javascript Array Methods",
    Description: "Concatenate two arrays, then remove duplicate elements.",
    "Difficulty Score (1-10)": 5,
    "Exercise Name": "ConcatAndRemoveDuplicates",
    "Expected Output": "[1, 2, 3, 4] (For [1, 2, 3] and [2, 3, 4])",
    "Initial Code": "export const concatAndRemoveDuplicates = (arr1, arr2) => { }",
    "Jest Test Code":
      "import { concatAndRemoveDuplicates } from './exercise.js'; test('Concatenate and Remove Duplicates', () => { expect(concatAndRemoveDuplicates([1, 2, 3], [2, 3, 4])).toEqual([1, 2, 3, 4]); });",
    "Solution Code": "export const concatAndRemoveDuplicates = (arr1, arr2) => [...new Set([...arr1, ...arr2])];",
  },
  {
    Category: "Javascript Array Methods",
    Description: "Find the first element in the array that is greater than 10, otherwise return -1.",
    "Difficulty Score (1-10)": 4,
    "Exercise Name": "FindGreaterThanTen",
    "Expected Output": "12 (For [3, 8, 12, 5])",
    "Initial Code": "export const findGreaterThanTen = (arr) => { }",
    "Jest Test Code":
      "import { findGreaterThanTen } from './exercise.js'; test('Find Element Greater Than Ten', () => { expect(findGreaterThanTen([3, 8, 12, 5])).toEqual(12); });",
    "Solution Code": "export const findGreaterThanTen = (arr) => arr.find(num => num > 10) || -1;",
  },
  {
    Category: "Javascript Array Methods",
    Description: "Create a new array with the lengths of each string in the original array.",
    "Difficulty Score (1-10)": 3,
    "Exercise Name": "StringLengths",
    "Expected Output": "[3, 5, 4] (For ['cat', 'apple', 'blue'])",
    "Initial Code": "export const stringLengths = (arr) => { }",
    "Jest Test Code":
      "import { stringLengths } from './exercise.js'; test('String Lengths', () => { expect(stringLengths(['cat', 'apple', 'blue'])).toEqual([3, 5, 4]); });",
    "Solution Code": "export const stringLengths = (arr) => arr.map(str => str.length);",
  },
  {
    Category: "Javascript Array Methods",
    Description: "Combine all elements into a single string separated by dashes.",
    "Difficulty Score (1-10)": 4,
    "Exercise Name": "JoinWithDashes",
    "Expected Output": "'1-2-3-4' (For [1, 2, 3, 4])",
    "Initial Code": "export const joinWithDashes = (arr) => { }",
    "Jest Test Code":
      "import { joinWithDashes } from './exercise.js'; test('Join with Dashes', () => { expect(joinWithDashes([1, 2, 3, 4])).toEqual('1-2-3-4'); });",
    "Solution Code": "export const joinWithDashes = (arr) => arr.join('-');",
  },
  {
    Category: "Javascript Array Methods",
    Description: "Check if every element in the array is a prime number.",
    "Difficulty Score (1-10)": 7,
    "Exercise Name": "AllPrimes",
    "Expected Output": "false (For [2, 3, 4, 5])",
    "Initial Code": "export const allPrimes = (arr) => { }",
    "Jest Test Code":
      "import { allPrimes } from './exercise.js'; test('All Elements are Primes', () => { expect(allPrimes([2, 3, 4, 5])).toEqual(false); });",
    "Solution Code":
      "export const allPrimes = (arr) => arr.every(num => { for (let i = 2; i < num; i++) if (num % i === 0) return false; return num > 1; });",
  },
  {
    Category: "Javascript Array Methods",
    Description: "Reverse each string in an array of strings.",
    "Difficulty Score (1-10)": 4,
    "Exercise Name": "ReverseStrings",
    "Expected Output": "['tac', 'elppa', 'eulb'] (For ['cat', 'apple', 'blue'])",
    "Initial Code": "export const reverseStrings = (arr) => { }",
    "Jest Test Code":
      "import { reverseStrings } from './exercise.js'; test('Reverse Strings', () => { expect(reverseStrings(['cat', 'apple', 'blue'])).toEqual(['tac', 'elppa', 'eulb']); });",
    "Solution Code": "export const reverseStrings = (arr) => arr.map(str => str.split('').reverse().join(''));",
  },
  {
    Category: "Javascript Array Methods",
    Description: "Calculate the average of all numbers in the array rounded to the nearest whole number.",
    "Difficulty Score (1-10)": 5,
    "Exercise Name": "AverageNumber",
    "Expected Output": "3 (For [1, 2, 3, 4, 5])",
    "Initial Code": "export const averageNumber = (arr) => { }",
    "Jest Test Code":
      "import { averageNumber } from './exercise.js'; test('Average Number', () => { expect(averageNumber([1, 2, 3, 4, 5])).toEqual(3); });",
    "Solution Code":
      "export const averageNumber = (arr) => Math.round(arr.reduce((sum, num) => sum + num, 0) / arr.length);",
  },
  {
    Category: "Javascript Array Methods",
    Description: "Create a new array with only the unique elements from the original array.",
    "Difficulty Score (1-10)": 6,
    "Exercise Name": "UniqueElements",
    "Expected Output": "[1, 2, 3, 4] (For [1, 2, 2, 3, 4, 4])",
    "Initial Code": "export const uniqueElements = (arr) => { }",
    "Jest Test Code":
      "import { uniqueElements } from './exercise.js'; test('Unique Elements', () => { expect(uniqueElements([1, 2, 2, 3, 4, 4])).toEqual([1, 2, 3, 4]); });",
    "Solution Code": "export const uniqueElements = (arr) => [...new Set(arr)];",
  },
  {
    Category: "Javascript Array Methods",
    Description: "Map each number to its factorial.",
    "Difficulty Score (1-10)": 7,
    "Exercise Name": "FactorialMap",
    "Expected Output": "[1, 2, 6, 24] (For [1, 2, 3, 4])",
    "Initial Code": "export const factorialMap = (arr) => { }",
    "Jest Test Code":
      "import { factorialMap } from './exercise.js'; test('Factorial Map', () => { expect(factorialMap([1, 2, 3, 4])).toEqual([1, 2, 6, 24]); });",
    "Solution Code":
      "export const factorialMap = (arr) => arr.map(num => { let fact = 1; for (let i = 1; i <= num; i++) { fact *= i; } return fact; });",
  },
  {
    Category: "Javascript Promises",
    Description: "Use Promise.all to resolve multiple promises and return their results as an array.",
    "Difficulty Score (1-10)": 6,
    "Exercise Name": "ResolveMultiplePromises",
    "Expected Output": "['Result1', 'Result2', 'Result3']",
    "Initial Code": "export const resolveMultiplePromises = (promises) => { }",
    "Jest Test Code":
      "import { resolveMultiplePromises } from './exercise.js'; test('Resolve Multiple Promises', () => { expect(resolveMultiplePromises([Promise.resolve('Result1'), Promise.resolve('Result2'), Promise.resolve('Result3')])).resolves.toEqual(['Result1', 'Result2', 'Result3']); });",
    "Solution Code": "export const resolveMultiplePromises = (promises) => Promise.all(promises);",
  },
  {
    Category: "Javascript Promises",
    Description: "Use Promise.race to return the result of the first promise that resolves.",
    "Difficulty Score (1-10)": 5,
    "Exercise Name": "RacePromises",
    "Expected Output": "The result of the first resolved promise",
    "Initial Code": "export const racePromises = (promises) => { }",
    "Jest Test Code":
      "import { racePromises } from './exercise.js'; test('Race Promises', () => { const promises = [new Promise((resolve) => setTimeout(() => resolve('First'), 100)), new Promise((resolve) => setTimeout(() => resolve('Second'), 50))]; expect(racePromises(promises)).resolves.toEqual('Second'); });",
    "Solution Code": "export const racePromises = (promises) => Promise.race(promises);",
  },
  {
    Category: "Javascript Promises",
    Description: "Create a promise that resolves after a specified delay.",
    "Difficulty Score (1-10)": 4,
    "Exercise Name": "DelayPromise",
    "Expected Output": "'Resolved after delay'",
    "Initial Code": "export const delayPromise = (delay) => { }",
    "Jest Test Code":
      "import { delayPromise } from './exercise.js'; test('Delay Promise', () => { expect(delayPromise(1000)).resolves.toEqual('Resolved after delay'); });",
    "Solution Code":
      "export const delayPromise = (delay) => new Promise((resolve) => setTimeout(() => resolve('Resolved after delay'), delay));",
  },
  {
    Category: "Javascript Promises",
    Description: "Implement a function that returns a promise, which rejects with a specified error message.",
    "Difficulty Score (1-10)": 4,
    "Exercise Name": "RejectPromise",
    "Expected Output": "'Error occurred'",
    "Initial Code": "export const rejectPromise = () => { }",
    "Jest Test Code":
      "import { rejectPromise } from './exercise.js'; test('Reject Promise', () => { expect(rejectPromise()).rejects.toEqual('Error occurred'); });",
    "Solution Code": "export const rejectPromise = () => Promise.reject('Error occurred');",
  },
  {
    Category: "Javascript Promises",
    Description: "Use Promise.allSettled to handle multiple promises and return the status and value of each.",
    "Difficulty Score (1-10)": 7,
    "Exercise Name": "AllSettledPromises",
    "Expected Output": "[{status: 'fulfilled', value: 'Result1'}, {status: 'rejected', reason: 'Error'}]",
    "Initial Code": "export const allSettledPromises = (promises) => { }",
    "Jest Test Code":
      "import { allSettledPromises } from './exercise.js'; test('All Settled Promises', () => { expect(allSettledPromises([Promise.resolve('Result1'), Promise.reject('Error')])).resolves.toEqual([{status: 'fulfilled', value: 'Result1'}, {status: 'rejected', reason: 'Error'}]); });",
    "Solution Code": "export const allSettledPromises = (promises) => Promise.allSettled(promises);",
  },
  {
    Category: "Javascript Promises",
    Description:
      "Create a function that wraps a setTimeout call in a promise and resolves with 'Timeout done!' after a given delay.",
    "Difficulty Score (1-10)": 3,
    "Exercise Name": "TimeoutPromise",
    "Expected Output": "'Timeout done!' after specified delay",
    "Initial Code": "export const timeoutPromise = (delay) => { }",
    "Jest Test Code":
      "import { timeoutPromise } from './exercise.js'; test('Timeout Promise', () => { expect(timeoutPromise(500)).resolves.toEqual('Timeout done!'); });",
    "Solution Code":
      "export const timeoutPromise = (delay) => new Promise((resolve) => setTimeout(() => resolve('Timeout done!'), delay));",
  },
  {
    Category: "Javascript Promises",
    Description:
      "Implement a function that converts a callback-based function (e.g., setTimeout) into a promise-based one.",
    "Difficulty Score (1-10)": 6,
    "Exercise Name": "PromisifyFunction",
    "Expected Output": "'Callback converted to promise'",
    "Initial Code": "export const promisifyFunction = (callbackFunc) => { }",
    "Jest Test Code":
      "import { promisifyFunction } from './exercise.js'; test('Promisify Function', () => { const callbackFunc = (cb) => setTimeout(() => cb(null, 'Callback converted to promise'), 100); expect(promisifyFunction(callbackFunc)).resolves.toEqual('Callback converted to promise'); });",
    "Solution Code":
      "export const promisifyFunction = (callbackFunc) => new Promise((resolve, reject) => callbackFunc((err, result) => err ? reject(err) : resolve(result)));",
  },
  {
    Category: "Javascript Promises",
    Description: "Write a function that sequentially executes an array of promises, one after the other.",
    "Difficulty Score (1-10)": 8,
    "Exercise Name": "SequentialPromises",
    "Expected Output": "Results of all promises in sequential order",
    "Initial Code": "export const sequentialPromises = (promiseFunctions) => { }",
    "Jest Test Code":
      "import { sequentialPromises } from './exercise.js'; test('Sequential Promises', () => { const promiseFunctions = [() => Promise.resolve('First'), () => Promise.resolve('Second')]; expect(sequentialPromises(promiseFunctions)).resolves.toEqual(['First', 'Second']); });",
    "Solution Code":
      "export const sequentialPromises = (promiseFunctions) => promiseFunctions.reduce((prevPromise, nextPromise) => prevPromise.then(result => nextPromise().then(Array.prototype.concat.bind(result))), Promise.resolve([]));",
  },
  {
    Category: "Javascript Promises",
    Description: "Create a promise that resolves with 'Success' if a number is even and rejects with 'Failure' if odd.",
    "Difficulty Score (1-10)": 5,
    "Exercise Name": "EvenOddPromise",
    "Expected Output": "Resolves 'Success' for even, rejects 'Failure' for odd number",
    "Initial Code": "export const evenOddPromise = (number) => { }",
    "Jest Test Code":
      "import { evenOddPromise } from './exercise.js'; test('Even Odd Promise', () => { expect(evenOddPromise(2)).resolves.toEqual('Success'); expect(evenOddPromise(3)).rejects.toEqual('Failure'); });",
    "Solution Code":
      "export const evenOddPromise = (number) => new Promise((resolve, reject) => number % 2 === 0 ? resolve('Success') : reject('Failure'));",
  },
  {
    Category: "Javascript Promises",
    Description: "Use Promise.any to return the result of the first promise that successfully resolves.",
    "Difficulty Score (1-10)": 6,
    "Exercise Name": "AnyFirstResolvedPromise",
    "Expected Output": "The result of the first successfully resolved promise",
    "Initial Code": "export const anyFirstResolvedPromise = (promises) => { }",
    "Jest Test Code":
      "import { anyFirstResolvedPromise } from './exercise.js'; test('Any First Resolved Promise', () => { const promises = [Promise.reject('Error'), Promise.resolve('Success'), Promise.resolve('Another Success')]; expect(anyFirstResolvedPromise(promises)).resolves.toEqual('Success'); });",
    "Solution Code": "export const anyFirstResolvedPromise = (promises) => Promise.any(promises);",
  },
  {
    Category: "Javascript Classes",
    Description: "Create a class 'Rectangle' with properties length and width, and a method to calculate the area.",
    "Difficulty Score (1-10)": 3,
    "Exercise Name": "RectangleArea",
    "Expected Output": "20 (For length=5, width=4)",
    "Initial Code": "export class Rectangle { }",
    "Jest Test Code":
      "import { Rectangle } from './exercise.js'; test('Rectangle Area', () => { const myRectangle = new Rectangle(5, 4); expect(myRectangle.area()).toEqual(20); });",
    "Solution Code":
      "export class Rectangle { constructor(length, width) { this.length = length; this.width = width; } area() { return this.length * this.width; } }",
  },
  {
    Category: "Javascript Classes",
    Description:
      "Extend the 'Rectangle' class to create a 'Square' class. The square should initialize with one side and use the Rectangle's area method.",
    "Difficulty Score (1-10)": 4,
    "Exercise Name": "SquareFromRectangle",
    "Expected Output": "16 (For side=4)",
    "Initial Code": "export class Square extends Rectangle { }",
    "Jest Test Code":
      "import { Square } from './exercise.js'; test('Square Area from Rectangle', () => { const mySquare = new Square(4); expect(mySquare.area()).toEqual(16); });",
    "Solution Code": "export class Square extends Rectangle { constructor(side) { super(side, side); } }",
  },
  {
    Category: "Javascript Classes",
    Description:
      "Create a class 'Person' with properties name and age and a method to return a greeting, e.g., 'Hello, my name is John.'",
    "Difficulty Score (1-10)": 3,
    "Exercise Name": "PersonGreeting",
    "Expected Output": "'Hello, my name is John.' (For name='John')",
    "Initial Code": "export class Person { }",
    "Jest Test Code":
      "import { Person } from './exercise.js'; test('Person Greeting', () => { const john = new Person('John', 30); expect(john.greet()).toEqual('Hello, my name is John.'); });",
    "Solution Code":
      "export class Person { constructor(name, age) { this.name = name; this.age = age; } greet() { return `Hello, my name is ${this.name}.`; } }",
  },
  {
    Category: "Javascript Classes",
    Description:
      "Create a 'BankAccount' class with methods to deposit, withdraw, and check balance. Throw an error if withdrawal amount exceeds balance.",
    "Difficulty Score (1-10)": 5,
    "Exercise Name": "BankAccountMethods",
    "Expected Output": "Balance: 150 after deposit and withdraw",
    "Initial Code": "export class BankAccount { }",
    "Jest Test Code":
      "import { BankAccount } from './exercise.js'; test('Bank Account Operations', () => { const account = new BankAccount(); account.deposit(200); account.withdraw(50); expect(account.getBalance()).toEqual(150); });",
    "Solution Code":
      "export class BankAccount { constructor() { this.balance = 0; } deposit(amount) { this.balance += amount; } withdraw(amount) { if (amount > this.balance) { throw new Error('Insufficient funds'); } this.balance -= amount; } getBalance() { return this.balance; } }",
  },
  {
    Category: "Javascript Classes",
    Description: "Implement a 'Student' class that extends a 'Person' class, adding a new property 'grade'.",
    "Difficulty Score (1-10)": 4,
    "Exercise Name": "StudentClass",
    "Expected Output": "'Hello, my name is Jane, and I am in grade 10.' (For name='Jane', grade=10)",
    "Initial Code": "export class Student extends Person { }",
    "Jest Test Code":
      "import { Student } from './exercise.js'; test('Student Class', () => { const jane = new Student('Jane', 15, 10); expect(jane.greet()).toEqual('Hello, my name is Jane, and I am in grade 10.'); });",
    "Solution Code":
      "export class Student extends Person { constructor(name, age, grade) { super(name, age); this.grade = grade; } greet() { return `${super.greet()} and I am in grade ${this.grade}.`; } }",
  },
  {
    Category: "Javascript Classes",
    Description:
      "Create a 'Vehicle' class with properties like make and model, and a method to display this information.",
    "Difficulty Score (1-10)": 3,
    "Exercise Name": "VehicleInfo",
    "Expected Output": "'This vehicle is a Toyota Corolla.' (For make='Toyota', model='Corolla')",
    "Initial Code": "export class Vehicle { }",
    "Jest Test Code":
      "import { Vehicle } from './exercise.js'; test('Vehicle Information', () => { const myCar = new Vehicle('Toyota', 'Corolla'); expect(myCar.displayInfo()).toEqual('This vehicle is a Toyota Corolla.'); });",
    "Solution Code":
      "export class Vehicle { constructor(make, model) { this.make = make; this.model = model; } displayInfo() { return `This vehicle is a ${this.make} ${this.model}.`; } }",
  },
  {
    Category: "Javascript Classes",
    Description: "Extend the 'Vehicle' class with a 'Car' class that adds a property for the number of doors.",
    "Difficulty Score (1-10)": 4,
    "Exercise Name": "CarClassExtension",
    "Expected Output": "'This car is a Ford Mustang with 2 doors.' (For make='Ford', model='Mustang', doors=2)",
    "Initial Code": "export class Car extends Vehicle { }",
    "Jest Test Code":
      "import { Car } from './exercise.js'; test('Car Class Extension', () => { const myCar = new Car('Ford', 'Mustang', 2); expect(myCar.displayInfo()).toEqual('This car is a Ford Mustang with 2 doors.'); });",
    "Solution Code":
      "export class Car extends Vehicle { constructor(make, model, doors) { super(make, model); this.doors = doors; } displayInfo() { return `${super.displayInfo()} with ${this.doors} doors.`; } }",
  },
  {
    Category: "Javascript Classes",
    Description:
      "Create a 'Counter' class with a method to increment and decrement the count. Include a method to get the current count.",
    "Difficulty Score (1-10)": 3,
    "Exercise Name": "CounterClass",
    "Expected Output": "Current count is 1 after increment",
    "Initial Code": "export class Counter { }",
    "Jest Test Code":
      "import { Counter } from './exercise.js'; test('Counter Class', () => { const counter = new Counter(); counter.increment(); counter.increment(); counter.decrement(); expect(counter.getCount()).toEqual(1); });",
    "Solution Code":
      "export class Counter { constructor() { this.count = 0; } increment() { this.count++; } decrement() { this.count--; } getCount() { return this.count; } }",
  },
  {
    Category: "Javascript Classes",
    Description:
      "Implement a 'Circle' class with a radius property and methods to calculate diameter, circumference, and area.",
    "Difficulty Score (1-10)": 4,
    "Exercise Name": "CircleCalculations",
    "Expected Output": "Diameter 10, Circumference ~31.42, Area ~78.54 (For radius=5)",
    "Initial Code": "export class Circle { }",
    "Jest Test Code":
      "import { Circle } from './exercise.js'; test('Circle Calculations', () => { const myCircle = new Circle(5); expect(myCircle.diameter()).toEqual(10); expect(myCircle.circumference()).toBeCloseTo(31.42); expect(myCircle.area()).toBeCloseTo(78.54); });",
    "Solution Code":
      "export class Circle { constructor(radius) { this.radius = radius; } diameter() { return this.radius * 2; } circumference() { return this.radius * 2 * Math.PI; } area() { return Math.PI * this.radius * this.radius; } }",
  },
  {
    Category: "Javascript Classes",
    Description:
      "Create a 'Book' class with private properties 'title' and 'author', and a public method to display book details.",
    "Difficulty Score (1-10)": 5,
    "Exercise Name": "BookClass",
    "Expected Output": "'Title: 1984, Author: George Orwell'",
    "Initial Code":
      "export class Book { constructor(title, author) { /* code here */ } displayDetails() { /* code here */ } }",
    "Jest Test Code":
      "import { Book } from './exercise.js'; test('Book Class', () => { const myBook = new Book('1984', 'George Orwell'); expect(myBook.displayDetails()).toEqual('Title: 1984, Author: George Orwell'); });",
    "Solution Code":
      "export class Book { #title; #author; constructor(title, author) { this.#title = title; this.#author = author; } displayDetails() { return `Title: ${this.#title}, Author: ${this.#author}`; } }",
  },
  {
    Category: "Javascript Classes",
    Description:
      "Design a 'Library' class to manage Book instances. Include methods to add a book, remove a book, and list all books.",
    "Difficulty Score (1-10)": 7,
    "Exercise Name": "LibraryClass",
    "Expected Output": "List of books in the library",
    "Initial Code":
      "export class Library { constructor() { /* code here */ } addBook(book) { /* code here */ } removeBook(title) { /* code here */ } listBooks() { /* code here */ } }",
    "Jest Test Code":
      "import { Library, Book } from './exercise.js'; test('Library Class', () => { const myLibrary = new Library(); const book1 = new Book('1984', 'George Orwell'); myLibrary.addBook(book1); expect(myLibrary.listBooks()).toContain('1984'); myLibrary.removeBook('1984'); expect(myLibrary.listBooks()).not.toContain('1984'); });",
    "Solution Code":
      "export class Library { #books = []; addBook(book) { this.#books.push(book); } removeBook(title) { this.#books = this.#books.filter(book => book.title !== title); } listBooks() { return this.#books.map(book => book.displayDetails()); } }",
  },
  {
    Category: "Javascript Classes",
    Description:
      "Create a 'UserController' class with methods to add a user, delete a user, and list users. Use private methods for internal logic.",
    "Difficulty Score (1-10)": 8,
    "Exercise Name": "UserControllerClass",
    "Expected Output": "List of users",
    "Initial Code":
      "export class UserController { constructor() { /* code here */ } addUser(user) { /* code here */ } deleteUser(userId) { /* code here */ } listUsers() { /* code here */ } }",
    "Jest Test Code":
      "import { UserController } from './exercise.js'; test('User Controller Class', () => { const userController = new UserController(); userController.addUser({id: 1, name: 'John'}); expect(userController.listUsers()).toContainEqual({id: 1, name: 'John'}); userController.deleteUser(1); expect(userController.listUsers()).not.toContainEqual({id: 1, name: 'John'}); });",
    "Solution Code":
      "export class UserController { #users = []; #add(user) { this.#users.push(user); } #delete(userId) { this.#users = this.#users.filter(user => user.id !== userId); } addUser(user) { this.#add(user); } deleteUser(userId) { this.#delete(userId); } listUsers() { return this.#users; } }",
  },
  {
    Category: "Javascript Classes",
    Description:
      "Implement a 'ShoppingCart' class with methods to add an item, remove an item, and calculate the total price.",
    "Difficulty Score (1-10)": 6,
    "Exercise Name": "ShoppingCartClass",
    "Expected Output": "Total price of items in the cart",
    "Initial Code":
      "export class ShoppingCart { constructor() { /* code here */ } addItem(item) { /* code here */ } removeItem(itemId) { /* code here */ } calculateTotal() { /* code here */ } }",
    "Jest Test Code":
      "import { ShoppingCart } from './exercise.js'; test('Shopping Cart Class', () => { const cart = new ShoppingCart(); cart.addItem({id: 1, name: 'Book', price: 9.99}); expect(cart.calculateTotal()).toEqual(9.99); cart.removeItem(1); expect(cart.calculateTotal()).toEqual(0); });",
    "Solution Code":
      "export class ShoppingCart { #items = []; addItem(item) { this.#items.push(item); } removeItem(itemId) { this.#items = this.#items.filter(item => item.id !== itemId); } calculateTotal() { return this.#items.reduce((total, item) => total + item.price, 0); } }",
  },
  {
    Category: "Javascript Classes",
    Description:
      "Design a 'Vehicle' class with properties like 'make' and 'model'. Add a static method to compare two vehicles.",
    "Difficulty Score (1-10)": 6,
    "Exercise Name": "VehicleClass",
    "Expected Output": "Comparison result",
    "Initial Code":
      "export class Vehicle { constructor(make, model) { /* code here */ } static compare(vehicle1, vehicle2) { /* code here */ } }",
    "Jest Test Code":
      "import { Vehicle } from './exercise.js'; test('Vehicle Class', () => { const car1 = new Vehicle('Toyota', 'Corolla'); const car2 = new Vehicle('Honda', 'Civic'); expect(Vehicle.compare(car1, car2)).toEqual(/* some comparison result */); });",
    "Solution Code":
      "export class Vehicle { constructor(make, model) { this.make = make; this.model = model; } static compare(vehicle1, vehicle2) { return vehicle1.make === vehicle2.make && vehicle1.model === vehicle2.model; } }",
  },
  {
    Category: "Javascript Classes",
    Description:
      "Create a 'Calculator' class with a constructor initializing the value to 0 and methods for add, subtract, multiply, and divide.",
    "Difficulty Score (1-10)": 4,
    "Exercise Name": "CalculatorClass",
    "Expected Output": "Result of calculations",
    "Initial Code":
      "export class Calculator { constructor() { /* code here */ } add(number) { /* code here */ } subtract(number) { /* code here */ } multiply(number) { /* code here */ } divide(number) { /* code here */ } }",
    "Jest Test Code":
      "import { Calculator } from './exercise.js'; test('Calculator Class', () => { const calc = new Calculator(); calc.add(5); expect(calc.value).toEqual(5); calc.subtract(2); expect(calc.value).toEqual(3); calc.multiply(3); expect(calc.value).toEqual(9); calc.divide(3); expect(calc.value).toEqual(3); });",
    "Solution Code":
      "export class Calculator { #value = 0; add(number) { this.#value += number; } subtract(number) { this.#value -= number; } multiply(number) { this.#value *= number; } divide(number) { this.#value /= number; } get value() { return this.#value; } }",
  },
  {
    Category: "Javascript Classes",
    Description:
      "Build a 'Timer' class with methods to start, stop, and reset the timer. Include private methods for internal mechanics.",
    "Difficulty Score (1-10)": 7,
    "Exercise Name": "TimerClass",
    "Expected Output": "Current timer value",
    "Initial Code":
      "export class Timer { constructor() { /* code here */ } start() { /* code here */ } stop() { /* code here */ } reset() { /* code here */ } }",
    "Jest Test Code":
      "import { Timer } from './exercise.js'; test('Timer Class', () => { const timer = new Timer(); timer.start(); setTimeout(() => { timer.stop(); expect(timer.time).toBeGreaterThan(0); timer.reset(); expect(timer.time).toEqual(0); }, 1000); });",
    "Solution Code":
      "export class Timer { #startTime = 0; #elapsedTime = 0; start() { this.#startTime = Date.now() - this.#elapsedTime; } stop() { this.#elapsedTime = Date.now() - this.#startTime; } reset() { this.#elapsedTime = 0; } get time() { return this.#elapsedTime; } }",
  },
  {
    Category: "Javascript Classes",
    Description:
      "Create a `BankAccount` class with methods for deposit, withdrawal, and checking balance. Handle insufficient funds gracefully.",
    "Difficulty Score (1-10)": 5,
    "Exercise Name": "BankAccountClass",
    "Initial Code": "export class BankAccount { constructor(balance) { this.balance = balance; } }",
    "Jest Test Code":
      "import { BankAccount } from './exercise.js'; describe('BankAccount', () => { test('deposit and withdrawal', () => { const account = new BankAccount(100); account.deposit(50); account.withdraw(20); expect(account.getBalance()).toBe(130); }); test('handling insufficient funds', () => { const account = new BankAccount(30); expect(() => account.withdraw(40)).toThrow('Insufficient funds'); }); });",
    "Solution Code":
      "export class BankAccount { constructor(balance) { this.balance = balance; } deposit(amount) { this.balance += amount; } withdraw(amount) { if (amount > this.balance) { throw new Error('Insufficient funds'); } this.balance -= amount; } getBalance() { return this.balance; } }",
  },
  {
    Category: "Javascript Classes",
    Description:
      "Implement a `CurrencyConverter` class that converts amounts between different currencies. Use a static conversion rate.",
    "Difficulty Score (1-10)": 6,
    "Exercise Name": "CurrencyConverterClass",
    "Initial Code": "export class CurrencyConverter { constructor(rate) { this.rate = rate; } }",
    "Jest Test Code":
      "import { CurrencyConverter } from './exercise.js'; describe('CurrencyConverter', () => { test('conversion', () => { const converter = new CurrencyConverter(1.2); expect(converter.convert(100, 'USD', 'EUR')).toBe(120); }); });",
    "Solution Code":
      "export class CurrencyConverter { constructor(rate) { this.rate = rate; } convert(amount, fromCurrency, toCurrency) { return fromCurrency === 'USD' && toCurrency === 'EUR' ? amount * this.rate : amount / this.rate; } }",
  },
  {
    Category: "Javascript Classes",
    Description:
      "Create a `LoanCalculator` class to calculate monthly payments for a given loan amount, interest rate, and loan term.",
    "Difficulty Score (1-10)": 7,
    "Exercise Name": "LoanCalculatorClass",
    "Initial Code":
      "export class LoanCalculator { constructor(principal, interestRate, term) { this.principal = principal; this.interestRate = interestRate; this.term = term; } }",
    "Jest Test Code":
      "import { LoanCalculator } from './exercise.js'; describe('LoanCalculator', () => { test('monthly payment calculation', () => { const calculator = new LoanCalculator(1000, 5, 12); expect(calculator.calculateMonthlyPayment()).toBeCloseTo(85.61); }); });",
    "Solution Code":
      "export class LoanCalculator { constructor(principal, interestRate, term) { this.principal = principal; this.interestRate = interestRate / 100 / 12; this.term = term; } calculateMonthlyPayment() { const monthlyRate = this.interestRate; const termInMonths = this.term; return (this.principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -termInMonths)); } }",
  },
  {
    Category: "JavaScript Classes",
    Description: "Create a `ButtonCreator` class that can generate a button element with specified text and style.",
    "Difficulty Score (1-10)": 4,
    "Exercise Name": "ButtonCreatorClass",
    "Initial Code": "class ButtonCreator { constructor(text, style) { } }",
    "Jest Test Code": "// Testing DOM manipulation is outside the scope of Jest standard capabilities.",
    "Solution Code":
      "class ButtonCreator { constructor(text, style) { this.text = text; this.style = style; } createButton() { const button = document.createElement('button'); button.innerText = this.text; Object.assign(button.style, this.style); return button; } }",
  },
  {
    Category: "JavaScript Classes",
    Description: "Design a `ModalWindow` class to create a modal window with a title, message, and close button.",
    "Difficulty Score (1-10)": 6,
    "Exercise Name": "ModalWindowClass",
    "Initial Code": "class ModalWindow { constructor(title, message) { } }",
    "Jest Test Code": "// Testing DOM manipulation is outside the scope of Jest standard capabilities.",
    "Solution Code":
      "class ModalWindow { constructor(title, message) { this.title = title; this.message = message; } createModal() { const modal = document.createElement('div'); const titleEl = document.createElement('h1'); titleEl.innerText = this.title; const messageEl = document.createElement('p'); messageEl.innerText = this.message; const closeButton = document.createElement('button'); closeButton.innerText = 'Close'; closeButton.onclick = () => modal.style.display = 'none'; modal.appendChild(titleEl); modal.appendChild(messageEl); modal.appendChild(closeButton); return modal; } }",
  },
  {
    Category: "JavaScript Classes",
    Description:
      "Build a `TabSwitcher` class that creates a tabbed interface, switching between different content panels.",
    "Difficulty Score (1-10)": 7,
    "Exercise Name": "TabSwitcherClass",
    "Initial Code": "class TabSwitcher { constructor(tabs) { } }",
    "Jest Test Code": "// Testing DOM manipulation is outside the scope of Jest standard capabilities.",
    "Solution Code":
      "class TabSwitcher { constructor(tabs) { this.tabs = tabs; } createTabs() { const tabContainer = document.createElement('div'); this.tabs.forEach((tab, index) => { const tabButton = document.createElement('button'); tabButton.innerText = tab.title; tabButton.onclick = () => this.switchTab(index); tabContainer.appendChild(tabButton); }); this.contentContainer = document.createElement('div'); this.switchTab(0); return { tabContainer, contentContainer: this.contentContainer }; } switchTab(index) { const content = this.tabs[index].content; this.contentContainer.innerHTML = ''; this.contentContainer.appendChild(content); } }",
  },
  {
    Category: "JavaScript Classes",
    Description:
      "Create an `HTMLElementBuilder` class that allows for building HTML elements with various attributes and children in a fluent interface style.",
    "Difficulty Score (1-10)": 6,
    "Exercise Name": "HTMLElementBuilder",
    "Initial Code":
      "export class HTMLElementBuilder { constructor(tagName) { this.element = document.createElement(tagName); } }",
    "Jest Test Code":
      "import { HTMLElementBuilder } from './exercise.js'; describe('HTMLElementBuilder', () => { test('builds complex HTML element', () => { const div = new HTMLElementBuilder('div').addAttribute('class', 'container').addChild(new HTMLElementBuilder('span').addAttribute('class', 'text').addChild(document.createTextNode('Hello'))).build(); expect(div.outerHTML).toBe('<div class=\"container\"><span class=\"text\">Hello</span></div>'); }); });",
    "Solution Code":
      "export class HTMLElementBuilder { constructor(tagName) { this.element = document.createElement(tagName); } addAttribute(key, value) { this.element.setAttribute(key, value); return this; } addChild(child) { this.element.appendChild(child instanceof HTMLElementBuilder ? child.build() : child); return this; } build() { return this.element; } }",
  },
  {
    Category: "JavaScript Classes",
    Description:
      "Develop a `QueryParamsBuilder` class for constructing URL query parameters in a fluent and readable manner.",
    "Difficulty Score (1-10)": 5,
    "Exercise Name": "QueryParamsBuilder",
    "Initial Code": "export class QueryParamsBuilder { constructor() { this.params = new URLSearchParams(); } }",
    "Jest Test Code":
      "import { QueryParamsBuilder } from './exercise.js'; describe('QueryParamsBuilder', () => { test('builds query parameters', () => { const queryParams = new QueryParamsBuilder().addParam('key1', 'value1').addParam('key2', 'value2').build(); expect(queryParams).toBe('key1=value1&key2=value2'); }); });",
    "Solution Code":
      "export class QueryParamsBuilder { constructor() { this.params = new URLSearchParams(); } addParam(key, value) { this.params.append(key, value); return this; } build() { return this.params.toString(); } }",
  },
  {
    Category: "JavaScript Builder Classes",
    Description: "Create a `StyleBuilder` class for dynamically building CSS styles for HTML elements.",
    "Difficulty Score (1-10)": 6,
    "Exercise Name": "StyleBuilder",
    "Initial Code": "export class StyleBuilder { constructor() { this.styles = {}; } }",
    "Jest Test Code":
      "import { StyleBuilder } from './exercise.js'; describe('StyleBuilder', () => { test('builds CSS style', () => { const style = new StyleBuilder().set('color', 'blue').set('margin', '10px').build(); expect(style).toEqual({ color: 'blue', margin: '10px' }); }); });",
    "Solution Code":
      "export class StyleBuilder { constructor() { this.styles = {}; } set(prop, value) { this.styles[prop] = value; return this; } build() { return this.styles; } }",
  },
  {
    Category: "JavaScript Classes",
    Description: "Develop a `FormDataBuilder` class for constructing form data in a structured and readable way.",
    "Difficulty Score (1-10)": 5,
    "Exercise Name": "FormDataBuilder",
    "Initial Code": "export class FormDataBuilder { constructor() { this.formData = new FormData(); } }",
    "Jest Test Code":
      "import { FormDataBuilder } from './exercise.js'; describe('FormDataBuilder', () => { test('builds form data', () => { const formData = new FormDataBuilder().add('name', 'John').add('age', '30').build(); expect(formData.get('name')).toBe('John'); expect(formData.get('age')).toBe('30'); }); });",
    "Solution Code":
      "export class FormDataBuilder { constructor() { this.formData = new FormData(); } add(key, value) { this.formData.append(key, value); return this; } build() { return this.formData; } }",
  },
];

(async () => {
  for (const exercise of exercises) {
    const exerciseRef = doc(db, "exercise-of-the-day", exercise["Exercise Name"]);
    await setDoc(exerciseRef, exercise, { merge: true });
    console.log(`Added ${exercise["Exercise Name"]} to Firestore.`);
  }
})();
