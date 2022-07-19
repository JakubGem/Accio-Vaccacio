import React, {useEffect, useState} from 'react';
import UserLeftBar from "../../UserLeftBar";
import {Button, Card, FormControl, InputGroup} from "react-bootstrap";
import SingleFriend from "./SingleFriend";
import axios from "axios";
import SingleSearchedFriend from "./SingleSearchedFriend";
import {FaReply, FaUserPlus} from "react-icons/fa";

const MyFriends = () => {

    const [nameForSearch, setNameForSearch] = useState("")
    const [searchedFriend, setSearchedFriend] = useState([])
    const [allFriends, setAllFriends] = useState([])

    useEffect(() => {
        searchAllFriends();
    }, [])

    const myId = sessionStorage.getItem("userId").toString();

    const searchAllFriends = () => {
        axios.get(`http://localhost:8080/search_friend/id/${myId}`)
            .then(res => {
                console.log(res.data)
                setAllFriends(res.data);
            })
            .catch(err => {
                console.log(err)
            });
    };

    const searchFriendByName = () => {
        axios.get(`http://localhost:8080/search_friend/${nameForSearch}`)
            .then(res => {
                console.log(res.data)
                setSearchedFriend(res.data);
            })
            .catch(err => {
                console.log(err)
            });
    };

    return (
        <div>
            <UserLeftBar/>
            <Card
                bg="dark"
                key={"dark"}
                text={'white'}
                className="mb-2 right">
                <Card.Header style={{textAlign: "center", color: "orange"}}><h2>My friends</h2></Card.Header>
                <Card.Body>
                    <Card.Text>
                        <Card
                            bg="dark"
                            key={"dark"}>
                            <Card.Header style={{display: "flex"}}>
                                <div className="container h-100" style={{margin: 20}}>
                                    <div className="row h-100 justify-content-center align-items-center"/>
                                    <InputGroup className="col-6">
                                        <FormControl
                                            placeholder="Search friend"
                                            aria-label="Search friend"
                                            aria-describedby="basic-addon2"
                                            value={nameForSearch}
                                            onChange={(e) => setNameForSearch(e.target.value)}
                                        />
                                        <Button variant="warning" onClick={() => searchFriendByName()}>Search</Button>
                                    </InputGroup>
                                </div>
                            </Card.Header>
                        </Card>
                        <Card
                            bg="dark"
                            key={"dark"}
                            style={{marginTop: 10, height: "100%"}}>
                            <Card.Body id="friends-list">
                                {searchedFriend.length ?
                                    <div>
                                        <Button variant="outline-warning" style={{float: "left"}}
                                                onClick={() => window.location.reload()}>{<FaReply/>}</Button>
                                        {
                                            searchedFriend.map((friend, index) => {
                                                if (friend.id.toString() !== sessionStorage.getItem("userId")) {
                                                    return <SingleSearchedFriend myUser={friend} key={index}/>
                                                }
                                            })
                                        }
                                    </div> :
                                    <div>
                                        {allFriends.length ?
                                            allFriends.map((friend, index) => {
                                                return <SingleFriend myUser={friend} key={index}/>
                                            })
                                            :
                                            <div style={{color: "orange"}}>You don't have friends :(</div>
                                        }
                                    </div>
                                }
                            </Card.Body>
                        </Card>
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
};

export default MyFriends;