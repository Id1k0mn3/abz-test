import { useEffect, useState } from "react"
import { UserListWrapper, UsersListStyled, UserListItem } from "./UsersListStyles"
import { UserGet } from "../../types"
import userService from "../../shared/services/user.service"
import { UserWidget } from "../../entities/User"
import { Button } from "../../shared/UI"
import { useUsers } from '../../shared/state/UserState'

export const UsersList = () => {
  const [usersArray, setUsers] = useState<UserGet[]>([])
  const [nextUrl, setNextUrl] = useState<string>();
  const [isHideButton, setIsHideButton] = useState<boolean>(false);
  const userState = useUsers(state => state.users);

  const sortUsers = (array: UserGet[]) => {
    const sortedArray = array.sort((x: UserGet, y: UserGet) => x.registration_timestamp - y.registration_timestamp);
    return sortedArray;
  };

  const updateUsers = (newUsers: UserGet[]) => {
    const updatedUsers = usersArray.concat(newUsers);
    setUsers(sortUsers(updatedUsers));
  };

  const getUsers = () => {
    userService.getUsers(nextUrl).then((data) => {
      try {
        if (data.status !== 200) {
          throw new Error(`There is some problems with server ${data}`);
        }

        const { users, links: { next_url } } = data.data;

        if (!next_url) {
          setIsHideButton(true);
          return;
        }

        const { page, total_pages } = data.data;
        const index = next_url.lastIndexOf('?');
        const partOfNextLink = next_url.substring(index, next_url.length);

        updateUsers(users);
        setNextUrl(partOfNextLink);

        if (page < total_pages) {
          return;
        }

        setIsHideButton(true);
      } catch(e) {
        console.error(e);
      }
    })
  };

  useEffect(() => {
    getUsers();
  }, [])

  useEffect(() => {  
    const users = sortUsers(userState);
    const sortedUsersDesc = [...users].sort((user1, user2) => user2.registration_timestamp - user1.registration_timestamp);
    setUsers(sortedUsersDesc);
    setIsHideButton(false)
  }, [userState]);

  return(
    <UserListWrapper>
      <UsersListStyled>
        {usersArray.map((user) =>
          <UserListItem key={user.id}>
            <UserWidget {...user} />
          </UserListItem>
        )}
      </UsersListStyled>

      {!isHideButton && <Button onClick={getUsers}>Show more</Button>}
    </UserListWrapper>
  )
}