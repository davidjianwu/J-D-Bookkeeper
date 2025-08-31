type BookProps = {
    title: string
    author: string
}

export const BookItem = ({title, author}: BookProps) => {
    return (
        <div>
            <p> {title} </p>
            <small> by {author} </small>
        </div>
    )
}