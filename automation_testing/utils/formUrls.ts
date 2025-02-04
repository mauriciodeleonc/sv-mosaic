import { env } from "../utils/urls/environments";

const url = (page_path: string): string => {
	return `${env[process.env.ENV]}?id=${page_path}`;
}

export { url }