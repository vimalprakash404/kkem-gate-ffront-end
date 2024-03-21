import React from "react";
import "./UserCard.css"
import UserCardMobile from "./UserCardMobile";
const UserCard = ({ title, Name, kkem_id, email, mobile ,district, buttonOnClick ,hider , candidate_ref }) => {

  return(
    <div className="container d-flex justify-content-center mt-5">

        <div className="card">
        <UserCardMobile
        title={title}
        Name={Name}
        email={email}
        kkem_id={kkem_id}
        mobile={mobile}
        district={district}
        buttonOnClick={buttonOnClick}
        hider ={hider}
        candidate_ref ={ candidate_ref}
      />
        </div>

    </div>);
}
export default UserCard;
