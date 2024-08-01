import React, { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true); // State to handle loading
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser; // Get current user directly
        if (user) {
          const docRef = doc(db, "Users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUserDetails(docSnap.data());
            console.log(docSnap.data());
          } else {
            console.log("No such document!");
          }
        } else {
          console.log("No user is logged in");
          navigate("/login"); // Redirect to login if no user
        }
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      } finally {
        setLoading(false); // Set loading to false once fetching is done
      }
    };

    fetchUserData();
  }, [navigate]);

  async function handleLogout() {
    try {
      await auth.signOut();
      navigate("/login");
      console.log("User logged out successfully!");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  }

  if (loading) {
    return <p>Loading...</p>; // Show loading message while fetching data
  }

  return (
    <div>
      {userDetails ? (
        <>
          <h3>Welcome {userDetails.firstName}</h3>
          <div>
            <p>Email: {userDetails.email}</p>
            <p>First Name: {userDetails.firstName}</p>
            {/* <p>Last Name: {userDetails.lastName}</p> */}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              margin: "20px 50px",
            }}
          >
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => navigate('/react-crud/home')}
            >
              Admin-login
            </button>
          </div>
          <button
            className="btn btn-link"
            onClick={handleLogout}
            style={{ marginLeft: "300px" }}
          >
            Logout
          </button>
        </>
      ) : (
        <p>No user data available.</p>
      )}
    </div>
  );
}

export default Profile;
