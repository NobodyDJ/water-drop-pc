import { gql } from "@apollo/client";

export const GET_USER = gql`
query getUserInfo{
  getUserInfo{
    id
    tel
    code
    name
    desc
    avatar
  }
}
`