import React, { useState } from 'react';
import chatLogo from '../../assets/chat_ico.svg';
import arrowUp from '../../assets/arrow_up.svg';
import arrowDown from '../../assets/arrow_down.svg';
import { changeNumber } from '../../utils/numberConverter';
import { changeHoursToDays } from '../../utils/hoursToDays';
import { searchSource } from '../../utils/searchSource';
import { Comments } from '../comments/Comments';
import upOk from '../../assets/up_ok.svg';
import upNotOk from '../../assets/up_not_ok.svg';
import { arrowsStyles, detailsStyles, articleSection, likesSectionStyles, articleStyles } from './styles';
import { v4 as uuidv4 } from 'uuid';

const onlyImages = /png$|jpg$|gif$/;


export const Article = (props) => {
    const actualArticle = props.article;

    const hasImage = onlyImages.test(actualArticle.image);

    let padding;
    if (hasImage || actualArticle.video || actualArticle.mediaEmbed) {
        padding = '10px 0 20px 0'
    } else {
        padding = 0;
    }

    const [isLiked, setIsLiked] = useState('neutral');

    const handleClickUp = () => {
        if (isLiked === true) {
            setIsLiked('neutral')
        } else {
            setIsLiked(true);
        }
    }
    const handleClickDown = () => {
        if (isLiked === false) {
            setIsLiked('neutral')
        } else {
            setIsLiked(false);
        }
    }

    const postTime = changeHoursToDays(actualArticle.time);

    let mediaEmbed;
    if (actualArticle.mediaEmbed) {
        const probe = /html/;
        if (!probe.test(actualArticle.mediaEmbed)) {
            const result = searchSource(actualArticle.mediaEmbed);
            mediaEmbed = <iframe width='1000px' height='1000px' style={{maxWidth: '65vw', maxHeight: '80vh'}} src={result} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>;
        }
    }

    const [seeComments, setSeeComments] = useState(false);

    const handleClickComments = () => {
        setSeeComments(prevState => !prevState)
    }

    return (
        <article className='article' style={articleStyles}>
            <section style={likesSectionStyles}>
                <img src={isLiked === true ? upOk : arrowUp} alt='like_up' style={arrowsStyles} onClick={handleClickUp} />
                <p style={{fontWeight: 'bold', color: isLiked === true ? 'rgb(26, 201, 55)' : isLiked === false ? 'rgb(222, 24, 24)' : '#646464'}} className='app-color'>{changeNumber(actualArticle.likes)}</p>
                <img src={isLiked === false ? upNotOk : arrowDown} style={arrowsStyles} alt='like_down' onClick={handleClickDown} />
            </section>
            <section style={articleSection}>
                <h3 style={{padding: padding}}>{actualArticle.title}</h3>
                {
                    actualArticle.video ?

                    (<video style={{width: '100%', height: '100%', borderRadius: '7px 7px 0 0'}} controls>  
                        <source src={actualArticle.video} type="video/mp4" />
                    </video>)

                    : hasImage ? <img style={{width: '90%', borderRadius: '7px 7px 0 0'}} src={actualArticle.image} alt={actualArticle.title} /> 
                    
                    : actualArticle.mediaEmbed ? 

                    mediaEmbed

                    : ''
                }

                <hr style={{marginTop: 20, border: '.1px solid lightgray', padding: 0}} />

                <section style={detailsStyles}>
                    <p style={{fontWeight: 'bold'}} className='app-color'>{actualArticle.author}</p>
                    <p style={{opacity: '0.9'}}>{postTime}</p>
                    <div onClick={handleClickComments} className='comments' style={{display: 'flex', alignItems: 'center', cursor: 'pointer', backgroundColor: seeComments ? 'rgb(240, 240, 240)' : ''}}>
                        <img style={{width: 25, paddingRight: 5}} src={chatLogo} alt='comments' />
                        <p>{actualArticle.numComments}</p>
                    </div>
                </section>

                {
                    seeComments ?

                    <Comments commentLink={actualArticle.comments} />

                    : ''
                }
                
            </section>
        </article>
    )
}