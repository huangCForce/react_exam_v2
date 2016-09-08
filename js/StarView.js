import React from 'react'

//星星视图
var StarView = React.createClass({
    render: function () {
        var start1, start2, start3;
        start1 = "img/star/star-none.png";
        start2 = "img/star/star-none.png";
        start3 = "img/star/star-none.png";
        var divName;
        if (this.props.starNum) {

            divName = "div-star-view";
            var arr = this.props.starNum.split("/");
            var floatValue = arr[0] / arr[1];
            if (floatValue >= (1 / 6)) {
                start1 = "img/star/star-half.png";
            }
            if (floatValue >= (2 / 6)) {
                start1 = "img/star/star-full.png";
            }
            if (floatValue >= (3 / 6)) {
                start2 = "img/star/star-half.png";
            }
            if (floatValue >= (4 / 6)) {
                start2 = "img/star/star-full.png";
            }
            if (floatValue >= (5 / 6)) {
                start3 = "img/star/star-half.png";
            }
            if (floatValue >= (6 / 6)) {
                start3 = "img/star/star-full.png";
            }
        } else {
            divName = "div-hidden";
        }
        return (
            <div className={divName}>
                <img className="img-star img-star-left" src={start1}/>
                <img className="img-star img-star-middle" src={start2}/>
                <img className="img-star img-star-right" src={start3}/>
            </div>
        );
    }
});

export default StarView;