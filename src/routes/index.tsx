import Home from "@/containers/Home";
import { ROUTE_KEY } from "./menus";
import My from "@/containers/My";
import NotFound from "@/containers/NotFound";
import Org from "@/containers/Org";
import NoOrg from "@/containers/NoOrg";

export const ROUTE_COMPONENT = {
    [ROUTE_KEY.HOME]: Home,
    [ROUTE_KEY.MY]: My,
    [ROUTE_KEY.ORG]: Org,
    [ROUTE_KEY.NO_ORG]: NoOrg,
    [ROUTE_KEY.NotFound]: NotFound
}