import { useEffect, useState } from "react"
import { UserListWrapper, UsersListStyled, UserListItem } from "./UsersListStyles"
import { UserGet } from "../../types"
import userService from "../../shared/services/user.service"
import { UserWidget } from "../../entities/User"
import { ButtonLG } from "../../shared/UI"
import { useUsers } from '../../shared/state/UserState'

export const UsersList = () => {
  const [usersArray, setUsers] = useState<UserGet[]>([])
  const [nextUrl, setNextUrl] = useState<string>();
  const [isHideButton, setIsHideButton] = useState<boolean>(false);
  const userState = useUsers((state) => state.users);

  const sortUsers = (array: UserGet[]) => {
    const sortedUsers = [...array].sort((user1, user2) => user2.registration_timestamp - user1.registration_timestamp);
    return sortedUsers;
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
    setUsers(sortUsers(userState));
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

      {!isHideButton && <ButtonLG onClick={getUsers}>Show more</ButtonLG>}
    </UserListWrapper>
  )
}