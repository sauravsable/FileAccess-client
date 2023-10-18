import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setAccess} from '../redux/slices/userSlice';
import image from '../images/pngwing.com.png';
import { useNavigate } from 'react-router-dom';

export default function User() {
  const access = useSelector((state) => state.user.Access);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate('/form');
  };

  useEffect(() => {
    const auth=localStorage.getItem('user');
    if(auth==null){
      navigate("/")
    }
  }, [navigate]);

  useEffect(() => {
    const userId = localStorage.getItem('id');

    const fetchUserData = async () => {
      try {
        const response = await fetch('https://fileaccess-backend.onrender.com/getUserData', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId }),
        });
        const data = await response.json();
        console.log(data);
        dispatch(setAccess(data.access));
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [dispatch]);

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden mt-40">
      <img className="h-96 w-full object-cover" src={image} alt="Card Image" />

      <div className="px-6 py-4">
        <div className="text-xl font-semibold text-gray-800">Survey Form</div>
      </div>

      <div className="px-6 py-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 focus:outline-none mr-2"
          disabled={!access}
          onClick={handleOnClick}
        >
          Open Form
        </button>
      </div>
    </div>
  );
}
