import React from 'react';
import chatLogo from '../../assets/chat_ico.svg';
import arrowUp from '../../assets/arrow_up.svg';
import arrowDown from '../../assets/arrow_down.svg';
import { changeNumber } from '../../utils/numberConverter';

export const Article = (props) => {
    const actualArticle = props.article;

    const onlyImages = /png$|jpg$|gif$/;
    const hasImage = onlyImages.test(actualArticle.image);
    const image = <img style={{width: '90%', borderRadius: '7px 7px 0 0'}} src={actualArticle.image} alt={actualArticle.title} />;

    const articleStyles = {
        display: 'flex',
        marginBottom: 20,
        boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1),0 4px 6px -2px rgba(0,0,0,0.05)',
        backgroundColor: '#fff',
        padding: '20px 10px',
        gap: '.5vw'
    }

    const likesSectionStyles = {
        display: 'flex',
        flexDirection: 'column',
        flexBasis: '2%',
        justifyContent: 'flex-start',
        alignItems: 'center'
    }

    const articleSection = {
        flexBasis: '90%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    }

    const detailsStyles = {
        display: 'flex',
        justifyContent: 'space-between',
        paddingTop: 20,
        fontSize: '.8rem'
    }

    const arrowsStyles = {
        width: '55%', 
        cursor: 'pointer',
    }

    let padding;
    if (hasImage || actualArticle.video !== undefined) {
        padding = '10px 0 20px 0'
    } else {
        padding = 0;
    }

    return (
        <article className='article' style={articleStyles}>
            <section style={likesSectionStyles}>
                <img src={arrowUp} alt='like_up' style={arrowsStyles} />
                <p style={{fontWeight: 'bold'}} className='app-color'>{changeNumber(actualArticle.likes)}</p>
                <img src={arrowDown} style={arrowsStyles} alt='like_down' />
            </section>
            <section style={articleSection}>
                <h3 style={{padding: padding}}>{actualArticle.title}</h3>
                {
                    actualArticle.video !== undefined ?
                    (<video style={{width: '100%', height: '100%', borderRadius: '7px 7px 0 0'}} controls>  
                        <source src={actualArticle.video} type="video/mp4" />
                    </video>)

                    : hasImage ? image : ''
                }

                <hr style={{marginTop: 20, border: '1px solid lightgray', padding: 0}} />

                <section style={detailsStyles}>
                    <p style={{fontWeight: 'bold'}} className='app-color'>{actualArticle.author}</p>
                    <p>{actualArticle.time} hours ago</p>
                    <div className='comments' style={{display: 'flex', alignItems: 'center', cursor: 'pointer'}}>
                        <img style={{width: 25, paddingRight: 5}} src={chatLogo} alt='comments' />
                        <p>{actualArticle.numComments}</p>
                    </div>
                </section>
            </section>
        </article>
    )
}