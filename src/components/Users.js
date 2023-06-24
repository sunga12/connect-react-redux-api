import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { fetchUsers } from "../store/users/usersSlice";

const Users = () => {
  const { users, isLoading, error } = useSelector((state) => state.users)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error !== undefined) {
    return <div>{error}</div>
  }

  return (
    <div>
      {users && users.length > 0 ? (
        <ul>
          {users.map((user, index) => (
            <li key={index}>
              {user.name.first} {user.name.last}
            </li>
          ))}
        </ul>
      ) : (
        <div>No users found.</div>
      )}
    </div>
  );
}

export default Users;
