import { createClient } from "@sanity/client";

export default createClient({
  projectId: "owrmsj13", // you can find this in sanity.json
  dataset: "production", // or the name you chose in step 1
  useCdn: false, // `false` if you want to ensure fresh data
  apiVersion: "2023-09-28",
  // token: process.env.SANITY_TOKEN,
});
