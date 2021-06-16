//HELPER FUNCTION #1 to easily count the items in an array 
function arrayItemCounting (item){
  return item.length 
}

//using the helper function to count the books in the array 
function getTotalBooksCount(books) {
  return arrayItemCounting(books); 
}

//using the helper function to count the accounts in the array 
function getTotalAccountsCount(accounts) {
  return arrayItemCounting(accounts); 
}

//using REDUCE to iterate through each item in the books 
function getBooksBorrowedCount(books) {
  return books.reduce((borrowCount, { borrows }) => {
//if the first item in the borrows array of that book was not returned
// increase the total borrow counter, and return the acc

const lastBorrowed = borrows[0];
    if (!lastBorrowed.returned) borrowCount++;
    return borrowCount;
  }, 0);

}

function getMostCommonGenres(books) {
  return (
    books
      .reduce((genres, book) => {
        //genre = first object in genres who's genre name matches the genre name of the current book
        const genre = genres.find((genre) => genre.name === book.genre);
        //if there is not a genre with that name, then create one with count 1,
        //otherwise increase that genre's count by one (using TERINARY OPERATOR)
        !genre ? genres.push({ name: book.genre, count: 1 }) : genre.count++;
        return genres;
      }, [])
      //using SORT to new array so the genres with the highest counts are first 
      .sort((genre1, genre2) => genre2.count - genre1.count)
      //using SLICE to the array to keep it within 5 objects 
      .slice(0, 5)
  );
}

function getMostPopularBooks(books) {
  return (
    books
    //using MAP through each boook to create a new array of objects 
    //(containing the title & length of the 'borrows' array to determine commonality) 
    .map(({ title, borrows }) => ({
      name: title,
      count: arrayItemCounting(borrows),
    }))

    //using SORT to sort by the highest 
    .sort((book1, book2) => book2.count - book1.count)
    //using SLICE to keep it within 5 objects 
    .slice(0, 5)
    );  
}

//HELPER FUNCTION #2 to determine each author's total number of 'borrows' from all books
function authorsTotalBorrows(books, id) {
//using REDUCE to iterate through books array and add up the length of the borrows arrays that matches the author id
return books.reduce((totalBorrows, { authorId, borrows }) => {
  if (authorId === id) totalBorrows += arrayItemCounting(borrows);
  return totalBorrows;
}, 0);
}

function getMostPopularAuthors(books, authors) {
  return (
    authors
      .map(({ name: { first, last }, id }) => ({
        name: `${first} ${last}`,
        count: authorsTotalBorrows(books, id),
      }))
      //using SORT to sort by highest first
      .sort((auth1, auth2) => auth2.count - auth1.count)
      //using SLICE to keep it within 5 objects 
      .slice(0, 5)
  );
}


module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
