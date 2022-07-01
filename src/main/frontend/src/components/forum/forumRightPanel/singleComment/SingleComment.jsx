import React, {useState} from "react";
import {Button, Card, Image} from "react-bootstrap";
import "./SingleComment.css"
import {FaHeart} from "react-icons/fa";
import axios from "axios";

const SingleComment = (props) => {

    let like=0;
    // const [disable, setDisable] = useState(false);


    const AddLike = () =>{
        // setDisable(true);
        like = like + 1
        // console.log(like)
        like <= 1 ? sendLikeData() : console.log("już dodałeś like")
    }

    const sendLikeData = () =>{
        axios.post(
            "http://localhost:8080/add_like_to_comment",{
                commentId: props.comments.id
            })
            .then((r => console.log(r.data)
            ));
    }

    return (
        <Card
              key={"dark"}
              text={'white'}

              style={{maxWidth: '90%', margin: "10px", marginLeft: "2.5%"}}
              className="mb-2 ">
            <Card.Header style={{justifyContent: "space-between", color: "orange", display: "flex", backgroundColor: "rgb(35, 35, 35)"}}>

                <p style={{ marginBottom: -30 }}>
                    <Image fluid="true" className="imgForPost" src={props.comments.commentImage} alt="user photo"/>
                    <p>Sebastian Ryndak</p></p>
                <p>{props.comments.commentDateTime}</p>
            </Card.Header>
            <Card.Body style={{ backgroundColor: "rgb(55, 55, 55)"}}>
                <Card.Text style={{color: "white"}}>

                    {props.comments.commentText}



                    <p><Image rounded="true" fluid="true" className="addImage" src="https://cdn.icon-icons.com/icons2/2184/PNG/512/healthy_strength_strong_health_heart_icon_133538.png" alt=""/></p>
                </Card.Text>
            </Card.Body>
            <Card.Footer style={{ backgroundColor: "rgb(45, 45, 45)"}}>
                <Button id="likeButton" onClick={AddLike} style={{marginLeft: "93%"}} variant="outline-warning">{<FaHeart />}</Button>
            </Card.Footer>
        </Card>
    );
};

export default SingleComment;