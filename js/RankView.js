import React from 'react'
import StarView from './StarView'

//关卡视图
var RankView = React.createClass({

    handleClick: function () {
        if (this.props.exam && this.props.exam.state == "3") {
            var examId = this.props.exam.examId;
            var answerSec = this.props.exam.answerSec;
            var questionCount = this.props.exam.questionCount;

            renderToPlay4H5(examId, answerSec, questionCount, this.props.prompt);
        }
    },

    componentDidMount: function () {
        $('.img-light').addClass('animated fadeIn infinite');
        $('.div-rank-view').addClass('animated zoomIn');
        if(this.props.exam && this.props.exam.state == "3"){
            $('body').animate({scrollTop: $('#day-play').offset().top-300}, 800);
        }
    },
    render: function () {
        var dayImg, numImg, numStyle, isPlay;

        dayImg = "img/day-play/day-lock.png";
        numStyle = "img-day-num";
        isPlay = false;

        var starNum = "";
        if (this.props.exam) {
            starNum = this.props.exam.join;
            if (this.props.exam.state == "1") {
                dayImg = "img/day-play/day-unlock.png";
            } else if (this.props.exam.state == "2") {
                dayImg = "img/day-play/day-miss.png";
            } else if (this.props.exam.state == "3") {
                dayImg = "img/day-play/day-play.png";
                isPlay = true;
            }
            if (this.props.exam.state == "3" || this.props.exam.state == "4") {
                numStyle = "div-hidden";
            }
            numImg = "img/num/" + this.props.exam.levelNo + ".png";
        }

        return (
            <div className="div-rank-view" id={isPlay?"day-play":""}>
                <div className="div-rank-day-view">
                    <img className="img-day" src={dayImg}/>
                    <img className={numStyle} src={numImg}/>
                </div>
                <StarView starNum={starNum}/>
            </div>
        );
    }
});

export default RankView;