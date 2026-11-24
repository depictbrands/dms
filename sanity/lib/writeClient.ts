import "server-only";

import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";

const token = process.env.SANITY_API_WRITE_TOKEN;

/** Server-only client with write access, used to store contact form submissions. */
export const writeClient = token
  ? createClient({ projectId, dataset, apiVersion, token, useCdn: false })
  : null;
