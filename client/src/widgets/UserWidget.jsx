import UserImage from "components/UserImage";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {FaTwitter} from "react-icons/fa"

const UserWidget = ({ userId, picturePath }) => {

    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const token = useSelector((state) => state.token);

    const getUser = async () => {
        const retrievedUserId = axios
        .get(`http://localhost:3001/users/${userId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        setUser(retrievedUserId);
    };

    useEffect(() => {
        getUser();
    }, [])

    if (!user) {
        return null;
    }

    const {
        firstName,
        lastName,
        location,
        occupation,
        savedPosts

    } = user;


    return (
        <div className="widgetWrapper">
            {/* first row */}
            <section className="flexBetweenCenter gap-2 pb-4" onClick={() => navigate(`/profile/${userId}`)}>
                <div className="flexBetweenCenter gap-4">
                    <UserImage image={picturePath} />
                    <h1 className="hover: cursor-pointer">
                        {firstName} {lastName}
                    </h1>

                </div>

            </section>
            <div className="divider" />

            {/* second row */}
            <section className="py-4 px-0">
                <div className="flex items-center gap-4 mb-2">
                    <h1 className="text-lg">
                        {location}
                    </h1>
                </div>
                <div className="flex items-center gap-4">
                    <h1 className="text-lg">
                        {occupation}
                    </h1>
                </div>

            </section>

            <div className="divider" />

            {/* third row */}

            <section className="py-4 px-0">
                <div className="flexBetweenCenter mb-2">
                    <h1>Posts you've saved</h1>
                    <h1>
                        {savedPosts}
                    </h1>
                </div>

            </section>

            <div className="divider" />

            {/* fourth row */}
            <section className="py-4 px-0">
                <h1 className="text-base mb-4">
                    Social Profiles
                </h1>
                <div className="flexBetweenCenter gap-4 mb-2">
                    <div className="gap-4">
                        <FaTwitter />
                    </div>

                </div>

            </section>


            
        </div>
    );
};

export default UserWidget;