import { gql } from "@apollo/client";

export const GET_STUDENTS = gql`
    query getStudents($page: PageInput!){
        getStudents(page: $page){
            code
            message
            data{
                avatar
                name
                id
                tel
                account
            }
            page{
                pageNum,
                pageSize,
                total
            }
        }
    }
`