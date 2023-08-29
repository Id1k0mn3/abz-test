import { useEffect, useState } from "react"
import { UserListWrapper, UsersListStyled, UserListItem } from "./UsersListStyles"
import { User } from "../../types"
import userService from "../../shared/services/user.service"
import { UserWidget } from "../../entities/User"
import { Button } from "../../shared/UI"

export const UsersList = () => {
  const [usersArray, setUsers] = useState<User[]>([])
  const [nextUrl, setNextUrl] = useState<string>();
  const [isButtonDisabled, setButtonDisabled] = useState<boolean>(false);
  
  const sortUsers = (array: User[]) => {
    const sortedArray = array.sort((x: User, y: User) => x.registration_timestamp - y.registration_timestamp);
    return sortedArray;
  };

  const updateUsers = (newUsers: User[]) => {
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
          setButtonDisabled(true);
          return;
        }

        const index = next_url.lastIndexOf('?');
        const partOfNextLink = next_url.substring(index, next_url.length);

        updateUsers(users);
        setNextUrl(partOfNextLink);
      } catch(e) {
        console.error(e);
      }
    })
  };

  useEffect(() => {
    getUsers();
  }, [])

  return(
    <UserListWrapper>
      <UsersListStyled>
        {usersArray.map((user) =>
          <UserListItem key={user.id}>
            <UserWidget {...user} />
          </UserListItem>
        )}
      </UsersListStyled>
      <Button onClick={getUsers} disabled={isButtonDisabled}>Show more</Button>
    </UserListWrapper>
  )
}