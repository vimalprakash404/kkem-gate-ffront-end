import React from "react";
import NavBar from "../components/NavBar/NavBar";
import UserCard from "../components/UserCard/UserCard";
import UserCardMobile from "../components/UserCard/UserCardMobile";
import userdetails from "../connection/getUserDetails";
import { useState, useEffect , useRef} from "react";


const CardHook = ({ isMobile, ob ,hider }) => {
  const candidate_ref = useRef(null)
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [dwmsid, setDwmsId] = useState()
  const [mobile, setMobile] = useState()
  const [district,setDistrict] = useState()
  const [error, setError] = useState(false)
  const [candidateid,setCandidateId] = useState()
  const [errorMessage, setErrorMessage] = useState()
  let temp_token = '';
  useEffect(() => {
    async function fetctdata() {
      const data = await userdetails(temp_token)
      console.log(data)
      if (data.error === true) {
        setError(data.error)
        setErrorMessage(data.data.message)
      }
      setName(data.data.firstName + " " + data.data.lastName)
      setEmail(data.data.email);
      setDwmsId(data.data.dwmsID);
      setMobile(data.data.mobile);
      setDistrict(data.data.district);
      setCandidateId(data.data._id);
    }
    fetctdata()

  }, [temp_token]);
  const urlSearchString = window.location.search;
  const params = new URLSearchParams(urlSearchString);

  temp_token = params.get("token")
  console.debug(params.get("token"))
  console.debug(userdetails(params.get("token")))
  if (error !== true ) {
    if (!isMobile)
      return (
        <>
        <input type="hidden" value={candidateid} id="candidate_id" ref={candidate_ref}/>
          <NavBar width="auto" height="90px" />
          <UserCard
            title="User Deatils"
            Name={name}
            email={email}
            kkem_id={dwmsid}
            mobile={mobile}
            district={district}
            isMobile={ob.props.isMobile}
            buttonOnClick={() => { ob.toggle_changer(this) }
          }
          hider={hider}
          candidate_ref ={ candidate_ref}
          />
        </>);
    else return (
      <>
      <input type="hidden" value={candidateid} id="candidate_id" ref={candidate_ref}/>
        <NavBar width="100%" height="100%" />
        <UserCardMobile
          title="User Deatils"
          Name={name}
          email={email}
          kkem_id={dwmsid}
          mobile={mobile}
          district={district}
          buttonOnClick={() => { ob.toggle_changer(this) }}
          hider={hider}
          candidate_ref ={ candidate_ref}
        />
        <br />

      </>)
  } else {
    return (
      <>
        <div>{errorMessage}</div>
      </>
    )
  }
}

export default CardHook;