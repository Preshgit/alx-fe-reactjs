import UserCard from "./UserCard";

function UserList({ users, loading }) {
  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!users || users.length === 0) {
    return <div className="no-results">No users found</div>;
  }

  return (
    <div className="user-list">
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}

export default UserList;
