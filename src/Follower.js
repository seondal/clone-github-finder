import styled from "styled-components";
import { useState, useEffect } from "react"
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
    margin: 50px;
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

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

`

function Follower() {
    const [data, setData] = useState();
    useEffect(async () => {
        const ID = window.localStorage.getItem("ID");
        try {
            const response = await axios.get(`https://api.github.com/users/${ID}/followers`);
            setData(response.data);
            console.log(response);
        } catch (e) {
            console.log("error");
        }
    }, []);

    return (
        <Wrapper>
            {data?.map((person, i) =>
                <Card>
                    <Profile src={person.avatar_url}></Profile>
                    <h3 style={{ color: "white", margin: "7px" }}>{person.login}</h3>
                    <a href={person.blog} style={{ margin: "1px", color: "black" }}>{person.blog}</a>
                    <a href={person.html_url} style={{ color: "var(--hyper)" }}>Move to Profile</a>
                </Card>
            )}
        </Wrapper>
    );
}

export default Follower;