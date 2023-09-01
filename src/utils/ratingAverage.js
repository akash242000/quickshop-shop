
function ratingAverage(total){
    let rating= total.reduce((acc, curr)=>{
        return acc+curr.rating;
    },0)

    rating= rating/total.length;
    return Math.round(rating);
}

export default ratingAverage;