import React from 'react';
import chatLogo from '../../assets/chat_ico.svg';

export const Article = (props) => {
    const actualArticle = props.article;

    return (
        <article>
            <h2>{actualArticle.title}</h2>
            <img src={actualArticle.image} />

            <hr />

            <section>
                <p>{actualArticle.author}</p>
                <p>a {actualArticle.time} hours ago</p>
                <p><img src={chatLogo} alt='comments' />{actualArticle.numComments}</p>
            </section>
        </article>
    )
}