import React, { useRef } from "react"
import { useParams, useHistory } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import styled from "styled-components"

import { updateWordFB } from "./redux/modules/wordManage"

const Edit = (props) => {
    // 기능 추가
    const index = useParams().word_data;
    const history = useHistory()
    const dispatch = useDispatch();

    // 리덕스에서 받아온 단어의 데이터
    const content = useSelector(state => state.wordManage.words[index]);
    console.log(content.id)

    // 각 부분 추적자
    const eng_ref = React.useRef(content.eng);
    const kor_ref = React.useRef(content.kor);
    const exa_ref = React.useRef(content.exa);
    const tran_ref = React.useRef(content.tran);

    // 이벤트 관리
    const editword = () => {
        let check = checkBlank();
        if(!check){
            alert("빈칸이 있습니다.")
            return
        }
        dispatch(updateWordFB(
            {
                eng: eng_ref.current.value,
                kor: kor_ref.current.value,
                exa: exa_ref.current.value,
                tran: tran_ref.current.value,
                id: content.id,
                checked: false
            }
            ,index));

        history.push("/")   
    }

    const checkBlank = () => {
        let check = true;
        let array = [
            eng_ref.current.value,
            kor_ref.current.value,
            exa_ref.current.value,
            tran_ref.current.value
        ]
        for(let i = 0; i < 4; i++){
            if(array[i].length === 0){
                check = false
            }
        }
        return check
    }

    

    return (
        <>
        <Wcontainer>
            <div>
                <Lil>단어</Lil>
                <En_word type="text" defaultValue={content.eng} ref={eng_ref}/>
            </div>
            <div>
                <Lil>의미</Lil>
                <En_word type="text" defaultValue={content.kor} ref={kor_ref}/>
            </div>
            <div>
                <Lil>예문</Lil>
                <En_word type="text" defaultValue={content.exa} ref={exa_ref}/>
            </div>
            <div>
                <Lil>해석</Lil>
                <En_word type="text" defaultValue={content.tran} ref={tran_ref}/>
            </div>
            <Btn onClick={editword}>수정</Btn>
            </Wcontainer>
        </>
    )
}

const Wcontainer = styled.div`
    width: 50vw;
    height: 50vw;
    margin: 50px auto 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    & > div{
        margin-bottom: 20px;
    }
`;

const Lil = styled.div`
    color: #ff5416;
    width: 50px;
    font-weight: bold;
    font-size: 25px;
    border: solid 2px #ffbaa1;
    border-radius: 5px;
`

const En_word = styled.input`
    background-color: transparent;
    min-width: 300px;
    width: 20vw;
    font-size: 20px;
    border: none;
    margin: 10px 0 0 20px;
    border-bottom: solid 2px red;
    &:focus {
        outline: none;
    }
`

const Btn = styled.div`
    width: 70px;
    height: 30px;
    color: #ff5416;
    font-weight: bold;
    font-size: 25px;
    text-align: center;
    inline-height: 30px;
    background-color: transparent;
    border: solid 3px red;
    border-radius: 10px;
    cursor: pointer;
`

export default Edit