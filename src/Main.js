import styled from "styled-components";
import { useState } from "react"
import { useHistory } from "react-router-dom"
import axios from "axios"

const Card = styled.div`
    background-color : var(--sub);
    border-radius : 20px;
    box-shadow: rgba(23,25,29,0.3) 0 2px 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    max-width: 800px;
    width: 350px;
    height: 350px;
    margin-bottom: 50px;
`

const Profile = styled.image`
    margin-top : 20px;
    border : 2px solid var(--font);
    border-radius : 50%;
    height : 180px;
    width : 180px;
    background : url(${(props) => props.src});
    background-size : 180px;
`

const Button = styled.button`
    height: 30px;
    width: 170px;
    color: black;
    background: var(--point);
    font-weight: bold;
    outline : none;
    border-color: var(--sub);
    box-shadow: rgba(23,25,29,0.3) 0 2px 20px;
`

const Input = styled.input`
    background-color: var(--sub);
    border-radius: 10px;
    height: 30px;
    outline: none;
    border: none;
    box-shadow: rgba(23,25,29,0.3) 0 2px 20px;
    width: 330px;
    padding-top : 5px;
    padding-left : 20px;
    margin-bottom : 30px;
`

function Main() {
    const [myState, setMyState] = useState({
        login: '',
        avatar_url: '',
        html_url: '',
        name: '',
        blog: ''
    });

    const history = useHistory();

    const onIDChange = async evt => {
        try {
            setMyState({
                ...myState,
                login: evt.target.value
            })
        } catch (e) {
            console.log("error");
        }
    }

    const getData = async () => {
        try {
            const response = await axios.get(`https://api.github.com/users/${myState.login}`);
            console.log(response);

            if (response.status === 200) {
                setMyState({
                    ...myState,
                    avatar_url: response.data.avatar_url,
                    html_url: response.data.html_url,
                    name: response.data.name,
                    blog: response.data.blog
                });
                console.log(myState);
                window.localStorage.setItem('ID',myState.login);
            }
        } catch (e) {
            console.log("error");
        }
    }

    
    return (
        <div>
            <h1 style={{ color: "white", textAlign: "center" }}>GitHub Finder</h1>

            <Card>
                <Profile src={myState.avatar_url}></Profile>
                <h3 style={{ marginBottom:"3px", color:"black" }}>{myState.name}</h3>
                <a href={myState.blog} style={{ margin:"1px", color:"black"}}>{myState.blog}</a>
                <a href={myState.html_url} style={{marginTop: "30px", color:"var(--hyper)"}}>Move to Profile</a>
            </Card>

            <Input type="text" placeholder="Input GitHub ID here" onChange={onIDChange}></Input>

            <div></div>
            <Button onClick={getData} style={{ marginRight: "10px" }}>Find</Button>
            <Button onClick={()=>history.push('/follower')}>Follow List</Button>
        </div>
    );
}

export default Main;