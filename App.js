// 기능 임포트
import React, { useState,useEffect } from "react";
import styled from "styled-components";
import { Route,useHistory } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"

// 다른 컴포넌트 임포트
import { db } from "./firebase";
import Card from "./Card";
import Newword from "./Newword";
import Edit from "./Edit"
import { loadWordsFB } from "./redux/modules/wordManage";

function App() {
  const history = useHistory();
  const dispatch = useDispatch();
  const rdata = useSelector(state => state.wordManage.words);

  React.useEffect(()=>{
    dispatch(loadWordsFB());
  }, []);

  return (
    <div style={{
      backgroundColor: "rgba(255, 127, 80, 0.2)",
      overflowY: "auto",
      overflowX: "hidden"
    }} className="App">
      <Container>
        <Title onClick={() => {
          history.push("/")
        }}>영단어장</Title>
        <Route path="/" exact>
          <Cardcontainer>
            {rdata.map((cur, ind) => {
              return <Card content={cur} idx={ind} key={ind} />
            })}
          </Cardcontainer>
          <New onClick={()=>{
            window.scroll(0,0)
            history.push("/new")
          }}>N</New>
        </Route>
        <Route path="/new">
            <Newword />
        </Route>
        <Route path="/edit:word_data">
            <Edit />
        </Route>
      </Container>
    </div>
  );
}

const Title = styled.h2`
  width: 100vw;
  height: 10vh;
  line-height: 10vh;
  text-align: center;
  color: red;
  margin: 0;
  background-color: rgba(255, 99, 71, 0.8);
  cursor: pointer;
`;

const Container = styled.div`
  width: 100vw;
`;

const Cardcontainer = styled.div`
  width: 80vw;
  height: 100vh;
  margin: 30px auto 0;
  padding: 20px 0 0 30px;
`;

const New = styled.div`
  text-align: center;
  line-height: 50px;
  width: 50px;
  height: 50px;
  background-color: tomato;
  color: #fff;
  border-radius: 50px;
  position: fixed;
  top: 80%;
  left: 90%;
  cursor: pointer;
  }
`

export default App;
