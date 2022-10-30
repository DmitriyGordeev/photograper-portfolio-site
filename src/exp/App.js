import React, {Component} from 'react';
import {connect} from "react-redux";
import "./App.css";

import portraitExample from './../../resources/images/portrait.jpg';
import portraitExample2 from './../../resources/images/portrait2.jpg';
import room from "../../resources/images/room.jpg";
import reflection from "../../resources/images/camera_reflection.png";
import img1 from "../../resources/images/img1.jpg";
import img2 from "../../resources/images/img2.jpg";
import img3 from "../../resources/images/img3.jpg";


// import {TextData} from "../main/TextData";
// let td = new TextData();
// td.foo();



import AsyncImage from "../main/AsyncImage";

const images = [
    portraitExample,
    portraitExample2,
    room,
    reflection,
    img1,
    img2,
    img3
]


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }


    promiseExample() {
        // const promise1 = new Promise((resolve, reject) => {
        //     setTimeout(() => {
        //         resolve('foo');
        //     }, 300);
        // });

        // const promise = new Promise(res => {
        //     setTimeout(() => {
        //         res('foo');
        //     }, 600);
        // });

        const promise = new Promise((res) => {
            setTimeout(() => {
                res("res arg");
                console.log("timeout callback");
            }, 10000);
        });
        return promise;
    }


    async foo() {
        // заходит сюда - и засыпает, возвращая выполнение в функцию render()
        let p = await this.promiseExample();

        for (let i = 0; i < 10000; i++) {
            for(let j = 0; j < 70000; j++) {
                let x = i + j;
            }
        }

        console.log("foo end");
        return p;
    }


    render() {

        let out = this.foo();

        // почему этот лог выполняется в последнюю очередь
        out.then((resValue) => { console.log("out.then resValue = " + resValue) });


        // let p = this.promiseExample();
        // // p.then(() => {
        // //     // это как раз наша функция res внутри promise
        // //     console.log("promise 'then' callback");
        // // });

        console.log("render after");


        return (
            <div className={"main"} style={{
                width: "100%",
                height: "100%"
            }}>
                <AsyncImage size={300} src={img2} hfix={true} />
            </div>
        );
    }
}

export default connect(
    state => ({
        storeData: state
    }),
    dispatch => ({})
)(App);