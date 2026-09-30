export const PARK_GATEWAY_SESSION_KEY = "happy-park-gateway-visited";
export const PARK_GATEWAY_OPEN_EVENT = "happy-park:open-gateway";

export function shouldOpenParkGateway(pathname: string, visited: boolean) {
  return pathname === "/" && !visited;
}
