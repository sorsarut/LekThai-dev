// React
import React, { Component } from 'react';

class StartScreen extends Component {
    render() {

        const { personalBest, previousScore, startGame } =  this.props;
        const hasPersonalBest = (personalBest && personalBest > 0) ? true : false;
        const hasPreviousScore = previousScore ? true : false;

        return (
            <screen>
                <div className="window__outer fade-in">
                    <div className="window__inner">
                        <h1 className="window__focus window__focus--sm">เลขไทย</h1>
                        <h2>Lek Thai</h2>
                        <p>แปลเลข EN to TH ในเวลาที่กำหนด!</p>
                        <p>วิธีเล่น</p>
                        <p>กรอกตัวอักษรตามตัวเลข เช่น 17 = สิบเจ็ด</p>
                          <p>สามารถปรับระดับความยากง่ายได้ที่มุมซ้ายบน</p>
                        <ul className="list-inline">
                            {(hasPersonalBest) && (
                                <li><h3 className="zero-bottom"><strong>สถิติ:</strong> { personalBest }</h3></li>
                            )}
                            {(hasPreviousScore) && (
                                <li><h3 className="zero-bottom"><strong>สถิติล่าสุด:</strong> { previousScore }</h3></li>
                            )}
                        </ul>
                        <button ref="startButton" className="bubble bubble--input window__form-control window__form-control--push" onClick={ startGame }>เริ่มเกม</button>
                        <p className="zero-bottom"><small>MDT 447 - Application Development For Mobile Devices</small></p>
                    </div>
                </div>
            </screen>
        )
    };
};

export default StartScreen;
