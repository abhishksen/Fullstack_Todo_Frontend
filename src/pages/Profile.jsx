import { useContext } from "react";
import { Context } from "../main";
import Loader from "../components/Loader";
import { Navigate } from "react-router-dom";

const Profile = () => {

  const { isAuthenticated, loading, user } = useContext(Context);

  if (!isAuthenticated) return <Navigate to={"/login"} />

  return (
    loading ? <Loader /> : (
      <div className="wrapper">
        <div className="profile">
          {/* <img src="../assets/profile.png" alt="profile_image" /> */}
          <h3>{user?.name}</h3>
          <p>{user?.email}</p>
        </div>
      </div>
    )

  )
}

export default Profile
