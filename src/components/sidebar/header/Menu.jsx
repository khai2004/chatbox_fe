import { useDispatch } from 'react-redux';
import { useLogoutMutation } from '../../../features/userApiSlice';
import { logout } from '../../../features/userSlice';
import { useNavigate } from 'react-router-dom';

const Menu = () => {
  const dispatch = useDispatch();
  const [logoutApi, { isLoading }] = useLogoutMutation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await logoutApi();
      dispatch(logout());
      navigate('/login');
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className='absolute right-1 z-50 dark:bg-dark_bg_2 dark:text-dark_text_1 shadow-md w-52'>
      <ul>
        <li className='py-3 pl-5 cursor-pointer hover:bg-dark_bg_3'>
          <span>New group</span>
        </li>
        <li className='py-3 pl-5 cursor-pointer hover:bg-dark_bg_3'>
          <span>New comunity</span>
        </li>
        <li className='py-3 pl-5 cursor-pointer hover:bg-dark_bg_3'>
          <span>Started messaged</span>
        </li>
        <li className='py-3 pl-5 cursor-pointer hover:bg-dark_bg_3'>
          <span>Setting</span>
        </li>
        <li
          className='py-3 pl-5 cursor-pointer hover:bg-dark_bg_3'
          onClick={handleLogout}
        >
          <span>Logout</span>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
