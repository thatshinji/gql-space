import { useState } from 'react'
import { useQuery, useMutation, gql } from '@apollo/client';
const USERS = gql`
  query Users {
    users {
      _id
      name
      age
    }
  }
`;

const ADD_USER = gql`
   mutation Mutation($user: inputUser!) {
      addUser(user: $user) {
        success
      }
    }
`;
function App() {
  let { data } = useQuery(USERS) || { users: []}
  let [addUser, { data: data2 }] = useMutation(ADD_USER, {
    refetchQueries: [{
      query: USERS
    }]
  });
  const { users } = data || { users: []}

  return (
    <div className="App">
      <button onClick={() => addUser({
        variables: {
          user: {name: 'asuka', age: 14}
        }
      })}> random add</button>
      {
        users?.map((item: any) => (
          <div key={item._id}>
            <p>id: {item._id}</p>
            <p>name: {item.name}</p>
            <p>age :{item.age}</p>
          </div>
        ))
      }
    </div>
  )
}

export default App
