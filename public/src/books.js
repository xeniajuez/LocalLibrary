//HELPER FUNCTION #1 to find an element in a provided array given an "id" value
function findItById(it, id) {
  return it.find((it) => it.id === id);
}

//HELPER FUNCTION #2 to make partitionBooksByBorrowedStatus readable filter() an array of books based on their "returned" status
function filterByStatus(books, status) {
  return books.filter(({ borrows }) => status === borrows[0].returned);
} 

function findAuthorById(authors, id) {
  //using helper function 
  return findItById(authors, id); 
}

function findBookById(books, id) {
  //usig helper function 
  return findItById(books, id); 
}

function partitionBooksByBorrowedStatus(books) {
  //using const to make it easier to read 
  const returned = true;
  const loaned = !returned;
  //easier arrays with use of helper function 
  const returnedBooks = filterByStatus(books, returned);
  const loanedBooks = filterByStatus(books, loaned);
  //using SPREAD OPERATOR with the two arrays made above
  return [[...loanedBooks], [...returnedBooks]];
}

function getBorrowersForBook(book, accounts) {
  const { borrows } = book;
  let borrowers = [];
  for (let record in borrows) {
    const matchingAccount = accounts.find(
      (account) => account.id === borrows[record].id
    );
    const accountObj = { ...borrows[record], ...matchingAccount };
    if (borrowers.length < 10) borrowers.push(accountObj);
  }
  return borrowers;
}



module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
