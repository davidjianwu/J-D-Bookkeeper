type ReviewProps = {
    rating: number
    comment: string
}

export const Review = () => {
    return (
        <>
            <div className="item-container">
                <p> {title} </p>
                <small> by {author} </small>
            </div>
        </>
    )
}