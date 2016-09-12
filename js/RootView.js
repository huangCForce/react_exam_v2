
import React from 'react'
import RankView from './RankView'
import api from './communication'
import Toast from './dialog'
require("!style!css!../css/app.css");
require("!style!css!../css/loading.css");
require("!style!css!../css/animate.css");

var TreasureView = React.createClass({
    handleClick: function () {
        if (this.props.box) {
            if (this.state.boxState == "1") {
                var curDialog = $('#dialog' + this.props.box.preciousBoxId);
                curDialog.show();
                $('.dialogCover').show();
                $('body').css({
                    "overflow-y":"hidden"
                });
            }
        } else {
            if (!this.props.energyAddr) {
                return;
            }

            if (isNaN(this.props.energyAddr)) {
                //网页链接
                window.location.href = this.props.energyAddr;
            } else {
                api.renderToCommunityChat4H5(this.props.energyAddr);
            }
        }
    },
    confirm: function () {
        this.cancel();
        api.showLoading();
        api.getPreBox('', this.props.box.preciousBoxId, function (result) {
            console.log(result)
            api.hideLoading();
            this.setState({boxState: "2"});
        }.bind(this), function (msg) {
            api.hideLoading();
            Toast.drawToast(msg);
        });
    },
    getInitialState: function () {
        return {
            boxState: this.props.box ? this.props.box.state : "1"
        }
    },
    cancel: function () {
        var curDialog = $('#dialog' + this.props.box.preciousBoxId);
        curDialog.hide();
        $('.dialogCover').hide();
        $('body').css({
            "overflow-y":"auto"
        });
    },
    componentDidMount: function () {
        $('.div-shake-view').addClass('animated tada infinite');
    },
    render: function () {
        var boxImg = "img/feeder.png";
        var title = "加油站";
        var dialog;
        var isShake = false;

        if (this.props.box) {
            var state = parseInt(this.state.boxState);

            switch (state) {
                case 1:
                    isShake = true;
                    boxImg = "img/box/box-" + this.props.box.type + ".png";
                    dialog =
                        <TakeBoxDialog box={this.props.box} onCancel={this.cancel} onConfirm={this.confirm} ref="root"/>
                    break;
                case 2:
                    boxImg = "img/box/box-" + this.props.box.type + "-open.png";

                    break;
                case 3:
                    boxImg = "img/box/box-none.png";
                    break;
            }
            title = this.props.box.type + "天";
        }

        return (
            <div>
                {dialog}
                <div className="circle-bg" onClick={this.handleClick}>
                    <div className={isShake?"div-shake-view":""}>
                        <img className="treasure-box" src={boxImg}/>
                    </div>
                </div>
                <div className="treasure-title">{title}</div>
            </div>
        );
    }
});

var TakeBoxDialog = React.createClass({
    render: function () {
        var imgSrc = "img/box/box-open-" + this.props.box.type + ".png";
        return (
            <div>
                <div className="dialogCover"></div>
                <div id={"dialog"+this.props.box.preciousBoxId} className="dialog">
                    <div className="div-close-dialog">
                        <img className="img-close-dialog" src="img/close.png" onClick={this.props.onCancel}/>
                    </div>
                    <img className="img-box-open" src={imgSrc}/>
                    <div className="div-box-title">
                        恭喜您获得{this.props.box.score}云币
                    </div>
                    <div onClick={this.props.onConfirm}>
                        <input className="img-take-btn" type="button" value="领取奖励"/>
                    </div>
                </div>
            </div>
        );
    }
});

//头部视图
var HeadView = React.createClass({
    componentDidMount: function () {
        $('.div-feeder').addClass('animated bounceInRight');
        window.onscroll = function(){
            var t = document.documentElement.scrollTop || document.body.scrollTop;
            var top_div = document.getElementById( "top_div" );
            if( t <= 50 ) {
                $('.div-head-view').css("background-color",'');
            } else {
                $('.div-head-view').css('background-color','white');
                $('.div-head-view').css('opacity','0.60');
            }
        }
    },
    render: function () {
        var preciousBoxList = this.props.data.preciousBoxList;

        var rows = [];
        for (var i = 0 ; i < this.props.data.preciousBoxList.length ; i++){
            rows.push(<td key={i}><TreasureView box={preciousBoxList[i]}/></td>);
        }


        return (
            <div className="div-level">
                <div className="div-head-view">
                </div>
                <div className="div-head-view2">
                    <table className="treasure-table">
                        <tbody>
                        <tr>
                            {rows}
                        </tr>
                        </tbody>

                    </table>

                    <div className="div-feeder">
                        <TreasureView energyAddr={this.props.data.energyAddr}/>
                    </div>


                </div>
            </div>
        );
    }
});

