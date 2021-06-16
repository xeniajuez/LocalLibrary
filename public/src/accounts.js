function findAccountById(accounts, id) {
  //using FIND to locate account by id 
  return accounts.find(account => account.id === id); 
}

function sortAccountsByLastName(accounts) {
  //using SORT 
  return accounts.sort((nameA, nameB)=> nameA.name.last.toLowerCase() > nameB.name.last.toLowerCase() ? 1: -1)
}

function getTotalNumberOfBorrows(account, books) {
   //using REDUCE to take all the books array, reduce twice to go through the records in that 
   //book's 'borrows' by matching it to the id 
   return books.reduce((totalBorrows, { borrows }) => {
    totalBorrows += borrows.reduce((matches, record) => {
      if (account.id === record.id) matches++;
      return matches;
    }, 0);
    return totalBorrows;
  }, 0);
}

function getBooksPossessedByAccount(account, books, authors) {
 //using REDUCE to go through each book item in books
  return (
    books
      .reduce((authorBooks, book) => {
        // using PUSH, to the book into a new array 
        authorBooks.push(book);
        //using authors.find to change the "author" key of the new array 
        //to contain the full author object
        book.author = authors.find((author) => author.id === book.authorId);
        return authorBooks;
      }, [])

      // after creating a new array with the proper obj formatting 
      // using FILTER to filter the ones that don't match the id & filter the books that were returned

      .filter(({ borrows }) =>
        borrows.find((record) => record.id === account.id && !record.returned)
      )
  );
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
