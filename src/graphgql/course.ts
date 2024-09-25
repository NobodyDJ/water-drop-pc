import { gql } from "@apollo/client";

export const GET_COURSES = gql`
  query getCourses($page: PageInput!) {
    getCourses(page: $page){
      code
      message
      page {
        total
        pageNum
        pageSize
      }
      data {
        id
        name
        group
        baseAbility
        limitNumber
        duration
      }
    }
  }
`;