import { gql } from "@apollo/client";

export const GET_ORGS = gql`
    query getOrganizations($page: PageInput!){
        getOrganizations(page: $page){
            code
            message
            data{
                id
                name
                address
                orgFrontImg{
                    id,
                    url
                }
            }
            page{
                pageNum
                pageSize
                total
            }
        }
    }
`