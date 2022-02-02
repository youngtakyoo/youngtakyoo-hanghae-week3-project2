import { db } from "../../firebase";
import {
    collection,
    doc,
    getDoc,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc
} from "firebase/firestore"

//ACTION

const LOAD = "wordManage/LOAD"
const CREATE = "wordManage/CREATE";
const UPDATE = "wordManage/UPDATE";
const DELETE = "wordManage/DELETE";

const initialState = {
    words: [],
}

// Action Creators

export function loadWord(word_list){
    return {type: LOAD, word_list}
}

export function createWord(word_data){
    return {type:CREATE, word_data}
}

export function deleteWord(word_id){
    return {type:DELETE, word_id}
}

export function updateWord(word_data,index){
    return {type:UPDATE, word_data,index}
}

// middleware

export const loadWordsFB = () => {
     return async function (dispatch) {
        const word_data = await getDocs(collection(db,"words"))
        let word_list = [];
        word_data.forEach((w)=>{
            word_list.push({id:w.id, ...w.data()});
        });
        dispatch(loadWord(word_list))
     }
}

export const createWordFB = (word) => {
    return async function (dispatch) {
        const docRef = await addDoc(collection(db, "words"), word);
        const _word = await getDoc(docRef);
        const _word_list = {id:_word.id, ..._word.data()};

        dispatch(createWord(_word_list))
    }
}

export const updateWordFB = (word_data) => {
    return async function (dispatch) {
        const docRef = doc(db, "words", word_data.id);
        await updateDoc(docRef, word_data);

        dispatch(updateWord(word_data));
    }
}

export const deleteWordFB = (id) => {
    return async function (dispatch) {
        const docRef = doc(db,"words",id);
        await deleteDoc(docRef);

        dispatch(deleteWord(id))
    }
}

// Reducer
export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case "wordManage/LOAD": {
            return {words: action.word_list};
        }
        case "wordManage/CREATE": {
            const new_words = [...state.words, action.word_data]
            return {...state, words: new_words};
        }
        case "wordManage/UPDATE": {
            console.log(action.word_data)
            const new_words = state.words.map((cur,ind) => {
               return cur.id === action.word_data.id ? action.word_data : cur
            })
            return {...state, words: new_words}
        }
        case "wordManage/DELETE": {
            const new_words = state.words.filter((w)=>{
                return action.word_id !== w.id
            });
            return {...state, words: new_words};
        }
        default:
            return state;
    }
}