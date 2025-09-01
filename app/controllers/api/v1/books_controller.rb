class Api::V1::BooksController < ApplicationController
  before_action :set_book, only: %i[ show update destroy ]

  # GET /books
  def index
    @books = Book.includes(:author).all

    @books_with_author = @books.map do |book|
      if book.author
        book.attributes.merge({author: book.author.first_name})
      else
        book.attributes.merge({author: nil})
      end
    end

    render json: @books_with_author
  end

  # GET /books/1
  def show
    render json: @book
  end

  # POST /books
  def create
    new_book_params = book_params

    if params["author"]
      Author.create(first_name: params["author"])
    end

    author = Author.find_by(first_name: params["author"])

    if author
      new_book_params = book_params.merge(author_id: author.id)
    end

    @book = Book.new(new_book_params.to_h)

    if @book.save
      render json: @book, status: :created, location: api_v1_book_url(@book)
    else
      render json: @book.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /books/1
  def update
    new_book_params = book_params
    if params["author"]
      author = Author.find_by(first_name: params["author"])

      if author
        new_book_params = book_params.merge(author_id: author.id)
      else
        a = Author.create(first_name: params["author"])
        new_book_params = book_params.merge(author_id: a.id)
      end
    end

    if @book.update(new_book_params)

      render json: @book
    else
      render json: @book.errors, status: :unprocessable_entity
    end
  end

  # DELETE /books/1
  def destroy
    @book.destroy!

    render json: { message: "Book deleted" }, status: :ok
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_book
      @book = Book.find(params.expect(:id))
    end

    # Only allow a list of trusted parameters through.
    def book_params
      params.expect(book: [ :author_id, :title, :pages, :genre ])
    end
end
