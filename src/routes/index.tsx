import Home from "@/containers/Home";
import { ROUTE_KEY } from "./menus";
import My from "@/containers/My";
import NotFound from "@/containers/NotFound";

export const ROUTE_COMPONENT = {
    [ROUTE_KEY.HOME]: Home,
    [ROUTE_KEY.MY]: My,
    [ROUTE_KEY.NotFound]: NotFound
}