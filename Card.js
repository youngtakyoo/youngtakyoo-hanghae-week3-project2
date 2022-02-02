import React from "react";
import styled from "styled-components"; 

import { useHistory } from "react-router-dom"
import { useDispatch } from "react-redux";
import { deleteWordFB } from "./redux/modules/wordManage";

const Card = (props) => {
    const index = props.idx
    const eng = props.content
    
    
    
    .eng
    const kor = props.content.kor
    const exa = props.content.exa
    const tran = props.content.tran
    const id = props.content.id

    const dispatch = useDispatch();
    const history = useHistory();

    const deleteword = () => {
        dispatch(deleteWordFB(id))
    }

    return (
        <>
        <Wordcard>
            <div style={{display:"flex",position:"relative"}}>
                <div style={{color:"red",marginRight:"180px"}}>{eng}</div>
                <div style={{position: "absolute",left: "220px" ,display:"flex"}}>
                    <Manage onClick={()=>{
                        history.push(`/edit${index}`)
                    }}>수정</Manage>
                    <Manage onClick={deleteword}>삭제</Manage>
                </div>
            </div>
            <div>{kor}</div>
            <div style={{color:"coral"}}>{exa}</div>
            <div style={{color:"coral"}}>{tran}</div>
        </Wordcard>
        </>
    )
}

const Wordcard = styled.div`
    min-width: 300px;
    width: 20vw;
    height: 150px;
    margin: 0 20px 15px 0;
    padding: 15px;
    border: 1px solid red;
    border-radius: 10px;
    float: left;
    display: flex;
    flex-direction: column;
    & div {
        margin: 0 0 10px 0;
    }
`;

const Manage = styled.div`
    background-color: transparent;
    color: red;
    font-weight: bold;
    font-size: 12px;
    text-align: center;
    inline-height: center;
    width: 40px;
    height: 20px;
    border: solid 1px darkred;
    border-radius: 5px;
    cursor: pointer;
`

export default Card