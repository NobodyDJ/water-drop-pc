import Home from "@/containers/Home";
import { ROUTE_KEY } from "./menus";
import My from "@/containers/My";
import NotFound from "@/containers/NotFound";
import Org from "@/containers/Org";
import NoOrg from "@/containers/NoOrg";
import Student from "@/containers/Student";
import Course from "@/containers/Course";
import Product from "@/containers/Product";

export const ROUTE_COMPONENT = {
    [ROUTE_KEY.HOME]: Home,
    [ROUTE_KEY.MY]: My,
    [ROUTE_KEY.ORG]: Org,
    [ROUTE_KEY.NO_ORG]: NoOrg,
    [ROUTE_KEY.STUDENT]: Student,
    [ROUTE_KEY.Course]: Course,
    [ROUTE_KEY.Product]: Product,
    [ROUTE_KEY.NotFound]: NotFound
}