import Home from "@/containers/Home";
import { ROUTE_KEY } from "./menus";
import My from "@/containers/My";
import NotFound from "@/containers/NotFound";
import Org from "@/containers/Org";

export const ROUTE_COMPONENT = {
    [ROUTE_KEY.HOME]: Home,
    [ROUTE_KEY.MY]: My,
    [ROUTE_KEY.Org]: Org,
    [ROUTE_KEY.NotFound]: NotFound
}