var LevelView = React.createClass({
    render:function () {
        return(
            <div className="div-level-view">
                <div className="div-rank-empty-view"></div>
                <RankView exam={this.props.data1} prompt={prompt}/>
                <RankView exam={this.props.data2} prompt={prompt}/>
                <RankView exam={this.props.data3} prompt={prompt}/>
                <div className="div-rank-empty-view"></div>
            </div>
        );
    }
});

var LevelTop = React.createClass({

    render: function () {
        var dataArray = this.props.dataList;
        return (
            <div>
                <div className="div-level"><div className="div-level-one-view"></div></div>
                <div className="div-level">
                    <div className="div-level-50-view">
                        <img className="level-background" src="img/level-bg/level-1.png"/>
                        <LevelView data1={dataArray[0]} data2={dataArray[1]} data3={dataArray[2]} />
                        <LevelView data1={dataArray[5]} data2={dataArray[4]} data3={dataArray[3]}/>
                    </div>
                </div>
            </div>
        );
    }
});

var LevelMiddle = React.createClass({
    render:function () {
        var dataArray = this.props.dataList;

        return(
            <div>
                <div className="div-level">
                    <div className="div-level-50-view">
                        <img className="level-background" src="img/level-bg/level-2.png"/>

                        <LevelView data1={dataArray[0]} data2={dataArray[1]} data3={dataArray[2]} />
                        <LevelView data1={dataArray[5]} data2={dataArray[4]} data3={dataArray[3]}/>
                    </div>
                </div>
            </div>
        );
    }
});

var LevelBottom = React.createClass({
    render:function () {
        var dataArray = this.props.dataList;
        return(
            <div>
                <div className="div-level">
                    <div className="div-level-40-view">
                        <img className="level-background" src="img/level-bg/level-3.png"/>

                        <LevelView data1={dataArray[0]} data2={dataArray[1]} data3={dataArray[2]}/>
                    </div>
                </div>
            </div>
        );
    }
});

var RootView = React.createClass({
    InitData: function () {
        api.getMainExam('', '', function (result) {
            prompt = result.prompt;
            this.setState({examInfo: result});
            this.setState({loading: false});
            if (result.rule) {
                api.renderToRule4H5(result.rule);
            }
        }.bind(this), function (msg) {
            Toast.drawToast(msg);
            api.hideLoading();
        });
    },

    componentDidMount: function () {
        this.InitData();

    },
    getInitialState: function () {
        return {
            loading: true,
            examInfo: {}
        }
    },
    render: function () {
        if (this.state.loading) {
            api.showLoading();
            return (
                <div>
                </div>
            )
        } else {
            api.hideLoading();

            var length = parseInt(this.state.examInfo.examList.length);
            var levelRow = (length > 9) ? (Math.round((length - 6)/6) ): 0;

            var topArray = new Array(6);
            for (var i=0; i<6; i++){
                topArray[i] = this.state.examInfo.examList[i];
            }

            var rows = [];
            for (i = 1 ; i <= levelRow ; i++){
                var middleArray = new Array(6);
                for(var j = 0; j < 6; j++){
                    middleArray[j] = this.state.examInfo.examList[i*6+j];
                }

                rows.push(<LevelMiddle key={i} dataList={middleArray}/>);
            }

            var bottomArray = new Array(3);
            for (i=0; i<3; i++){
                bottomArray[i] = this.state.examInfo.examList[6*(levelRow+1)+i];
            }

            return (
                <div className="rootView">
                    <HeadView data={this.state.examInfo}/>
                    <LevelTop dataList={topArray} />
                    {rows}
                    <LevelBottom dataList={bottomArray}/>
                </div>
            );
        }

    }
});

var prompt;
export default RootView;
