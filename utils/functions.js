import { SERVER_HOST_URL } from "./constants"

export const getServerImageUrl = (imageUrl) => {
    return SERVER_HOST_URL + "" + imageUrl;
}