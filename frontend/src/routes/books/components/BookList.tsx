import React, { Component } from "react"
import { Route, Link } from "react-router-dom"
import { observer, inject } from "mobx-react"
import styles from "components/style"
import BookSearch from "./BookSearch"
import BookView from "./BookView"
import BookEdit from "./BookEdit"
import Paginator from "components/Paginator"
import EmptyCard from "components/EmptyCard"

interface IBookListProps {
  bookStore?: IBookStore
  userStore?: IUserStore
  lendingStore?: ILendingStore
}

@inject("bookStore", "userStore", "lendingStore")
@observer
export default class BookList extends Component<IBookListProps, {}> {
  public componentDidMount() {
    this.props.bookStore!.fetchBooks()
  }

  public render() {
    const bookStore = this.props.bookStore!
    const userStore = this.props.userStore!
    const lendingStore = this.props.lendingStore!
    return (
      <div className="container">
        <div className="columns">
          <div className="column is-6">
            <Paginator
              page={bookStore.page}
              changePage={bookStore.changePage}
            />
            {userStore.hasPermision("books.add_book") && (
              <Link className="is-size-4 has-text-centered" to="/books/add">
                <div className={`card ${styles.card} ${styles.cardButton}`}>
                  <div className="card-content">Dodaj książkę</div>
                </div>
              </Link>
            )}
            {bookStore.books.length ? (
              bookStore.books.map(book => (
                <BookCard
                  key={book.id}
                  book={book}
                  bookStore={bookStore}
                  userStore={userStore}
                  lendingStore={lendingStore}
                />
              ))
            ) : (
              <EmptyCard />
            )}
          </div>
          <div className="column is-5 is-offset-1">
            {userStore.hasPermision("books.add_book") && (
              <Route path="/books/add" component={BookEdit} />
            )}
            {userStore.hasPermision("books.change_book") && (
              <Route path="/books/:id/edit" component={BookEdit} />
            )}
            <Route path="/books/:id/view" component={BookView} />
            <BookSearch />
          </div>
        </div>
      </div>
    )
  }
}

interface IBookCardProps {
  book: IBook
  bookStore: IBookStore
  userStore: IUserStore
  lendingStore: ILendingStore
}

const BookCard = observer(
  ({ book, bookStore, userStore, lendingStore }: IBookCardProps) => (
    <div className={`card ${styles.card}`}>
      <div className="card-content">
        <p className="is-size-4">{book.title}</p>
        {book.author && <p>Autor: {book.author}</p>}
        {book.publication_year && <p>Rok wydania: {book.publication_year}</p>}
        {(book.available && <p>Dostępne</p>) || <p>Niedostępne</p>}
        <div className="field is-grouped is-grouped-right">
          <div className="control">
            <Link className="button is-link" to={`/books/${book.id}/view`}>
              Więcej informacji
            </Link>
          </div>
          {userStore.hasPermision(
            "books.view_own_lendings",
            "books.view_all_lendings"
          ) &&
            book.available && (
              <div className="control">
                <button
                  className="button is-primary"
                  onClick={lendingStore.lendBook(book.id!)}
                >
                  Zarezerwuj
                </button>
              </div>
            )}
          {userStore.hasPermision("books.change_book") && (
            <div className="control">
              <Link className="button is-warning" to={`/books/${book.id}/edit`}>
                Edytuj
              </Link>
            </div>
          )}
          {userStore.hasPermision("books.delete_book") && (
            <div className="control">
              <button
                className="button is-danger"
                onClick={bookStore.deleteBook(book.id!)}
              >
                Usuń
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
)
