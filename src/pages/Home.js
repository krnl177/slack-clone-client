import React from 'react'
import { gql, useQuery } from '@apollo/client'
export default function Home() {
    const { loading, error, data } = useQuery(ALL_USERS_QUERY);
    console.log('data------', data);
    return (
        <div>
            Home Page...
        </div>
    )
}

const ALL_USERS_QUERY = gql`
    {
        allUsers {
            id
        }
    }
`