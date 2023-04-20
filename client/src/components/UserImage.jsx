import React from 'react';

const UserImage = ({ image }) => {
    return (
        <div className='w-16 h-16'>
            <img style={{ objectFit: "cover", borderRadius: "50%" }} className='w-16 h-16'
            alt='userPicture'
            src={`http://localhost:3001/assets/${image}`}
            />
        </div>
    );
};

export default UserImage;